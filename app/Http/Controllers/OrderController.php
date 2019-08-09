<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use Carbon\Carbon;

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
            //return $result;
        }

        $order = self::beautifyOrders(Order::with(['items', 'destination'])
            ->findOrFail($id));

        $point = [
            new \InfluxDB\Point(
                'orders',
                null, // some value for some_name
                [], // array of string values
                [
                    'status' => 'completed',
                    'destination' => $order['destination']['name'],
                    'order_price' => $order['order_price'],
                    'waiter' => $order['waiter'],
                    'table' => $order['table'],
                    'quantity' => $order['order_quantity']
                ]
            )
        ];
        try {
            \Influx::writePoints($point);
        } catch (\InfluxDB\Exception $e) {
            //respond::: 'NO INFLUX'.$e->getmessage();
            //TODO: send email, no error as not important
        }

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
}
