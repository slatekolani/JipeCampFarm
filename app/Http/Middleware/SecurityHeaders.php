<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        // HSTS: only sent over HTTPS — safe to include in production
        if ($request->isSecure()) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        // Content Security Policy
        // Dev mode allows the Vite dev server (localhost:5173) for HMR.
        // In production, tighten by removing 'unsafe-inline' and the Vite origin.
        if (app()->environment('local')) {
            $viteOrigin = 'http://localhost:5173';
            $scriptSrc = "script-src 'self' 'unsafe-inline' {$viteOrigin}";
            $styleSrc  = "style-src 'self' 'unsafe-inline' {$viteOrigin} https://fonts.bunny.net";
            $connectSrc = "connect-src 'self' {$viteOrigin} ws://localhost:5173 wss://localhost:5173";
            $fontSrc = "font-src 'self' {$viteOrigin} https://fonts.bunny.net";
        } else {
            $scriptSrc = "script-src 'self' 'unsafe-inline'";
            $styleSrc  = "style-src 'self' 'unsafe-inline' https://fonts.bunny.net";
            $connectSrc = "connect-src 'self'";
            $fontSrc = "font-src 'self' https://fonts.bunny.net";
        }

        $csp = implode('; ', [
            "default-src 'self'",
            $scriptSrc,
            $styleSrc,
            "img-src 'self' data: blob: https://images.unsplash.com",
            $fontSrc,
            $connectSrc,
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
        ]);
        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }
}
