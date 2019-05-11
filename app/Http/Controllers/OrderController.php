<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderCompletion;
use App\OrderItem;

class OrderController extends Controller
{
    public function indexAPI()
    {
        return Order::with(['completions'])->get();
    }

    public function showAPI($id)
    {
        return Order::findOrFail($id);
    }

    public function completeAPI($id, $categories)
    {
        return [$id, explode(',',$category)];
    }

    public function incompleteIndexAPI()
    {

        $orders = Order::with(['completions.category','items.category'])->get()->toArray();

        foreach ($orders as $key => $order)
        {
            $orderCategories = [];

            foreach ($order['items'] as $orderItem)
            {
                $orderItem['quantity'] = $orderItem['pivot']['quantity'];
                if (!array_key_exists($orderItem['category']['name'], $orderCategories))
                {
                    $orderCategories[$orderItem['category']['name']] = [];
                    if (!array_key_exists('items', $orderCategories[$orderItem['category']['name']]))
                    {
                        $orderCategories[$orderItem['category']['name']]['items'] = [];
                        $orderCategories[$orderItem['category']['name']]['completed'] = null;
                    }
                }
                $already_stored = false;
                foreach($orderCategories[$orderItem['category']['name']]['items'] as $stored_key => $stored_item)
                {
                    if ($orderItem['id'] == $stored_item['id'])
                    {
                        $orderCategories[$orderItem['category']['name']]['items'][$stored_key]['quantity'] += $orderItem['quantity'];
                        $already_stored = true;
                    }
                }
                if (!$already_stored)
                {
                    unset($orderItem['pivot']);
                    $categoryName = $orderItem['category']['name'];
                    unset($orderItem['category']);
                    $orderCategories[$categoryName]['items'][] = $orderItem;
                }
            }

            foreach($order['completions'] as $completion)
            {
                $orderCategories[$completion['category']['name']]['completed'] = $completion['created_at'];
            }

            $order['orders'] = $orderCategories;

            unset($order['items']);
            unset($order['completions']);

            //return $order;
            $orders[$key] = $order;

        }
        return $orders;
    }
    public function incompleteCategoriesAPI($categories)
    {
        return Order::with(['completions'])->get();
    }
}
