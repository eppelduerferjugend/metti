@extends('layout')

@section('title')
Admin
@stop

@section('content')
    <div class="col-7">
        <h2>Orders</h2>
        <orders></orders>

        <ul class="orderList">
            @foreach ($orders as $key => $order)
                <li>
                    <div class="row">
                        <div class="col-2">
                            {{$order->id}}
                        </div>
                        <div class="col-10">
                            <div class="row">
                                <div class="col-12">
                                    {{$order->table}} {{$order->comment}}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    {{ date('H:i:s', strtotime($order->created_at)) }} &middot; {{$order->waiter}}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            @endforeach
        </ul>

    </div>
    <div class="col-5">
        Statistics
    </div>
@stop
