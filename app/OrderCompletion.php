<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderCompletion extends Model
{
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'updated_at',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
