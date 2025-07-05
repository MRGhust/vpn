export interface Plan {
  id: string;
  duration: number; // in months
  volume: number; // in GB
  basePrice: number; // in Toman
}

export interface User {
  email: string;
  isAdmin: boolean;
}
