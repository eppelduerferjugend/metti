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
Route::get('/destination/{id}', 'DestinationController@showAPI')->where('id', '[0-9]+');

Route::get('/category', 'CategoryController@indexAPI');
Route::get('/category/{id}', 'CategoryController@showAPI')->where('id', '[0-9]+');

Route::get('/item', 'ItemController@IndexAPI');
Route::get('/item/{id}', 'ItemController@showAPI')->where('id', '[0-9]+');

Route::get('/order', 'OrderController@indexAPI');
Route::post('/order', 'OrderController@createAPI');
Route::get('/order/{id}', 'OrderController@showAPI')->where('id', '[0-9]+');
Route::get('/order/updated_after/{updated_time}', 'OrderController@updatedAfterAPI');
Route::get('/order/updated_after/{destination}/{updated_time}', 'OrderController@updatedAfterByDestinationAPI');

Route::get('/order/incomplete', 'OrderController@incompleteIndexAPI');
Route::get('/order/incomplete/{destination}', 'OrderController@incompleteDestinationAPI');

Route::get('/order/complete/{id}', 'OrderController@completeAPI')->where(['id', '[0-9]+']);
Route::post('/order/complete', 'OrderController@completeArrayAPI');

Route::get('/order/reopen/{id}', 'OrderController@reOpenAPI')->where(['id', '[0-9]+']);

Route::get('/table', 'OrderController@tableIndexAPI');
Route::get('/table/{search_string}', 'OrderController@tableShowAPI');

Route::get('/stats', 'StatisticsController@IndexAPI');
