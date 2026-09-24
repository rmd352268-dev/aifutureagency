<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            // Log in default demo customer for seamless preview
            $user = User::where('username', 'nexus_core638')->first();
            if ($user) {
                Auth::login($user);
            }
        }

        $orders = $user ? $user->orders : collect();
        $activeTools = $user ? $user->userTools : collect();
        $products = Product::all();

        return view('dashboard', compact('user', 'orders', 'activeTools', 'products'));
    }
}
