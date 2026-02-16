
export interface Usuario {
  id: number;
  username: string;
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


export interface MensajeChat {
  id?: number;
  matchId: number;
  username: string;
  message: string;
  timestamp?: string | Date;
}
