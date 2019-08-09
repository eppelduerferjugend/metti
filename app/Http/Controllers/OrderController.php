<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderItem;

class OrderController extends Controller
{
    // Handles quantities for items of an order and calculates order price
    protected function handleOrderQuantity($order)
    {
        $order['order_price'] = 0;
        foreach($order['items'] as $item_key => $item)
        {
            $item = self::handledItemQuantity($item);
            $order['items'][$item_key] = $item;
            $order['order_price'] += $item['price'];
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

    public function completeAPI($id, $categories)
    {
        return [$id, explode(',',$category)];
    }


    //Only insert uppercase table numbers "U8"

    public function incompleteCategoriesAPI($categories)
    {
        return Order::with(['completions'])->get();
    }
}
