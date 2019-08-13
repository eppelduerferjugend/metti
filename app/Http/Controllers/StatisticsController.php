<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OrderItem;
use App\Category;
use App\Destination;
use App\Item;
use Illuminate\Support\Facades\DB;
use InfluxDB;

class StatisticsController extends Controller
{

    protected function destinationsArray()
    {
        $destinationsRaw = Destination::get();
        $destinations = [];
        foreach($destinationsRaw as $destination)
        {
            $destinations[$destination->id] = $destination->name;
        }
        return $destinations;
    }

    protected function itemsArray()
    {
        $itemsRaw = Item::with('parent')->get();
        $items = [];
        foreach($itemsRaw as $item)
        {
            if ($item->parent['name']){
                $items[$item->id] = $item->parent['name'].'-'.$item->name;
            } else {
                $items[$item->id] = $item->name;
            }
        }
        return $items;
    }

    private function generateStatsArray($items, $destinationsName, $itemsName)
    {
        $result = ['total' => null];

        foreach($items as $item)
        {
            $destination_id = $item->destination_id;
            // Check if Category exists
            if (!array_key_exists($destinationsName[$destination_id],$result))
            {
                $result[$destinationsName[$destination_id]] = ['total' => null];
                if ($destinationsName[$destination_id] === 'Kichen')
                {
                    $result[$destinationsName[$destination_id]]['total-all-you-can-eat'] = null;
                    $result[$destinationsName[$destination_id]]['total-kleng'] = null;
                }
            }

            // Check if item exists in array
            if (!array_key_exists($itemsName[$item->item_id],$result[$destinationsName[$destination_id]]))
            {
                $result[$destinationsName[$destination_id]][$itemsName[$item->item_id]] = 0;
            }

            $result[$destinationsName[$destination_id]][$itemsName[$item->item_id]] += $item->quantity;
            $result[$destinationsName[$destination_id]]['total'] += $item->quantity;

            if (strpos(strtolower($itemsName[$item->item_id]), 'all-you-can-eat') !== false)
            {
                $result[$destinationsName[$destination_id]]['total-all-you-can-eat'] += $item->quantity;
            }
            else if (strpos(strtolower($itemsName[$item->item_id]), 'kleng') !== false)
            {
                $result[$destinationsName[$destination_id]]['total-kleng'] += $item->quantity;
            }

            $result['total'] += $item->quantity;
        }

        return $result;
    }

    protected function generateTableStats($items, $destinationsName)
    {
        $result = [];
        foreach($items as $item)
        {
            if (!array_key_exists($destinationsName[$item->destination_id], $result))
            {
                $result[$destinationsName[$item->destination_id]] = [];
            }
            if (!array_key_exists($item->table, $result[$destinationsName[$item->destination_id]]))
            {
                $result[$destinationsName[$item->destination_id]][$item->table] = null;
            }
            $result[$destinationsName[$item->destination_id]][$item->table] += $item->quantity;
        }

        return $result;
    }

    public function IndexAPI()
    {
        $placed_order_items = DB::table('order_items')
            ->join('orders', function($join) {
                $join->on('order_items.order_id', '=', 'orders.id');
            })
            ->get();

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

        $destinationsName = self::destinationsArray();
        $itemsName = self::itemsArray();

        return [
            'orders' => [
                'placed' => self::generateStatsArray($placed_order_items, $destinationsName, $itemsName),
                'queue' => self::generateStatsArray($undone_order_items, $destinationsName, $itemsName),
                'completed' => self::generateStatsArray($completed_order_items, $destinationsName, $itemsName),
            ],
            'tables' => self::generateTableStats($placed_order_items, $destinationsName)
        ];
    }

    public function pushToInflux()
    {
        $stats = self::IndexAPI();

        $influxPoints = [];

        foreach($stats['orders'] as $status => $destinations)
        {
            foreach($destinations as $destination => $items)
            {
                if ($destination === 'total')
                {
                    continue;
                }
                foreach($items as $item => $quantity)
                {
                    $influxPoints[] = self::prepareInfluxPoint(
                        'statistics',
                        [
                            'type' => 'order',
                            'destination' => $destination,
                            'status' => $status,
                            'item' => $item
                        ],
                        [
                            'quantity' => $quantity
                        ]
                    );
                }
            }
        }

        foreach($stats['tables'] as $destination => $tables)
        {
            foreach($tables as $tableName => $quantity)
            {
                $influxPoints[] = self::prepareInfluxPoint(
                    'statistics',
                    [
                        'type' => 'table',
                        'destination' => $destination,
                        'table' => $tableName
                    ],
                    [
                        'quantity' => $quantity
                    ]
                );
            }
        }

        return self::sendToInflux($influxPoints);
    }

    protected function prepareInfluxPoint($table, $tagged, $values)
    {
        return new InfluxDB\Point( $table, null, $tagged, $values );
    }

    protected function sendToInflux($points)
    {
        try {
            \Influx::writePoints($points);
            echo 1;
        } catch (InfluxDB\Exception $e) {
            //respond::: 'NO INFLUX'.$e->getmessage();
            return $e->getmessage();
            //TODO: send email, no error as not important
        }
    }
}
