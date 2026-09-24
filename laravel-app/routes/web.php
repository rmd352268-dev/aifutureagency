<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

// Public Pages
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/details/{slug?}', [HomeController::class, 'details'])->name('details');

// Orders & Real-time Live Sync Endpoints
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/api/orders/latest-event', [OrderController::class, 'latestEvent'])->name('orders.latestEvent');
Route::get('/api/admin/latest-status-event', [AdminController::class, 'latestStatusEvent'])->name('admin.latestStatusEvent');

// Customer Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Admin Console & Status Management
Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
Route::post('/admin/orders/{id}/status', [AdminController::class, 'updateStatus'])->name('admin.orders.updateStatus');

// Authentication
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/logout', [AuthController::class, 'logout']);
