<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function indexAPI()
    {
        $point = [
            new \InfluxDB\Point(
                'orders',
                null, // some value for some_name
                [], // array of string values
                [
                    'number' => 1,
                    'quantity' => 13
                ]
            )
        ];
        try {
            //\Influx::writePoints($point);
        } catch (\InfluxDB\Exception $e) {
            return 'NO INFLUX'.$e->getmessage();
        }
        return Item::get();
    }
    public function showAPI($id)
    {
        return Item::findOrFail($id);
    }
}
