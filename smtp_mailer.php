<?php
/**
 * AI Future Agency - Direct SMTP Mail Dispatcher
 * Sends HTML transactional emails directly via Gmail SSL SMTP (port 465)
 */

function sendAgencyOtpEmail($toEmail, $code, $purpose = 'Verification') {
    $configFile = __DIR__ . '/mail_config.json';
    if (!file_exists($configFile)) {
        return ['success' => false, 'error' => 'mail_config.json not found'];
    }

    $config = json_decode(file_get_contents($configFile), true);
    if (empty($config['smtp_user']) || empty($config['smtp_pass']) || $config['smtp_user'] === 'YOUR_GMAIL_ADDRESS@gmail.com') {
        return ['success' => false, 'error' => 'SMTP credentials not configured in mail_config.json'];
    }

    $host = $config['smtp_host'] ?? 'smtp.gmail.com';
    $port = intval($config['smtp_port'] ?? 465);
    $user = trim($config['smtp_user']);
    $pass = trim(str_replace(' ', '', $config['smtp_pass']));
    $fromName = $config['from_name'] ?? 'AI Future Agency';

    $subject = "Your {$purpose} Code: {$code} - AI Future Agency";

    // Premium HTML Email Template
    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin:0; padding:0; background:#070d0b; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#ffffff; }
  .email-wrap { max-width:540px; margin:30px auto; background:linear-gradient(160deg,#0a1916 0%,#040d0a 100%); border:1px solid #00ff87; border-radius:18px; padding:36px 30px; box-shadow:0 15px 40px rgba(0,0,0,0.8); }
  .brand-logo { font-size:20px; font-weight:800; color:#ffffff; margin-bottom:20px; text-align:center; }
  .brand-logo span { color:#00ff87; }
  .title { font-size:22px; font-weight:800; color:#ffffff; margin-bottom:10px; text-align:center; }
  .subtitle { font-size:14px; color:#94a3b8; line-height:1.6; margin-bottom:26px; text-align:center; }
  .otp-box { background:rgba(0,255,135,0.08); border:2px dashed #00ff87; border-radius:12px; padding:18px; text-align:center; margin:24px 0; }
  .otp-code { font-size:36px; font-weight:900; letter-spacing:8px; color:#00ff87; font-family:monospace; }
  .expiry-note { font-size:12px; color:#64748b; margin-top:8px; }
  .footer { margin-top:30px; border-top:1px solid rgba(255,255,255,0.08); padding-top:18px; font-size:11.5px; color:#64748b; text-align:center; }
</style>
</head>
<body>
  <div class="email-wrap">
    <div class="brand-logo">AI FUTURE <span>AGENCY</span></div>
    <div class="title">{$purpose} Verification</div>
    <div class="subtitle">
      Hello,<br>
      You requested a 6-digit verification code for your account on <strong>AI Future Agency</strong>. Use the code below to complete the action:
    </div>

    <div class="otp-box">
      <div class="otp-code">{$code}</div>
      <div class="expiry-note">This code is valid for 10 minutes. Do not share it with anyone.</div>
    </div>

    <div class="footer">
      If you did not make this request, you can safely ignore this email.<br>
      © 2026 AI Future Agency • All rights reserved.
    </div>
  </div>
</body>
</html>
HTML;

    // Connect to Gmail SSL SMTP
    $errno = 0;
    $errstr = '';
    $socket = @fsockopen("ssl://{$host}", $port, $errno, $errstr, 8);
    if (!$socket) {
        return ['success' => false, 'error' => "Could not connect to SMTP server: {$errstr} ({$errno})"];
    }

    $readResponse = function() use ($socket) {
        $data = '';
        while ($str = fgets($socket, 515)) {
            $data .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        return $data;
    };

    $sendCommand = function($cmd) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        return $readResponse();
    };

    $banner = $readResponse();
    if (substr($banner, 0, 3) !== '220') {
        fclose($socket);
        return ['success' => false, 'error' => 'Invalid SMTP banner: ' . trim($banner)];
    }

    $sendCommand("EHLO aifutureagency.store.cv");
    $authResp = $sendCommand("AUTH LOGIN");
    if (substr($authResp, 0, 3) !== '334') {
        fclose($socket);
        return ['success' => false, 'error' => 'AUTH LOGIN rejected: ' . trim($authResp)];
    }

    $userResp = $sendCommand(base64_encode($user));
    $passResp = $sendCommand(base64_encode($pass));
    if (substr($passResp, 0, 3) !== '235') {
        fclose($socket);
        return ['success' => false, 'error' => 'SMTP Authentication failed. Check your Gmail App Password.'];
    }

    $sendCommand("MAIL FROM: <{$user}>");
    $rcptResp = $sendCommand("RCPT TO: <{$toEmail}>");
    if (substr($rcptResp, 0, 3) !== '250') {
        fclose($socket);
        return ['success' => false, 'error' => 'Recipient rejected: ' . trim($rcptResp)];
    }

    $sendCommand("DATA");

    $headers = [
        "MIME-Version: 1.0",
        "Content-type: text/html; charset=UTF-8",
        "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$user}>",
        "Reply-To: <{$user}>",
        "To: <{$toEmail}>",
        "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
        "Date: " . date('r'),
        "X-Mailer: AI-Future-Agency-Mailer/2026"
    ];

    $emailBody = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.";
    $sendResp = $sendCommand($emailBody);

    $sendCommand("QUIT");
    fclose($socket);

    if (substr($sendResp, 0, 3) === '250') {
        return ['success' => true, 'message' => 'Email delivered successfully'];
    } else {
        return ['success' => false, 'error' => 'Email delivery error: ' . trim($sendResp)];
    }
}
