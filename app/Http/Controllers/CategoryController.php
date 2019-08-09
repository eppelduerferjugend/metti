<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return view(
            'categories',
            Category::with(['items'])->get()
        );
    }


    // API
    public function indexAPI()
    {
        return Category::get();
    }
    public function showAPI($id)
    {
        return Category::findOrFail($id);
    }
}
