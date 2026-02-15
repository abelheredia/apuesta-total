export interface Matches {
  date: Date;
  timezone: string;
  matches: Match[];
}

export interface Match {
  id: string;
  startTime: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  market: Market;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
}

export enum Country {
  England = 'England'
}

export enum ID {
  PremierLeague = 'premier_league'
}

export enum Name {
  PremierLeague = 'Premier League'
}

export interface Market {
  type: Type;
  odds: Odds;
}

export interface Odds {
  home: number;
  draw: number;
  away: number;
}

export enum Type {
  The1X2 = '1X2'
}
