<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\UserTool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminController extends Controller
{
    public function index()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        $products = Product::all();
        $users = User::orderBy('created_at', 'desc')->get();

        $totalRevenue = Order::whereIn('status', ['Completed', 'Confirmed'])->sum('amount');
        $pendingCount = Order::where('status', 'Pending')->count();
        $completedCount = Order::whereIn('status', ['Completed', 'Confirmed'])->count();

        return view('admin.dashboard', compact(
            'orders',
            'products',
            'users',
            'totalRevenue',
            'pendingCount',
            'completedCount'
        ));
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $newStatus = $request->input('status', 'Completed');

        $order->status = $newStatus;
        $order->save();

        // If completed and associated with a user, auto-deliver the tool!
        if (in_array($newStatus, ['Completed', 'Confirmed']) && $order->user_id) {
            $user = User::find($order->user_id);
            if ($user) {
                UserTool::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'order_id' => $order->order_id,
                    ],
                    [
                        'product_title' => $order->product_title,
                        'plan' => '1 Month (30 Days)',
                        'price' => $order->amount,
                        'login_email' => ($user->username ?: 'customer') . '_vip@aifuture.agency',
                        'login_pin' => (string) rand(100000, 999999),
                        'access_url' => '/dashboard',
                        'expires_at' => now()->addDays(30),
                        'status' => 'Active',
                    ]
                );
            }
        }

        // Cache event for real-time customer panel notification
        Cache::put('latest_status_event', [
            'order_id' => $order->order_id,
            'status' => $newStatus,
            'product_title' => $order->product_title,
            'timestamp' => round(microtime(true) * 1000),
        ], 300);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'অর্ডার স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!',
                'status' => $newStatus,
                'order' => $order,
            ]);
        }

        return redirect()->back()->with('success', 'অর্ডার স্ট্যাটাস সফলভাবে আপডেট হয়েছে!');
    }

    public function latestStatusEvent()
    {
        $event = Cache::get('latest_status_event');
        return response()->json($event ?: ['timestamp' => 0]);
    }
}
