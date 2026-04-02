<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = ContactMessage::where(function ($q) {
            $q->where('subject', 'like', 'Booking Enquiry%')
              ->orWhere('subject', 'like', 'Activity Booking%');
        })
        ->latest()
        ->get();

        return Inertia::render('Admin/Bookings/Index', ['bookings' => $bookings]);
    }

    public function show(ContactMessage $booking)
    {
        $booking->update(['is_read' => true]);
        return Inertia::render('Admin/Bookings/Show', ['booking' => $booking]);
    }

    public function destroy(ContactMessage $booking)
    {
        $booking->delete();
        return redirect()->route('admin.bookings.index');
    }
}
