<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function indexAPI()
    {
        return Item::with(['category'])->get();
    }
    public function showAPI($id)
    {
        return Item::findOrFail($id);
    }
}
