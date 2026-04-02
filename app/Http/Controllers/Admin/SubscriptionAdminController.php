<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Inertia\Inertia;

class SubscriptionAdminController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::latest()->get();
        return Inertia::render('Admin/Subscriptions/Index', ['subscriptions' => $subscriptions]);
    }

    public function destroy(Subscription $subscription)
    {
        $subscription->delete();
        return back()->with('success', 'Subscriber removed.');
    }
}
