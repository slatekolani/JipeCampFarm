import { useEffect, FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import BrandLogo from '@/Components/BrandLogo';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '', remember: false });

    useEffect(() => () => { reset('password'); }, []);

    const submit: FormEventHandler = (e) => { e.preventDefault(); post(route('login')); };

    return (
        <>
            <Head title="Admin Login — Jipe Farm Campsite"/>
            <style>{`::-webkit-scrollbar{display:none}`}</style>

            <div className="min-h-screen flex bg-white">
                {/* Left: scenic panel */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                        <img src="/Images/Canoeing.jpg" alt="Canoeing on Lake Jipe" className="absolute inset-0 w-full h-full object-cover"/>

                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/25 to-transparent"/>
                    <div className="relative z-10 flex flex-col justify-between p-10 w-full">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <BrandLogo className="h-16 w-16 shrink-0" />
                            <div>
                                <p className="text-white font-bold text-lg leading-none">Jipe Farm Campsite</p>
                                <p className="text-[#f1ce47] text-[10px] tracking-[0.2em] uppercase mt-1">Lake Jipe · Tanzania</p>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="max-w-sm">
                            <div className="w-10 h-px bg-[#d4a853] mb-6"/>
                            <blockquote className="text-white/90 text-2xl font-light leading-relaxed italic mb-6">
                                "The wilderness is not a luxury but a necessity of the human spirit."
                            </blockquote>
                            <p className="text-[#d4a853] text-sm font-semibold">— Edward Abbey</p>
                            <div className="mt-8 flex items-center gap-3">
                                <div className="w-8 h-px bg-white/20"/>
                                <p className="text-white/40 text-xs tracking-widest uppercase">Lake Jipe · Tanzania · 3°S, 37°E</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: login form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {/* Mobile logo */}
                        <div className="flex items-center gap-3 mb-10 lg:hidden">
                            <BrandLogo className="h-16 w-16 shrink-0" />
                            <div>
                                <p className="text-gray-900 font-bold text-lg leading-none">Jipe Farm Campsite</p>
                                <p className="text-[#f1ce47] text-[10px] tracking-[0.2em] uppercase mt-1">Tanzania</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
                            <p className="text-gray-500 text-sm">Sign in to manage your camp website content.</p>
                        </div>

                        {status && (
                            <div className="mb-6 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-gray-600 text-xs uppercase tracking-wider mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    autoFocus
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#d4a853]/70 focus:bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                                    placeholder="adminjipe@jipecamp.com"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-xs uppercase tracking-wider mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#d4a853]/70 focus:bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                                    placeholder="••••••••••"
                                />
                                {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 bg-white accent-[#d4a853]"
                                    />
                                    <span className="text-gray-600 text-sm">Remember me</span>
                                </label>
                                {canResetPassword && (
                                    <a href={route('password.request')} className="text-[#d4a853]/80 hover:text-[#d4a853] text-sm transition-colors">
                                        Forgot password?
                                    </a>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 disabled:cursor-not-allowed text-[#071510] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/25 hover:-translate-y-0.5 text-sm tracking-wide"
                            >
                                {processing ? 'Signing in…' : 'Sign In to Dashboard'}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <a href="/" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">
                                ← Return to public website
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
