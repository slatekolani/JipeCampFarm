<?php
namespace App\Http\Controllers;
use App\Models\GalleryImage;
use Inertia\Inertia;
class GalleryController extends Controller {
    public function index() {
        return Inertia::render('Gallery', [
            'images'     => GalleryImage::active()->get(),
            'categories' => GalleryImage::active()->distinct()->pluck('category'),
        ]);
    }
}
