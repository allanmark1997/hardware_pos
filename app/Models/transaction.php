<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function processed_by()
    {
        return $this->belongsTo(User::class);
    }

    public function tax()
    {
        return $this->belongsTo(Tax::class);
    }

    public function special_discount()
    {
        return $this->belongsTo(SpecialDiscount::class);
    }
}
