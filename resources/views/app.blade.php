<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Jipe Farm Campsite') }}</title>

        <!-- ── Primary SEO ───────────────────────────────────────────────── -->
        <meta name="description" content="Jipe Farm Campsite — eco-friendly farm camping on the shores of Lake Jipe, Kilimanjaro Region, Tanzania. Canoeing, hiking, farm experiences, bonfire nights, and wildlife adventures near Moshi.">
        <meta name="keywords" content="Jipe Farm, Jipe Farm Campsite, Jipe Farm and Campsite, camping Kilimanjaro, camping Moshi, Lake Jipe camping, bush camping Kilimanjaro, canoeing Kilimanjaro, canoeing Moshi, hiking Kilimanjaro, hiking Moshi, farm campsite Tanzania, farm camping Tanzania, bonfire Kilimanjaro, bush camping Tanzania, Tanzania camping, eco camping Tanzania, Kilimanjaro adventure camp, Tanzania farm stay, Lake Jipe Tanzania, birdwatching Kilimanjaro, wildlife Kilimanjaro, safari camp Tanzania, canoe safari Tanzania">
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="author" content="Jipe Farm Campsite">
        <meta name="theme-color" content="#2f6f2f">

        <!-- ── Geographic / Local SEO ────────────────────────────────────── -->
        <meta name="geo.region" content="TZ-09">
        <meta name="geo.placename" content="Lake Jipe, Kilimanjaro Region, Tanzania">
        <meta name="geo.position" content="-3.633333;37.783333">
        <meta name="ICBM" content="-3.633333, 37.783333">
        <meta name="language" content="English">
        <meta name="revisit-after" content="7 days">

        <!-- ── Open Graph (default — pages override title/description) ──── -->
        <meta property="og:site_name" content="Jipe Farm Campsite">
        <meta property="og:locale" content="en_US">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ asset('brand/jipe-farm-campsite-logo.jpeg') }}">
        <meta property="og:image:width" content="465">
        <meta property="og:image:height" content="477">
        <meta property="og:image:alt" content="Jipe Farm Campsite tractor logo">

        <!-- ── Twitter / X Card (default) ───────────────────────────────── -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ asset('brand/jipe-farm-campsite-logo.jpeg') }}">
        <meta name="twitter:image:alt" content="Jipe Farm Campsite tractor logo">

        <!-- ── Canonical (fallback — individual pages set their own) ─────── -->
        <link rel="canonical" href="{{ config('app.url') }}">

        <!-- ── JSON-LD: LodgingBusiness + TouristAttraction ─────────────── -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": ["LodgingBusiness", "TouristAttraction"],
                    "@id": "https://www.lakejipecamp.co.tz/#business",
                    "name": "Jipe Farm Campsite",
                    "alternateName": ["Jipe Farm", "Jipe Farm and Campsite", "Lake Jipe Camp", "Jipe Farm Camp Site"],
                    "description": "Eco-friendly farm campsite on the shores of Lake Jipe in Kilimanjaro Region, Tanzania. Offering bush camping, canoeing, hiking, milking experiences, bonfire nights, birdwatching and wildlife adventures near Moshi.",
                    "url": "https://www.lakejipecamp.co.tz",
                    "email": "info@jipefarmcampsite.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Lake Jipe Shore",
                        "addressLocality": "Lake Jipe",
                        "addressRegion": "Kilimanjaro",
                        "addressCountry": "TZ"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": -3.633333,
                        "longitude": 37.783333
                    },
                    "areaServed": [
                        { "@type": "City", "name": "Moshi" },
                        { "@type": "AdministrativeArea", "name": "Kilimanjaro Region" },
                        { "@type": "Country", "name": "Tanzania" }
                    ],
                    "touristType": ["Adventure Tourist", "Eco-Tourist", "Nature Lover", "Camper", "Hiker", "Bird Watcher"],
                    "amenityFeature": [
                        { "@type": "LocationFeatureSpecification", "name": "Bush Camping", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Canoeing on Lake Jipe", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Guided Hiking", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Farm Milking Experience", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Bonfire Nights", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Wildlife Birdwatching", "value": true },
                        { "@type": "LocationFeatureSpecification", "name": "Camel Riding", "value": true }
                    ],
                    "logo": "{{ asset('brand/jipe-farm-campsite-logo.jpeg') }}",
                    "image": "{{ asset('brand/jipe-farm-campsite-logo.jpeg') }}",
                    "priceRange": "$$",
                    "currenciesAccepted": "USD, TZS",
                    "paymentAccepted": "Cash, Mobile Money",
                    "openingHours": "Mo-Su 00:00-23:59"
                },
                {
                    "@type": "WebSite",
                    "@id": "https://www.lakejipecamp.co.tz/#website",
                    "name": "Jipe Farm Campsite",
                    "url": "https://www.lakejipecamp.co.tz",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.lakejipecamp.co.tz/?s={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                }
            ]
        }
        </script>

        <!-- ── Favicons ─────────────────────────────────────────────────── -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="msapplication-TileImage" content="/icon-192.png">
        <meta name="msapplication-TileColor" content="#2f6f2f">

        <!-- ── Fonts ─────────────────────────────────────────────────────── -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- ── Scripts ───────────────────────────────────────────────────── -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
