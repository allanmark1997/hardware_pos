<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BackOrder extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function price()
    {
        return $this->belongsTo(Price::class);
    }

    public function discount()
    {
        return $this->belongsTo(sale_discount::class, "discount_id", "id");
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
