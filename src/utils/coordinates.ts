import type { TimezoneInfo } from '../types';
import { timezones } from '../data/timezones';
import { cities } from '../data/cities';

// 두 좌표 간 거리 계산 (Haversine 공식)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 지구 반경 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 좌표에서 가장 가까운 도시의 시간대 찾기
export function getTimezoneByCoordinates(lat: number, lng: number): TimezoneInfo | null {
  let closestCity = cities[0];
  let minDistance = getDistance(lat, lng, cities[0].coordinates.lat, cities[0].coordinates.lng);

  for (const city of cities) {
    const distance = getDistance(lat, lng, city.coordinates.lat, city.coordinates.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  // 가장 가까운 도시의 시간대 찾기
  const tz = timezones.find(t => t.id === closestCity.timezone);
  return tz || timezones[0];
}

// 특정 좌표에 대한 시간대 정보 반환
export function getTimezoneInfoForLocation(lat: number, lng: number): {
  timezone: TimezoneInfo | null;
  estimatedOffset: number;
  offsetString: string;
  nearestCity: string;
} {
  let closestCity = cities[0];
  let minDistance = getDistance(lat, lng, cities[0].coordinates.lat, cities[0].coordinates.lng);

  for (const city of cities) {
    const distance = getDistance(lat, lng, city.coordinates.lat, city.coordinates.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  const tz = timezones.find(t => t.id === closestCity.timezone);
  const offset = tz?.utcOffset || 0;
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset >= 0 ? '+' : '-';
  const offsetString = `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return {
    timezone: tz || null,
    estimatedOffset: offset,
    offsetString,
    nearestCity: `${closestCity.name}, ${closestCity.country}`,
  };
}
