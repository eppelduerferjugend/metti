<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    public function indexAPI()
    {
        return Category::with(['items'])->get();
    }
    public function showAPI($id)
    {
        return Category::findOrFail($id);
    }
}
