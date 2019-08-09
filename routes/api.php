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
Route::get('/destination', 'DestinationController@indexAPI');
Route::get('/destination/{id}', 'DestinationController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/category', 'CategoryController@indexAPI');
Route::get('/category/{id}', 'CategoryController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/item', 'ItemController@IndexAPI');
Route::get('/item/{id}', 'ItemController@showAPI')->where('id', '[0-9]+'); // DONE

Route::get('/order', 'OrderController@indexAPI');
Route::get('/order/{id}', 'OrderController@showAPI')->where('id', '[0-9]+');
Route::get('/order/updated_after/{updated_time}', 'OrderController@updatedAfterAPI');
Route::get('/order/table/{search_string}', 'OrderController@tableStatusAPI'); // get current orders of table

Route::get('/order/complete/{id}/{category}', 'OrderController@completeAPI')->where(['id', '[0-9]+'],['category', '[A-Za-z\,]+']);

Route::get('/order/incomplete', 'OrderController@incompleteIndexAPI');
Route::get('/order/incomplete/{categories}', 'OrderController@incompleteCategoriesAPI');

Route::get('/stats', 'StatisticsController@IndexAPI');
