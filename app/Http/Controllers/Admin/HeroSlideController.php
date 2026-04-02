<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Hero/Index', ['slides' => HeroSlide::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return Inertia::render('Admin/Hero/Form', ['slide' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:150',
            'subtitle'   => 'nullable|string|max:200',
            'description'=> 'nullable|string|max:500',
            'image'      => 'nullable|image|max:8192',
            'image_url'  => 'nullable|string|max:500',
            'cta_text'   => 'nullable|string|max:50',
            'cta_url'    => 'nullable|string|max:200',
            'sort_order' => 'integer|min:0',
            'is_active'  => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image_url'] = '/storage/' . $request->file('image')->store('hero', 'public');
        }
        unset($data['image']);

        HeroSlide::create($data);
        return redirect()->route('admin.hero.index')->with('success', 'Slide created.');
    }

    public function edit(HeroSlide $hero)
    {
        return Inertia::render('Admin/Hero/Form', ['slide' => $hero]);
    }

    public function update(Request $request, HeroSlide $hero)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:150',
            'subtitle'   => 'nullable|string|max:200',
            'description'=> 'nullable|string|max:500',
            'image'      => 'nullable|image|max:8192',
            'image_url'  => 'nullable|string|max:500',
            'cta_text'   => 'nullable|string|max:50',
            'cta_url'    => 'nullable|string|max:200',
            'sort_order' => 'integer|min:0',
            'is_active'  => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old uploaded file if it exists
            if ($hero->image_url && str_starts_with($hero->image_url, '/storage/')) {
                Storage::disk('public')->delete(substr($hero->image_url, 9));
            }
            $data['image_url'] = '/storage/' . $request->file('image')->store('hero', 'public');
        }
        unset($data['image']);

        $hero->update($data);
        return redirect()->route('admin.hero.index')->with('success', 'Slide updated.');
    }

    public function destroy(HeroSlide $hero)
    {
        if ($hero->image_url && str_starts_with($hero->image_url, '/storage/')) {
            Storage::disk('public')->delete(substr($hero->image_url, 9));
        }
        $hero->delete();
        return back()->with('success', 'Slide deleted.');
    }
}
