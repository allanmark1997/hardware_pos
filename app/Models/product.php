<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
    protected $casts = [
        'description' => 'json',
    ];

    protected $appends = [
        'product_price'=>"sda"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function current_price(){
        return $this->hasOne(Price::class, "product_id", "id")->latestOfMany();
    }
    public function current_discount(){
        return $this->hasOne(sale_discount::class, "product_id", "id")->latestOfMany();
    }
    public static function initStorage()
    {   
        if (!Storage::exists('public/images/products')) {
            Storage::makeDirectory('public/images/products');
        }
    }
}
