<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Command Center - AI Future Agency</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('styles.css') }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif;
      background: #020705;
      color: #fff;
      display: flex;
      min-height: 100vh;
      margin: 0;
    }
    .admin-sidebar {
      width: 260px;
      background: rgba(6, 16, 14, 0.95);
      border-right: 1px solid rgba(0, 255, 135, 0.25);
      padding: 24px 16px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
    .admin-main { flex: 1; padding: 32px 40px; overflow-y: auto; }
    .stat-card {
      background: linear-gradient(145deg, rgba(8, 22, 19, 0.8) 0%, rgba(4, 14, 12, 0.95) 100%);
      border: 1px solid rgba(0, 255, 135, 0.25);
      border-radius: 18px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .order-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13.5px;
      background: linear-gradient(145deg, rgba(8, 22, 19, 0.6) 0%, rgba(4, 14, 12, 0.85) 100%);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(0, 255, 135, 0.2);
    }
    .order-table th, .order-table td {
      padding: 14px 18px;
      text-align: left;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .order-table th { background: rgba(0, 255, 135, 0.08); color: #00ff87; font-weight: 800; font-size: 12px; }

    /* Floating Real-time Admin Notification Toast */
    .live-order-alert-toast {
      position: fixed;
      top: 24px;
      right: 28px;
      background: linear-gradient(135deg, rgba(8, 22, 19, 0.98) 0%, rgba(4, 14, 12, 0.99) 100%);
      border: 1.5px solid #00ff87;
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 255, 135, 0.45);
      z-index: 100000;
      display: flex;
      align-items: center;
      gap: 14px;
      max-width: 440px;
      transform: translateY(-50px) scale(0.9);
      opacity: 0;
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .live-order-alert-toast.active { transform: translateY(0) scale(1); opacity: 1; pointer-events: auto; }
  </style>
</head>
<body>

  <!-- ADMIN SIDEBAR -->
  <aside class="admin-sidebar">
    <a href="{{ route('home') }}" style="display:flex; align-items:center; gap:12px; padding:0 12px 20px; border-bottom:1px solid rgba(255,255,255,0.08); margin-bottom:20px; text-decoration:none;">
      <img src="{{ asset('logo.jpg') }}" alt="Logo" style="width:40px; height:40px; border-radius:12px; border:1px solid #00ff87;">
      <div style="font-size:18px; font-weight:900; color:#fff;">AFA <span>Admin</span></div>
    </a>

    <div style="display:flex; flex-direction:column; gap:8px;">
      <a href="{{ route('admin.dashboard') }}" style="background:rgba(0,255,135,0.15); color:#00ff87; border:1px solid rgba(0,255,135,0.3); padding:12px 16px; border-radius:12px; text-decoration:none; font-weight:800; font-size:13.5px; display:flex; align-items:center; gap:10px;">
        <i class="fas fa-chart-line"></i> Dashboard & Orders
      </a>
      <a href="{{ route('home') }}" style="color:#94a3b8; padding:12px 16px; border-radius:12px; text-decoration:none; font-size:13.5px; display:flex; align-items:center; gap:10px;">
        <i class="fas fa-store"></i> মূল ওয়েবসাইট
      </a>
      <a href="{{ route('logout') }}" style="color:#ef4444; padding:12px 16px; border-radius:12px; text-decoration:none; font-size:13.5px; display:flex; align-items:center; gap:10px; margin-top:20px;">
        <i class="fas fa-sign-out-alt"></i> Logout
      </a>
    </div>
  </aside>

  <!-- MAIN ADMIN CONTENT -->
  <main class="admin-main">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
      <div>
        <h1 style="font-size:26px; font-weight:900; margin:0 0 4px 0;">Admin Command Center</h1>
        <p style="color:#94a3b8; font-size:13px; margin:0;">লাইভ অর্ডার ম্যানেজমেন্ট ও গ্রাহক টুল প্রভিশনিং</p>
      </div>
      <div style="background:rgba(0,255,135,0.1); border:1px solid #00ff87; padding:6px 16px; border-radius:30px; color:#00ff87; font-size:12.5px; font-weight:800; display:flex; align-items:center; gap:8px;">
        <span style="width:8px; height:8px; border-radius:50%; background:#00ff87; box-shadow:0 0 10px #00ff87;"></span>
        সিস্টেম লাইভ
      </div>
    </div>

    <!-- STATS CARDS -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px; margin-bottom:32px;">
      <div class="stat-card">
        <span style="font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase;">সর্বমোট রাজস্ব</span>
        <div style="font-size:26px; font-weight:900; color:#00ff87; margin-top:6px;">৳{{ number_format($totalRevenue) }} BDT</div>
      </div>
      <div class="stat-card">
        <span style="font-size:11px; font-weight:800; color:#fbbf24; text-transform:uppercase;">অপেক্ষারত অর্ডার</span>
        <div style="font-size:26px; font-weight:900; color:#fbbf24; margin-top:6px;">{{ $pendingCount }} টি</div>
      </div>
      <div class="stat-card">
        <span style="font-size:11px; font-weight:800; color:#38bdf8; text-transform:uppercase;">সম্পন্ন ডেলিভারি</span>
        <div style="font-size:26px; font-weight:900; color:#38bdf8; margin-top:6px;">{{ $completedCount }} টি</div>
      </div>
      <div class="stat-card">
        <span style="font-size:11px; font-weight:800; color:#cbd5e1; text-transform:uppercase;">মোট রেজিস্টার্ড ইউজার</span>
        <div style="font-size:26px; font-weight:900; color:#cbd5e1; margin-top:6px;">{{ $users->count() }} জন</div>
      </div>
    </div>

    <!-- ORDERS TABLE -->
    <div style="background:rgba(8,22,19,0.5); border-radius:18px; padding:24px; border:1px solid rgba(0,255,135,0.2);">
      <h2 style="font-size:18px; font-weight:800; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
        <i class="fas fa-list-alt" style="color:#00ff87;"></i> সকল অর্ডার তালিকা (Live Orders)
      </h2>

      <div style="overflow-x:auto;">
        <table class="order-table">
          <thead>
            <tr>
              <th>অর্ডার আইডি</th>
              <th>গ্রাহক ও মোবাইল</th>
              <th>প্রোডাক্টের নাম</th>
              <th>টাকার পরিমাণ</th>
              <th>পেমেন্ট মেথড & TrxID</th>
              <th>বর্তমান স্ট্যাটাস</th>
              <th>অ্যাকশন (কনফার্ম করুন)</th>
            </tr>
          </thead>
          <tbody>
            @forelse($orders as $o)
            <tr>
              <td><strong style="color:#00ff87;">{{ $o->order_id }}</strong><br><small style="color:#64748b;">{{ $o->created_at->format('d M, h:i A') }}</small></td>
              <td><strong>{{ $o->customer_name }}</strong><br><small style="color:#94a3b8;">{{ $o->customer_phone }}</small></td>
              <td>{{ $o->product_title }}</td>
              <td><strong style="color:#00ff87;">৳{{ $o->amount }}</strong></td>
              <td>
                <span style="font-size:11px; font-weight:800; background:rgba(255,255,255,0.08); padding:2px 8px; border-radius:6px;">{{ $o->payment_method }}</span><br>
                <code style="color:#38bdf8; font-size:12px;">{{ $o->trx_id ?: 'N/A' }}</code>
              </td>
              <td>
                @if($o->status === 'Pending')
                  <span style="background:rgba(245,158,11,0.2); color:#fbbf24; border:1px solid rgba(245,158,11,0.4); padding:3px 10px; border-radius:14px; font-size:11px; font-weight:800;">Pending</span>
                @elseif(in_array($o->status, ['Completed', 'Confirmed']))
                  <span style="background:rgba(16,185,129,0.2); color:#34d399; border:1px solid rgba(16,185,129,0.5); padding:3px 10px; border-radius:14px; font-size:11px; font-weight:800;">Completed</span>
                @else
                  <span style="background:rgba(239,68,68,0.2); color:#f87171; border:1px solid rgba(239,68,68,0.4); padding:3px 10px; border-radius:14px; font-size:11px; font-weight:800;">Cancelled</span>
                @endif
              </td>
              <td>
                <form action="{{ route('admin.orders.updateStatus', $o->id) }}" method="POST" style="display:flex; gap:6px;">
                  @csrf
                  <select name="status" style="background:#0a101d; border:1px solid rgba(0,255,135,0.3); color:#fff; padding:6px 10px; border-radius:8px; font-size:12px; outline:none;">
                    <option value="Pending" {{ $o->status === 'Pending' ? 'selected' : '' }}>Pending</option>
                    <option value="Completed" {{ in_array($o->status, ['Completed', 'Confirmed']) ? 'selected' : '' }}>Completed (অনুমোদন)</option>
                    <option value="Cancelled" {{ $o->status === 'Cancelled' ? 'selected' : '' }}>Cancelled (বাতিল)</option>
                  </select>
                  <button type="submit" style="background:linear-gradient(135deg, #00ff87 0%, #00dfa2 100%); color:#02160e; border:none; padding:6px 12px; border-radius:8px; font-weight:800; font-size:11.5px; cursor:pointer;">
                    আপডেট
                  </button>
                </form>
              </td>
            </tr>
            @empty
            <tr>
              <td colspan="7" style="text-align:center; color:#94a3b8; padding:30px;">কোনো অর্ডার পাওয়া যায়নি।</td>
            </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <!-- Real-time Admin Live Order Alert Toast -->
  <div class="live-order-alert-toast" id="liveOrderAlertToast">
    <div style="width:42px; height:42px; border-radius:12px; background:rgba(0,255,135,0.2); border:1px solid #00ff87; display:flex; align-items:center; justify-content:center; color:#00ff87; font-size:18px; flex-shrink:0;">
      <i class="fas fa-bell fa-shake"></i>
    </div>
    <div style="flex:1;">
      <div style="font-size:11px; font-weight:800; color:#00ff87; text-transform:uppercase;">NEW ORDER RECEIVED</div>
      <div style="font-size:13.5px; font-weight:700; color:#ffffff;" id="toastOrderTitle">নতুন অর্ডার এসেছে!</div>
      <div style="font-size:12px; color:#94a3b8;" id="toastOrderMeta">গ্রাহকের পেমেন্ট চেক করুন।</div>
    </div>
  </div>

  <script>
    function playAdminChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.setValueAtTime(1320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.65);
      } catch(e) {}
    }

    let lastOrderEvent = Date.now();
    setInterval(async () => {
      try {
        const res = await fetch('/api/orders/latest-event');
        const data = await res.json();
        if (data && data.timestamp && data.timestamp > lastOrderEvent) {
          lastOrderEvent = data.timestamp;
          playAdminChime();
          const toast = document.getElementById('liveOrderAlertToast');
          document.getElementById('toastOrderTitle').textContent = `${data.customer_name}: ${data.product_title}`;
          document.getElementById('toastOrderMeta').textContent = `টাকা: ৳${data.amount} BDT • TrxID: ${data.trx_id || 'N/A'}`;
          toast.classList.add('active');
          setTimeout(() => { toast.classList.remove('active'); location.reload(); }, 4000);
        }
      } catch(e) {}
    }, 2500);
  </script>
</body>
</html>
