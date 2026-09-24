<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Customer Dashboard - AI Future Agency</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('styles.css') }}">
  <style>
    :root {
      --primary: #00ff87;
      --primary-cyan: #60efff;
      --primary-jade: #00dfa2;
      --primary-glow: rgba(0, 255, 135, 0.45);
      --liquid-glass-bg: linear-gradient(145deg, rgba(8, 22, 19, 0.6) 0%, rgba(4, 14, 12, 0.75) 100%);
      --liquid-glass-border: rgba(0, 255, 135, 0.25);
    }
    body {
      font-family: 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif;
      background-color: #020705;
      background-image: 
        radial-gradient(circle at 10% 15%, rgba(0, 255, 135, 0.12) 0%, transparent 45%),
        radial-gradient(circle at 85% 85%, rgba(96, 239, 255, 0.1) 0%, transparent 45%),
        linear-gradient(180deg, #020705 0%, #051410 50%, #020705 100%);
      background-attachment: fixed;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
    }
    .dash-sidebar {
      width: 270px;
      background: rgba(6, 16, 14, 0.92);
      border-right: 1px solid rgba(0, 255, 135, 0.25);
      backdrop-filter: blur(20px);
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      min-height: 100vh;
    }
    .dash-main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .dash-topbar {
      height: 68px;
      background: rgba(6, 16, 14, 0.85);
      border-bottom: 1px solid rgba(0, 255, 135, 0.2);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 36px;
      gap: 16px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .sidebar-menu { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
    .menu-item a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      color: #94a3b8;
      font-size: 13.5px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
    }
    .menu-item.active a, .menu-item a:hover {
      background: linear-gradient(135deg, rgba(0, 255, 135, 0.18) 0%, rgba(96, 239, 255, 0.12) 100%);
      color: #00ff87;
      font-weight: 800;
      border: 1px solid rgba(0, 255, 135, 0.35);
    }
    .user-order-card {
      background: linear-gradient(145deg, rgba(8, 22, 19, 0.75) 0%, rgba(4, 14, 12, 0.9) 100%);
      border: 1px solid rgba(0, 255, 135, 0.25);
      border-radius: 16px;
      padding: 18px 22px;
      margin-bottom: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .order-status-banner {
      border-radius: 12px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-top: 12px;
    }
    .banner-pending { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.35); }
    .banner-completed { background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.45); }
    .banner-cancelled { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.35); }

    .user-status-alert-toast {
      position: fixed;
      top: 24px;
      right: 28px;
      background: linear-gradient(135deg, rgba(8, 22, 19, 0.98) 0%, rgba(4, 14, 12, 0.99) 100%);
      border: 1.5px solid #00ff87;
      border-radius: 16px;
      padding: 14px 18px;
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 255, 135, 0.45);
      z-index: 100000;
      display: flex;
      align-items: center;
      gap: 14px;
      max-width: 440px;
      width: calc(100% - 40px);
      transform: translateY(-50px) scale(0.9);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .user-status-alert-toast.active { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
  </style>
</head>
<body>

  <!-- LEFT SIDEBAR -->
  <aside class="dash-sidebar">
    <a href="{{ route('home') }}" style="display:flex; align-items:center; gap:12px; padding:0 12px 20px; border-bottom:1px solid rgba(255,255,255,0.08); margin-bottom:20px; text-decoration:none;">
      <img src="{{ asset('logo.jpg') }}" alt="Logo" style="width:40px; height:40px; border-radius:12px; object-fit:cover; border:1px solid #00ff87;">
      <div style="font-size:18px; font-weight:900; color:#fff;">AI Future <span style="color:#00ff87;">Agency</span></div>
    </a>

    <ul class="sidebar-menu">
      <li class="menu-item" id="menuItemActiveTools"><a onclick="showTab('active-tools')"><i class="fas fa-home"></i> Active Tools (সক্রিয় টুল)</a></li>
      <li class="menu-item active" id="menuItemMyOrders"><a onclick="showTab('my-orders')"><i class="fas fa-box"></i> My Orders (অর্ডার লিস্ট) <span style="background:#f59e0b; color:#000; font-size:10.5px; font-weight:900; padding:1px 7px; border-radius:12px; margin-left:6px;" id="pendingBadge">{{ $orders->where('status', 'Pending')->count() }}</span></a></li>
      <li class="menu-item" id="menuItemSubscribe"><a onclick="showTab('subscribe')"><i class="fas fa-shopping-cart"></i> All Tools (সকল টুল)</a></li>
      <li class="menu-item"><a href="https://wa.me/880163935198" target="_blank"><i class="far fa-envelope"></i> Help Desk</a></li>
      <li class="menu-item"><a href="{{ route('home') }}"><i class="fas fa-arrow-left"></i> ব্যাক টু হোম</a></li>
      <li class="menu-item"><a href="{{ route('logout') }}"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
    </ul>
  </aside>

  <!-- MAIN DASHBOARD CONTENT -->
  <main class="dash-main-area">
    <header class="dash-topbar">
      <div style="background:rgba(8,22,19,0.7); border:1px solid rgba(0,255,135,0.3); border-radius:30px; padding:6px 16px; font-size:13px; font-weight:700; display:flex; align-items:center; gap:8px;">
        <span style="color:#00ff87;"><i class="fas fa-user-circle"></i></span>
        <span>Hello, {{ $user ? $user->name : 'Customer' }}</span>
      </div>
    </header>

    <div style="padding: 36px 48px; max-width: 1120px; width: 100%; margin: 0 auto;">
      <h1 style="font-size: 28px; font-weight: 900; color: #ffffff; margin-bottom: 6px;">
        Welcome Back, <span style="color:#00ff87;">{{ $user ? $user->name : 'Customer' }}</span>
      </h1>
      <p style="color: #94a3b8; font-size: 13.5px; margin-bottom: 24px;">
        আপনার সকল টুলস সাবস্ক্রিপশন ও রিয়েল-টাইম অর্ডার ট্র্যাকিং প্যানেল।
      </p>

      <!-- TAB 1: MY ORDERS (REALTIME TRACKING & ADMIN APPROVAL STATUS) -->
      <div id="tabMyOrders">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <h2 style="font-size:20px; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px;">
            <i class="fas fa-box-open" style="color:#00ff87;"></i> আমার অর্ডারসমূহ (Live Order Status)
          </h2>
        </div>

        <div id="ordersContainer">
          @forelse($orders as $ord)
          <div class="user-order-card" id="order-card-{{ $ord->order_id }}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
              <div>
                <h3 style="font-size:16px; font-weight:800; color:#ffffff; margin-bottom:4px;">{{ $ord->product_title }}</h3>
                <div style="font-size:12px; color:#94a3b8; display:flex; gap:14px; flex-wrap:wrap;">
                  <span><i class="fas fa-hashtag"></i> <strong>{{ $ord->order_id }}</strong></span>
                  <span><i class="far fa-calendar-alt"></i> {{ $ord->created_at->format('d M, Y') }}</span>
                  <span><i class="fas fa-receipt"></i> TrxID: <strong>{{ $ord->trx_id ?: 'N/A' }}</strong></span>
                </div>
              </div>
              <div style="font-size:20px; font-weight:900; color:#00ff87;">৳{{ $ord->amount }} BDT</div>
            </div>

            @if($ord->status === 'Pending')
            <div class="order-status-banner banner-pending">
              <div style="display:flex; align-items:center; gap:10px; flex:1;">
                <span style="background:rgba(245,158,11,0.2); color:#fbbf24; border:1px solid rgba(245,158,11,0.4); font-size:11.5px; font-weight:800; padding:4px 10px; border-radius:20px; white-space:nowrap;">
                  <i class="fas fa-hourglass-half fa-spin"></i> অপেক্ষারত (Pending)
                </span>
                <p style="font-size:12.5px; color:#cbd5e1; margin:0; line-height:1.5;">
                  ⏳ <strong>এডমিন ভেরিফিকেশন চলছে:</strong> পেমেন্ট ও TrxID এডমিন যাচাই করছেন। এডমিন কনফার্ম করলেই সাথে সাথে টুল এক্সেস চালু হবে।
                </p>
              </div>
              <span style="font-size:11.5px; color:#fbbf24; font-weight:700; white-space:nowrap;">
                <i class="fas fa-sync-alt fa-spin"></i> লাইভ আপডেট হচ্ছে...
              </span>
            </div>
            @elseif(in_array($ord->status, ['Completed', 'Confirmed']))
            <div class="order-status-banner banner-completed">
              <div style="display:flex; align-items:center; gap:10px; flex:1;">
                <span style="background:rgba(16,185,129,0.2); color:#34d399; border:1px solid rgba(16,185,129,0.5); font-size:11.5px; font-weight:800; padding:4px 10px; border-radius:20px; white-space:nowrap;">
                  <i class="fas fa-check-circle"></i> এডমিন কনফার্ম করেছেন (Approved)
                </span>
                <p style="font-size:12.5px; color:#cbd5e1; margin:0; line-height:1.5;">
                  🎉 <strong>অভিনন্দন!</strong> মেইন এডমিন আপনার অর্ডার অনুমোদন করেছেন। টুলটির এক্সেস সক্রিয় করা হয়েছে।
                </p>
              </div>
              <button type="button" onclick="showTab('active-tools')" style="background:linear-gradient(135deg, #00ff87 0%, #00dfa2 100%); color:#02160e; border:none; padding:8px 16px; border-radius:8px; font-weight:800; font-size:12px; cursor:pointer;">
                <i class="fas fa-key"></i> টুল এক্সেস দেখুন
              </button>
            </div>
            @else
            <div class="order-status-banner banner-cancelled">
              <span style="background:rgba(239,68,68,0.2); color:#f87171; border:1px solid rgba(239,68,68,0.4); font-size:11.5px; font-weight:800; padding:4px 10px; border-radius:20px;">
                <i class="fas fa-times-circle"></i> বাতিল (Cancelled)
              </span>
              <p style="font-size:12.5px; color:#cbd5e1; margin:0; flex:1;">দুঃখিত, তথ্যে অসংগতি থাকায় অর্ডারটি বাতিল হয়েছে।</p>
              <a href="https://wa.me/880163935198" target="_blank" style="color:#fff; background:#ef4444; padding:6px 12px; border-radius:8px; text-decoration:none; font-size:11.5px; font-weight:700;">হেল্প ডেস্ক</a>
            </div>
            @endif
          </div>
          @empty
          <div style="background: rgba(8, 22, 19, 0.6); border: 1px dashed rgba(0, 255, 135, 0.3); border-radius: 16px; padding: 40px; text-align: center; color: #94a3b8;">
            <i class="fas fa-box-open" style="font-size: 40px; color: rgba(0, 255, 135, 0.4); margin-bottom: 12px; display: block;"></i>
            <h4 style="color: #ffffff; font-size: 16px; margin-bottom: 6px;">এখনো কোনো অর্ডার নেই</h4>
            <p style="font-size: 13px;">আপনি এখনো কোনো টুল বা সাবস্ক্রিপশন অর্ডার করেননি।</p>
          </div>
          @endforelse
        </div>
      </div>

      <!-- TAB 2: ACTIVE TOOLS & SUBSCRIPTIONS -->
      <div id="tabActiveTools" style="display: none;">
        <h2 style="font-size:20px; font-weight:800; color:#fff; margin-bottom:18px;">My Active Tools & Subscriptions</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
          @forelse($activeTools as $tool)
          <div style="background:linear-gradient(145deg, rgba(8,22,19,0.8) 0%, rgba(4,14,12,0.95) 100%); border:1px solid rgba(0,255,135,0.3); border-radius:16px; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h4 style="font-size:16px; font-weight:800; color:#fff; margin:0;">{{ $tool->product_title }}</h4>
              <span style="background:rgba(16,185,129,0.2); color:#00ff87; border:1px solid #00ff87; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:800;">● Active</span>
            </div>
            <p style="font-size:12px; color:#94a3b8; margin-bottom:14px;">Plan: <strong>{{ $tool->plan }}</strong> • Expires: <strong>{{ $tool->expires_at ? $tool->expires_at->format('d M, Y') : '30 Days' }}</strong></p>
            
            <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:12px; margin-bottom:14px; font-size:12.5px;">
              <div style="margin-bottom:6px;"><i class="fas fa-envelope" style="color:#00ff87;"></i> Login: <strong>{{ $tool->login_email }}</strong></div>
              <div><i class="fas fa-key" style="color:#38bdf8;"></i> Password / PIN: <strong>{{ $tool->login_pin }}</strong></div>
            </div>

            <div style="display:flex; gap:10px;">
              <button type="button" onclick="navigator.clipboard.writeText('Email: {{ $tool->login_email }}\nPassword: {{ $tool->login_pin }}'); alert('লগইন তথ্য কপি হয়েছে!');" style="flex:1; background:rgba(255,255,255,0.08); color:#fff; border:1px solid rgba(255,255,255,0.15); padding:8px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
                <i class="fas fa-copy"></i> কপি করুন
              </button>
              <a href="{{ $tool->access_url }}" target="_blank" style="flex:1.2; background:linear-gradient(135deg, #00ff87 0%, #00dfa2 100%); color:#02160e; text-decoration:none; padding:8px; border-radius:8px; font-size:12px; font-weight:800; text-align:center; display:flex; align-items:center; justify-content:center; gap:6px;">
                <i class="fas fa-external-link-alt"></i> এক্সেস টুল
              </a>
            </div>
          </div>
          @empty
          <div style="grid-column: 1/-1; color:#94a3b8; padding:30px; background:rgba(255,255,255,0.03); border-radius:14px; text-align:center;">
            এখনো কোনো সক্রিয় টুল নেই। নতুন অর্ডার করুন বা অপেক্ষা করুন এডমিন কনফার্ম করার জন্য।
          </div>
          @endforelse
        </div>
      </div>

      <!-- TAB 3: BROWSE ALL TOOLS -->
      <div id="tabSubscribe" style="display: none;">
        <h2 style="font-size:20px; font-weight:800; color:#fff; margin-bottom:18px;">Browse & Order All Tools</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
          @foreach($products as $p)
          <div style="background:rgba(8,22,19,0.7); border:1px solid rgba(0,255,135,0.25); border-radius:16px; padding:18px;">
            <h4 style="font-size:15px; font-weight:800; color:#fff; margin-bottom:8px;">{{ $p->title }}</h4>
            <div style="font-size:18px; font-weight:900; color:#00ff87; margin-bottom:14px;">৳{{ $p->price }} BDT</div>
            <a href="{{ route('details', $p->slug) }}" style="display:block; text-align:center; background:linear-gradient(135deg, #00ff87 0%, #00dfa2 100%); color:#02160e; padding:10px; border-radius:8px; font-weight:800; text-decoration:none; font-size:12.5px;">
              অর্ডার করুন
            </a>
          </div>
          @endforeach
        </div>
      </div>

    </div>
  </main>

  <!-- Real-time Celebration Toast -->
  <div class="user-status-alert-toast" id="userStatusAlertToast">
    <div style="width:42px; height:42px; border-radius:12px; background:rgba(0,255,135,0.2); border:1px solid #00ff87; display:flex; align-items:center; justify-content:center; color:#00ff87; font-size:18px; flex-shrink:0;">
      <i class="fas fa-check-circle"></i>
    </div>
    <div style="flex:1;">
      <div style="font-size:11px; font-weight:800; color:#00ff87; text-transform:uppercase;">ORDER APPROVED</div>
      <div style="font-size:13.5px; font-weight:700; color:#ffffff;">আপনার অর্ডারটি এডমিন কনফার্ম করেছেন!</div>
      <div style="font-size:12px; color:#94a3b8;">টুলের এক্সেস সক্রিয় করা হয়েছে।</div>
    </div>
  </div>

  <script>
    function showTab(tab) {
      document.getElementById('tabMyOrders').style.display = (tab === 'my-orders') ? 'block' : 'none';
      document.getElementById('tabActiveTools').style.display = (tab === 'active-tools') ? 'block' : 'none';
      document.getElementById('tabSubscribe').style.display = (tab === 'subscribe') ? 'block' : 'none';

      document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
      if (tab === 'my-orders') document.getElementById('menuItemMyOrders').classList.add('active');
      if (tab === 'active-tools') document.getElementById('menuItemActiveTools').classList.add('active');
      if (tab === 'subscribe') document.getElementById('menuItemSubscribe').classList.add('active');
    }

    function playCelebrationSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.01, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + i * 0.12 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.55);
        });
      } catch(e) {}
    }

    // Real-time polling listener for live order approval from Admin
    let lastSeenEvent = Date.now();
    setInterval(async () => {
      try {
        const res = await fetch('/api/admin/latest-status-event');
        const data = await res.json();
        if (data && data.timestamp && data.timestamp > lastSeenEvent) {
          lastSeenEvent = data.timestamp;
          if (data.status === 'Completed' || data.status === 'Confirmed') {
            playCelebrationSound();
            const toast = document.getElementById('userStatusAlertToast');
            toast.classList.add('active');
            setTimeout(() => { toast.classList.remove('active'); location.reload(); }, 3500);
          }
        }
      } catch(e) {}
    }, 2500);
  </script>
</body>
</html>
