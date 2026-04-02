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

    public string $type;       // 'contact' | 'activity' | 'package'
    public string $senderName;
    public string $senderEmail;
    public string|null $senderPhone;
    public string $subject;
    public string $body;

    public function __construct(
        string $type,
        string $senderName,
        string $senderEmail,
        string|null $senderPhone,
        string $subject,
        string $body
    ) {
        $this->type        = $type;
        $this->senderName  = $senderName;
        $this->senderEmail = $senderEmail;
        $this->senderPhone = $senderPhone;
        $this->subject     = $subject;
        $this->body        = $body;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[Jipe Farm Campsite] {$this->subject}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.enquiry',
        );
    }
}
