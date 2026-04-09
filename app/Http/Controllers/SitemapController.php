<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Package;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = 'https://www.lakejipecamp.co.tz';

        $staticRoutes = [
            ['url' => $baseUrl . '/',           'priority' => '1.0',  'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/about',       'priority' => '0.8',  'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/activities',  'priority' => '0.9',  'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/packages',    'priority' => '0.9',  'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/gallery',     'priority' => '0.7',  'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/contact',     'priority' => '0.8',  'changefreq' => 'monthly'],
        ];

        $activities = Activity::select('id', 'updated_at')->get();
        $packages   = Package::select('id', 'updated_at')->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' . "\n";
        $xml .= '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9' . "\n";
        $xml .= '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' . "\n";

        foreach ($staticRoutes as $route) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$route['url']}</loc>\n";
            $xml .= "    <changefreq>{$route['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$route['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($activities as $activity) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}/activities/{$activity->id}</loc>\n";
            $xml .= "    <lastmod>{$activity->updated_at->toAtomString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($packages as $package) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$baseUrl}/packages/{$package->id}</loc>\n";
            $xml .= "    <lastmod>{$package->updated_at->toAtomString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
