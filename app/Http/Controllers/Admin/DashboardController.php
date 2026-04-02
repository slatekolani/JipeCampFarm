<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use App\Models\Activity;
use App\Models\Package;
use App\Models\GalleryImage;
use App\Models\Testimonial;
use App\Models\ContactMessage;
use App\Models\Subscription;
use Inertia\Inertia;
class DashboardController extends Controller {
    public function index() {
        $bookingQuery = ContactMessage::where(function ($q) {
            $q->where('subject', 'like', 'Booking Enquiry%')
              ->orWhere('subject', 'like', 'Activity Booking%');
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'heroSlides'      => HeroSlide::count(),
                'activities'      => Activity::count(),
                'packages'        => Package::count(),
                'gallery'         => GalleryImage::count(),
                'testimonials'    => Testimonial::count(),
                'messages'        => ContactMessage::count(),
                'unreadMessages'  => ContactMessage::where('is_read', false)->count(),
                'bookings'        => (clone $bookingQuery)->count(),
                'newBookings'     => (clone $bookingQuery)->where('is_read', false)->count(),
                'subscriptions'   => Subscription::count(),
                'smsSubscribers'  => Subscription::where('type', 'sms')->count(),
                'emailSubscribers'=> Subscription::where('type', 'email')->count(),
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
        ]);
    }
}
