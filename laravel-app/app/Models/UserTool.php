<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTool extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'product_title',
        'plan',
        'price',
        'login_email',
        'login_pin',
        'access_url',
        'expires_at',
        'status',
    ];

    protected $casts = [
        'expires_at' => 'date',
        'price' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
