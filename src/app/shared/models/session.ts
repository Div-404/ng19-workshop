export interface Session {
  id?: number;
  userId: number;
  token: string;        // fake JWT
  expires: string;      // ISO date
}