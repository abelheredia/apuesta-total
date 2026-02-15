export interface Bets {
  bets: Bet[];
}

export interface Bet {
  id: string;
  matchId: string;
  placedAt: string;
  pick: Pick;
  odd: number;
  stake: number;
  status: Status;
  return: number | null;
}

export enum Pick {
  Away = 'AWAY',
  Draw = 'DRAW',
  Home = 'HOME'
}

export enum Status {
  Lost = 'LOST',
  Pending = 'PENDING',
  Won = 'WON'
}
