<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function sale_discount()
    {
        return $this->belongsTo(sale_discount::class, "sale_discounts_id", "id");
    }

    public function price()
    {
        return $this->belongsTo(Price::class);
    }
}
