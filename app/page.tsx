import { Matches } from '@/types';
import Timeline from './components/TimeLine';
import { getDailyMatches } from '@/lib/data';

export default async function HomePage() {
  const data: Matches = await getDailyMatches();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          BetDay Lite
        </h1>
      </header>

      <div className="max-w-4xl mx-auto">
        <Timeline initialData={data} />
      </div>
    </main>
  );
}
