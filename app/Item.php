<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'destination_id',
        'category_id'
    ];

    public function parent()
    {
        return $this->belongsTo(Item::class);
    }

    public function children()
    {
        return $this->hasMany(Item::class);
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)
            ->using(OrderItem::class)
            ->withPivot('quantity');
    }
}
