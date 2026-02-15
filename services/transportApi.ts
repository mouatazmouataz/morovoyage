
import { Itinerary, SearchParams, Leg, TransportType } from '../types';

const HUB_CITIES = ["Casablanca", "Marrakech", "Tangier", "Rabat"];

export async function fetchLiveTrips(params: SearchParams): Promise<Itinerary[]> {
  // 1. Fetch direct trips
  const directTrips = await fetchDirectItineraries(params);
  
  // 2. If no direct trips or as alternative, fetch multi-leg options
  const multiLegTrips = await fetchMultiLegItineraries(params);

  return [...directTrips, ...multiLegTrips].sort((a, b) => a.totalPrice - b.totalPrice);
}

async function fetchDirectItineraries(params: SearchParams): Promise<Itinerary[]> {
  // Simulate fetching from real APIs (ONCF, CTM, RAM)
  // Logic here would call fetchONCF, fetchCTM etc. and map to Itinerary
  const legs = await fetchMockLegs(params.from, params.to, params.date);
  return legs.map(leg => ({
    id: `it-${leg.id}`,
    legs: [leg],
    totalPrice: leg.price,
    totalDuration: leg.duration,
    currency: leg.currency,
    isDirect: true,
    type: leg.type
  }));
}

async function fetchMultiLegItineraries(params: SearchParams): Promise<Itinerary[]> {
  const connectionOptions: Itinerary[] = [];

  // Logic: For each hub, try From -> Hub and Hub -> To
  for (const hub of HUB_CITIES) {
    if (hub === params.from || hub === params.to) continue;

    // Simulate parallel fetching for segments
    const [leg1s, leg2s] = await Promise.all([
      fetchMockLegs(params.from, hub, params.date),
      fetchMockLegs(hub, params.to, params.date)
    ]);

    if (leg1s.length > 0 && leg2s.length > 0) {
      // Just pick the best first option for the mock
      const leg1 = leg1s[0];
      const leg2 = leg2s[0];

      connectionOptions.push({
        id: `it-conn-${hub}-${Math.random()}`,
        legs: [leg1, leg2],
        totalPrice: leg1.price + leg2.price,
        totalDuration: "Calculated", // In real logic, arrival1 vs departure2
        currency: 'MAD',
        isDirect: false,
        type: leg1.type === leg2.type ? leg1.type : 'Mixed'
      });
    }
  }

  return connectionOptions;
}

// Internal mock helper for legs
async function fetchMockLegs(from: string, to: string, date: string): Promise<Leg[]> {
  // Simple logic to mock availability
  // In reality, Casablanca/Marrakech connect to almost everywhere
  const hasRoute = (from === "Casablanca" || to === "Casablanca" || from === "Marrakech" || to === "Marrakech");
  
  if (!hasRoute) return [];

  return [{
    id: `leg-${Math.random()}`,
    operator: from === "Tangier" || to === "Tangier" ? 'ONCF' : 'CTM',
    type: from === "Tangier" || to === "Tangier" ? 'Train' : 'Bus',
    from,
    to,
    departureTime: '10:00',
    arrivalTime: '14:00',
    duration: '4h 00m',
    price: Math.floor(Math.random() * 100) + 50,
    currency: 'MAD',
    bookingUrl: 'https://moro-voyage.ma/book'
  }];
}
