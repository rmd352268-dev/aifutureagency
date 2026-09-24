<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_tools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('order_id')->nullable();
            $table->string('product_title');
            $table->string('plan')->default('1 Month (30 Days)');
            $table->integer('price')->default(0);
            $table->string('login_email')->nullable();
            $table->string('login_pin')->nullable();
            $table->string('access_url')->default('#');
            $table->date('expires_at')->nullable();
            $table->string('status')->default('Active'); // 'Active', 'Expired'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_tools');
    }
};
