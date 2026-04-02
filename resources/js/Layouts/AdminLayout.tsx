import { useState, ReactNode } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';

const WaveIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#d4a853"/>
        {/* Tent body */}
        <path d="M20 9 L6 29 L34 29 Z" fill="#071510"/>
        {/* Door arch */}
        <path d="M15 29 L15 23 Q20 17 25 23 L25 29 Z" fill="#d4a853"/>
        {/* Ground line */}
        <line x1="5" y1="31" x2="35" y2="31" stroke="#071510" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        {/* Star */}
        <circle cx="30" cy="13" r="1.3" fill="#071510" opacity="0.65"/>
    </svg>
);

const navGroups = [
    {
        label: 'Overview',
        items: [
            { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        ],
    },
    {
        label: 'Website Content',
        items: [
            { href: '/admin/hero', label: 'Hero Carousel', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { href: '/admin/about', label: 'About Section', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { href: '/admin/activities', label: 'Activities', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { href: '/admin/packages', label: 'Tour Packages', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { href: '/admin/gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { href: '/admin/testimonials', label: 'Testimonials', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
        ],
    },
    {
        label: 'Communication',
        items: [
            { href: '/admin/bookings', label: 'Bookings', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5' },
            { href: '/admin/messages', label: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            { href: '/admin/subscriptions', label: 'Subscribers', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' },
        ],
    },
];

export default function AdminLayout({ children, title }: { children: ReactNode; title?: string }) {
    const { auth, flash } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const logout = () => router.post('/logout');

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
                <div className="w-9 h-9"><WaveIcon /></div>
                <div>
                    <p className="text-white font-bold text-sm leading-none">Jipe Farm</p>
                    <p className="text-[#d4a853] text-[9px] tracking-widest uppercase mt-0.5">Admin Panel</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navGroups.map((group) => (
                    <div key={group.label} className="mb-6">
                        <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase px-3 mb-2">{group.label}</p>
                        {group.items.map((item) => {
                            const active = currentPath === item.href || currentPath.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-all duration-150 ${
                                        active
                                            ? 'bg-[#d4a853]/15 text-[#d4a853]'
                                            : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4.5 h-4.5 shrink-0 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                                    </svg>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* User */}
            <div className="border-t border-white/8 px-4 py-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#d4a853]/20 flex items-center justify-center text-[#d4a853] font-bold text-sm">
                        {auth.user.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{auth.user.name}</p>
                        <p className="text-white/40 text-xs truncate">{auth.user.email}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link href="/" className="flex-1 text-center text-white/50 hover:text-white text-xs py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                        View Site
                    </Link>
                    <button onClick={logout} className="flex-1 text-center text-white/50 hover:text-red-400 text-xs py-1.5 rounded-lg border border-white/10 hover:border-red-400/30 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#040e08] flex">
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-60 bg-[#071510] border-r border-white/8 fixed inset-y-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative w-60 bg-[#071510] border-r border-white/8 flex flex-col">
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#071510]/90 backdrop-blur-sm border-b border-white/8 px-5 lg:px-8 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white p-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>
                        </button>
                        {title && <h1 className="text-white font-semibold text-sm">{title}</h1>}
                    </div>
                    {flash?.success && (
                        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2 rounded-lg">
                            {flash.success}
                        </div>
                    )}
                </header>

                {/* Page */}
                <main className="flex-1 p-5 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
