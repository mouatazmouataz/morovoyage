
export type TransportType = 'Train' | 'Bus' | 'Flight';

export interface Leg {
  id: string;
  operator: string;
  type: TransportType;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  bookingUrl: string;
}

export interface Itinerary {
  id: string;
  legs: Leg[];
  totalPrice: number;
  totalDuration: string;
  currency: string;
  isDirect: boolean;
  type: TransportType | 'Mixed';
}

export interface Trip extends Itinerary {} // Backward compatibility

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  type?: TransportType;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
}

export interface User {
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  familyMembers: FamilyMember[];
}
