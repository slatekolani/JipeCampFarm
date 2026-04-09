<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Activities/Index', ['activities' => Activity::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return Inertia::render('Admin/Activities/Form', ['activity' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'           => 'required|string|max:150',
            'tagline'         => 'nullable|string|max:200',
            'description'     => 'required|string',
            'details'         => 'nullable|string',
            'image'           => 'nullable|image|max:8192',
            'image_url'       => 'nullable|string|max:500',
            'duration'        => 'nullable|string|max:50',
            'difficulty'      => 'nullable|string|max:50',
            'highlight_badge' => 'nullable|string|max:50',
            'is_featured'     => 'boolean',
            'sort_order'      => 'integer|min:0',
            'is_active'       => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $filename = $request->file('image')->hashName();
            $request->file('image')->move(public_path('images/activities'), $filename);
            $data['image_url'] = '/images/activities/' . $filename;
        }
        unset($data['image']);

        Activity::create($data);
        return redirect()->route('admin.activities.index')->with('success', 'Activity created.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Form', ['activity' => $activity]);
    }

    public function update(Request $request, Activity $activity)
    {
        $data = $request->validate([
            'title'           => 'required|string|max:150',
            'tagline'         => 'nullable|string|max:200',
            'description'     => 'required|string',
            'details'         => 'nullable|string',
            'image'           => 'nullable|image|max:8192',
            'image_url'       => 'nullable|string|max:500',
            'duration'        => 'nullable|string|max:50',
            'difficulty'      => 'nullable|string|max:50',
            'highlight_badge' => 'nullable|string|max:50',
            'is_featured'     => 'boolean',
            'sort_order'      => 'integer|min:0',
            'is_active'       => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($activity->image_url && str_starts_with($activity->image_url, '/images/')) {
                $old = public_path($activity->image_url);
                if (file_exists($old)) unlink($old);
            }
            $filename = $request->file('image')->hashName();
            $request->file('image')->move(public_path('images/activities'), $filename);
            $data['image_url'] = '/images/activities/' . $filename;
        }
        unset($data['image']);

        $activity->update($data);
        return redirect()->route('admin.activities.index')->with('success', 'Activity updated.');
    }

    public function destroy(Activity $activity)
    {
        if ($activity->image_url && str_starts_with($activity->image_url, '/images/')) {
            $old = public_path($activity->image_url);
            if (file_exists($old)) unlink($old);
        }
        $activity->delete();
        return back()->with('success', 'Activity deleted.');
    }
}
