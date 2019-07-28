<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Item;
use App\Order;

class AdminController extends Controller
{
    public function index()
    {
        return view(
            'admin',
            [
                'orders' => Order::get(),
            ]
        );
    }
    public function itemsIndex()
    {
        return view(
            'admin_items',
            [
                'categories' => Category::get(),
                'items' => Item::with(['category'])->get(),
            ]
        );
    }

}
