<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register - AI Future Agency</title>
  <meta name="description" content="AI Future Agency Create Premium Account">

  <!-- FontAwesome 6 & Google Fonts -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('styles.css') }}">

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', 'Hind Siliguri', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 15% 20%, rgba(0, 255, 135, 0.12) 0%, transparent 50%),
                  radial-gradient(circle at 85% 80%, rgba(96, 239, 255, 0.12) 0%, transparent 50%),
                  #020705;
      color: #fff;
      padding: 30px 16px;
      position: relative;
      overflow-x: hidden;
    }
    .auth-container {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 1100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 50px;
    }
    .auth-sidebar {
      flex: 1;
      max-width: 480px;
    }
    .auth-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #00ff87;
      background: rgba(0, 255, 135, 0.08);
      border: 1px solid rgba(0, 255, 135, 0.3);
      border-radius: 9999px;
      padding: 7px 18px;
      margin-bottom: 22px;
    }
    .auth-badge .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff87;
      box-shadow: 0 0 10px #00ff87;
    }
    .auth-sidebar h1 {
      font-size: 46px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -1.5px;
      margin-bottom: 18px;
    }
    .auth-sidebar h1 span {
      background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .auth-sidebar p {
      font-size: 16px;
      color: #94a3b8;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .feature-item {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(6, 18, 15, 0.6);
      border: 1px solid rgba(0, 255, 135, 0.2);
      border-radius: 12px;
      padding: 12px 18px;
      font-size: 14px;
      color: #cbd5e1;
    }
    .feature-item i {
      color: #00ff87;
      font-size: 16px;
    }

    /* Auth Box */
    .auth-card-wrap {
      flex: 1.1;
      max-width: 520px;
      width: 100%;
      position: relative;
    }
    .auth-card {
      position: relative;
      background: rgba(8, 20, 16, 0.88);
      border-radius: 24px;
      padding: 36px 32px;
      border: 1px solid rgba(0, 255, 135, 0.35);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 255, 135, 0.15);
      backdrop-filter: blur(20px);
    }
    .auth-card::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 26px;
      padding: 2px;
      background: linear-gradient(135deg, rgba(0,255,135,0.6), transparent 50%, rgba(96,239,255,0.5));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    .brand-top {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      text-decoration: none;
      color: #fff;
    }
    .brand-top img {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      border: 1px solid rgba(0, 255, 135, 0.4);
    }
    .brand-top .title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .brand-top .title span {
      color: #00ff87;
    }
    .card-title {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .card-subtitle {
      font-size: 13.5px;
      color: #94a3b8;
      margin-bottom: 20px;
    }
    .form-group {
      margin-bottom: 14px;
      text-align: left;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .form-label {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 6px;
    }
    .input-box {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-box i.input-icon {
      position: absolute;
      left: 14px;
      color: #00ff87;
      font-size: 14px;
    }
    .input-box input {
      width: 100%;
      background: rgba(3, 10, 8, 0.85);
      border: 1px solid rgba(0, 255, 135, 0.25);
      border-radius: 10px;
      padding: 11px 14px 11px 40px;
      color: #fff;
      font-size: 13.5px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-box input:focus {
      border-color: #00ff87;
      box-shadow: 0 0 14px rgba(0, 255, 135, 0.3);
    }
    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #00ff87 0%, #00dfa2 100%);
      color: #020705;
      border: none;
      border-radius: 12px;
      padding: 13px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(0, 255, 135, 0.35);
      transition: transform 0.2s, box-shadow 0.2s;
      margin-top: 14px;
    }
    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(0, 255, 135, 0.5);
    }
    .auth-footer {
      margin-top: 20px;
      text-align: center;
      font-size: 13.5px;
      color: #94a3b8;
    }
    .auth-footer a {
      color: #00ff87;
      text-decoration: none;
      font-weight: 700;
    }
    .auth-footer a:hover {
      text-decoration: underline;
    }
    .alert-error {
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 18px;
      font-size: 13px;
    }

    @media (max-width: 900px) {
      .auth-container {
        flex-direction: column;
        gap: 30px;
      }
      .auth-sidebar {
        text-align: center;
      }
      .feature-list {
        display: none;
      }
      .grid-2 {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <div class="auth-container">
    <!-- Left Intro -->
    <div class="auth-sidebar">
      <div class="auth-badge">
        <span class="dot"></span>
        <span>Register Member</span>
      </div>
      <h1>Join the <span>Next Gen</span> AI Ecosystem</h1>
      <p>Create your personal member profile to activate premium writing tools, get real-time order tracking, and claim instant delivery.</p>

      <div class="feature-list">
        <div class="feature-item">
          <i class="fas fa-check-circle"></i>
          <span>Official licensed access credentials</span>
        </div>
        <div class="feature-item">
          <i class="fas fa-history"></i>
          <span>Automated order history & active tool dashboard</span>
        </div>
        <div class="feature-item">
          <i class="fas fa-headset"></i>
          <span>Priority 24/7 technical WhatsApp assistance</span>
        </div>
      </div>
    </div>

    <!-- Right Register Box -->
    <div class="auth-card-wrap">
      <div class="auth-card">
        <a href="{{ route('home') }}" class="brand-top">
          <img src="{{ asset('logo.jpg') }}" alt="Logo">
          <div class="title">AI FUTURE <span>AGENCY</span></div>
        </a>

        <h2 class="card-title">Create Account</h2>
        <p class="card-subtitle">Fill in the fields to create your member profile</p>

        @if ($errors->any())
          <div class="alert-error">
            <div style="font-weight: 700; margin-bottom: 4px;"><i class="fas fa-exclamation-triangle"></i> অনুগ্রহ করে নিচের সমস্যাগুলো সমাধান করুন:</div>
            <ul style="padding-left: 20px;">
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif

        <form action="{{ route('register') }}" method="POST">
          @csrf

          <div class="form-group">
            <label class="form-label" for="nameInput">Full Name</label>
            <div class="input-box">
              <i class="fas fa-id-card input-icon"></i>
              <input type="text" id="nameInput" name="name" value="{{ old('name') }}" required placeholder="e.g. Tanvir Ahmed">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label" for="usernameInput">Username</label>
              <div class="input-box">
                <i class="fas fa-user input-icon"></i>
                <input type="text" id="usernameInput" name="username" value="{{ old('username') }}" placeholder="e.g. tanvir99">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="phoneInput">Phone / WhatsApp</label>
              <div class="input-box">
                <i class="fas fa-phone input-icon"></i>
                <input type="tel" id="phoneInput" name="phone" value="{{ old('phone') }}" placeholder="017XXXXXXXX">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="emailInput">Email Address</label>
            <div class="input-box">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" id="emailInput" name="email" value="{{ old('email') }}" required placeholder="you@example.com">
            </div>
          </div>

          <div class="grid-2">
            <div class="form-group">
              <label class="form-label" for="passInput">Password</label>
              <div class="input-box">
                <i class="fas fa-lock input-icon"></i>
                <input type="password" id="passInput" name="password" required placeholder="Minimum 6 chars">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="passConfInput">Confirm Password</label>
              <div class="input-box">
                <i class="fas fa-shield-alt input-icon"></i>
                <input type="password" id="passConfInput" name="password_confirmation" required placeholder="Repeat password">
              </div>
            </div>
          </div>

          <button type="submit" class="btn-submit">
            <i class="fas fa-user-plus"></i> CREATE ACCOUNT (SIGN UP)
          </button>
        </form>

        <div class="auth-footer">
          Already have an account? <a href="{{ route('login') }}">Log In</a>
          <div style="margin-top: 10px;">
            <a href="{{ route('home') }}" style="color: #94a3b8; font-weight: normal; font-size: 13px;">
              <i class="fas fa-arrow-left"></i> Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
