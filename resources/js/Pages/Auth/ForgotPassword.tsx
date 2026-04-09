import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password — Jipe Farm Campsite" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
                <p className="text-white/45 text-sm">We'll send a reset link straight to your inbox.</p>
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-8">
                Enter the email address linked to your admin account and we'll email you a password reset link.
            </p>

            {status && (
                <div className="mb-6 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoFocus
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/70 focus:bg-white/8 text-white placeholder-white/25 rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                        placeholder="info@jipefarmcampsite.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 disabled:cursor-not-allowed text-[#071510] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/25 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                    {processing ? 'Sending…' : 'Email Reset Link'}
                </button>
            </form>
        </GuestLayout>
    );
}
