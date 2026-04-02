import { Head, Link } from '@inertiajs/react';
import { PageProps, ContactMessage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

type Stats = {
    heroSlides: number; activities: number; packages: number; gallery: number;
    testimonials: number; messages: number; unreadMessages: number;
    bookings: number; newBookings: number;
    subscriptions: number; smsSubscribers: number; emailSubscribers: number;
};

export default function Dashboard({ stats, recentMessages }: PageProps<{ stats: Stats; recentMessages: ContactMessage[] }>) {
    const cards = [
        { label: 'Hero Slides', value: stats.heroSlides, href: '/admin/hero', color: 'from-amber-500/20 to-transparent', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { label: 'Activities', value: stats.activities, href: '/admin/activities', color: 'from-emerald-500/20 to-transparent', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { label: 'Tour Packages', value: stats.packages, href: '/admin/packages', color: 'from-blue-500/20 to-transparent', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { label: 'Gallery Images', value: stats.gallery, href: '/admin/gallery', color: 'from-purple-500/20 to-transparent', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials', color: 'from-rose-500/20 to-transparent', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        { label: 'Messages', value: stats.messages, href: '/admin/messages', color: 'from-orange-500/20 to-transparent', badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : null, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { label: 'Bookings', value: stats.bookings, href: '/admin/bookings', color: 'from-cyan-500/20 to-transparent', badge: stats.newBookings > 0 ? `${stats.newBookings} new` : null, icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5' },
        { label: 'Subscribers', value: stats.subscriptions, href: '/admin/subscriptions', color: 'from-teal-500/20 to-transparent', badge: stats.subscriptions > 0 ? `${stats.smsSubscribers} SMS · ${stats.emailSubscribers} Email` : null, icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard — Admin"/>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                <p className="text-white/45 text-sm mt-1">Here's an overview of your Jipe Farm Campsite website.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {cards.map((card) => (
                    <Link key={card.label} href={card.href} className="group relative bg-[#071510] border border-white/8 rounded-2xl p-6 hover:border-[#d4a853]/30 transition-all hover:-translate-y-0.5 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`}/>
                        <div className="relative z-10 flex items-start justify-between">
                            <div>
                                <p className="text-white/50 text-sm mb-2">{card.label}</p>
                                <p className="text-white font-bold text-3xl">{card.value}</p>
                                {(card as any).badge && (
                                    <span className="inline-block mt-2 bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">{(card as any).badge}</span>
                                )}
                            </div>
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#d4a853]/15 transition-colors">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-white/40 group-hover:text-[#d4a853] transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={card.icon}/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent messages */}
            <div className="bg-[#071510] border border-white/8 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                    <h2 className="text-white font-semibold">Recent Messages</h2>
                    <Link href="/admin/messages" className="text-[#d4a853] text-xs hover:underline">View all</Link>
                </div>
                {recentMessages.length === 0 ? (
                    <p className="text-white/40 text-sm text-center py-10">No messages yet.</p>
                ) : (
                    <div className="divide-y divide-white/5">
                        {recentMessages.map((msg) => (
                            <Link key={msg.id} href={`/admin/messages/${msg.id}`} className="flex items-start gap-4 px-6 py-4 hover:bg-white/3 transition-colors group">
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.is_read ? 'bg-white/15' : 'bg-[#d4a853]'}`}/>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-sm font-medium truncate ${msg.is_read ? 'text-white/60' : 'text-white'}`}>{msg.name}</p>
                                        <p className="text-white/30 text-xs shrink-0">{new Date(msg.created_at).toLocaleDateString()}</p>
                                    </div>
                                    {msg.subject && <p className="text-white/40 text-xs mt-0.5 truncate">{msg.subject}</p>}
                                    <p className="text-white/35 text-xs mt-1 truncate">{msg.message}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
