<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderItem;
use Carbon\Carbon;
use App\Destination;
use Illuminate\Support\Facades\DB;
use InfluxDB;

class OrderController extends Controller
{
    // Handles quantities for items of an order and calculates order price
    protected function beautifyOrders($order)
    {
        $order['order_price'] = 0;
        $order['order_quantity'] = 0;
        foreach($order['items'] as $item_key => $item)
        {
            $item = self::handleItemQuantity($item);
            $order['items'][$item_key] = $item;
            $order['order_price'] += $item['price'];
            $order['order_quantity'] += $item['quantity'];
        }
        $order['created_at_u'] = Carbon::parse($order['created_at'])->timestamp;
        $order['updated_at_u'] = Carbon::parse($order['updated_at'])->timestamp;
        return $order;
    }

    // Removes the pivot object and calculates the total price for an item
    protected function handleItemQuantity($item)
    {
        $item['quantity'] = $item['pivot']['quantity'];
        unset($item['pivot']);
        if ($item['unit_price'] === null)
        {
            $item['price'] = null;
        } else {
            $item['price'] = $item['unit_price'] * $item['quantity'];
        }
        return $item;
    }

    protected function getOrdersWhere($where_array)
    {
        $orders = Order::where($where_array)
            ->with(['items', 'destination'])
            ->get();
        foreach($orders as $order_key => $order)
        {
            $orders[$order_key] = self::beautifyOrders($order);
        }
        return $orders;
    }

    public function indexAPI()
    {
        return self::getOrdersWhere([]);
    }

    public function showAPI($id)
    {
        return self::beautifyOrders(Order::with(['items', 'destination'])
            ->findOrFail($id));
    }

    protected function getDestinationsArray()
    {
        $destinationsRaw = Destination::get();
        $destinations = [];
        foreach($destinationsRaw as $destination)
        {
            $destinations[$destination['name']] = $destination['id'];
        }
        return $destinations;
    }

    protected function getNextOrderNumber($destination)
    {
        $order_count = DB::table('order_items')
            ->join('items', function($join) use ($destination) {
                $join->on('order_items.item_id', '=', 'items.id')
                    ->Where('destination_id', $destination);
            })
            ->sum('quantity');

        return $order_count + 1;
    }

    // Order creation
    public function createAPI(Request $request)
    {
        $orders = json_decode($request->getContent());
        $destinations = self::getDestinationsArray();

        $result = [];
        $influxPoints = [];

        foreach($orders as $order)
        {
            $created_order = Order::create([
                'destination_id' => $destinations[$order->destination],
                'waiter' => $order->waiter,
                'table' => $order->table,
                'comment' => $order->comment,
                'number' => self::getNextOrderNumber($destinations[$order->destination])
            ]);

            foreach($order->items as $item)
            {
                if ($item->quantity > 0)
                {
                    OrderItem::create([
                        'order_id' => $created_order->id,
                        'item_id' => $item->id,
                        'quantity' => $item->quantity
                    ]);
                }
            }

            $created_order = self::beautifyOrders(Order::with(['items', 'destination'])
            ->where('id', $created_order->id)
            ->first());

            $influxPoints[] = self::prepareInfluxPoint(
                'orders',
                [
                    'destination' => $created_order->destination->name,
                    'status' => 'placed',
                    'table' => $created_order->table,
                ],
                [
                    'order_price' => (float) $created_order->order_price,
                    'quantity' => $created_order->order_quantity
                ]
            );

            $result[] = $created_order;
        }

        self::sendToInflux($influxPoints);

        return $result;
    }

    public function completeAPI($id)
    {
        $result = Order::where([
                'id' => $id,
                'completed_at' => null
            ])
            ->update([
                'completed_at' => Carbon::now()->toDateTimeString()
            ]);

        // If order has already been completed, don't go any further
        if ($result === 0){
            return $result;
        }

        $order = self::beautifyOrders(Order::with(['items', 'destination'])
            ->findOrFail($id));

        self::sendToInflux(
            self::prepareInfluxPoint(
                'orders',
                [
                    'destination' => $order['destination']['name'],
                    'status' => 'completed',
                    'table' => $order['table'],
                ], // tagged values
                [
                    'order_price' => (float) $order['order_price'],
                    'quantity' => $order['order_quantity']
                ]
            )
        );

        return $result;
    }

    public function completeArrayAPI(Request $request)
    {
        $completed_orders = json_decode($request->getContent());
        $result = [];
        foreach($completed_orders as $completed_order)
        {
            $result[$completed_order] = self::completeAPI($completed_order);
        }
        return $result;
    }

    public function reOpenAPI($id)
    {
        $result = Order::where([
                'id' => $id,
            ])
            ->WhereNotNull('completed_at')
            ->update([
                'completed_at' => null
            ]);

        // If order has already been completed, don't go any further
        if ($result === 0){
            return $result;
        }

        $order = self::beautifyOrders(Order::with(['items', 'destination'])
            ->findOrFail($id));

        self::sendToInflux(
            self::prepareInfluxPoint(
                'orders',
                [
                    'destination' => $order['destination']['name'],
                    'status' => 'reopened',
                    'table' => $order['table']
                ],
                [
                    'order_price' => (float) $order['order_price'],
                    'quantity' => $order['order_quantity']
                ]
            )
        );

        return $result;
    }

    //Only insert uppercase table numbers "U8"

    public function incompleteIndexAPI()
    {
        return self::getOrdersWhere([
            'completed_at' => null
        ]);
    }

    public function incompleteDestinationAPI($destination)
    {
        return self::getOrdersWhere([
            'completed_at' => null,
            'destination_id' => $destination
        ]);
    }

    // provide a unix timestamp to only get the orders that have been updated since
    public function updatedAfterAPI($time)
    {
        $orders = Order::where('updated_at', '>=', Carbon::createFromTimestampUTC($time)->timezone(env('timezone'))->toDateTimeString())
            ->with(['items', 'destination'])
            ->get();
        foreach($orders as $order_key => $order)
        {
            $orders[$order_key] = self::beautifyOrders($order);
        }

        return $orders;
    }

    public function updatedAfterByDestinationAPI($destination, $time)
    {
        $orders = Order::where('updated_at', '>=', Carbon::createFromTimestampUTC($time)->timezone(env('timezone'))->toDateTimeString())
            ->where('destination_id', $destination)
            ->with(['items', 'destination'])
            ->get();
        foreach($orders as $order_key => $order)
        {
            $orders[$order_key] = self::beautifyOrders($order);
        }

        return $orders;
    }

    public function tableIndexAPI()
    {
        $orders = Order::distinct()->get('table');
        $result = [];
        foreach($orders as $order)
        {
            $result[] = $order['table'];
        }
        return $result;
    }

    public function tableShowAPI($table)
    {
        return self::getOrdersWhere([
            'table' => $table
        ]);
    }

    protected function prepareInfluxPoint($table, $tagged, $values)
    {
        return new InfluxDB\Point( $table, null, $tagged, $values );
    }

    protected function sendToInflux($points)
    {
        try {
            \Influx::writePoints($points);
        } catch (InfluxDB\Exception $e) {
            //respond::: 'NO INFLUX'.$e->getmessage();
            //return $e->getmessage();
            //TODO: send email, no error as not important
        }
    }
}
