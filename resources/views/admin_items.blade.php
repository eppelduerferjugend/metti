@extends('layout')

@section('title')
    Admin - Items
@stop

@section('content')
<div class="col-4"> <!-- Categories -->
    <h2>Categories</h2>
    <ul class="categoryList">
        @foreach ($categories as $key => $category)
            <li class="categoryItem">
                <div class="row">
                    <div class="col-12">
                        {{$category->name}}
                    </div>
                </div>
                <div class="row meta">
                    <div class="col-12">
                        {{$category->description}}
                    </div>
                </div>
            </li>
        @endforeach
    </ul>
</div>
<div class="col-8"> <!-- Items -->
    <h2>Items</h2>
    <table class="table table-sm">
        <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Order</th>
            <th>Available</th>
        </tr>
        @foreach ($items as $key => $item)
            @if ($item->available)
                <tr>
            @else
                <tr class="table-danger">
            @endif
                <td>{{$item->name}}</td>
                <td>{{$item->category->name}}</td>
                <td>
                    UP
                    DOWN
                </td>
                <td>{{$item->available}}</td>
            </tr>
        @endforeach
    </table>
</div>
@stop
