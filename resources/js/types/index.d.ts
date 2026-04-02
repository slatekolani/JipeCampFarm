export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: { user: User };
    flash?: { success?: string; error?: string; booking_success?: boolean };
};

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string | null;
    description: string | null;
    image_url: string;
    cta_text: string;
    cta_url: string;
    sort_order: number;
    is_active: boolean;
}

export interface AboutSection {
    id: number;
    heading: string;
    subheading: string | null;
    body: string;
    body_secondary: string | null;
    image_url: string | null;
    stats: { value: string; label: string }[] | null;
    features: string[] | null;
    is_active: boolean;
}

export interface Activity {
    id: number;
    title: string;
    tagline: string | null;
    description: string;
    details: string | null;
    image_url: string;
    duration: string | null;
    difficulty: string | null;
    highlight_badge: string | null;
    is_featured: boolean;
    sort_order: number;
    is_active: boolean;
}

export interface Package {
    id: number;
    name: string;
    tagline: string | null;
    description: string;
    price: string;
    price_note: string | null;
    duration: string;
    image_url: string;
    badge: string | null;
    features: string[];
    is_featured: boolean;
    sort_order: number;
    is_active: boolean;
}

export interface GalleryImage {
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    category: string;
    sort_order: number;
    is_active: boolean;
}

export interface Testimonial {
    id: number;
    name: string;
    country: string;
    rating: number;
    content: string;
    is_active: boolean;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}
