<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminPackageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Packages/Index', ['packages' => Package::orderBy('sort_order')->get()]);
    }

    public function create()
    {
        return Inertia::render('Admin/Packages/Form', ['package' => null]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:150',
            'tagline'     => 'nullable|string|max:200',
            'description' => 'required|string',
            'price'       => 'required|string|max:30',
            'price_note'  => 'nullable|string|max:60',
            'duration'    => 'required|string|max:60',
            'image'       => 'nullable|image|max:8192',
            'image_url'   => 'nullable|string|max:500',
            'badge'       => 'nullable|string|max:50',
            'features'    => 'required|array|min:1',
            'features.*'  => 'string|max:150',
            'is_featured' => 'boolean',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image_url'] = '/storage/' . $request->file('image')->store('packages', 'public');
        }
        unset($data['image']);

        Package::create($data);
        return redirect()->route('admin.packages.index')->with('success', 'Package created.');
    }

    public function edit(Package $package)
    {
        return Inertia::render('Admin/Packages/Form', ['package' => $package]);
    }

    public function update(Request $request, Package $package)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:150',
            'tagline'     => 'nullable|string|max:200',
            'description' => 'required|string',
            'price'       => 'required|string|max:30',
            'price_note'  => 'nullable|string|max:60',
            'duration'    => 'required|string|max:60',
            'image'       => 'nullable|image|max:8192',
            'image_url'   => 'nullable|string|max:500',
            'badge'       => 'nullable|string|max:50',
            'features'    => 'required|array|min:1',
            'features.*'  => 'string|max:150',
            'is_featured' => 'boolean',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($package->image_url && str_starts_with($package->image_url, '/storage/')) {
                Storage::disk('public')->delete(substr($package->image_url, 9));
            }
            $data['image_url'] = '/storage/' . $request->file('image')->store('packages', 'public');
        }
        unset($data['image']);

        $package->update($data);
        return redirect()->route('admin.packages.index')->with('success', 'Package updated.');
    }

    public function destroy(Package $package)
    {
        if ($package->image_url && str_starts_with($package->image_url, '/storage/')) {
            Storage::disk('public')->delete(substr($package->image_url, 9));
        }
        $package->delete();
        return back()->with('success', 'Package deleted.');
    }
}
