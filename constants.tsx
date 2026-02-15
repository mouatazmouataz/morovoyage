import React from 'react';

// Using reliable Unsplash URLs for high-quality images
export const CITY_IMAGES: Record<string, string> = {
  "Marrakech": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1200&auto=format&fit=crop",
  "Casablanca": "https://images.unsplash.com/photo-1559586653-12869960000e?q=80&w=1200&auto=format&fit=crop",
  "Tangier": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop",
  "Rabat": "https://images.unsplash.com/photo-1559586652-a79a2af9a47d?q=80&w=1200&auto=format&fit=crop",
  "Fès": "https://images.unsplash.com/photo-1549944850-84e00be4203b?q=80&w=1200&auto=format&fit=crop",
  "Chefchaouen": "https://images.unsplash.com/photo-1548047457-1968e637cb3a?q=80&w=1200&auto=format&fit=crop",
  "Agadir": "https://images.unsplash.com/photo-1611839699322-6174d7366d94?q=80&w=1200&auto=format&fit=crop",
  "Essaouira": "https://images.unsplash.com/photo-1551882547-ff43c63ebe0c?q=80&w=1200&auto=format&fit=crop",
  "Merzouga": "https://images.unsplash.com/photo-1489493585363-d69421e0dee3?q=80&w=1200&auto=format&fit=crop",
  "Default": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop"
};

export const FOOD_IMAGES: Record<string, string> = {
  "Tagine": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop",
  "Couscous": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  "Mint Tea": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
  "Default": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop"
};

export const STORAGE_URL = "https://shsombkknqjirzyvrsqc.supabase.co/storage/v1/object/public/morovoyage%20where%20to%20go/";
export const FOOD_STORAGE_URL = "https://shsombkknqjirzyvrsqc.supabase.co/storage/v1/object/public/what%20to%20eat/";

export const CITIES = [
  "Agadir", "Al Hoceima", "Asilah", "Azrou", "Beni Mellal", "Berkane", "Boujdour", 
  "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", "Essaouira", 
  "Fès", "Guelmim", "Ifrane", "Kenitra", "Khemisset", "Khouribga", "Laayoune", 
  "Larache", "Marrakech", "Martil", "Meknès", "Mohammedia", "Nador", "Ouarzazate", 
  "Oujda", "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Sidi Kacem", "Sidi Slimane", 
  "Skhirat", "Tan-Tan", "Tangier", "Taourirt", "Taroudant", "Taza", "Témara", 
  "Tetouan", "Tiznit", "Youssoufia", "Zagora"
];

export const OPERATORS = {
  TRAIN: ["ONCF"],
  BUS: ["CTM", "Supratours"],
  FLIGHT: ["Royal Air Maroc", "Air Arabia"]
};

export const Icons = {
  Train: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/></svg>
  ),
  Bus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1.3 1-3c0-1.7-1-3-1-3h-3"/><path d="M4 18h13"/><rect width="16" height="12" x="2" y="6" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="15" cy="18" r="2"/></svg>
  ),
  Flight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
  )
};
