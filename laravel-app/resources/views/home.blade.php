@extends('layouts.app')

@section('title', 'AI Future Agency - প্রিমিয়াম এআই টুলস ও ডিজিটাল সলিউশন')

@section('content')
<div class="main-wrapper">
  <!-- Hero Section -->
  <section class="hero" id="home">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content reveal-init">
          <div class="hero-tag">
            <span class="dot"></span>
            <span>Modern Digital Marketing & AI Agency</span>
          </div>
          <h1 class="hero-title">
            <span>Scale Your Business Sales With</span> <br>
            <span class="gradient-brand">Premium Digital Products</span> <br>
            <span>& Facebook Services</span>
          </h1>
          <p class="hero-desc">
            রেডিমেড ভাইরাল রিলস প্যাক, টারগেটেড ফেসবুক বুস্টিং এবং প্রিমিয়াম এআই সাবস্ক্রিপশন নিয়ে আপনার ব্যবসাকে নিয়ে যান অনন্য উচ্চতায়।
          </p>
          <div class="hero-ctas">
            <a href="#digitalStore" class="btn btn-primary">
              <i class="fas fa-shopping-bag"></i> <span>Explore Products & Tools</span>
            </a>
            <button class="btn btn-outline" onclick="openOrderModal('Free Consultation', 'Free', 'Consultation')">
              <i class="fas fa-headset"></i> <span>Get Free Consultation</span>
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <h3>5,000+</h3>
              <p>সন্তুষ্ট ক্লায়েন্ট ও ক্যাম্পেইন</p>
            </div>
            <div class="stat-item">
              <h3>99.2%</h3>
              <p>পজিটিভ রিভিউ রেটিং</p>
            </div>
            <div class="stat-item">
              <h3>24/7</h3>
              <p>লাইভ ডেডিকেটেড সাপোর্ট</p>
            </div>
          </div>
        </div>

        <div class="hero-visual reveal-init">
          <div class="hero-carousel-wrapper" id="heroBannerCarouselWrap">
            <div class="hero-carousel-track" id="heroCarouselTrack">
              <div class="hero-slide active" data-index="0">
                <a href="#digitalStore" class="hero-slide-link">
                  <img src="{{ asset('hero-showcase.jpg') }}" alt="Scale Your Sales With Premium Digital Products" class="hero-slide-img">
                  <div class="hero-slide-overlay"></div>
                  <div class="hero-slide-caption">
                    <div class="hero-slide-caption-title">
                      <span>Scale Your Sales With Premium Digital Products</span>
                      <span class="slide-badge">PROMO</span>
                    </div>
                    <p class="hero-slide-caption-sub">Viral Reels Bundles, Canva Pro, AI Tools & Web Systems</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Digital Store / Tools Catalog Section (Dynamically Powered by Laravel Database) -->
  <section class="products-section" id="digitalStore">
    <div class="container">
      <div class="section-header reveal-init" style="text-align: center; margin-bottom: 36px;">
        <span class="section-badge"><i class="fas fa-microchip"></i> <span>Digital AI Store</span></span>
        <h2 class="section-title"><span>Official</span> <span class="gradient-brand">Premium AI Tools</span></h2>
        <p class="section-subtitle">১০০% ভেরিফাইড অফিসিয়াল অ্যাকাউন্ট ও শেয়ার্ড প্রিমিয়াম লাইসেন্স</p>
      </div>

      <div class="grid-prods" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:22px;">
        @foreach($products as $prod)
        <div class="prod-card" style="background:linear-gradient(165deg, rgba(12,20,36,0.95) 0%, rgba(6,12,22,0.98) 100%); border:1px solid rgba(0,255,135,0.25); border-radius:18px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; transition:all 0.3s cubic-bezier(0.16,1,0.3,1); box-shadow:0 12px 35px rgba(0,0,0,0.6);">
          <div>
            <div style="position:relative; border-radius:12px; overflow:hidden; height:160px; margin-bottom:14px; background:#000;">
              <img src="{{ asset($prod->image ?: 'logo.jpg') }}" alt="{{ $prod->title }}" style="width:100%; height:100%; object-fit:cover;">
              @if($prod->badge)
              <span style="position:absolute; top:10px; right:10px; background:linear-gradient(135deg, #00ff87 0%, #00dfa2 100%); color:#02160e; font-size:10px; font-weight:900; padding:2px 8px; border-radius:10px;">{{ $prod->badge }}</span>
              @endif
            </div>

            <h4 style="font-size:16px; font-weight:800; color:#ffffff; margin-bottom:6px; line-height:1.3;">{{ $prod->title }}</h4>
            <p style="font-size:12.5px; color:#94a3b8; line-height:1.5; margin-bottom:12px;">{{ Str::limit($prod->description, 95) }}</p>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
              <div>
                <span style="font-size:10.5px; color:#94a3b8; display:block;">মূল্য:</span>
                <span style="font-size:19px; font-weight:900; color:#00ff87;">৳{{ $prod->price }} BDT</span>
              </div>
              <span style="font-size:11.5px; color:#38bdf8; background:rgba(56,189,248,0.12); padding:3px 8px; border-radius:6px; font-weight:700;"><i class="fas fa-clock"></i> {{ $prod->duration }}</span>
            </div>

            <div style="display:flex; gap:8px;">
              <a href="{{ route('details', $prod->slug) }}" class="btn btn-outline" style="flex:1; padding:9px 12px; font-size:12.5px; text-align:center; text-decoration:none;">
                View Details
              </a>
              <a href="{{ route('details', $prod->slug) }}?buy=1" class="btn btn-primary" style="flex:1.2; padding:9px 12px; font-size:12.5px; text-align:center; text-decoration:none;">
                <i class="fas fa-bolt"></i> Buy Now
              </a>
            </div>
          </div>
        </div>
        @endforeach
      </div>
    </div>
  </section>

  <!-- Facebook Boost & Live ROI Calculator -->
  <section class="boost-section" id="boostCalculator">
    <div class="container">
      <div class="section-header reveal-init">
        <span class="section-badge"><i class="fab fa-facebook"></i> <span>Facebook Boost & Ads</span></span>
        <h2 class="section-title"><span>Targeted Facebook Boost &</span> <span class="gradient-brand">Live ROI Calculator</span></h2>
        <p class="section-subtitle">Reach your ideal audience with laser-targeted ads and maximize sales conversions</p>
      </div>

      <div class="boost-calculator-wrapper">
        <div class="calculator-grid">
          <div class="calc-inputs reveal-init">
            <h3><i class="fas fa-calculator" style="color:var(--primary); margin-right:8px;"></i> <span>Boost Budget & Reach Estimator</span></h3>
            
            <div class="calc-group">
              <label style="display:block; margin-bottom:10px; font-weight:600;">Campaign Goal:</label>
              <div class="goal-chips">
                <div class="goal-chip active" data-goal="sales"><i class="fas fa-cart-arrow-down"></i> <span>Sales & Messages</span></div>
                <div class="goal-chip" data-goal="leads"><i class="fas fa-user-plus"></i> <span>Lead Generation</span></div>
                <div class="goal-chip" data-goal="growth"><i class="fas fa-thumbs-up"></i> <span>Page Likes & Reach</span></div>
              </div>
            </div>

            <div class="calc-group">
              <div class="calc-label-wrap">
                <label for="budgetSlider">Ad Budget (USD):</label>
                <span class="calc-val-badge" id="budgetVal">৳3,000</span>
              </div>
              <input type="range" class="calc-slider" id="budgetSlider" min="10" max="300" step="5" value="20">
            </div>

            <div class="calc-group">
              <div class="calc-label-wrap">
                <label for="daysSlider">Campaign Duration (Days):</label>
                <span class="calc-val-badge" id="daysVal">4 Days ($5/day)</span>
              </div>
              <input type="range" class="calc-slider" id="daysSlider" min="1" max="30" step="1" value="4">
            </div>
          </div>

          <div class="calc-result-card reveal-init">
            <p class="result-title">Estimated Audience Reach</p>
            <div class="result-reach" id="reachVal">24,000 - 56,000+</div>
            
            <div class="result-breakdown">
              <div class="breakdown-box">
                <p>Estimated Clicks / Engagement</p>
                <h4 id="clicksVal">700 - 1,700+</h4>
              </div>
              <div class="breakdown-box">
                <p>Total Cost (All Charges Included)</p>
                <h4 id="costBdtVal">৳3,000</h4>
              </div>
            </div>

            <button class="btn btn-whatsapp" style="width:100%;" onclick="openOrderModal('Targeted Facebook Boost', document.getElementById('costBdtVal').textContent, 'Facebook Boost')">
              <i class="fab fa-whatsapp"></i> <span>Start Boost With This Budget</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Pre-Made Pricing Tiers -->
  <section class="container" style="margin-top: 40px;">
    <div class="section-header reveal-init" style="margin-bottom:32px;">
      <h3 style="font-size:1.9rem; font-weight:700;"><span>Popular</span> <span class="gradient-brand">Boost Packages</span></h3>
    </div>
    <div class="pricing-cards-grid" id="pricingCardsGrid"></div>
  </section>

  <!-- Media Production Section -->
  <section class="production-section" id="services" style="margin-top: 60px;">
    <div class="container">
      <div class="section-header reveal-init">
        <span class="section-badge"><i class="fas fa-video"></i> <span>Media & Post Production</span></span>
        <h2 class="section-title"><span>Professional</span> <span class="gradient-brand">Video & Content Production</span></h2>
        <p class="section-subtitle">High-converting video ads and viral social media posts tailored to your brand</p>
      </div>
      <div class="services-grid" id="servicesGrid"></div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq-section" id="faq" style="margin-top: 60px;">
    <div class="container">
      <div class="section-header reveal-init">
        <span class="section-badge"><i class="fas fa-question-circle"></i> <span>FAQ</span></span>
        <h2 class="section-title"><span>Frequently</span> <span class="gradient-brand">Asked Questions</span></h2>
        <p class="section-subtitle">Clear answers to everything you need to know about our services</p>
      </div>
      <div class="faq-accordion" id="faqAccordion"></div>
    </div>
  </section>
</div>

<!-- =======================================================
     WIDE 2-COLUMN ORDER / CONSULTATION MODAL WITH LUXURY CYBER LASER BORDER
     ======================================================= -->
<div class="modal-overlay" id="orderModal">
  <div class="modal-card">
    <button class="modal-close" onclick="closeOrderModal()" aria-label="Close Modal">
      <i class="fas fa-times"></i>
    </button>
    <h3 class="modal-title">Instant Order / Consultation</h3>
    <p class="modal-subtitle">Provide your details to connect directly on WhatsApp or Facebook Messenger.</p>

    <form id="orderForm" action="{{ route('orders.store') }}" method="POST" onsubmit="handleOrderFormSubmit(event)">
      @csrf
      <div class="modal-form-grid">
        <div class="form-group">
          <label for="modalItem">Service / Product Name:</label>
          <input type="text" id="modalItem" name="product_title" class="form-control" readonly>
        </div>

        <div class="form-group">
          <label for="modalPrice">Price / Budget:</label>
          <input type="text" id="modalPrice" name="amount" class="form-control" readonly>
        </div>

        <div class="form-group">
          <label for="clientName">Your Full Name *</label>
          <input type="text" id="clientName" name="customer_name" class="form-control" placeholder="e.g. Mahfujur Rahman" required>
        </div>

        <div class="form-group">
          <label for="clientPhone">WhatsApp / Phone Number *</label>
          <input type="tel" id="clientPhone" name="customer_phone" class="form-control" placeholder="017XXXXXXXX" required>
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 12px;">
        <label for="clientEmail">Your Gmail / Email (অ্যাক্সেস প্রদানের জন্য) *</label>
        <input type="email" id="clientEmail" name="customer_email" class="form-control" placeholder="e.g. yourname@gmail.com" required>
      </div>

      <div class="form-group" style="margin-bottom: 14px;">
        <label for="clientNotes">Page Link or Special Requirements (Optional):</label>
        <textarea id="clientNotes" name="notes" class="form-control" rows="2" placeholder="Your Facebook page name or specific requirements"></textarea>
      </div>

      <div style="display:flex; gap:10px; margin-top:8px;">
        <button type="submit" class="btn btn-whatsapp" style="flex:1.2; padding:11px 20px;">
          <i class="fab fa-whatsapp"></i> <span>Confirm Order (অর্ডার নিশ্চিত করুন)</span>
        </button>
        <a href="https://m.me/AiFutureAgency" target="_blank" class="btn btn-outline" style="display:inline-flex; align-items:center; justify-content:center; gap:8px; padding: 11px 20px;" title="Chat directly in Facebook Messenger">
          <i class="fab fa-facebook-messenger" style="color:#0084FF; font-size:1.2rem;"></i> <span>Messenger</span>
        </a>
      </div>
    </form>
  </div>
</div>
@endsection

@section('scripts')
<script>
  function handleOrderFormSubmit(e) {
    // Allows default submit or AJAX
  }
</script>
@endsection
