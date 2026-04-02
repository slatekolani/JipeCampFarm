<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutSectionController extends Controller
{
    public function edit()
    {
        $about = AboutSection::first() ?? new AboutSection();
        return Inertia::render('Admin/About/Edit', ['about' => $about]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'heading'        => 'required|string|max:200',
            'subheading'     => 'nullable|string|max:200',
            'body'           => 'required|string',
            'body_secondary' => 'nullable|string',
            'image'          => 'nullable|image|max:8192',
            'image_url'      => 'nullable|string|max:500',
            'stats'          => 'nullable|array',
            'stats.*.label'  => 'required|string|max:60',
            'stats.*.value'  => 'required|string|max:30',
            'features'       => 'nullable|array',
            'features.*'     => 'string|max:150',
            'is_active'      => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $existing = AboutSection::find(1);
            if ($existing && $existing->image_url && str_starts_with($existing->image_url, '/storage/')) {
                Storage::disk('public')->delete(substr($existing->image_url, 9));
            }
            $data['image_url'] = '/storage/' . $request->file('image')->store('about', 'public');
        }
        unset($data['image']);

        AboutSection::updateOrCreate(['id' => 1], $data);
        return back()->with('success', 'About section updated.');
    }
}
