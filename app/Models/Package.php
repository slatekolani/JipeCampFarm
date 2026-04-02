<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Package extends Model {
    protected $fillable = ['name','tagline','description','price','price_note','duration','image_url','badge','features','is_featured','sort_order','is_active'];
    protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean', 'features' => 'array'];
    public function scopeActive($q) { return $q->where('is_active', true)->orderBy('sort_order'); }
}
