<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }
    public function items()
    {
        return $this->belongsToMany(Item::class, 'order_items')
            ->withPivot('quantity');
    }
}
