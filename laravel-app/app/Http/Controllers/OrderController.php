<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:50',
            'customer_email' => 'required|email|max:255',
            'product_title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'payment_method' => 'nullable|string|max:50',
            'trx_id' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $orderId = 'ORD-' . rand(1000, 9999);
        $trxId = $validated['trx_id'] ?? 'TRX' . substr(time(), -6);

        // Find or create customer account
        $user = Auth::user();
        if (!$user) {
            $user = User::where('email', $validated['customer_email'])
                ->orWhere('phone', $validated['customer_phone'])
                ->first();

            if (!$user) {
                $username = Str::slug($validated['customer_name']) . rand(10, 99);
                $user = User::create([
                    'name' => $validated['customer_name'],
                    'username' => $username,
                    'email' => $validated['customer_email'],
                    'phone' => $validated['customer_phone'],
                    'password' => Hash::make('password123'),
                    'role' => 'customer',
                ]);
            }
        }

        // Create the order with 'Pending' status (admin must verify!)
        $order = Order::create([
            'order_id' => $orderId,
            'user_id' => $user->id,
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_email' => $validated['customer_email'],
            'product_title' => $validated['product_title'],
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'] ?? 'bKash',
            'trx_id' => $trxId,
            'status' => 'Pending',
            'notes' => $validated['notes'] ?? null,
        ]);

        // Broadcast event in cache for Admin real-time notification
        Cache::put('latest_order_event', [
            'order_id' => $order->order_id,
            'customer_name' => $order->customer_name,
            'product_title' => $order->product_title,
            'amount' => $order->amount,
            'trx_id' => $order->trx_id,
            'timestamp' => round(microtime(true) * 1000),
        ], 300);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'অর্ডারটি সফলভাবে জমা হয়েছে! এডমিন ভেরিফাই করলে আপনার এক্সেস সক্রিয় হবে।',
                'order' => $order,
            ]);
        }

        return redirect()->route('dashboard', ['tab' => 'my-orders'])
            ->with('success', 'অর্ডারটি সফলভাবে জমা হয়েছে! এডমিন ভেরিফাই করলে আপনার এক্সেস সক্রিয় হবে।');
    }

    public function latestEvent()
    {
        $event = Cache::get('latest_order_event');
        return response()->json($event ?: ['timestamp' => 0]);
    }
}
