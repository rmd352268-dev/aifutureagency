<!DOCTYPE html>
<html lang="bn" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'AI Future Agency - প্রিমিয়াম এআই টুলস ও ডিজিটাল সলিউশন')</title>
  <meta name="description" content="AI Future Agency: প্রিমিয়াম এআই সাবস্ক্রিপশন, ফেসবুক বুস্টিং এবং হাই-কনভার্টিং ডিজিটাল এজেন্সি সলিউশন।">
  <link rel="icon" type="image/jpeg" href="{{ asset('logo.jpg') }}">

  <!-- Fonts & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Core CSS -->
  <link rel="stylesheet" href="{{ asset('styles.css') }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  @yield('styles')
</head>
<body>
  <!-- Ambient Cyber Lighting -->
  <div class="ambient-glow" style="position:fixed; top:-150px; left:-150px; width:500px; height:500px; background:radial-gradient(circle, rgba(0,255,135,0.12) 0%, transparent 70%); pointer-events:none; z-index:0;"></div>
  <div class="ambient-glow" style="position:fixed; bottom:-150px; right:-150px; width:550px; height:550px; background:radial-gradient(circle, rgba(96,239,255,0.1) 0%, transparent 70%); pointer-events:none; z-index:0;"></div>

  <!-- Header / Navigation Bar -->
  <header class="navbar-wrapper">
    <nav class="navbar container">
      <a href="{{ route('home') }}" class="brand-logo">
        <img src="{{ asset('logo.jpg') }}" alt="AI Future Agency Logo" class="logo-img">
        <div class="logo-text-group">
          <span class="logo-title">AI FUTURE <span class="highlight">AGENCY</span></span>
          <span class="logo-tagline">SMART AUTOMATION & GROWTH</span>
        </div>
      </a>

      <ul class="nav-links" id="navLinks">
        <li><a href="{{ route('home') }}#hero"><i class="fas fa-home"></i> হোম</a></li>
        <li><a href="{{ route('home') }}#boostCalculator"><i class="fas fa-calculator"></i> বুস্ট ক্যালকুলেটর</a></li>
        <li><a href="{{ route('home') }}#services"><i class="fas fa-bolt"></i> সার্ভিসেস</a></li>
        <li><a href="{{ route('home') }}#digitalStore"><i class="fas fa-store"></i> ডিজিটাল স্টোর</a></li>
        <li><a href="{{ route('home') }}#faq"><i class="far fa-question-circle"></i> প্রশ্ন-উত্তর</a></li>
      </ul>

      <div class="nav-actions">
        <!-- Auth / Dashboard Button -->
        @auth
          @if(Auth::user()->isAdmin())
            <a href="{{ route('admin.dashboard') }}" class="auth-user-pill" style="background:linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.1) 100%); border:1px solid #ef4444; color:#ffffff; padding:6px 14px; border-radius:30px; font-size:12.5px; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:6px;">
              <i class="fas fa-user-shield" style="color:#ef4444;"></i> Admin Panel
            </a>
          @else
            <a href="{{ route('dashboard') }}" class="auth-user-pill" style="background:linear-gradient(135deg, rgba(0,255,135,0.18) 0%, rgba(96,239,255,0.12) 100%); border:1px solid #00ff87; color:#ffffff; padding:6px 14px; border-radius:30px; font-size:12.5px; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:6px;">
              <i class="fas fa-user-circle" style="color:#00ff87;"></i> ড্যাশবোর্ড
            </a>
          @endif
        @else
          <a href="{{ route('login') }}" class="auth-pill-btn" style="background:rgba(255,255,255,0.06); border:1px solid rgba(0,255,135,0.3); color:#ffffff; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; text-decoration:none;">
            <i class="fas fa-sign-in-alt" style="color:#00ff87;"></i> লগইন / সাইনআপ
          </a>
        @endauth

        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Navigation">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main>
    @yield('content')
  </main>

  <!-- Floating Direct Contact Action Buttons -->
  <div class="floating-actions">
    <a href="https://wa.me/880163935198?text=Hello,%20I%20am%20interested%20in%20your%20services." target="_blank" class="float-btn whatsapp" title="WhatsApp Support">
      <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://m.me/AiFutureAgency" target="_blank" class="float-btn messenger" title="Facebook Messenger">
      <i class="fab fa-facebook-messenger"></i>
    </a>
  </div>

  <!-- Core Scripts -->
  <script src="{{ asset('app.js') }}"></script>
  @yield('scripts')
</body>
</html>
