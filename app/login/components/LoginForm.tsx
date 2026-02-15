'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: '/'
    });

    if (result?.ok) {
      router.push('/');
      router.refresh();
    } else {
      toast.error('Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
          Email
        </label>
        <input
          type="email"
          placeholder="usuario@betday.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-400 disabled:bg-slate-700 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-2"
      >
        {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
      </button>
    </form>
  );
}
