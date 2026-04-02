<?php
namespace App\Http\Controllers;
use App\Models\HeroSlide;
use App\Models\AboutSection;
use App\Models\Activity;
use App\Models\Package;
use App\Models\GalleryImage;
use App\Models\Testimonial;
use Inertia\Inertia;
class WelcomeController extends Controller {
    public function index() {
        return Inertia::render('Welcome', [
            'heroSlides'   => HeroSlide::active()->get(),
            'about'        => AboutSection::active()->first(),
            'activities'   => Activity::active()->where('is_featured', true)->take(4)->get(),
            'packages'     => Package::active()->take(3)->get(),
            'gallery'      => GalleryImage::active()->take(8)->get(),
            'testimonials' => Testimonial::active()->get(),
        ]);
    }
}
