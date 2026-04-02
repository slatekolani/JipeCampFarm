<?php
namespace App\Http\Controllers;
use App\Models\AboutSection;
use Inertia\Inertia;
class AboutController extends Controller {
    public function index() {
        return Inertia::render('About', [
            'about' => AboutSection::active()->first(),
        ]);
    }
}
