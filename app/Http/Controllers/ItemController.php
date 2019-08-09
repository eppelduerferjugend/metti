<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function indexAPI()
    {
        return Item::with(['destination','category'])
            ->get();
    }
    public function showAPI($id)
    {
        return Item::with(['destination','category'])
            ->findOrFail($id);
    }
}
