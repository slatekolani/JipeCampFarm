import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => () => { reset('password', 'password_confirmation'); }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/70 focus:bg-white/8 text-white placeholder-white/25 rounded-xl px-4 py-3.5 text-sm outline-none transition-all";

    return (
        <GuestLayout>
            <Head title="Reset Password — Jipe Farm Campsite" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Set New Password</h1>
                <p className="text-white/45 text-sm">Choose a strong password for your admin account.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={inputCls}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2" htmlFor="password">
                        New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        autoFocus
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className={inputCls}
                        placeholder="••••••••••"
                    />
                    {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2" htmlFor="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        className={inputCls}
                        placeholder="••••••••••"
                    />
                    {errors.password_confirmation && <p className="text-red-400 text-xs mt-1.5">{errors.password_confirmation}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 disabled:cursor-not-allowed text-[#071510] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/25 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                    {processing ? 'Saving…' : 'Reset Password'}
                </button>
            </form>
        </GuestLayout>
    );
}
