<?php
// AI Future Agency - Localhost Laravel Routing Engine
$rawUri = $_SERVER['REQUEST_URI'];
$uri = urldecode(parse_url($rawUri, PHP_URL_PATH));
$cleanUri = rtrim($uri, '/');

// 0. API Endpoint: Send OTP & Email Dispatch
if ($cleanUri === '/api/send-otp') {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?: [];
    $email = trim($data['email'] ?? '');
    $code = trim($data['code'] ?? '');
    $purpose = trim($data['purpose'] ?? 'Verification');

    $mailResult = ['success' => false];
    if ($email && $code) {
        $logEntry = date('Y-m-d H:i:s') . " | To: {$email} | Code: {$code} | Purpose: {$purpose}\n";
        @file_put_contents(__DIR__ . '/otp_logs.txt', $logEntry, FILE_APPEND);

        // Send via SMTP
        if (file_exists(__DIR__ . '/smtp_mailer.php')) {
            require_once __DIR__ . '/smtp_mailer.php';
            $mailResult = sendAgencyOtpEmail($email, $code, $purpose);
        }
    }

    echo json_encode([
        'status' => 'success',
        'email' => $email,
        'purpose' => $purpose,
        'email_dispatched' => $mailResult['success'] ?? false,
        'details' => $mailResult['message'] ?? ($mailResult['error'] ?? 'Logged'),
        'timestamp' => time()
    ]);
    exit;
}

// 1. Secret Admin Access Gateway: airana1713@admin
if ($cleanUri === '/airana1713@admin' || $cleanUri === '/airana1713%40admin' || $cleanUri === 'airana1713@admin') {
    readfile(__DIR__ . '/admin-login.html');
    exit;
}

// Check admin authentication: via Cookie or via authorized query token
$hasAuthToken = (isset($_GET['auth']) && $_GET['auth'] === 'AUTH_VALIDATED_2026');
$hasCookie = (isset($_COOKIE['afa_admin_session']) && $_COOKIE['afa_admin_session'] === 'AUTH_VALIDATED_2026');
$isAdminAuth = $hasAuthToken || $hasCookie;

if ($hasAuthToken && !$hasCookie) {
    // Set cookie from server side so subsequent requests keep the user logged in
    setcookie('afa_admin_session', 'AUTH_VALIDATED_2026', time() + 86400, '/');
}

// 2. Protect Admin Console: Only accessible if authenticated with secret session token
if ($cleanUri === '/admin' || $cleanUri === '/admin/dashboard' || $cleanUri === '/admin.html') {
    if ($isAdminAuth) {
        readfile(__DIR__ . '/admin.html');
        exit;
    } else {
        // Unauthorized direct access: redirect strictly to the secret portal
        header('Location: /airana1713@admin');
        exit;
    }
}

// 3. Block legacy /admin/login or /admin-login, redirect to secret URL
if ($cleanUri === '/admin/login' || $cleanUri === '/admin-login' || $cleanUri === '/admin-login.html') {
    header('Location: /airana1713@admin');
    exit;
}

// 4. Protect real files from direct bypass (e.g., /admin.html)
if ($uri !== '/' && is_file(__DIR__ . $uri)) {
    if ($uri === '/admin.html') {
        if ($isAdminAuth) {
            readfile(__DIR__ . '/admin.html');
            exit;
        } else {
            header('Location: /airana1713@admin');
            exit;
        }
    }
    if ($uri === '/admin-login.html') {
        header('Location: /airana1713@admin');
        exit;
    }
    return false;
}

// 5. Clean Laravel-style route mapping
switch ($cleanUri) {
    case '':
    case '/index':
    case '/home':
        include __DIR__ . '/index.html';
        exit;
    case '/login':
        include __DIR__ . '/login.html';
        exit;
    case '/register':
        include __DIR__ . '/register.html';
        exit;
    case '/dashboard':
        include __DIR__ . '/dashboard.html';
        exit;
    case '/details':
        include __DIR__ . '/details.html';
        exit;
    case '/landing':
    case '/lp':
        include __DIR__ . '/landing.html';
        exit;
    default:
        // Match /lp/{slug} clean routes
        if (strpos($uri, '/lp/') === 0) {
            include __DIR__ . '/landing.html';
            exit;
        }
        // Try appending .html
        if (file_exists(__DIR__ . $uri . '.html')) {
            include __DIR__ . $uri . '.html';
            exit;
        }
        include __DIR__ . '/index.html';
        exit;
}
