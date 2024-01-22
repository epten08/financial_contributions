<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;

    protected $fillable = ['amount','type','period','user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
