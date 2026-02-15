import { getBetById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Status } from '@/types';

interface Props {
  params: Promise<{ betId: string }>;
}

export default async function BetDetailPage({ params }: Props) {
  const { betId } = await params;
  const response = await getBetById(betId);
  if (!response) {
    notFound();
  }
  const { bet, match } = response;

  const isWon = bet.status === Status.Won;
  const isLost = bet.status === Status.Lost;

  return (
    <main className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <Link
          href="/profile"
          className="text-slate-400 hover:text-white text-xs mb-6 inline-flex items-center gap-2 transition-colors uppercase font-bold tracking-widest"
        >
          ← Volver a mi perfil
        </Link>

        <div className="bg-white text-slate-900 rounded-sm shadow-2xl overflow-hidden relative">
          <div
            className="h-3 w-full bg-slate-900"
            style={{
              clipPath:
                'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'
            }}
          ></div>

          <div className="p-8">
            <header className="text-center mb-6">
              <h1 className="text-3xl font-black italic tracking-tighter">
                BETDAY <span className="text-green-600">LITE</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
                Comprobante de operación
              </p>
            </header>

            <div className="space-y-5 font-mono text-sm">
              <div className="border-b border-dashed border-slate-300 pb-3">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <span>TICKET ID</span>
                  <span>LIGA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs">
                    #{bet.id.toUpperCase()}
                  </span>
                  <span className="font-bold text-xs">{match.league.name}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase mb-2 text-center">
                    Encuentro
                  </p>
                  <div className="flex justify-between items-center text-center gap-2">
                    <span className="flex-1 font-black text-sm uppercase leading-tight">
                      {match.homeTeam.name}
                    </span>
                    <span className="text-slate-300 font-black italic text-xs">
                      VS
                    </span>
                    <span className="flex-1 font-black text-sm uppercase leading-tight text-right">
                      {match.awayTeam.name}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 text-white p-3 rounded-md mt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold">
                        Tu Selección
                      </p>
                      <p className="font-black text-lg text-green-400 leading-none mt-1">
                        {bet.pick === 'HOME'
                          ? match.homeTeam.name
                          : bet.pick === 'AWAY'
                            ? match.awayTeam.name
                            : 'Empate'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 uppercase font-bold">
                        Cuota
                      </p>
                      <p className="font-black text-lg leading-none mt-1">
                        {bet.odd.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 py-4 border-y border-dashed border-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500 uppercase">
                    Importe Apostado
                  </span>
                  <span className="font-bold">${bet.stake.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-xl pt-2">
                  <span className="uppercase">Retorno</span>
                  <span className={isWon ? 'text-green-600' : 'text-slate-900'}>
                    $
                    {bet.return
                      ? bet.return.toFixed(2)
                      : (bet.stake * bet.odd).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <div
                  className={`px-8 py-2 border-4 font-black italic text-2xl transform -rotate-3 transition-all ${
                    isWon
                      ? 'border-green-600 text-green-600 scale-110 shadow-[4px_4px_0px_0px_rgba(22,163,74,0.1)]'
                      : isLost
                        ? 'border-red-600 text-red-600 opacity-80'
                        : 'border-slate-300 text-slate-300'
                  }`}
                >
                  {bet.status}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center opacity-40">
              <p className="text-[8px] mt-2 font-mono text-center leading-tight uppercase">
                Emitido el {new Date(bet.placedAt).toLocaleDateString()} a las{' '}
                {new Date(bet.placedAt).toLocaleTimeString()}
                <br />
                {new Date(bet.placedAt).getTime()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
