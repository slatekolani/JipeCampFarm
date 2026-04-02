<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminGalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/Index', ['images' => GalleryImage::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gallery/Form', ['image' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string|max:500',
            'image'       => 'nullable|image|max:8192',
            'image_url'   => 'nullable|string|max:500',
            'category'    => 'required|string|max:50',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image_url'] = '/storage/' . $request->file('image')->store('gallery', 'public');
        }
        unset($data['image']);

        GalleryImage::create($data);
        return redirect()->route('admin.gallery.index')->with('success', 'Image added.');
    }

    public function edit(GalleryImage $gallery)
    {
        return Inertia::render('Admin/Gallery/Form', ['image' => $gallery]);
    }

    public function update(Request $request, GalleryImage $gallery)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string|max:500',
            'image'       => 'nullable|image|max:8192',
            'image_url'   => 'nullable|string|max:500',
            'category'    => 'required|string|max:50',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($gallery->image_url && str_starts_with($gallery->image_url, '/storage/')) {
                Storage::disk('public')->delete(substr($gallery->image_url, 9));
            }
            $data['image_url'] = '/storage/' . $request->file('image')->store('gallery', 'public');
        }
        unset($data['image']);

        $gallery->update($data);
        return redirect()->route('admin.gallery.index')->with('success', 'Image updated.');
    }

    public function destroy(GalleryImage $gallery)
    {
        if ($gallery->image_url && str_starts_with($gallery->image_url, '/storage/')) {
            Storage::disk('public')->delete(substr($gallery->image_url, 9));
        }
        $gallery->delete();
        return back()->with('success', 'Image deleted.');
    }
}
