'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-black text-xl italic text-green-500">
          BDL
        </Link>

        <div className="flex gap-4 items-center text-sm font-medium">
          {session ? (
            <>
              <Link href="/profile" className="text-slate-300 hover:text-white">
                {session.user?.name}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-slate-800 px-3 py-1 rounded-md text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
              >
                Cerrar Session
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 text-slate-950 px-4 py-1.5 rounded-full font-bold"
            >
              Iniciar Sesion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
