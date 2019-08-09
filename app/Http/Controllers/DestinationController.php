<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Destination;

class DestinationController extends Controller
{
    // API
    public function indexAPI()
    {
        return Destination::get();
    }
    public function showAPI($id)
    {
        return Destination::findOrFail($id);
    }
}
