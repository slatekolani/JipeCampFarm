<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:100',
            'type'            => 'required|in:sms,email',
            'email'           => 'required_if:type,email|nullable|email|max:150',
            'phone'           => 'required_if:type,sms|nullable|string|max:30',
            'subscriber_type' => 'nullable|in:resident,foreigner_in_tz,foreigner_abroad',
        ]);

        Subscription::create($validated);

        return back()->with('subscribed', true);
    }
}
