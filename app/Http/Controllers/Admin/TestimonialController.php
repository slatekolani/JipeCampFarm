<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TestimonialController extends Controller {
    public function index() {
        return Inertia::render('Admin/Testimonials/Index', ['testimonials' => Testimonial::latest()->get()]);
    }
    public function create() {
        return Inertia::render('Admin/Testimonials/Form', ['testimonial' => null]);
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'country' => 'required|string|max:80',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string|max:1000',
            'is_active' => 'boolean',
        ]);
        Testimonial::create($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial added.');
    }
    public function edit(Testimonial $testimonial) {
        return Inertia::render('Admin/Testimonials/Form', ['testimonial' => $testimonial]);
    }
    public function update(Request $request, Testimonial $testimonial) {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'country' => 'required|string|max:80',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string|max:1000',
            'is_active' => 'boolean',
        ]);
        $testimonial->update($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated.');
    }
    public function destroy(Testimonial $testimonial) {
        $testimonial->delete();
        return back()->with('success', 'Testimonial deleted.');
    }
}
