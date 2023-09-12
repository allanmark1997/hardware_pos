<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delivery extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    public function details()
    {
        return $this->hasMany(DeliveryDetail::class)->with("product")->with("price");
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function user_receiver()
    {
        return $this->belongsTo(User::class, "received_by", "id");
    }
}
