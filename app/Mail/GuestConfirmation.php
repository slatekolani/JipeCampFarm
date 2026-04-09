<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class GuestConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public string $type;           // 'contact' | 'activity' | 'package'
    public string $guestName;
    public string $guestEmail;
    public string $enquiryTitle;   // Activity/package name or contact subject
    public string $shortBody;      // Brief preview of what was submitted

    public function __construct(
        string $type,
        string $guestName,
        string $guestEmail,
        string $enquiryTitle,
        string $body
    ) {
        $this->type         = $type;
        $this->guestName    = $guestName;
        $this->guestEmail   = $guestEmail;
        $this->enquiryTitle = $enquiryTitle;

        $preview = preg_replace('/\s+/', ' ', trim($body));
        $this->shortBody = mb_strlen($preview) > 200
            ? mb_substr($preview, 0, 197) . '…'
            : $preview;
    }

    public function envelope(): Envelope
    {
        $prefix = match ($this->type) {
            'activity' => 'Activity Booking Received',
            'package'  => 'Package Enquiry Received',
            default    => 'Message Received',
        };

        return new Envelope(
            subject: "[Jipe Farm Campsite] {$prefix} — {$this->enquiryTitle}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.guest-confirmation',
        );
    }
}
