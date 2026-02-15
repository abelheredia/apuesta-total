'use client';

import { Match, Pick } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MatchCard({ match }: { match: Match }) {
  const [isPending, setIsPending] = useState(false);
  const [selectedPick, setSelectedPick] = useState<Pick | null>(null);

  const handleBet = async (pick: Pick, odd: number) => {
    if (selectedPick === pick) {
      setSelectedPick(null);
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch('/api/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: match.id,
          pick: pick,
          odd: odd
        })
      });

      if (response.ok) {
        toast.success('Apuesta colocada!');
        setSelectedPick(pick);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Error al procesar la apuesta');
      }
    } catch (error) {
      toast.error(`Hubo un problema de conexión: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-xl p-4 transition-all ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-medium px-2 py-1 bg-slate-800 text-slate-400 rounded">
          {match.league.name}
        </span>
      </div>

      <div className="flex justify-between items-center text-center mb-6">
        <div className="flex-1">
          <p className="font-bold text-sm">{match.homeTeam.name}</p>
        </div>
        <div className="px-4 text-slate-600 font-bold italic">VS</div>
        <div className="flex-1">
          <p className="font-bold text-sm">{match.awayTeam.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <OddButton
          label="1"
          value={match.market.odds.home}
          active={selectedPick === Pick.Home}
          onClick={() => handleBet(Pick.Home, match.market.odds.home)}
        />
        <OddButton
          label="X"
          value={match.market.odds.draw}
          active={selectedPick === Pick.Draw}
          onClick={() => handleBet(Pick.Draw, match.market.odds.draw)}
        />
        <OddButton
          label="2"
          value={match.market.odds.away}
          active={selectedPick === Pick.Away}
          onClick={() => handleBet(Pick.Away, match.market.odds.away)}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OddButton({ label, value, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg border transition-all duration-200 active:scale-90 ${
        active
          ? 'bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
          : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
      }`}
    >
      <span className="text-[10px] uppercase opacity-60">{label}</span>
      <span className="font-bold">{value.toFixed(2)}</span>
    </button>
  );
}
