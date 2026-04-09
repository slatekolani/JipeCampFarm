<?php
namespace App\Http\Controllers;

use App\Mail\EnquiryReceived;
use App\Mail\GuestConfirmation;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:100',
            'email'       => 'required|email|max:150',
            'phone'       => 'nullable|string|max:30',
            'subject'     => 'nullable|string|max:150',
            'message'     => 'required|string|max:2000',
            'wants_deals' => 'nullable|in:yes,no',
        ]);

        if (!empty($validated['wants_deals'])) {
            $label = $validated['wants_deals'] === 'yes' ? 'Yes, exactly!' : 'Absolutely not';
            $validated['message'] .= "\n\n--- Deals & Offers ---\n{$label}";
        }
        unset($validated['wants_deals']);

        ContactMessage::create($validated);

        $subject = $validated['subject'] ?? 'General Enquiry';

        $this->notify(
            'contact',
            $validated['name'],
            $validated['email'],
            $validated['phone'] ?? null,
            $subject,
            $validated['message']
        );

        // Confirmation to the sender
        try {
            Mail::to($validated['email'])
                ->send(new GuestConfirmation(
                    'contact',
                    $validated['name'],
                    $validated['email'],
                    $subject,
                    $validated['message']
                ));
        } catch (\Throwable) {
            // Non-fatal — message already saved
        }

        return back()->with('success', 'Your message has been sent. We will respond within 24 hours.');
    }

    private function notify(string $type, string $name, string $email, ?string $phone, string $subject, string $body): void
    {
        try {
            Mail::to(config('mail.notify_to', config('mail.from.address')))
                ->send(new EnquiryReceived($type, $name, $email, $phone, $subject, $body));
        } catch (\Throwable) {
            // Silently fail — message is already saved to DB
        }
    }
}
