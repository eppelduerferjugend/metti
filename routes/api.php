<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/destination', 'DestinationController@indexAPI'); // DONE
Route::get('/destination/{id}', 'DestinationController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/category', 'CategoryController@indexAPI'); // DONE
Route::get('/category/{id}', 'CategoryController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/item', 'ItemController@IndexAPI'); // DONE
Route::get('/item/{id}', 'ItemController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/order', 'OrderController@indexAPI'); // DONE
Route::get('/order/{id}', 'OrderController@showAPI')->where('id', '[0-9]+'); // DONE
Route::get('/order/updated_after/{updated_time}', 'OrderController@updatedAfterAPI'); // DONE
Route::get('/order/updated_after/{destination}/{updated_time}', 'OrderController@updatedAfterByDestinationAPI'); // DONE
Route::get('/order/table/{search_string}', 'OrderController@tableStatusAPI'); // get current orders of table

Route::get('/order/incomplete', 'OrderController@incompleteIndexAPI'); // DONE
Route::get('/order/incomplete/{destination}', 'OrderController@incompleteDestinationAPI'); // DONE

Route::get('/order/complete/{id}', 'OrderController@completeAPI')->where(['id', '[0-9]+']); // DONE
//Route::get('/order/complete/{id}/{destination}', 'OrderController@completeAPI')->where(['id', '[0-9]+'],['category', '[A-Za-z\,]+']);

Route::get('/stats', 'StatisticsController@IndexAPI');
