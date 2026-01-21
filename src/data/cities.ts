import type { City } from '../types';
import type { Language } from '../i18n/translations';

interface CityData {
  id: string;
  name: { ko: string; en: string; ja: string };
  country: { ko: string; en: string; ja: string };
  timezone: string;
  coordinates: { lat: number; lng: number };
}

const citiesData: CityData[] = [
  { id: 'seoul', name: { ko: '서울', en: 'Seoul', ja: 'ソウル' }, country: { ko: '대한민국', en: 'South Korea', ja: '韓国' }, timezone: 'Asia/Seoul', coordinates: { lat: 37.5665, lng: 126.9780 } },
  { id: 'tokyo', name: { ko: '도쿄', en: 'Tokyo', ja: '東京' }, country: { ko: '일본', en: 'Japan', ja: '日本' }, timezone: 'Asia/Tokyo', coordinates: { lat: 35.6762, lng: 139.6503 } },
  { id: 'beijing', name: { ko: '베이징', en: 'Beijing', ja: '北京' }, country: { ko: '중국', en: 'China', ja: '中国' }, timezone: 'Asia/Shanghai', coordinates: { lat: 39.9042, lng: 116.4074 } },
  { id: 'shanghai', name: { ko: '상하이', en: 'Shanghai', ja: '上海' }, country: { ko: '중국', en: 'China', ja: '中国' }, timezone: 'Asia/Shanghai', coordinates: { lat: 31.2304, lng: 121.4737 } },
  { id: 'hongkong', name: { ko: '홍콩', en: 'Hong Kong', ja: '香港' }, country: { ko: '홍콩', en: 'Hong Kong', ja: '香港' }, timezone: 'Asia/Hong_Kong', coordinates: { lat: 22.3193, lng: 114.1694 } },
  { id: 'singapore', name: { ko: '싱가포르', en: 'Singapore', ja: 'シンガポール' }, country: { ko: '싱가포르', en: 'Singapore', ja: 'シンガポール' }, timezone: 'Asia/Singapore', coordinates: { lat: 1.3521, lng: 103.8198 } },
  { id: 'bangkok', name: { ko: '방콕', en: 'Bangkok', ja: 'バンコク' }, country: { ko: '태국', en: 'Thailand', ja: 'タイ' }, timezone: 'Asia/Bangkok', coordinates: { lat: 13.7563, lng: 100.5018 } },
  { id: 'mumbai', name: { ko: '뭄바이', en: 'Mumbai', ja: 'ムンバイ' }, country: { ko: '인도', en: 'India', ja: 'インド' }, timezone: 'Asia/Kolkata', coordinates: { lat: 19.0760, lng: 72.8777 } },
  { id: 'delhi', name: { ko: '델리', en: 'Delhi', ja: 'デリー' }, country: { ko: '인도', en: 'India', ja: 'インド' }, timezone: 'Asia/Kolkata', coordinates: { lat: 28.7041, lng: 77.1025 } },
  { id: 'dubai', name: { ko: '두바이', en: 'Dubai', ja: 'ドバイ' }, country: { ko: 'UAE', en: 'UAE', ja: 'UAE' }, timezone: 'Asia/Dubai', coordinates: { lat: 25.2048, lng: 55.2708 } },
  { id: 'moscow', name: { ko: '모스크바', en: 'Moscow', ja: 'モスクワ' }, country: { ko: '러시아', en: 'Russia', ja: 'ロシア' }, timezone: 'Europe/Moscow', coordinates: { lat: 55.7558, lng: 37.6173 } },
  { id: 'istanbul', name: { ko: '이스탄불', en: 'Istanbul', ja: 'イスタンブール' }, country: { ko: '터키', en: 'Turkey', ja: 'トルコ' }, timezone: 'Europe/Istanbul', coordinates: { lat: 41.0082, lng: 28.9784 } },
  { id: 'london', name: { ko: '런던', en: 'London', ja: 'ロンドン' }, country: { ko: '영국', en: 'UK', ja: 'イギリス' }, timezone: 'Europe/London', coordinates: { lat: 51.5074, lng: -0.1278 } },
  { id: 'paris', name: { ko: '파리', en: 'Paris', ja: 'パリ' }, country: { ko: '프랑스', en: 'France', ja: 'フランス' }, timezone: 'Europe/Paris', coordinates: { lat: 48.8566, lng: 2.3522 } },
  { id: 'berlin', name: { ko: '베를린', en: 'Berlin', ja: 'ベルリン' }, country: { ko: '독일', en: 'Germany', ja: 'ドイツ' }, timezone: 'Europe/Berlin', coordinates: { lat: 52.5200, lng: 13.4050 } },
  { id: 'rome', name: { ko: '로마', en: 'Rome', ja: 'ローマ' }, country: { ko: '이탈리아', en: 'Italy', ja: 'イタリア' }, timezone: 'Europe/Rome', coordinates: { lat: 41.9028, lng: 12.4964 } },
  { id: 'madrid', name: { ko: '마드리드', en: 'Madrid', ja: 'マドリード' }, country: { ko: '스페인', en: 'Spain', ja: 'スペイン' }, timezone: 'Europe/Madrid', coordinates: { lat: 40.4168, lng: -3.7038 } },
  { id: 'amsterdam', name: { ko: '암스테르담', en: 'Amsterdam', ja: 'アムステルダム' }, country: { ko: '네덜란드', en: 'Netherlands', ja: 'オランダ' }, timezone: 'Europe/Amsterdam', coordinates: { lat: 52.3676, lng: 4.9041 } },
  { id: 'zurich', name: { ko: '취리히', en: 'Zurich', ja: 'チューリッヒ' }, country: { ko: '스위스', en: 'Switzerland', ja: 'スイス' }, timezone: 'Europe/Zurich', coordinates: { lat: 47.3769, lng: 8.5417 } },
  { id: 'newyork', name: { ko: '뉴욕', en: 'New York', ja: 'ニューヨーク' }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' }, timezone: 'America/New_York', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: 'losangeles', name: { ko: '로스앤젤레스', en: 'Los Angeles', ja: 'ロサンゼルス' }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' }, timezone: 'America/Los_Angeles', coordinates: { lat: 34.0522, lng: -118.2437 } },
  { id: 'chicago', name: { ko: '시카고', en: 'Chicago', ja: 'シカゴ' }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' }, timezone: 'America/Chicago', coordinates: { lat: 41.8781, lng: -87.6298 } },
  { id: 'toronto', name: { ko: '토론토', en: 'Toronto', ja: 'トロント' }, country: { ko: '캐나다', en: 'Canada', ja: 'カナダ' }, timezone: 'America/Toronto', coordinates: { lat: 43.6532, lng: -79.3832 } },
  { id: 'vancouver', name: { ko: '밴쿠버', en: 'Vancouver', ja: 'バンクーバー' }, country: { ko: '캐나다', en: 'Canada', ja: 'カナダ' }, timezone: 'America/Vancouver', coordinates: { lat: 49.2827, lng: -123.1207 } },
  { id: 'mexicocity', name: { ko: '멕시코시티', en: 'Mexico City', ja: 'メキシコシティ' }, country: { ko: '멕시코', en: 'Mexico', ja: 'メキシコ' }, timezone: 'America/Mexico_City', coordinates: { lat: 19.4326, lng: -99.1332 } },
  { id: 'saopaulo', name: { ko: '상파울루', en: 'São Paulo', ja: 'サンパウロ' }, country: { ko: '브라질', en: 'Brazil', ja: 'ブラジル' }, timezone: 'America/Sao_Paulo', coordinates: { lat: -23.5505, lng: -46.6333 } },
  { id: 'buenosaires', name: { ko: '부에노스아이레스', en: 'Buenos Aires', ja: 'ブエノスアイレス' }, country: { ko: '아르헨티나', en: 'Argentina', ja: 'アルゼンチン' }, timezone: 'America/Argentina/Buenos_Aires', coordinates: { lat: -34.6037, lng: -58.3816 } },
  { id: 'sydney', name: { ko: '시드니', en: 'Sydney', ja: 'シドニー' }, country: { ko: '호주', en: 'Australia', ja: 'オーストラリア' }, timezone: 'Australia/Sydney', coordinates: { lat: -33.8688, lng: 151.2093 } },
  { id: 'melbourne', name: { ko: '멜버른', en: 'Melbourne', ja: 'メルボルン' }, country: { ko: '호주', en: 'Australia', ja: 'オーストラリア' }, timezone: 'Australia/Melbourne', coordinates: { lat: -37.8136, lng: 144.9631 } },
  { id: 'auckland', name: { ko: '오클랜드', en: 'Auckland', ja: 'オークランド' }, country: { ko: '뉴질랜드', en: 'New Zealand', ja: 'ニュージーランド' }, timezone: 'Pacific/Auckland', coordinates: { lat: -36.8485, lng: 174.7633 } },
  { id: 'cairo', name: { ko: '카이로', en: 'Cairo', ja: 'カイロ' }, country: { ko: '이집트', en: 'Egypt', ja: 'エジプト' }, timezone: 'Africa/Cairo', coordinates: { lat: 30.0444, lng: 31.2357 } },
  { id: 'johannesburg', name: { ko: '요하네스버그', en: 'Johannesburg', ja: 'ヨハネスブルグ' }, country: { ko: '남아프리카', en: 'South Africa', ja: '南アフリカ' }, timezone: 'Africa/Johannesburg', coordinates: { lat: -26.2041, lng: 28.0473 } },
  { id: 'lagos', name: { ko: '라고스', en: 'Lagos', ja: 'ラゴス' }, country: { ko: '나이지리아', en: 'Nigeria', ja: 'ナイジェリア' }, timezone: 'Africa/Lagos', coordinates: { lat: 6.5244, lng: 3.3792 } },
];

export function getCities(lang: Language): City[] {
  return citiesData.map(c => ({
    id: c.id,
    name: c.name[lang],
    country: c.country[lang],
    timezone: c.timezone,
    coordinates: c.coordinates,
  }));
}

export function getCityById(id: string, lang: Language): City | undefined {
  const c = citiesData.find(city => city.id === id);
  if (!c) return undefined;
  return {
    id: c.id,
    name: c.name[lang],
    country: c.country[lang],
    timezone: c.timezone,
    coordinates: c.coordinates,
  };
}

// For backward compatibility
export const cities: City[] = getCities('ko');
export const defaultCities = ['seoul', 'tokyo', 'newyork', 'london', 'sydney'];
