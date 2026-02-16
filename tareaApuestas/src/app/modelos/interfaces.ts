export interface AuthResponse {
  token: string;
  user: User;
}
export interface MatchEvent {
  type: string;
  team: string;
  player: string;
  playerId?: number | null;
  playerAvatar?: string;
  minute: number;
  score?: string;
}

export interface Match {
  id: number;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  date?: string;
  time?: string;
  league?: string;
  status: 'pending' | 'live' | 'finished';
  jornada: number;
  events?: MatchEvent[];
}

export interface Bet {
  id?: number;
  userId: number;
  matchId: number;
  homeScore: number;
  awayScore: number;
  pointsEarned?: number;
  match?: Match;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  team_name: string;
  goals: number;
  price: number;
}

export interface Standing {
  team?: string;
  teamName?: string;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  matchesPlayed: number;
  wins?: number;
  draws?: number;
  losses?: number;
  position?: number;
}
export interface User {
  id: number;
  username: string;
  email: string;
  points: number;
  avatar: string;
}