import type { Language } from '../i18n/translations';

interface PageSEO {
  title: { ko: string; en: string; ja: string };
  description: { ko: string; en: string; ja: string };
  keywords: { ko: string; en: string; ja: string };
}

export const pageSEO: Record<string, PageSEO> = {
  '/': {
    title: {
      ko: 'World Time Hub - 세계 시간 도구',
      en: 'World Time Hub - World Clock & Time Tools',
      ja: 'World Time Hub - 世界時計・時間ツール',
    },
    description: {
      ko: '세계 각국의 현재 시간을 실시간으로 확인하세요. 뉴욕, 런던, 도쿄, 서울 등 주요 도시의 시간과 시차 정보를 제공합니다.',
      en: 'Check current time around the world in real-time. Get time and timezone info for major cities like New York, London, Tokyo, Seoul.',
      ja: '世界各国の現在時刻をリアルタイムで確認。ニューヨーク、ロンドン、東京、ソウルなど主要都市の時間と時差情報。',
    },
    keywords: {
      ko: '세계시계, 뉴욕 시간, 런던 시간, 도쿄 시간, 현재 시간, 시차',
      en: 'world clock, new york time, london time, tokyo time, current time, timezone',
      ja: '世界時計, ニューヨーク時間, ロンドン時間, 東京時間, 現在時刻, 時差',
    },
  },
  '/converter': {
    title: {
      ko: '시간대 변환기 - 한국 미국 시차 계산 | World Time Hub',
      en: 'Timezone Converter - Calculate Time Difference | World Time Hub',
      ja: 'タイムゾーン変換 - 時差計算 | World Time Hub',
    },
    description: {
      ko: '한국과 미국, 일본, 유럽 등 세계 각국의 시차를 쉽게 계산하세요. 회의 시간 조율, 해외 통화에 유용한 시간대 변환기.',
      en: 'Easily calculate time differences between countries. Useful timezone converter for scheduling meetings and international calls.',
      ja: '韓国とアメリカ、日本、ヨーロッパなど世界各国の時差を簡単に計算。会議時間調整に便利なタイムゾーン変換。',
    },
    keywords: {
      ko: '시차 계산, 시간대 변환, 한국 미국 시차, 한국 일본 시차, 시간 변환기',
      en: 'time difference calculator, timezone converter, time zone conversion',
      ja: '時差計算, タイムゾーン変換, 韓国アメリカ時差, 時間変換',
    },
  },
  '/timer': {
    title: {
      ko: '온라인 타이머 - 1분, 5분, 10분 타이머 | World Time Hub',
      en: 'Online Timer - 1, 5, 10 Minute Timer | World Time Hub',
      ja: 'オンラインタイマー - 1分、5分、10分タイマー | World Time Hub',
    },
    description: {
      ko: '무료 온라인 타이머. 1분, 5분, 10분, 15분, 30분 프리셋 제공. 요리, 운동, 공부에 유용한 카운트다운 타이머.',
      en: 'Free online timer with 1, 5, 10, 15, 30 minute presets. Useful countdown timer for cooking, exercise, and studying.',
      ja: '無料オンラインタイマー。1分、5分、10分、15分、30分プリセット。料理、運動、勉強に便利なカウントダウンタイマー。',
    },
    keywords: {
      ko: '온라인 타이머, 5분 타이머, 10분 타이머, 카운트다운, 무료 타이머',
      en: 'online timer, 5 minute timer, 10 minute timer, countdown, free timer',
      ja: 'オンラインタイマー, 5分タイマー, 10分タイマー, カウントダウン',
    },
  },
  '/stopwatch': {
    title: {
      ko: '온라인 스톱워치 - 랩 타임 기록 | World Time Hub',
      en: 'Online Stopwatch - Lap Time Recording | World Time Hub',
      ja: 'オンラインストップウォッチ - ラップタイム記録 | World Time Hub',
    },
    description: {
      ko: '무료 온라인 스톱워치. 랩 타임 기록, 일시정지, 리셋 기능. 운동, 요리, 시험 시간 측정에 유용.',
      en: 'Free online stopwatch with lap time recording, pause, and reset. Useful for exercise, cooking, and exam timing.',
      ja: '無料オンラインストップウォッチ。ラップタイム記録、一時停止、リセット機能。運動、料理、試験時間測定に便利。',
    },
    keywords: {
      ko: '온라인 스톱워치, 스톱워치, 랩타임, 시간 측정, 무료 스톱워치',
      en: 'online stopwatch, stopwatch, lap time, time measurement, free stopwatch',
      ja: 'オンラインストップウォッチ, ストップウォッチ, ラップタイム, 時間測定',
    },
  },
  '/countdown': {
    title: {
      ko: 'D-day 계산기 - 카운트다운 타이머 | World Time Hub',
      en: 'D-day Calculator - Countdown Timer | World Time Hub',
      ja: 'D-day計算機 - カウントダウンタイマー | World Time Hub',
    },
    description: {
      ko: '중요한 날까지 남은 시간을 계산하세요. 시험, 여행, 기념일 D-day 카운트다운. 여러 이벤트 동시 관리 가능.',
      en: 'Calculate time remaining until important dates. D-day countdown for exams, trips, anniversaries. Manage multiple events.',
      ja: '重要な日までの残り時間を計算。試験、旅行、記念日のD-dayカウントダウン。複数イベント同時管理可能。',
    },
    keywords: {
      ko: 'D-day 계산기, 카운트다운, 디데이, 남은 날짜 계산, 기념일 계산',
      en: 'd-day calculator, countdown, days until, date calculator, anniversary countdown',
      ja: 'D-day計算機, カウントダウン, 残り日数計算, 記念日計算',
    },
  },
  '/clock': {
    title: {
      ko: '온라인 시계 - 현재 시간 전체화면 | World Time Hub',
      en: 'Online Clock - Current Time Fullscreen | World Time Hub',
      ja: 'オンライン時計 - 現在時刻フルスクリーン | World Time Hub',
    },
    description: {
      ko: '깔끔한 온라인 디지털 시계. 전체화면 모드, 12/24시간 형식 지원. 프레젠테이션, 교실에서 유용.',
      en: 'Clean online digital clock. Fullscreen mode, 12/24 hour format. Useful for presentations and classrooms.',
      ja: 'シンプルなオンラインデジタル時計。フルスクリーンモード、12/24時間形式対応。プレゼン、教室で便利。',
    },
    keywords: {
      ko: '온라인 시계, 디지털 시계, 현재 시간, 전체화면 시계, 큰 시계',
      en: 'online clock, digital clock, current time, fullscreen clock, big clock',
      ja: 'オンライン時計, デジタル時計, 現在時刻, フルスクリーン時計',
    },
  },
  '/map': {
    title: {
      ko: '세계 시간대 지도 - 타임존 맵 | World Time Hub',
      en: 'World Timezone Map - Interactive Time Zone Map | World Time Hub',
      ja: '世界タイムゾーンマップ - 時差地図 | World Time Hub',
    },
    description: {
      ko: '인터랙티브 세계 시간대 지도. 지도를 클릭하여 해당 지역의 현재 시간과 시간대 정보를 확인하세요.',
      en: 'Interactive world timezone map. Click anywhere to see current time and timezone information for that location.',
      ja: 'インタラクティブ世界タイムゾーンマップ。地図をクリックして現地時間とタイムゾーン情報を確認。',
    },
    keywords: {
      ko: '시간대 지도, 타임존 맵, 세계 시간대, 시차 지도',
      en: 'timezone map, world time zones, time zone map, interactive map',
      ja: 'タイムゾーンマップ, 世界時差地図, 時差マップ',
    },
  },
  '/timezones': {
    title: {
      ko: '세계 시간대 목록 - UTC 오프셋 | World Time Hub',
      en: 'World Timezone List - UTC Offset | World Time Hub',
      ja: '世界タイムゾーン一覧 - UTCオフセット | World Time Hub',
    },
    description: {
      ko: '전 세계 시간대 목록과 UTC 오프셋 정보. 각 시간대의 현재 시간과 주요 도시 정보를 확인하세요.',
      en: 'Complete list of world timezones with UTC offsets. Check current time and major cities for each timezone.',
      ja: '世界のタイムゾーン一覧とUTCオフセット情報。各タイムゾーンの現在時刻と主要都市情報。',
    },
    keywords: {
      ko: '시간대 목록, UTC, 타임존, 세계 시간대, GMT',
      en: 'timezone list, UTC, time zones, world timezones, GMT',
      ja: 'タイムゾーン一覧, UTC, 世界時差, GMT',
    },
  },
  '/dst': {
    title: {
      ko: '서머타임 정보 - DST 시작/종료일 | World Time Hub',
      en: 'Daylight Saving Time Info - DST Start/End Dates | World Time Hub',
      ja: 'サマータイム情報 - DST開始/終了日 | World Time Hub',
    },
    description: {
      ko: '세계 각국의 서머타임(DST) 정보. 미국, 유럽, 호주 등 서머타임 적용 국가의 시작일과 종료일을 확인하세요.',
      en: 'Daylight Saving Time info for countries worldwide. Check DST start and end dates for USA, Europe, Australia, and more.',
      ja: '世界各国のサマータイム(DST)情報。アメリカ、ヨーロッパ、オーストラリアなどのDST開始日と終了日を確認。',
    },
    keywords: {
      ko: '서머타임, DST, 일광절약시간, 미국 서머타임, 유럽 서머타임',
      en: 'daylight saving time, DST, summer time, US DST, Europe DST',
      ja: 'サマータイム, DST, 夏時間, アメリカサマータイム',
    },
  },
  '/faq': {
    title: {
      ko: '자주 묻는 질문 (FAQ) | World Time Hub',
      en: 'FAQ - Frequently Asked Questions | World Time Hub',
      ja: 'よくある質問（FAQ） | World Time Hub',
    },
    description: {
      ko: 'World Time Hub 사용법, 시간대 변환, 타이머, 스톱워치 등에 대한 자주 묻는 질문과 답변입니다.',
      en: 'Frequently asked questions about World Time Hub, timezone converter, timer, stopwatch and more.',
      ja: 'World Time Hubの使い方、タイムゾーン変換、タイマー、ストップウォッチなどに関するよくある質問と回答。',
    },
    keywords: {
      ko: 'FAQ, 자주 묻는 질문, 도움말, 사용법',
      en: 'FAQ, frequently asked questions, help, how to use',
      ja: 'FAQ, よくある質問, ヘルプ, 使い方',
    },
  },
};

export function updatePageSEO(path: string, lang: Language) {
  const seo = pageSEO[path];
  if (!seo) return;

  document.title = seo.title[lang];
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seo.description[lang]);
  }
  
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', seo.keywords[lang]);
  }

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', seo.title[lang]);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', seo.description[lang]);
  }
}
