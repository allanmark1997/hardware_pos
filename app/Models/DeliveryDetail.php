<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryDetail extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    // protected $casts = [
    //     'products' => 'json',
    // ];

    public function product()
    {
        return $this->belongsTo(Product::class, "product_id", "id");
    }

    public function price()
    {
        return $this->belongsTo(SupplierPrice::class, "price_id", "id");
    }
}
