<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Activity extends Model {
    protected $fillable = ['title','tagline','description','details','image_url','duration','difficulty','highlight_badge','is_featured','sort_order','is_active'];
    protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean'];
    public function scopeActive($q) { return $q->where('is_active', true)->orderBy('sort_order'); }
}
