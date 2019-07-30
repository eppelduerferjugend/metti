<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderItem;
use App\Category;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{

    private function generateStatsArray($items)
    {
        $result = ['total' => null];

        foreach($items as $item)
        {
            $category_id = $item->category_id;
            // Check if Category exists
            if (!array_key_exists($category_id,$result))
            {
                $result[$category_id] = ['total' => null];
            }

            // Check if item exists
            if (!array_key_exists($item->item_id,$result[$category_id]))
            {
                $result[$category_id][$item->item_id] = 0;
            }

            $result[$category_id][$item->item_id] += $item->quantity;
            $result[$category_id]['total'] += $item->quantity;
            $result['total'] += $item->quantity;
        }

        return $result;
    }

    public function IndexAPI()
    {
        $undone_order_items = DB::table('order_items')
            ->join('orders', function($join) {
                $join->on('order_items.order_id', '=', 'orders.id')
                    ->WhereNull('orders.completed_at');
            })
            ->get();

        $completed_order_items = DB::table('order_items')
            ->join('orders', function($join) {
                $join->on('order_items.order_id', '=', 'orders.id')
                    ->WhereNotNull('orders.completed_at');
            })
            ->get();

        return [
            'queue' => self::generateStatsArray($undone_order_items),
            'completed' => self::generateStatsArray($completed_order_items)
        ];
    }
}
