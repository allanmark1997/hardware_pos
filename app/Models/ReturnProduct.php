<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReturnProduct extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, "transaction_id", "id");
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function price()
    {
        return $this->belongsTo(Price::class, 'price_id', 'id');
    }

    public function sale_discount()
    {
        return $this->belongsTo(sale_discount::class, 'sale_discount_id', 'id');
    }
}
