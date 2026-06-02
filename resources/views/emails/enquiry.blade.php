<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $messageSubject }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f8; color: #1a1a1a; }
        .wrapper { max-width: 620px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: #071510; padding: 32px 40px; }
        .header-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .logo-image { width: 52px; height: 52px; border-radius: 6px; background: #ffffff; object-fit: contain; padding: 3px; flex-shrink: 0; }
        .logo-text h1 { color: #ffffff; font-size: 18px; font-weight: 700; line-height: 1; }
        .logo-text p  { color: #d4a853; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 3px; }
        .badge { display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
        .badge-contact  { background: #1e4d8c22; color: #5ba4f5; border: 1px solid #5ba4f544; }
        .badge-activity { background: #d4a85322; color: #d4a853; border: 1px solid #d4a85344; }
        .badge-package  { background: #2d6a4f22; color: #52b788; border: 1px solid #52b78844; }
        .header-title { color: #ffffff; font-size: 22px; font-weight: 700; margin-top: 10px; line-height: 1.3; }
        .body { padding: 36px 40px; }
        .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #999; margin-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
        .info-block { background: #f8f9fb; border-radius: 8px; padding: 14px 16px; }
        .info-block .label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; margin-bottom: 4px; }
        .info-block .value { font-size: 14px; font-weight: 600; color: #1a1a1a; word-break: break-word; }
        .info-block .value a { color: #d4a853; text-decoration: none; }
        /* Preview snippet */
        .preview-block { background: #f8f9fb; border-left: 3px solid #d4a853; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 10px; }
        .preview-block p { font-size: 14px; line-height: 1.7; color: #444; }
        .preview-note { font-size: 12px; color: #aaa; margin-bottom: 28px; padding-left: 2px; }
        .preview-note a { color: #d4a853; text-decoration: none; }
        /* CTA */
        .cta-block { text-align: center; margin-bottom: 28px; }
        .cta-btn { display: inline-block; background: #d4a853; color: #071510; font-weight: 700; font-size: 14px; padding: 14px 36px; border-radius: 8px; text-decoration: none; }
        .cta-btn:hover { background: #c49640; }
        .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
        .footer { background: #f8f9fb; padding: 24px 40px; text-align: center; }
        .footer p { font-size: 12px; color: #aaa; line-height: 1.6; }
        .footer strong { color: #888; }
        @media (max-width: 480px) {
            .body { padding: 24px 20px; }
            .header { padding: 24px 20px; }
            .info-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
<div class="wrapper">

    <!-- ── Header ──────────────────────────────────────────────────────── -->
    <div class="header">
        <div class="header-logo">
            <img class="logo-image" src="{{ config('app.url') }}/brand/jipe-farm-campsite-logo.jpeg" alt="Jipe Farm Campsite logo">
            <div class="logo-text">
                <h1>Jipe Farm Campsite</h1>
                <p>Lake Jipe · Tanzania</p>
            </div>
        </div>
        <span class="badge badge-{{ $type }}">
            @if($type === 'contact') New Contact Message
            @elseif($type === 'activity') Activity Booking Request
            @else Package Booking Request
            @endif
        </span>
        <div class="header-title">{{ $messageSubject }}</div>
    </div>

    <!-- ── Body ────────────────────────────────────────────────────────── -->
    <div class="body">

        <!-- Sender details -->
        <div class="section-label">From</div>
        <div class="info-grid">
            <div class="info-block">
                <div class="label">Full Name</div>
                <div class="value">{{ $senderName }}</div>
            </div>
            <div class="info-block">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:{{ $senderEmail }}">{{ $senderEmail }}</a></div>
            </div>
            @if($senderPhone)
            <div class="info-block">
                <div class="label">Phone</div>
                <div class="value">{{ $senderPhone }}</div>
            </div>
            @endif
            <div class="info-block">
                <div class="label">Received At</div>
                <div class="value">{{ now()->format('D, d M Y · H:i') }} EAT</div>
            </div>
        </div>

        <!-- Short message preview -->
        <div class="section-label">Message Preview</div>
        <div class="preview-block">
            <p>{{ $shortBody }}</p>
        </div>
        <p class="preview-note">
            The full message and all details are saved in your
            <a href="{{ config('app.url') }}/admin/messages">Admin Dashboard</a>.
        </p>

        <!-- CTA -->
        <div class="cta-block">
            <a href="{{ config('app.url') }}/admin/messages" class="cta-btn">
                View Full Message in Dashboard &rarr;
            </a>
        </div>

        <hr class="divider">
        <p style="font-size:13px; color:#888; text-align:center;">
            Reply directly to <strong><a href="mailto:{{ $senderEmail }}" style="color:#d4a853;">{{ $senderEmail }}</a></strong>
        </p>
    </div>

    <!-- ── Footer ───────────────────────────────────────────────────────── -->
    <div class="footer">
        <p>
            <strong>Jipe Farm Campsite</strong><br>
            Kilimanjaro Region, Tanzania<br>
            info@jipefarmcampsite.com<br>
            This is an automated notification from your website. Do not reply to this message.
        </p>
    </div>

</div>
</body>
</html>
