<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\UserTool;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $admin = User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'AFA Super Admin',
                'email' => 'admin@aifuture.agency',
                'phone' => '0163935198',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // 2. Demo Customer User
        $customer = User::updateOrCreate(
            ['username' => 'nexus_core638'],
            [
                'name' => 'Mahfujur Rahman',
                'email' => 'nexus@aifuture.agency',
                'phone' => '0163935198',
                'password' => Hash::make('password123'),
                'role' => 'customer',
            ]
        );

        // 3. Products Catalog
        $products = [
            [
                'slug' => 'stealth-writer',
                'title' => 'Stealth Writer Premium(offline+online )(30 days)💻',
                'category' => 'AI Humanizer',
                'price' => 799,
                'duration' => '30 days',
                'image' => 'hero-showcase.jpg',
                'badge' => 'HOT DEAL',
                'description' => 'Unrestricted AI bypass tool with human tone, offline & online access, and undetectable rewriting capabilities.',
                'features' => ['Guaranteed Turnitin bypass', 'Unlimited words', 'Humanizer AI algorithm', 'Instant delivery']
            ],
            [
                'slug' => 'chatgpt-plus',
                'title' => 'ChatGPT PLUS Shared/Personal (30 Days)',
                'category' => 'LLM & Code',
                'price' => 499,
                'duration' => '30 days',
                'image' => 'hero-banner-2.jpg',
                'badge' => 'POPULAR',
                'description' => 'GPT-4o, DALL-E 3 image generation, and custom GPT bots with zero rate limits.',
                'features' => ['Full GPT-4o access', 'Code Interpreter & Python', 'Voice Mode ready', 'Dedicated browser login']
            ],
            [
                'slug' => 'claude-pro',
                'title' => 'Claude Pro Opus & Sonnet 3.5 (30 Days)',
                'category' => 'Coding & Analysis',
                'price' => 1500,
                'duration' => '30 days',
                'image' => 'hero-banner-3.jpg',
                'badge' => 'TOP RATED',
                'description' => 'Anthropic Claude 3.5 Sonnet & Opus with 200K token context window for massive documents and coding.',
                'features' => ['Sonnet 3.5 & Opus access', 'Artifacts interactive UI', '200,000 context tokens', 'Zero token lag']
            ],
            [
                'slug' => 'gamma-ai',
                'title' => 'Gamma AI Presentation Pro (30 Days)',
                'category' => 'Presentation',
                'price' => 1499,
                'duration' => '30 days',
                'image' => 'logo.jpg',
                'badge' => 'PRO',
                'description' => 'Create gorgeous slide decks, webpages, and document presentations in seconds with AI.',
                'features' => ['Unlimited AI card creation', 'Custom branding export', 'PDF / PPTX download', 'Ultra-fast generation']
            ],
            [
                'slug' => 'grammarly-premium',
                'title' => 'Grammarly Premium (30 Days)',
                'category' => 'Writing Assistant',
                'price' => 150,
                'duration' => '30 days',
                'image' => 'logo.jpg',
                'badge' => 'BUDGET',
                'description' => 'Advanced vocabulary suggestions, tone clarity adjustments, and plagiarism check.',
                'features' => ['Advanced tone detector', 'Plagiarism detection', 'Browser extensions support', 'Full English checking']
            ],
            [
                'slug' => 'quillbot-premium',
                'title' => 'Quillbot Premium Paraphraser (30 Days)',
                'category' => 'Paraphrasing',
                'price' => 150,
                'duration' => '30 days',
                'image' => 'logo.jpg',
                'badge' => 'BEST VALUE',
                'description' => 'Paraphrase sentences with 7 creative modes and grammar correction tools.',
                'features' => ['Unlimited paraphrasing', '7 unique modes', 'Grammar and summarizer', 'Chrome extension support']
            ],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // 4. Sample Completed Order for Demo User
        Order::updateOrCreate(
            ['order_id' => 'ORD-8829'],
            [
                'user_id' => $customer->id,
                'customer_name' => $customer->name,
                'customer_phone' => $customer->phone,
                'customer_email' => $customer->email,
                'product_title' => 'Stealth Writer Premium Plan (30 Days)',
                'amount' => 799,
                'payment_method' => 'bKash',
                'trx_id' => 'BK882910',
                'status' => 'Completed',
                'notes' => 'Verified and activated by admin.',
            ]
        );

        // 5. Active User Tool for Demo User
        UserTool::updateOrCreate(
            ['order_id' => 'ORD-8829'],
            [
                'user_id' => $customer->id,
                'product_title' => 'Stealth Writer Premium Plan (30 Days)',
                'plan' => '1 Month (Shared)',
                'price' => 799,
                'login_email' => 'stealth_vip@aifuture.agency',
                'login_pin' => '992810',
                'access_url' => '/dashboard',
                'expires_at' => now()->addDays(28),
                'status' => 'Active',
            ]
        );
    }
}
