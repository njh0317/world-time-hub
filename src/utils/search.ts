import type { City, TimezoneInfo } from '../types';

export function searchCities(query: string, cities: City[]): City[] {
  if (!query.trim()) return cities;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowerQuery) ||
    city.country.toLowerCase().includes(lowerQuery)
  );
}

export function searchTimezones(query: string, timezones: TimezoneInfo[]): TimezoneInfo[] {
  if (!query.trim()) return timezones;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return timezones.filter(tz =>
    tz.name.toLowerCase().includes(lowerQuery) ||
    tz.abbreviation.toLowerCase().includes(lowerQuery) ||
    tz.cities.some(city => city.toLowerCase().includes(lowerQuery)) ||
    tz.country.toLowerCase().includes(lowerQuery)
  );
}

export function sortTimezonesByOffset(timezones: TimezoneInfo[]): TimezoneInfo[] {
  return [...timezones].sort((a, b) => a.utcOffset - b.utcOffset);
}
