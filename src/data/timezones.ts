import type { TimezoneInfo } from '../types';
import type { Language } from '../i18n/translations';

interface TimezoneData {
  id: string;
  name: { ko: string; en: string; ja: string };
  abbreviation: string;
  utcOffset: number;
  dstOffset: number;
  isDst: boolean;
  cities: { ko: string[]; en: string[]; ja: string[] };
  country: { ko: string; en: string; ja: string };
}

const timezonesData: TimezoneData[] = [
  { id: 'Pacific/Midway', name: { ko: '미드웨이', en: 'Midway', ja: 'ミッドウェー' }, abbreviation: 'SST', utcOffset: -660, dstOffset: 0, isDst: false, cities: { ko: [], en: [], ja: [] }, country: { ko: '미국령', en: 'US Territory', ja: '米国領' } },
  { id: 'Pacific/Honolulu', name: { ko: '하와이', en: 'Hawaii', ja: 'ハワイ' }, abbreviation: 'HST', utcOffset: -600, dstOffset: 0, isDst: false, cities: { ko: ['호놀룰루'], en: ['Honolulu'], ja: ['ホノルル'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/Anchorage', name: { ko: '알래스카', en: 'Alaska', ja: 'アラスカ' }, abbreviation: 'AKST', utcOffset: -540, dstOffset: 60, isDst: false, cities: { ko: ['앵커리지'], en: ['Anchorage'], ja: ['アンカレッジ'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/Los_Angeles', name: { ko: '태평양 표준시', en: 'Pacific Time', ja: '太平洋標準時' }, abbreviation: 'PST', utcOffset: -480, dstOffset: 60, isDst: false, cities: { ko: ['로스앤젤레스', '샌프란시스코'], en: ['Los Angeles', 'San Francisco'], ja: ['ロサンゼルス', 'サンフランシスコ'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/Denver', name: { ko: '산악 표준시', en: 'Mountain Time', ja: '山岳標準時' }, abbreviation: 'MST', utcOffset: -420, dstOffset: 60, isDst: false, cities: { ko: ['덴버', '피닉스'], en: ['Denver', 'Phoenix'], ja: ['デンバー', 'フェニックス'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/Chicago', name: { ko: '중부 표준시', en: 'Central Time', ja: '中部標準時' }, abbreviation: 'CST', utcOffset: -360, dstOffset: 60, isDst: false, cities: { ko: ['시카고', '휴스턴'], en: ['Chicago', 'Houston'], ja: ['シカゴ', 'ヒューストン'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/New_York', name: { ko: '동부 표준시', en: 'Eastern Time', ja: '東部標準時' }, abbreviation: 'EST', utcOffset: -300, dstOffset: 60, isDst: false, cities: { ko: ['뉴욕', '워싱턴'], en: ['New York', 'Washington'], ja: ['ニューヨーク', 'ワシントン'] }, country: { ko: '미국', en: 'USA', ja: 'アメリカ' } },
  { id: 'America/Toronto', name: { ko: '토론토', en: 'Toronto', ja: 'トロント' }, abbreviation: 'EST', utcOffset: -300, dstOffset: 60, isDst: false, cities: { ko: ['토론토', '오타와'], en: ['Toronto', 'Ottawa'], ja: ['トロント', 'オタワ'] }, country: { ko: '캐나다', en: 'Canada', ja: 'カナダ' } },
  { id: 'America/Sao_Paulo', name: { ko: '브라질리아', en: 'Brasilia', ja: 'ブラジリア' }, abbreviation: 'BRT', utcOffset: -180, dstOffset: 0, isDst: false, cities: { ko: ['상파울루', '리우'], en: ['São Paulo', 'Rio'], ja: ['サンパウロ', 'リオ'] }, country: { ko: '브라질', en: 'Brazil', ja: 'ブラジル' } },
  { id: 'America/Argentina/Buenos_Aires', name: { ko: '아르헨티나', en: 'Argentina', ja: 'アルゼンチン' }, abbreviation: 'ART', utcOffset: -180, dstOffset: 0, isDst: false, cities: { ko: ['부에노스아이레스'], en: ['Buenos Aires'], ja: ['ブエノスアイレス'] }, country: { ko: '아르헨티나', en: 'Argentina', ja: 'アルゼンチン' } },
  { id: 'Atlantic/Azores', name: { ko: '아조레스', en: 'Azores', ja: 'アゾレス' }, abbreviation: 'AZOT', utcOffset: -60, dstOffset: 60, isDst: false, cities: { ko: [], en: [], ja: [] }, country: { ko: '포르투갈', en: 'Portugal', ja: 'ポルトガル' } },
  { id: 'UTC', name: { ko: '협정 세계시', en: 'UTC', ja: '協定世界時' }, abbreviation: 'UTC', utcOffset: 0, dstOffset: 0, isDst: false, cities: { ko: [], en: [], ja: [] }, country: { ko: '', en: '', ja: '' } },
  { id: 'Europe/London', name: { ko: '그리니치 표준시', en: 'Greenwich Mean Time', ja: 'グリニッジ標準時' }, abbreviation: 'GMT', utcOffset: 0, dstOffset: 60, isDst: false, cities: { ko: ['런던', '더블린'], en: ['London', 'Dublin'], ja: ['ロンドン', 'ダブリン'] }, country: { ko: '영국', en: 'UK', ja: 'イギリス' } },
  { id: 'Europe/Paris', name: { ko: '중앙유럽 표준시', en: 'Central European Time', ja: '中央ヨーロッパ時間' }, abbreviation: 'CET', utcOffset: 60, dstOffset: 60, isDst: false, cities: { ko: ['파리', '베를린', '로마'], en: ['Paris', 'Berlin', 'Rome'], ja: ['パリ', 'ベルリン', 'ローマ'] }, country: { ko: '프랑스', en: 'France', ja: 'フランス' } },
  { id: 'Europe/Berlin', name: { ko: '베를린', en: 'Berlin', ja: 'ベルリン' }, abbreviation: 'CET', utcOffset: 60, dstOffset: 60, isDst: false, cities: { ko: ['베를린', '프랑크푸르트'], en: ['Berlin', 'Frankfurt'], ja: ['ベルリン', 'フランクフルト'] }, country: { ko: '독일', en: 'Germany', ja: 'ドイツ' } },
  { id: 'Europe/Moscow', name: { ko: '모스크바', en: 'Moscow', ja: 'モスクワ' }, abbreviation: 'MSK', utcOffset: 180, dstOffset: 0, isDst: false, cities: { ko: ['모스크바'], en: ['Moscow'], ja: ['モスクワ'] }, country: { ko: '러시아', en: 'Russia', ja: 'ロシア' } },
  { id: 'Europe/Istanbul', name: { ko: '터키', en: 'Turkey', ja: 'トルコ' }, abbreviation: 'TRT', utcOffset: 180, dstOffset: 0, isDst: false, cities: { ko: ['이스탄불', '앙카라'], en: ['Istanbul', 'Ankara'], ja: ['イスタンブール', 'アンカラ'] }, country: { ko: '터키', en: 'Turkey', ja: 'トルコ' } },
  { id: 'Asia/Dubai', name: { ko: '걸프 표준시', en: 'Gulf Standard Time', ja: '湾岸標準時' }, abbreviation: 'GST', utcOffset: 240, dstOffset: 0, isDst: false, cities: { ko: ['두바이', '아부다비'], en: ['Dubai', 'Abu Dhabi'], ja: ['ドバイ', 'アブダビ'] }, country: { ko: 'UAE', en: 'UAE', ja: 'UAE' } },
  { id: 'Asia/Kolkata', name: { ko: '인도 표준시', en: 'India Standard Time', ja: 'インド標準時' }, abbreviation: 'IST', utcOffset: 330, dstOffset: 0, isDst: false, cities: { ko: ['뭄바이', '델리'], en: ['Mumbai', 'Delhi'], ja: ['ムンバイ', 'デリー'] }, country: { ko: '인도', en: 'India', ja: 'インド' } },
  { id: 'Asia/Bangkok', name: { ko: '인도차이나', en: 'Indochina Time', ja: 'インドシナ時間' }, abbreviation: 'ICT', utcOffset: 420, dstOffset: 0, isDst: false, cities: { ko: ['방콕', '하노이'], en: ['Bangkok', 'Hanoi'], ja: ['バンコク', 'ハノイ'] }, country: { ko: '태국', en: 'Thailand', ja: 'タイ' } },
  { id: 'Asia/Singapore', name: { ko: '싱가포르', en: 'Singapore', ja: 'シンガポール' }, abbreviation: 'SGT', utcOffset: 480, dstOffset: 0, isDst: false, cities: { ko: ['싱가포르'], en: ['Singapore'], ja: ['シンガポール'] }, country: { ko: '싱가포르', en: 'Singapore', ja: 'シンガポール' } },
  { id: 'Asia/Hong_Kong', name: { ko: '홍콩', en: 'Hong Kong', ja: '香港' }, abbreviation: 'HKT', utcOffset: 480, dstOffset: 0, isDst: false, cities: { ko: ['홍콩'], en: ['Hong Kong'], ja: ['香港'] }, country: { ko: '홍콩', en: 'Hong Kong', ja: '香港' } },
  { id: 'Asia/Shanghai', name: { ko: '중국 표준시', en: 'China Standard Time', ja: '中国標準時' }, abbreviation: 'CST', utcOffset: 480, dstOffset: 0, isDst: false, cities: { ko: ['베이징', '상하이'], en: ['Beijing', 'Shanghai'], ja: ['北京', '上海'] }, country: { ko: '중국', en: 'China', ja: '中国' } },
  { id: 'Asia/Tokyo', name: { ko: '일본 표준시', en: 'Japan Standard Time', ja: '日本標準時' }, abbreviation: 'JST', utcOffset: 540, dstOffset: 0, isDst: false, cities: { ko: ['도쿄', '오사카'], en: ['Tokyo', 'Osaka'], ja: ['東京', '大阪'] }, country: { ko: '일본', en: 'Japan', ja: '日本' } },
  { id: 'Asia/Seoul', name: { ko: '한국 표준시', en: 'Korea Standard Time', ja: '韓国標準時' }, abbreviation: 'KST', utcOffset: 540, dstOffset: 0, isDst: false, cities: { ko: ['서울', '부산'], en: ['Seoul', 'Busan'], ja: ['ソウル', '釜山'] }, country: { ko: '대한민국', en: 'South Korea', ja: '韓国' } },
  { id: 'Australia/Sydney', name: { ko: '호주 동부 표준시', en: 'Australian Eastern Time', ja: 'オーストラリア東部時間' }, abbreviation: 'AEST', utcOffset: 600, dstOffset: 60, isDst: false, cities: { ko: ['시드니', '멜버른'], en: ['Sydney', 'Melbourne'], ja: ['シドニー', 'メルボルン'] }, country: { ko: '호주', en: 'Australia', ja: 'オーストラリア' } },
  { id: 'Pacific/Auckland', name: { ko: '뉴질랜드', en: 'New Zealand', ja: 'ニュージーランド' }, abbreviation: 'NZST', utcOffset: 720, dstOffset: 60, isDst: false, cities: { ko: ['오클랜드', '웰링턴'], en: ['Auckland', 'Wellington'], ja: ['オークランド', 'ウェリントン'] }, country: { ko: '뉴질랜드', en: 'New Zealand', ja: 'ニュージーランド' } },
  { id: 'Pacific/Fiji', name: { ko: '피지', en: 'Fiji', ja: 'フィジー' }, abbreviation: 'FJT', utcOffset: 720, dstOffset: 0, isDst: false, cities: { ko: ['수바'], en: ['Suva'], ja: ['スバ'] }, country: { ko: '피지', en: 'Fiji', ja: 'フィジー' } },
  { id: 'Africa/Cairo', name: { ko: '이집트', en: 'Egypt', ja: 'エジプト' }, abbreviation: 'EET', utcOffset: 120, dstOffset: 0, isDst: false, cities: { ko: ['카이로'], en: ['Cairo'], ja: ['カイロ'] }, country: { ko: '이집트', en: 'Egypt', ja: 'エジプト' } },
  { id: 'Africa/Johannesburg', name: { ko: '남아프리카', en: 'South Africa', ja: '南アフリカ' }, abbreviation: 'SAST', utcOffset: 120, dstOffset: 0, isDst: false, cities: { ko: ['요하네스버그'], en: ['Johannesburg'], ja: ['ヨハネスブルグ'] }, country: { ko: '남아프리카', en: 'South Africa', ja: '南アフリカ' } },
  { id: 'Africa/Lagos', name: { ko: '서아프리카', en: 'West Africa', ja: '西アフリカ' }, abbreviation: 'WAT', utcOffset: 60, dstOffset: 0, isDst: false, cities: { ko: ['라고스'], en: ['Lagos'], ja: ['ラゴス'] }, country: { ko: '나이지리아', en: 'Nigeria', ja: 'ナイジェリア' } },
];

export function getTimezones(lang: Language): TimezoneInfo[] {
  return timezonesData.map(tz => ({
    id: tz.id,
    name: tz.name[lang],
    abbreviation: tz.abbreviation,
    utcOffset: tz.utcOffset,
    dstOffset: tz.dstOffset,
    isDst: tz.isDst,
    cities: tz.cities[lang],
    country: tz.country[lang],
  }));
}

// For backward compatibility
export const timezones: TimezoneInfo[] = getTimezones('ko');

interface DstRegionData {
  timezone: string;
  country: { ko: string; en: string; ja: string };
  hasDst: boolean;
  startMonth: number;
  startWeek: number;
  endMonth: number;
  endWeek: number;
  offsetMinutes: number;
}

const dstRegionsData: DstRegionData[] = [
  { timezone: 'America/New_York', country: { ko: '미국 (동부)', en: 'USA (Eastern)', ja: 'アメリカ (東部)' }, hasDst: true, startMonth: 3, startWeek: 2, endMonth: 11, endWeek: 1, offsetMinutes: 60 },
  { timezone: 'America/Los_Angeles', country: { ko: '미국 (서부)', en: 'USA (Western)', ja: 'アメリカ (西部)' }, hasDst: true, startMonth: 3, startWeek: 2, endMonth: 11, endWeek: 1, offsetMinutes: 60 },
  { timezone: 'America/Chicago', country: { ko: '미국 (중부)', en: 'USA (Central)', ja: 'アメリカ (中部)' }, hasDst: true, startMonth: 3, startWeek: 2, endMonth: 11, endWeek: 1, offsetMinutes: 60 },
  { timezone: 'Europe/London', country: { ko: '영국', en: 'UK', ja: 'イギリス' }, hasDst: true, startMonth: 3, startWeek: -1, endMonth: 10, endWeek: -1, offsetMinutes: 60 },
  { timezone: 'Europe/Paris', country: { ko: '프랑스', en: 'France', ja: 'フランス' }, hasDst: true, startMonth: 3, startWeek: -1, endMonth: 10, endWeek: -1, offsetMinutes: 60 },
  { timezone: 'Europe/Berlin', country: { ko: '독일', en: 'Germany', ja: 'ドイツ' }, hasDst: true, startMonth: 3, startWeek: -1, endMonth: 10, endWeek: -1, offsetMinutes: 60 },
  { timezone: 'Australia/Sydney', country: { ko: '호주 (동부)', en: 'Australia (Eastern)', ja: 'オーストラリア (東部)' }, hasDst: true, startMonth: 10, startWeek: 1, endMonth: 4, endWeek: 1, offsetMinutes: 60 },
  { timezone: 'Pacific/Auckland', country: { ko: '뉴질랜드', en: 'New Zealand', ja: 'ニュージーランド' }, hasDst: true, startMonth: 9, startWeek: -1, endMonth: 4, endWeek: 1, offsetMinutes: 60 },
  { timezone: 'America/Toronto', country: { ko: '캐나다 (동부)', en: 'Canada (Eastern)', ja: 'カナダ (東部)' }, hasDst: true, startMonth: 3, startWeek: 2, endMonth: 11, endWeek: 1, offsetMinutes: 60 },
];

export function getDstRegions(lang: Language) {
  return dstRegionsData.map(r => ({
    timezone: r.timezone,
    country: r.country[lang],
    hasDst: r.hasDst,
    startMonth: r.startMonth,
    startWeek: r.startWeek,
    endMonth: r.endMonth,
    endWeek: r.endWeek,
    offsetMinutes: r.offsetMinutes,
  }));
}

// For backward compatibility
export const dstRegions = getDstRegions('ko');
