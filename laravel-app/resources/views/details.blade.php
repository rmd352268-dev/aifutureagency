@extends('layouts.app')

@section('title', ($product ? $product->title : 'Product Details') . ' - AI Future Agency')

@section('styles')
<style>
  .details-page-wrap {
    padding: 40px 20px 80px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 5;
  }
  .details-card-2col {
    background: linear-gradient(165deg, rgba(12, 20, 36, 0.95) 0%, rgba(6, 12, 22, 0.98) 100%);
    border: 1.5px solid rgba(0, 255, 135, 0.25);
    border-radius: 24px;
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 36px;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 255, 135, 0.15);
  }
  @media (max-width: 860px) {
    .details-card-2col { grid-template-columns: 1fr; gap: 24px; padding: 20px; }
  }
  .prod-view-box {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    height: 320px;
    border: 1.5px solid rgba(0, 255, 135, 0.4);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
    background: #000;
  }
  .prod-view-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .duration-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    color: #cbd5e1;
    padding: 8px 18px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .duration-pill.active {
    background: linear-gradient(135deg, rgba(0, 255, 135, 0.2) 0%, rgba(96, 239, 255, 0.15) 100%);
    border-color: #00ff87;
    color: #00ff87;
    box-shadow: 0 0 16px rgba(0, 255, 135, 0.3);
  }
  .btn-buy-giant {
    width: 100%;
    background: linear-gradient(135deg, #00ff87 0%, #00dfa2 100%);
    color: #02160e;
    border: none;
    padding: 14px 24px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 8px 30px rgba(0, 255, 135, 0.45);
    transition: all 0.2s;
  }
  .btn-buy-giant:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 255, 135, 0.65);
  }
</style>
@endsection

@section('content')
<div class="details-page-wrap">
  <div style="margin-bottom: 20px;">
    <a href="{{ route('home') }}" style="color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
      <i class="fas fa-arrow-left"></i> ব্যাক টু হোম
    </a>
  </div>

  <div class="details-card-2col">
    <!-- Left: Image Preview -->
    <div>
      <div class="prod-view-box">
        <img src="{{ asset($product->image ?: 'logo.jpg') }}" alt="{{ $product->title }}" id="detailMainImg">
        <div style="position: absolute; top: 14px; right: 14px; background: rgba(0, 255, 135, 0.2); border: 1px solid #00ff87; color: #00ff87; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; backdrop-filter: blur(10px);">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #00ff87; margin-right: 4px; box-shadow: 0 0 10px #00ff87;"></span>
          100% ভেরিফাইড
        </div>
      </div>

      <div style="margin-top: 18px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 16px;">
        <h4 style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 8px;"><i class="fas fa-shield-alt" style="color: #00ff87;"></i> গ্যারান্টিযুক্ত সুবিধা:</h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 12.5px; color: #94a3b8; line-height: 1.8;">
          <li>✔ ১০০% প্রাইভেট বা শেয়ার্ড ডেডিকেটেড অ্যাক্সেস</li>
          <li>✔ পেমেন্ট কনফার্মের সাথে সাথে ইনস্ট্যান্ট ডেলিভারি</li>
          <li>✔ ২৪/৭ হোয়াটসঅ্যাপ প্রায়োরিটি সাপোর্ট</li>
          <li>✔ নিরবচ্ছিন্ন রিনিউয়াল গ্যারান্টি</li>
        </ul>
      </div>
    </div>

    <!-- Right: Pricing, Duration, Buy Actions -->
    <div>
      <span style="font-size: 11px; font-weight: 800; color: #00ff87; background: rgba(0, 255, 135, 0.1); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(0, 255, 135, 0.3);">
        {{ $product->category }} • ইন স্টক
      </span>

      <h1 style="font-size: 24px; font-weight: 900; color: #ffffff; margin: 12px 0 10px; line-height: 1.3;">
        {{ $product->title }}
      </h1>

      <p style="font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px;">
        {{ $product->description }}
      </p>

      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 11.5px; font-weight: 800; color: #cbd5e1; margin-bottom: 8px; text-transform: uppercase;">মেয়াদ নির্বাচন করুন:</label>
        <div style="display: flex; gap: 10px;">
          <button type="button" class="duration-pill active" onclick="setDuration('1 month', {{ $product->price }})">১ মাস (30 Days)</button>
          <button type="button" class="duration-pill" onclick="setDuration('3 months', {{ round($product->price * 2.8) }})">৩ মাস (Special Discount)</button>
        </div>
      </div>

      <div style="background: rgba(0, 255, 135, 0.06); border: 1px solid rgba(0, 255, 135, 0.25); border-radius: 16px; padding: 18px 24px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 11px; font-weight: 800; color: #94a3b8; display: block;">মোট প্রদেয় মূল্য:</span>
          <span style="font-size: 28px; font-weight: 900; color: #00ff87;" id="displayPrice">৳{{ $product->price }} BDT</span>
        </div>
        <span style="font-size: 12px; color: #38bdf8; font-weight: 700;" id="displayDurText"><i class="fas fa-bolt"></i> ইনস্ট্যান্ট অ্যাক্সেস</span>
      </div>

      <button type="button" class="btn-buy-giant" onclick="openCheckoutModal()">
        <i class="fas fa-shopping-bag"></i> Buy Now (এখনই অর্ডার করুন)
      </button>
      <p style="text-align: center; font-size: 11.5px; color: #64748b; margin-top: 10px;">
        🔒 ১০০% নিরাপদ পেমেন্ট • এডমিন ভেরিফিকেশন সহ
      </p>
    </div>
  </div>
</div>

<!-- =======================================================
     WIDE 2-COLUMN LUXURY CHECKOUT MODAL WITH LASER ANIMATION
     ======================================================= -->
<div class="checkout-modal-overlay" id="checkoutModal">
  <div class="checkout-modal-card">
    <div class="checkout-modal-head">
      <div class="modal-head-title-wrap">
        <div class="modal-head-icon-box">
          <i class="fas fa-shield-alt"></i>
        </div>
        <div>
          <h3>Secure Order & Instant Checkout</h3>
          <p>AI Future Agency • 100% Verified Delivery & Support</p>
        </div>
      </div>
      <button type="button" class="modal-close-icon" onclick="closeCheckoutModal()" title="Close"><i class="fas fa-times"></i></button>
    </div>

    <form id="detailsOrderForm" action="{{ route('orders.store') }}" method="POST" onsubmit="submitLaravelOrder(event)">
      @csrf
      <input type="hidden" name="product_title" id="orderProdTitle" value="{{ $product->title }} (30 days)">
      <input type="hidden" name="amount" id="orderAmount" value="{{ $product->price }}">

      <div class="checkout-form-grid">
        <!-- LEFT COLUMN: Product Summary, Payment Method, Merchant Number -->
        <div class="checkout-col-left">
          <div class="checkout-summary-3d">
            <div class="checkout-prod-thumb-wrap">
              <img src="{{ asset($product->image ?: 'logo.jpg') }}" alt="{{ $product->title }}" class="checkout-prod-thumb">
            </div>
            <div class="checkout-prod-details">
              <h4>{{ $product->title }}</h4>
              <div class="checkout-meta-row">
                <span class="checkout-dur-pill"><i class="fas fa-clock"></i> <span id="modalDurText">30 days</span></span>
                <span class="checkout-instant-pill"><i class="fas fa-bolt"></i> Instant Access</span>
              </div>
            </div>
            <div class="checkout-price-col">
              <span class="payable-label">TOTAL PAYABLE</span>
              <div class="payable-amt" id="modalPriceText">৳{{ $product->price }}</div>
            </div>
          </div>

          <label style="display:block; font-size:11px; font-weight:800; color:#cbd5e1; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.5px;">
            Select Payment Method (পেমেন্ট মাধ্যম বেছে নিন):
          </label>
          <div class="pay-methods-grid-3d">
            <div class="pay-card-3d active" onclick="pickMethod(this, 'bKash')" data-method="bKash">
              <div class="pay-card-inner">
                <div class="pay-logo-badge" style="background:#E2136E; color:#fff; font-weight:800; font-size:11px;">bK</div>
                <div class="pay-info">
                  <div class="pay-title">bKash</div>
                  <div class="pay-sub">বিকাশ পার্সোনাল</div>
                </div>
                <div class="pay-check-indicator"><i class="fas fa-check-circle"></i></div>
              </div>
            </div>

            <div class="pay-card-3d" onclick="pickMethod(this, 'Nagad')" data-method="Nagad">
              <div class="pay-card-inner">
                <div class="pay-logo-badge" style="background:#F7931E; color:#fff; font-weight:800; font-size:11px;">NG</div>
                <div class="pay-info">
                  <div class="pay-title">Nagad</div>
                  <div class="pay-sub">নগদ পার্সোনাল</div>
                </div>
                <div class="pay-check-indicator"><i class="fas fa-check-circle"></i></div>
              </div>
            </div>

            <div class="pay-card-3d" onclick="pickMethod(this, 'Rocket')" data-method="Rocket">
              <div class="pay-card-inner">
                <div class="pay-logo-badge" style="background:#8C3494; color:#fff; font-weight:800; font-size:11px;">RK</div>
                <div class="pay-info">
                  <div class="pay-title">Rocket</div>
                  <div class="pay-sub">রকেট ডাচ-বাংলা</div>
                </div>
                <div class="pay-check-indicator"><i class="fas fa-check-circle"></i></div>
              </div>
            </div>

            <div class="pay-card-3d" onclick="pickMethod(this, 'WhatsApp Direct')" data-method="WhatsApp Direct">
              <div class="pay-card-inner">
                <div class="pay-logo-badge" style="background:#25D366; color:#fff; font-weight:800; font-size:11px;"><i class="fab fa-whatsapp"></i></div>
                <div class="pay-info">
                  <div class="pay-title">WhatsApp</div>
                  <div class="pay-sub">সরাসরি অর্ডার</div>
                </div>
                <div class="pay-check-indicator"><i class="fas fa-check-circle"></i></div>
              </div>
            </div>
          </div>
          <input type="hidden" name="payment_method" id="selectedPaymentMethod" value="bKash">

          <div class="merchant-instruction-3d">
            <span class="lbl" id="merchantMethodLabel">bKash সেন্ড মানি / ক্যাশ ইন নাম্বার (পার্সোনাল):</span>
            <div class="merchant-num-row">
              <strong>0163935198</strong>
              <button type="button" class="btn-copy-3d" onclick="navigator.clipboard.writeText('0163935198'); alert('নম্বর কপি হয়েছে: 0163935198');"><i class="fas fa-copy"></i> কপি করুন</button>
            </div>
            <small style="color:#94a3b8; font-size:10px; display:block; margin-top:2px;">রেফারেন্সে আপনার নাম বা ফোন নম্বর দিন</small>
          </div>
        </div>

        <!-- RIGHT COLUMN: Customer Details, TrxID, Submit Buttons -->
        <div class="checkout-col-right">
          <div class="input-row-two">
            <div class="field-grp">
              <label><i class="fas fa-user" style="color:#00ff87;"></i> Your Name (আপনার নাম) *</label>
              <div class="modal-input-wrap">
                <i class="fas fa-user-edit"></i>
                <input type="text" name="customer_name" id="custName" class="modal-input-3d" placeholder="e.g. Mahfujur Rahman" required>
              </div>
            </div>
            <div class="field-grp">
              <label><i class="fas fa-phone-alt" style="color:#00ff87;"></i> Phone (মোবাইল নম্বর) *</label>
              <div class="modal-input-wrap">
                <i class="fas fa-phone"></i>
                <input type="tel" name="customer_phone" id="custPhone" class="modal-input-3d" placeholder="017XXXXXXXX" required>
              </div>
            </div>
          </div>

          <div class="field-grp">
            <label><i class="fab fa-google" style="color:#ea4335;"></i> Your Gmail / Email (অ্যাক্সেসের জন্য) *</label>
            <div class="modal-input-wrap">
              <i class="fas fa-envelope"></i>
              <input type="email" name="customer_email" id="custEmail" class="modal-input-3d" placeholder="e.g. yourname@gmail.com" required>
            </div>
          </div>

          <div class="field-grp">
            <label><i class="fas fa-receipt" style="color:#00ff87;"></i> Transaction ID / TrxID (টাকা পাঠানোর আইডি)</label>
            <div class="modal-input-wrap">
              <i class="fas fa-hashtag"></i>
              <input type="text" name="trx_id" id="custTrxId" class="modal-input-3d" placeholder="e.g. BK891024">
            </div>
          </div>

          <div style="display:flex; gap:8px; margin-top:8px;">
            <button type="submit" class="btn-confirm-3d" id="btnSubmitOrder">
              <i class="fas fa-bolt"></i> Confirm Order (অর্ডার জমা দিন)
            </button>
            <a href="https://wa.me/880163935198" target="_blank" class="btn-order-wa-3d" style="text-decoration:none;">
              <i class="fab fa-whatsapp"></i> WhatsApp Order
            </a>
          </div>
          <div style="text-align:center; font-size:10.5px; color:#64748b; margin-top:2px;">
            <i class="fas fa-shield-alt" style="color:#00ff87;"></i> অর্ডারটি এডমিন প্যানেলে জমা হবে এবং ভেরিফাই হলে তাৎক্ষণিক টুল চালু হবে।
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
@endsection

@section('scripts')
<script>
  function setDuration(dur, price) {
    document.querySelectorAll('.duration-pill').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('displayPrice').textContent = `৳${price} BDT`;
    document.getElementById('orderAmount').value = price;
    document.getElementById('modalPriceText').textContent = `৳${price}`;
    document.getElementById('modalDurText').textContent = dur;
  }

  function openCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('active');
  }

  function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
  }

  function pickMethod(el, method) {
    document.querySelectorAll('.pay-card-3d').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('selectedPaymentMethod').value = method;
    document.getElementById('merchantMethodLabel').textContent = `${method} সেন্ড মানি / ক্যাশ ইন নাম্বার:`;
  }

  function submitLaravelOrder(e) {
    // Standard POST form submission to Laravel controller
  }
</script>
@endsection
