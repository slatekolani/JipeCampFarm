<?php
namespace Database\Seeders;
use App\Models\User;
use App\Models\HeroSlide;
use App\Models\AboutSection;
use App\Models\Activity;
use App\Models\Package;
use App\Models\GalleryImage;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin users ───────────────────────────────────────────────────
        User::updateOrCreate(
            ['email' => 'adminjipe@jipecamp.com'],
            [
                'name'              => 'Jipe Admin',
                'password'          => Hash::make('JipeJipe@321'),
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'info@jipefarmcampsite.com'],
            [
                'name'              => 'Jipe Farm Info',
                'password'          => Hash::make('%^$&#*@(!)'),
                'email_verified_at' => now(),
            ]
        );

        // ── Hero Slides ───────────────────────────────────────────────────
        $slides = [
            [
                'title'       => 'Where Africa Comes Alive',
                'subtitle'    => 'Lake Jipe, Tanzania',
                'description' => 'Drift silently across a mirror lake at dawn, surrounded by hippos, flamingos, and the great Pare Mountains rising beyond the mist.',
                'image_url'   => 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85',
                'cta_text'    => 'Explore Experiences',
                'cta_url'     => '/activities',
                'sort_order'  => 1,
                'is_active'   => true,
            ],
            [
                'title'       => 'Wilderness Beyond Borders',
                'subtitle'    => 'Tsavo & Mkomazi Meet',
                'description' => 'At the crossroads of two nations, Lake Jipe sits between Tsavo West and Tanzania\'s Mkomazi National Park — a truly untamed frontier.',
                'image_url'   => 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=85',
                'cta_text'    => 'View Packages',
                'cta_url'     => '/packages',
                'sort_order'  => 2,
                'is_active'   => true,
            ],
            [
                'title'       => 'Sleep Under a Billion Stars',
                'subtitle'    => 'Camp & Safari Experience',
                'description' => 'No light pollution. No distractions. Just you, the crackling fire, the sounds of the African night, and the most spectacular sky you have ever seen.',
                'image_url'   => 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=85',
                'cta_text'    => 'Book Your Stay',
                'cta_url'     => '/contact',
                'sort_order'  => 3,
                'is_active'   => true,
            ],
        ];
        foreach ($slides as $slide) HeroSlide::create($slide);

        // ── About Section ──────────────────────────────────────────────────
        AboutSection::create([
            'heading'        => 'Tanzania\'s Best-Kept Wilderness Secret',
            'subheading'     => 'About Lake Jipe Camp',
            'body'           => 'Tucked into the remote borderlands of northern Tanzania, Lake Jipe is one of East Africa\'s most extraordinary yet least-visited wild places. Fed by underground springs from the Pare Mountains, the lake teems with hippos, Nile crocodiles, and over 200 recorded bird species — including vast flocks of flamingos that turn the shallows pink at dawn.',
            'body_secondary' => 'Lake Jipe Camp was founded on a simple belief: that the most powerful travel experiences are those that immerse you completely in nature, without taking anything away from it. We are a small, family-run camp committed to low-impact eco-tourism, built in partnership with the local Maasai and Pare communities who have called this landscape home for generations.',
            'image_url'      => '/Images/Jipe Lake.jpg',
            'stats'          => [
                ['value' => '200+', 'label' => 'Bird Species'],
                ['value' => '12+',  'label' => 'Years Operating'],
                ['value' => '5000+', 'label' => 'Happy Guests'],
                ['value' => '4.9★', 'label' => 'Avg. Rating'],
            ],
            'features'       => [
                'Guided canoe safaris at dawn & dusk',
                'Over 200 recorded bird species',
                'Resident hippos & Nile crocodiles',
                'Expert local Maasai & Pare guides',
                'Eco-friendly, low-impact operations',
                'Direct access to Mkomazi National Park',
                'Night sky stargazing sessions',
                'Authentic Tanzanian cultural experiences',
            ],
            'is_active'      => true,
        ]);

        // ── Activities ────────────────────────────────────────────────────
        $activities = [
            [
                'title'           => 'Lake Canoe Safari',
                'tagline'         => 'Glide with the Hippos',
                'description'     => 'Paddle silently across the glassy surface of Lake Jipe at dawn. Watch hippos yawn in the shallows, crocodiles bask on the banks, and thousands of birds take flight as the sun rises over the Pare Mountains.',
                'details'         => 'Our expert guides navigate wooden canoes through the papyrus beds and open water of Lake Jipe. The lake sits astride the Tanzania–Kenya border and is fed by springs from the Pare Mountains — making it a unique freshwater ecosystem unlike anywhere else in East Africa. Morning safaris depart at 6am for the best light and wildlife activity. Sunset safaris depart at 4:30pm.',
                'image_url'       => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=85',
                'duration'        => '2–3 hours',
                'difficulty'      => 'Easy',
                'highlight_badge' => 'Most Popular',
                'is_featured'     => true,
                'sort_order'      => 1,
                'is_active'       => true,
            ],
            [
                'title'           => 'Bush & Mountain Hiking',
                'tagline'         => 'Walk the Ancient Trails',
                'description'     => 'Trek through acacia woodland, open savannah, and Pare Mountain foothills with expert local guides. Reach elevated viewpoints with panoramic views of Lake Jipe, Kilimanjaro, and the vast Tanzania–Kenya borderlands.',
                'details'         => 'Guided hikes range from gentle 2-hour nature walks to full-day treks into the Pare Mountain foothills. Along the way, your guide will point out wildlife tracks, medicinal plants, traditional Maasai landmarks, and the remarkable geology of this ancient landscape. All hikes are guided by certified local naturalists who were born in these hills.',
                'image_url'       => 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=85',
                'duration'        => '2–8 hours',
                'difficulty'      => 'Easy to Moderate',
                'highlight_badge' => 'Scenic Views',
                'is_featured'     => true,
                'sort_order'      => 2,
                'is_active'       => true,
            ],
            [
                'title'           => 'Birdwatching Expedition',
                'tagline'         => '200+ Species Await',
                'description'     => 'Lake Jipe is one of Tanzania\'s premier birding destinations. Over 200 species have been recorded, including the Madagascar Squacco Heron, African Skimmer, and vast flocks of Lesser Flamingo that turn the shallows pink at dawn.',
                'details'         => 'Our birding guides are among the most knowledgeable in the Kilimanjaro region. Bring binoculars and a field guide — or use ours. Sessions are available at dawn (best activity), mid-morning on the lake by canoe, and at dusk when raptors return to roost. All levels welcome, from novice watchers to expert listers.',
                'image_url'       => 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=700&q=85',
                'duration'        => '2–4 hours',
                'difficulty'      => 'Easy',
                'highlight_badge' => 'Birder\'s Paradise',
                'is_featured'     => true,
                'sort_order'      => 3,
                'is_active'       => true,
            ],
            [
                'title'           => 'Maasai Cultural Experience',
                'tagline'         => 'Connect with the People',
                'description'     => 'Spend time in a traditional Maasai enkang (homestead) with our community partners. Learn about cattle herding traditions, beadwork, the Maasai calendar, and the stories passed down through generations around the fire.',
                'details'         => 'This is not a performance — it\'s a genuine cultural exchange facilitated by community members who want to share their way of life with respectful visitors. A portion of all cultural experience fees goes directly to the community fund, supporting the local school and women\'s craft cooperative.',
                'image_url'       => 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=700&q=85',
                'duration'        => '3–4 hours',
                'difficulty'      => 'Easy',
                'highlight_badge' => 'Cultural',
                'is_featured'     => true,
                'sort_order'      => 4,
                'is_active'       => true,
            ],
            [
                'title'           => 'Campfire & Stargazing',
                'tagline'         => 'Stories Under a Billion Stars',
                'description'     => 'As dusk falls over the lake, gather around a roaring bushfire under one of the darkest, most star-filled skies in East Africa. Hear Maasai folklore, spot satellites with the naked eye, and feel the pulse of the African night.',
                'details'         => 'Lake Jipe sits in one of the lowest light-pollution zones in the entire East African region. On clear nights, the Milky Way is visible to the naked eye in spectacular detail. Our guide will introduce you to the constellations as seen from the Southern Hemisphere, tell traditional star stories, and help you identify planets, satellites, and meteor showers.',
                'image_url'       => 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=700&q=85',
                'duration'        => 'Evening',
                'difficulty'      => 'Easy',
                'highlight_badge' => 'Nightly',
                'is_featured'     => false,
                'sort_order'      => 5,
                'is_active'       => true,
            ],
            [
                'title'           => 'Bush Barbecue Feast',
                'tagline'         => 'Feast in the Wild',
                'description'     => 'Savour a traditional Tanzanian open-fire barbecue beneath the acacia trees. Freshly sourced meats, vegetables, and local spices grilled over hardwood coals, served as the evening chorus of frogs and insects fills the warm night air.',
                'details'         => 'Our camp chef prepares a feast using ingredients sourced from local Pare Mountain farms and Maasai cattle herders. The menu changes seasonally and always features nyama choma (grilled meat), roasted vegetables, chapati, and fresh mango or papaya for dessert. Vegetarian options are always available.',
                'image_url'       => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&q=85',
                'duration'        => 'Evening',
                'difficulty'      => 'Easy',
                'highlight_badge' => 'Locally Sourced',
                'is_featured'     => false,
                'sort_order'      => 6,
                'is_active'       => true,
            ],
        ];
        foreach ($activities as $a) Activity::create($a);

        // ── Packages ──────────────────────────────────────────────────────
        $packages = [
            [
                'name'        => 'Lake Explorer',
                'tagline'     => 'The Essential Jipe Experience',
                'description' => 'Perfect for first-time visitors, this package delivers the core Lake Jipe experience — a dawn canoe safari, a guided bush walk, a cultural evening, and two nights sleeping to the sounds of the African wild.',
                'price'       => 'TZS 780,000',
                'price_note'  => 'per person',
                'duration'    => '2 Nights / 3 Days',
                'image_url'   => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=700&q=85',
                'badge'       => 'Most Popular',
                'features'    => ['2 nights camp accommodation','Dawn canoe safari','Guided bush walk (half day)','Campfire evening with Maasai storytelling','All meals included','Park fees & guide','Airport transfer (Kilimanjaro)'],
                'is_featured' => false,
                'sort_order'  => 1,
                'is_active'   => true,
            ],
            [
                'name'        => 'Wilderness Immersion',
                'tagline'     => 'Go Deeper into the Wild',
                'description' => 'Our signature 4-night package for travellers who want to truly disconnect. Multiple canoe safaris, a full-day mountain hike, birding expedition, cultural immersion, and a private bush barbecue under the stars.',
                'price'       => 'TZS 1,430,000',
                'price_note'  => 'per person',
                'duration'    => '4 Nights / 5 Days',
                'image_url'   => 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=700&q=85',
                'badge'       => 'Best Value',
                'features'    => ['4 nights eco woodland cabin','3 × canoe safaris (dawn & dusk)','Full-day Pare Mountain hike','Expert birding session','Maasai cultural village visit','Private bush BBQ dinner','All meals & beverages','Park & conservation fees','Airport transfer both ways'],
                'is_featured' => true,
                'sort_order'  => 2,
                'is_active'   => true,
            ],
            [
                'name'        => 'Jipe Luxury Retreat',
                'tagline'     => 'Wilderness Without Compromise',
                'description' => 'An exclusive week-long retreat for those who want the full Lake Jipe experience with every comfort attended to. Private guide, lakeside suite, and a fully bespoke itinerary built around your interests.',
                'price'       => 'TZS 3,380,000',
                'price_note'  => 'per person',
                'duration'    => '6 Nights / 7 Days',
                'image_url'   => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=85',
                'badge'       => 'Premium',
                'features'    => ['6 nights lakeside suite','Dedicated private guide','Bespoke daily itinerary','All activities & excursions','Day trip into Mkomazi National Park','Sunset boat cruise','Private bush dinners (3 evenings)','All-inclusive meals & premium drinks','Return Kilimanjaro airport transfers','Spa & massage sessions'],
                'is_featured' => false,
                'sort_order'  => 3,
                'is_active'   => true,
            ],
        ];
        foreach ($packages as $p) Package::create($p);

        // ── Gallery ───────────────────────────────────────────────────────
        $gallery = [
            ['title' => 'Dawn Over Lake Jipe',          'description' => 'The first light of day breaks over the Pare Mountains, painting Lake Jipe in gold and amber. This is why we wake at 5am.', 'image_url' => 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=85', 'category' => 'Landscape'],
            ['title' => 'Flamingo Gathering',            'description' => 'Thousands of Lesser Flamingo congregate in the shallow alkaline margins of Lake Jipe at sunrise — one of Tanzania\'s most spectacular wildlife sights.', 'image_url' => 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&q=85', 'category' => 'Wildlife'],
            ['title' => 'Safari Canoe at Dusk',          'description' => 'A guided canoe returns from the evening safari as the sun dips behind the Pare Mountains. Hippos can be heard calling across the water.', 'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85', 'category' => 'Activities'],
            ['title' => 'Camp Under the Milky Way',      'description' => 'Lake Jipe sits in one of East Africa\'s darkest sky zones. On clear nights, the Milky Way is visible with the naked eye in extraordinary detail.', 'image_url' => 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=85', 'category' => 'Camp Life'],
            ['title' => 'Savannah Bush Walk',            'description' => 'A morning trek through acacia woodland with our Maasai guide. Tracks, plants, and the stories written into the landscape by a thousand years of tradition.', 'image_url' => 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85', 'category' => 'Activities'],
            ['title' => 'Traditional Safari Tent',       'description' => 'Our canvas tents are positioned to catch the lake breeze, with mesh windows that let you sleep to the sounds of the bush without missing a single moment.', 'image_url' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=85', 'category' => 'Camp Life'],
            ['title' => 'African Landscape at Sunset',   'description' => 'The borderlands between Tanzania and Kenya, as seen from the Pare Mountain foothills. Two countries, one magnificent wilderness.', 'image_url' => 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=85', 'category' => 'Landscape'],
            ['title' => 'Bush Barbecue Evening',         'description' => 'Nyama choma over hardwood coals, fresh chapati, and cold Kilimanjaro beer as the evening insects begin their chorus. This is Tanzanian hospitality.', 'image_url' => 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=85', 'category' => 'Activities'],
        ];
        foreach (array_values($gallery) as $i => $g) {
            GalleryImage::create(array_merge($g, ['sort_order' => $i + 1, 'is_active' => true]));
        }

        // ── Testimonials ──────────────────────────────────────────────────
        $testimonials = [
            ['name' => 'Sophie van der Berg',    'country' => 'Netherlands',     'rating' => 5, 'content' => 'Jipe Farm Campsite exceeded every expectation. The dawn canoe safari was the single most magical wildlife experience of my 15 years of African travel. The hippos were just metres away. Absolutely breathtaking. We will return.'],
            ['name' => 'James & Linda Thornton', 'country' => 'United Kingdom',  'rating' => 5, 'content' => 'This is the Africa we always dreamed of — raw, real, and utterly untouched. The guides are exceptional, the campfire evenings unforgettable, and the peace you feel here is unlike anywhere else on the continent.'],
            ['name' => 'Akira Yamamoto',         'country' => 'Japan',           'rating' => 5, 'content' => 'I came for the birds — Lake Jipe is a birder\'s paradise — but I stayed for everything else. The BBQ evenings, the hiking, the stars at night. The team made every moment feel personalised and special.'],
            ['name' => 'Fatima Al-Hassan',       'country' => 'UAE',             'rating' => 5, 'content' => 'We travel to Africa every year and Jipe Farm Campsite is now a permanent fixture on our itinerary. The combination of total wilderness and genuine comfort is incredibly rare. A place that restores your soul.'],
        ];
        foreach ($testimonials as $t) Testimonial::create(array_merge($t, ['is_active' => true]));
    }
}
