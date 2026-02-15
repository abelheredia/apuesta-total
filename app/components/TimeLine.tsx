'use client';

import { Matches, Match } from '@/types';
import MatchCard from './MatchCard';

interface TimelineProps {
  initialData: Matches;
}

export default function Timeline({ initialData }: TimelineProps) {
  const matchesByHour = initialData.matches.reduce(
    (acc, match) => {
      const hour = new Date(match.startTime).getHours();
      const key = `${hour}:00`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(match);
      return acc;
    },
    {} as Record<string, Match[]>
  );

  return (
    <div className="relative border-l border-slate-800 ml-4 md:ml-0">
      {Object.entries(matchesByHour).map(([hour, matches]) => (
        <section key={hour} className="mb-10 relative pl-8">
          <h2 className="text-lg font-semibold text-slate-300 mb-4">{hour}</h2>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
