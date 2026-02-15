import { Bet, Status } from '@/types';
import Link from 'next/link';

const statusStyles = {
  [Status.Won]: 'bg-green-500/10 text-green-500 border-green-500/20',
  [Status.Lost]: 'bg-red-500/10 text-red-500 border-red-500/20',
  [Status.Pending]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
};

export default function BetCard({ bet }: { bet: Bet }) {
  return (
    <Link
      href={`/bets/${bet.id}`}
      key={bet.id}
      className="block transition-transform active:scale-[0.99]"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors">
        <div className="p-4 flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">
              ID: {bet.id.slice(0, 8)}
            </p>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-slate-800 rounded text-xs font-mono">
                Pick: <span className="text-white">{bet.pick}</span>
              </span>
              <span className="px-2 py-0.5 bg-slate-800 rounded text-xs font-mono">
                Cuota: <span className="text-white">{bet.odd.toFixed(2)}</span>
              </span>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${statusStyles[bet.status]}`}
          >
            {bet.status}
          </div>
        </div>

        <div className="bg-slate-800/50 px-4 py-2 flex justify-between items-center border-t border-slate-800">
          <span className="text-xs text-slate-400">Importe: ${bet.stake}</span>
          <span className="text-sm font-bold">
            {bet.status === Status.Won ? (
              <span className="text-green-400">Retorno: ${bet.return}</span>
            ) : (
              <span className="text-slate-500">
                Posible: ${(bet.stake * bet.odd).toFixed(2)}
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
