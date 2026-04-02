<?php
namespace App\Http\Controllers;

use App\Mail\EnquiryReceived;
use App\Models\Package;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function index()
    {
        return Inertia::render('Packages', [
            'packages' => Package::active()->orderBy('sort_order')->get(),
        ]);
    }

    public function show(Package $package)
    {
        abort_unless($package->is_active, 404);
        $others = Package::active()
            ->where('id', '!=', $package->id)
            ->orderBy('sort_order')
            ->get();
        return Inertia::render('PackageDetail', [
            'package' => $package,
            'others'  => $others,
        ]);
    }

    public function book(Request $request, Package $package)
    {
        abort_unless($package->is_active, 404);

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

        $messageBody = "Package Enquiry: {$package->name}\n"
            . "Group size: {$data['group_size']} person(s)\n"
            . ($data['notes'] ? "Notes: {$data['notes']}" : '')
            . $dealsLine;

        $subject = "Booking Enquiry — {$package->name}";

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
                ->send(new EnquiryReceived('package', $data['name'], $data['email'], $data['phone'] ?? null, $subject, $messageBody));
        } catch (\Throwable) {
            // Message saved to DB — email failure is non-fatal
        }

        return back()->with('booking_success', true);
    }
}
