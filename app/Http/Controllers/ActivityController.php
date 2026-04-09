<?php
namespace App\Http\Controllers;

use App\Mail\EnquiryReceived;
use App\Mail\GuestConfirmation;
use App\Models\Activity;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Activities', [
            'activities' => Activity::active()->orderBy('sort_order')->get(),
        ]);
    }

    public function show(Activity $activity)
    {
        abort_unless($activity->is_active, 404);
        $related = Activity::active()
            ->where('id', '!=', $activity->id)
            ->inRandomOrder()
            ->take(3)
            ->get();
        return Inertia::render('ActivityDetail', [
            'activity' => $activity,
            'related'  => $related,
        ]);
    }

    public function book(Request $request, Activity $activity)
    {
        abort_unless($activity->is_active, 404);

        $data = $request->validate([
            'name'        => 'required|string|max:150',
            'email'       => 'required|email|max:200',
            'phone'       => 'nullable|string|max:30',
            'group_size'  => 'required|integer|min:1|max:200',
            'notes'       => 'nullable|string|max:1000',
            'wants_deals' => 'nullable|in:yes,no',
        ]);

        $dealsLine = '';
        if (!empty($data['wants_deals'])) {
            $label = $data['wants_deals'] === 'yes' ? 'Yes, exactly!' : 'Absolutely not';
            $dealsLine = "\n\n--- Deals & Offers ---\n{$label}";
        }

        $messageBody = "Activity Enquiry: {$activity->title}\n"
            . "Group size: {$data['group_size']} person(s)\n"
            . ($data['notes'] ? "Notes: {$data['notes']}" : '')
            . $dealsLine;

        $subject = "Activity Booking — {$activity->title}";

        ContactMessage::create([
            'name'    => $data['name'],
            'email'   => $data['email'],
            'phone'   => $data['phone'] ?? null,
            'subject' => $subject,
            'message' => $messageBody,
            'is_read' => false,
        ]);

        try {
            Mail::to(config('mail.notify_to', config('mail.from.address')))
                ->send(new EnquiryReceived('activity', $data['name'], $data['email'], $data['phone'] ?? null, $subject, $messageBody));
        } catch (\Throwable) {
            // Non-fatal — booking saved to DB
        }

        // Confirmation to the guest
        try {
            Mail::to($data['email'])
                ->send(new GuestConfirmation(
                    'activity',
                    $data['name'],
                    $data['email'],
                    $activity->title,
                    $messageBody
                ));
        } catch (\Throwable) {
            // Non-fatal
        }

        return back()->with('booking_success', true);
    }
}
