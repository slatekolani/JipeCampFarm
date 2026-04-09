import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    useEffect(() => () => { reset('password'); }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password — Jipe Farm Campsite" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Confirm Password</h1>
                <p className="text-white/45 text-sm">This is a secure area — please re-enter your password to continue.</p>
            </div>

            {/* Lock icon */}
            <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#d4a853]/15 border border-[#d4a853]/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/70 focus:bg-white/8 text-white placeholder-white/25 rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                        placeholder="••••••••••"
                    />
                    {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 disabled:cursor-not-allowed text-[#071510] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/25 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                    {processing ? 'Confirming…' : 'Confirm & Continue'}
                </button>
            </form>
        </GuestLayout>
    );
}
