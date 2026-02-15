import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getUserBets } from '@/lib/data';
import BetCard from './components/BetCard';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  const allBets = await getUserBets();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold italic tracking-tighter">
            MIS APUESTAS
          </h1>
          <p className="text-slate-400 text-sm">
            Gestiona tu historial de juego
          </p>
        </header>

        {allBets.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {allBets.map((bet) => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-2xl">
      <p className="text-slate-500">Aún no tienes apuestas registradas.</p>
      <Link
        href="/"
        className="text-green-400 hover:underline mt-2 inline-block"
      >
        Ir a eventos en vivo →
      </Link>
    </div>
  );
}
