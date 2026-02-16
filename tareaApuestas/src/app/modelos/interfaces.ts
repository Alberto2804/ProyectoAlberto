export interface Usuario {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
  points: number;
}

export interface AuthResponse {
  token: string;
  user: Usuario;
}

export interface Partido {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'pending' | 'live' | 'finished'; 
  minute: number;
  startTime: string | Date;
  home?: string;
  away?: string;
  time?: string | Date;
  jornada?: number;
  league?: string;
  events?: EventoPartido[];
}

export interface EventoPartido {
  id?: number;
  matchId: number;
  type: string;
  minute: number;
  player: string;
  team: string; 
}

export interface Equipo {
  name: string;
  strength: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}


export interface Clasificacion extends Equipo {
  position?: number; 
}

export interface Jugador {
  id: number;
  name: string;
  team: string;
  goals: number;
}


export interface Apuesta {
  id?: number;
  userId: number;
  matchId: number;
  homeScore: number;
  awayScore: number;
  pointsEarned?: number;
  status?: 'pending' | 'resolved';
}