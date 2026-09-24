<?php
// AI Future Agency - Localhost Laravel Routing Engine
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve real files if they exist (images, css, js, etc.)
if ($uri !== '/' && is_file(__DIR__ . $uri)) {
    return false;
}

$cleanUri = rtrim($uri, '/');

// Clean Laravel-style route mapping
switch ($cleanUri) {
    case '':
    case '/index':
    case '/home':
        include __DIR__ . '/index.html';
        exit;
    case '/admin':
    case '/admin/dashboard':
        header('Location: /admin.html');
        exit;
    case '/admin/login':
    case '/admin-login':
        include __DIR__ . '/admin-login.html';
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
