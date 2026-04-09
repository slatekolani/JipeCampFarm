<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EnquiryReceived extends Mailable
{
    use Queueable, SerializesModels;

    public string $type;            // 'contact' | 'activity' | 'package'
    public string $senderName;
    public string $senderEmail;
    public string|null $senderPhone;
    public string $messageSubject;  // renamed — $subject conflicts with parent Mailable
    public string $body;
    public string $shortBody;       // First ~220 chars shown in the notification email

    public function __construct(
        string $type,
        string $senderName,
        string $senderEmail,
        string|null $senderPhone,
        string $subject,
        string $body
    ) {
        $this->type           = $type;
        $this->senderName     = $senderName;
        $this->senderEmail    = $senderEmail;
        $this->senderPhone    = $senderPhone;
        $this->messageSubject = $subject;
        $this->body           = $body;

        // Clean single-line preview (strips deal lines / extra whitespace)
        $preview = preg_replace('/\s+/', ' ', trim($body));
        $this->shortBody = mb_strlen($preview) > 220
            ? mb_substr($preview, 0, 217) . '…'
            : $preview;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[Jipe Farm Campsite] {$this->messageSubject}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.enquiry',
        );
    }
}
