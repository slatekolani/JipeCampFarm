<?php

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\AdminActivityController;
use App\Http\Controllers\Admin\AdminPackageController;
use App\Http\Controllers\Admin\AdminGalleryController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\AboutSectionController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\SubscriptionAdminController;
use Illuminate\Support\Facades\Route;

// ── Public routes ──────────────────────────────────────────────────────────
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/activities', [ActivityController::class, 'index'])->name('activities');
Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('activities.show');
Route::post('/activities/{activity}/book', [ActivityController::class, 'book'])->middleware('throttle:5,1')->name('activities.book');
Route::get('/packages', [PackageController::class, 'index'])->name('packages');
Route::get('/packages/{package}', [PackageController::class, 'show'])->name('packages.show');
Route::post('/packages/{package}/book', [PackageController::class, 'book'])->middleware('throttle:5,1')->name('packages.book');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
Route::post('/subscribe', [SubscriptionController::class, 'store'])->middleware('throttle:5,1')->name('subscribe');

// ── Admin routes ───────────────────────────────────────────────────────────
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Hero slides
    Route::resource('hero', HeroSlideController::class)->except(['show']);

    // Activities
    Route::resource('activities', AdminActivityController::class)->except(['show']);

    // Packages
    Route::resource('packages', AdminPackageController::class)->except(['show']);

    // Gallery
    Route::resource('gallery', AdminGalleryController::class)->except(['show']);

    // Testimonials
    Route::resource('testimonials', TestimonialController::class)->except(['show']);

    // About
    Route::get('about', [AboutSectionController::class, 'edit'])->name('about.edit');
    Route::put('about', [AboutSectionController::class, 'update'])->name('about.update');

    // Messages
    Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('messages/{message}', [MessageController::class, 'show'])->name('messages.show');
    Route::delete('messages/{message}', [MessageController::class, 'destroy'])->name('messages.destroy');

    // Bookings
    Route::get('bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::delete('bookings/{booking}', [BookingController::class, 'destroy'])->name('bookings.destroy');

    // Subscriptions
    Route::get('subscriptions', [SubscriptionAdminController::class, 'index'])->name('subscriptions.index');
    Route::delete('subscriptions/{subscription}', [SubscriptionAdminController::class, 'destroy'])->name('subscriptions.destroy');

    // Profile
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ── Legacy dashboard redirect ──────────────────────────────────────────────
Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'))
    ->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
