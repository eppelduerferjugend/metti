<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderItem;
use Carbon\Carbon;

class OrderController extends Controller
{
    // Handles quantities for items of an order and calculates order price
    protected function handleOrderQuantity($order)
    {
        $order['order_price'] = 0;
        $order['order_quantity'] = 0;
        foreach($order['items'] as $item_key => $item)
        {
            $item = self::handledItemQuantity($item);
            $order['items'][$item_key] = $item;
            $order['order_price'] += $item['price'];
            $order['order_quantity'] += $item['quantity'];
        }
        return $order;
    }

    // Removes the pivot object and calculates the total price for an item
    protected function handledItemQuantity($item)
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

    public function indexAPI()
    {
        $orders = Order::with(['items', 'destination'])->get();
        foreach($orders as $order_key => $order)
        {
            $orders[$order_key] = self::handleOrderQuantity($order);
        }
        return $orders;
    }

    public function showAPI($id)
    {
        return self::handleOrderQuantity(Order::with(['items', 'destination'])->findOrFail($id));
    }

    public function completeAPI($id)
    {
        $result = Order::where([
                'id' => $id,
                'completed_at' => null
            ])
            ->update([
                'completed_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

        // If order has already been completed, don't go any further
        if ($result === 0){
            //return $result;
        }

        $order = self::handleOrderQuantity(Order::with(['items', 'destination'])->findOrFail($id));

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

    public function incompleteCategoriesAPI($categories)
    {
        return Order::with(['completions'])->get();
    }
}
