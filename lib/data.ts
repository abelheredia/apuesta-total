import { Matches, Match, Bet } from '@/types';
import fs from 'fs/promises';
import path from 'path';

export async function getDailyMatches(): Promise<Matches> {
  try {
    const filePath = path.join(process.cwd(), 'data/matches.json');

    const fileContent = await fs.readFile(filePath, 'utf8');
    const rawData = JSON.parse(fileContent);

    const formattedMatches: Match[] = rawData.matches.map((match: Match) => ({
      ...match,
      startTime: new Date(match.startTime)
    }));

    return {
      ...rawData,
      date: new Date(rawData.date),
      matches: formattedMatches
    };
  } catch (error) {
    console.error('Error cargando partidos:', error);

    return {
      date: new Date(),
      timezone: 'UTC',
      matches: []
    };
  }
}

export async function getMatchById(id: string): Promise<Match | undefined> {
  try {
    const matches = await getDailyMatches();
    const match = matches.matches.find((match: Match) => match.id === id);
    return match;
  } catch (error) {
    console.error('Error cargando partido:', error);
    return;
  }
}

export async function getUserBets(): Promise<Bet[]> {
  try {
    const filePath = path.join(process.cwd(), 'data/bets.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    return data.bets.map((bet: Bet) => ({
      ...bet,
      placedAt: new Date(bet.placedAt)
    }));
  } catch (error) {
    console.error('Error cargando apuestas:', error);
    return [];
  }
}

export async function getBetById(
  id: string
): Promise<{ bet: Bet; match: Match } | undefined> {
  try {
    const data = await getUserBets();
    const bet = data.find((bet: Bet) => bet.id === id);
    if (bet) {
      const match = await getMatchById(bet.matchId);
      if (match) {
        return { bet, match };
      }
    }
    return;
  } catch (error) {
    console.log('Error cargando apuesta', error);
    return;
  }
}
