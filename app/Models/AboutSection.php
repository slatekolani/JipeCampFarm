<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class AboutSection extends Model {
    protected $fillable = ['heading','subheading','body','body_secondary','image_url','stats','features','is_active'];
    protected $casts = ['is_active' => 'boolean', 'stats' => 'array', 'features' => 'array'];
    public function scopeActive($q) { return $q->where('is_active', true); }
}
