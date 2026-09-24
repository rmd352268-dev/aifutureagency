<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'price',
        'duration',
        'image',
        'badge',
        'description',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'integer',
    ];
}
