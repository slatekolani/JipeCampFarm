<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We received your {{ $type === 'contact' ? 'message' : 'booking request' }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f8; color: #1a1a1a; }
        .wrapper { max-width: 620px; margin: 32px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

        /* Header */
        .header { background: #071510; padding: 40px 40px 32px; text-align: center; }
        .logo-circle { width: 52px; height: 52px; background: #d4a853; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .logo-name { color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.02em; }
        .logo-tagline { color: #d4a853; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 3px; }

        /* Confirmation banner */
        .confirm-banner { background: linear-gradient(135deg, #0d2218 0%, #163325 100%); border-top: 3px solid #d4a853; padding: 32px 40px; text-align: center; }
        .confirm-icon { width: 56px; height: 56px; background: #d4a85320; border: 2px solid #d4a85350; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .confirm-title { color: #ffffff; font-size: 24px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
        .confirm-sub { color: #ffffff99; font-size: 14px; line-height: 1.6; }

        /* Body */
        .body { padding: 36px 40px; }
        .greeting { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 12px; }
        .intro { font-size: 14px; color: #555; line-height: 1.7; margin-bottom: 28px; }

        /* Summary box */
        .summary-box { background: #f8f9fb; border-radius: 10px; border: 1px solid #eee; overflow: hidden; margin-bottom: 28px; }
        .summary-header { background: #071510; padding: 10px 18px; }
        .summary-header span { color: #d4a853; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
        .summary-body { padding: 18px; }
        .summary-row { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .summary-row:last-child { border-bottom: none; }
        .summary-label { color: #aaa; font-weight: 600; min-width: 80px; flex-shrink: 0; }
        .summary-value { color: #333; }
        .preview-text { background: #f0f4f0; border-left: 3px solid #d4a853; border-radius: 0 6px 6px 0; padding: 12px 16px; margin-top: 6px; font-size: 13px; color: #555; line-height: 1.6; font-style: italic; }

        /* What happens next */
        .next-box { background: #fffbf2; border: 1px solid #d4a85330; border-radius: 10px; padding: 20px 22px; margin-bottom: 28px; }
        .next-title { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #d4a853; margin-bottom: 14px; }
        .next-step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
        .next-step:last-child { margin-bottom: 0; }
        .step-num { width: 22px; height: 22px; background: #d4a853; border-radius: 50%; color: #071510; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .step-text { font-size: 13px; color: #555; line-height: 1.5; }

        /* CTA */
        .cta-block { text-align: center; margin-bottom: 28px; }
        .cta-btn { display: inline-block; background: #d4a853; color: #071510; font-weight: 700; font-size: 14px; padding: 14px 36px; border-radius: 8px; text-decoration: none; }

        /* Contact strip */
        .contact-strip { background: #f8f9fb; border-radius: 10px; padding: 18px 22px; margin-bottom: 8px; }
        .contact-strip p { font-size: 13px; color: #666; line-height: 1.7; }
        .contact-strip a { color: #d4a853; text-decoration: none; }

        .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
        .footer { background: #f8f9fb; padding: 24px 40px; text-align: center; }
        .footer p { font-size: 12px; color: #aaa; line-height: 1.8; }
        .footer strong { color: #888; }

        @media (max-width: 480px) {
            .body, .confirm-banner, .header { padding-left: 20px; padding-right: 20px; }
            .summary-row { flex-direction: column; gap: 2px; }
        }
    </style>
</head>
<body>
<div class="wrapper">

    <!-- ── Header ───────────────────────────────────────────────────────── -->
    <div class="header">
        <div class="logo-circle">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                <path d="M20 9 L6 29 L34 29 Z" fill="#071510"/>
                <path d="M15 29 L15 23 Q20 17 25 23 L25 29 Z" fill="#d4a853"/>
                <line x1="5" y1="31" x2="35" y2="31" stroke="#071510" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
                <circle cx="30" cy="13" r="1.3" fill="#071510" opacity="0.65"/>
            </svg>
        </div>
        <div class="logo-name">Jipe Farm Campsite</div>
        <div class="logo-tagline">Lake Jipe · Kilimanjaro · Tanzania</div>
    </div>

    <!-- ── Confirmation banner ──────────────────────────────────────────── -->
    <div class="confirm-banner">
        <div class="confirm-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
        </div>
        @if($type === 'activity')
            <div class="confirm-title">Activity Booking Received!</div>
            <div class="confirm-sub">Your booking request has been received and saved.<br>Our team will confirm availability and get back to you shortly.</div>
        @elseif($type === 'package')
            <div class="confirm-title">Package Enquiry Received!</div>
            <div class="confirm-sub">Your enquiry has been received and saved.<br>Our team will reach out with full details and availability.</div>
        @else
            <div class="confirm-title">Message Received!</div>
            <div class="confirm-sub">Your message has been received and saved.<br>We read every message personally and will respond within 24 hours.</div>
        @endif
    </div>

    <!-- ── Body ─────────────────────────────────────────────────────────── -->
    <div class="body">
        <p class="greeting">Hi {{ $guestName }},</p>
        <p class="intro">
            @if($type === 'activity')
                Thank you for your interest in <strong>{{ $enquiryTitle }}</strong> at Jipe Farm Campsite.
                We have received your booking request and our team will review it and get back to you within <strong>24 hours</strong> to confirm availability and share all the details you need.
            @elseif($type === 'package')
                Thank you for your enquiry about the <strong>{{ $enquiryTitle }}</strong> package.
                We have received your request and will be in touch within <strong>24 hours</strong> with availability, pricing, and everything you need to plan your Lake Jipe adventure.
            @else
                Thank you for reaching out to Jipe Farm Campsite.
                We have received your message and will respond within <strong>24 hours</strong>. We look forward to helping you plan an unforgettable experience at Lake Jipe.
            @endif
        </p>

        <!-- Summary of submission -->
        <div class="summary-box">
            <div class="summary-header">
                <span>Your Submission Summary</span>
            </div>
            <div class="summary-body">
                <div class="summary-row">
                    <span class="summary-label">Name</span>
                    <span class="summary-value">{{ $guestName }}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Email</span>
                    <span class="summary-value">{{ $guestEmail }}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">
                        @if($type === 'activity') Activity
                        @elseif($type === 'package') Package
                        @else Subject
                        @endif
                    </span>
                    <span class="summary-value">{{ $enquiryTitle }}</span>
                </div>
                <div class="summary-row">
                    <span class="summary-label">Sent At</span>
                    <span class="summary-value">{{ now()->format('D, d M Y · H:i') }} EAT</span>
                </div>
                <div class="summary-row" style="flex-direction: column; gap: 6px;">
                    <span class="summary-label">Your Message</span>
                    <div class="preview-text">{{ $shortBody }}</div>
                </div>
            </div>
        </div>

        <!-- What happens next -->
        <div class="next-box">
            <div class="next-title">What Happens Next</div>
            <div class="next-step">
                <span class="step-num">1</span>
                <span class="step-text">Our team reviews your
                    @if($type === 'contact') message @else request @endif
                    and checks availability — usually within a few hours.</span>
            </div>
            <div class="next-step">
                <span class="step-num">2</span>
                <span class="step-text">We reply directly to <strong>{{ $guestEmail }}</strong> with all the details, pricing, and next steps — within <strong>24 hours</strong>.</span>
            </div>
            <div class="next-step">
                <span class="step-num">3</span>
                <span class="step-text">You confirm and we take care of everything. No payment is required at this stage.</span>
            </div>
        </div>

        <!-- CTA -->
        <div class="cta-block">
            <a href="https://www.lakejipecamp.co.tz/packages" class="cta-btn">
                Explore Our Packages &rarr;
            </a>
        </div>

        <!-- Contact us -->
        <div class="contact-strip">
            <p>
                Need to reach us directly? Email us at
                <a href="mailto:info@jipefarmcampsite.com">info@jipefarmcampsite.com</a>.<br>
                We are based in the <strong>Kilimanjaro Region, Tanzania</strong> and operate daily.
            </p>
        </div>

        <hr class="divider">
        <p style="font-size:13px; color:#888; text-align:center;">
            You are receiving this because you submitted a form at
            <a href="https://www.lakejipecamp.co.tz" style="color:#d4a853;">lakejipecamp.co.tz</a>.
        </p>
    </div>

    <!-- ── Footer ───────────────────────────────────────────────────────── -->
    <div class="footer">
        <p>
            <strong>Jipe Farm Campsite</strong><br>
            Lake Jipe Shore · Kilimanjaro Region · Tanzania<br>
            info@jipefarmcampsite.com<br><br>
            <span style="color:#ccc;">© {{ date('Y') }} Jipe Farm Campsite. All rights reserved.</span>
        </p>
    </div>

</div>
</body>
</html>
