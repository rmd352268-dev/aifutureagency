<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('home', compact('products'));
    }

    public function details($slug = 'stealth-writer')
    {
        $product = Product::where('slug', $slug)->first();
        if (!$product) {
            $product = Product::first();
        }
        $relatedProducts = Product::where('id', '!=', $product ? $product->id : 0)->take(4)->get();

        return view('details', compact('product', 'relatedProducts'));
    }
}
