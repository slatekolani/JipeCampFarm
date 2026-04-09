<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use Illuminate\Http\Request;
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
            if ($existing && $existing->image_url && str_starts_with($existing->image_url, '/images/')) {
                $old = public_path($existing->image_url);
                if (file_exists($old)) unlink($old);
            }
            $filename = $request->file('image')->hashName();
            $request->file('image')->move(public_path('images/about'), $filename);
            $data['image_url'] = '/images/about/' . $filename;
        }
        unset($data['image']);

        AboutSection::updateOrCreate(['id' => 1], $data);
        return back()->with('success', 'About section updated.');
    }
}
