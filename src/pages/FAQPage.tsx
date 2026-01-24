import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';

interface FAQItem {
  question: { ko: string; en: string; ja: string };
  answer: { ko: string; en: string; ja: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      ko: 'World Time Hub는 무엇인가요?',
      en: 'What is World Time Hub?',
      ja: 'World Time Hubとは何ですか？',
    },
    answer: {
      ko: 'World Time Hub는 세계 시계, 시간대 변환기, 타이머, 스톱워치, 카운트다운 등 다양한 시간 도구를 무료로 제공하는 웹사이트입니다. 전 세계 어느 도시의 현재 시간도 확인할 수 있습니다.',
      en: 'World Time Hub is a free online tool that provides world clock, timezone converter, timer, stopwatch, and countdown features. You can check current time in any city worldwide.',
      ja: 'World Time Hubは、世界時計、タイムゾーン変換、タイマー、ストップウォッチ、カウントダウンなどの時間ツールを無料で提供するウェブサイトです。',
    },
  },
  {
    question: {
      ko: '시간대를 어떻게 변환하나요?',
      en: 'How do I convert time between timezones?',
      ja: 'タイムゾーン間で時間を変換するにはどうすればいいですか？',
    },
    answer: {
      ko: '시간대 변환기를 사용하세요. 출발 시간대와 도착 시간대를 선택하고 변환할 시간을 입력하면 즉시 변환된 시간을 확인할 수 있습니다.',
      en: 'Use our Timezone Converter tool. Select the source timezone and target timezone, then enter the time you want to convert. The tool will instantly show you the converted time.',
      ja: 'タイムゾーン変換ツールをご利用ください。変換元と変換先のタイムゾーンを選択し、変換したい時間を入力すると、即座に変換結果が表示されます。',
    },
  },
  {
    question: {
      ko: 'World Time Hub는 무료인가요?',
      en: 'Is World Time Hub free to use?',
      ja: 'World Time Hubは無料で使えますか？',
    },
    answer: {
      ko: '네, World Time Hub는 완전히 무료입니다. 세계 시계, 시간대 변환기, 타이머, 스톱워치, 카운트다운 등 모든 기능을 무료로 이용할 수 있습니다.',
      en: 'Yes, World Time Hub is completely free. All features including world clock, timezone converter, timer, stopwatch, and countdown are available at no cost.',
      ja: 'はい、World Time Hubは完全に無料です。世界時計、タイムゾーン変換、タイマー、ストップウォッチ、カウントダウンなど、すべての機能を無料でご利用いただけます。',
    },
  },
  {
    question: {
      ko: '어떤 도시들이 세계 시계에 포함되어 있나요?',
      en: 'What cities are available in the world clock?',
      ja: '世界時計にはどの都市が含まれていますか？',
    },
    answer: {
      ko: '뉴욕, 런던, 도쿄, 서울, 파리, 시드니, 두바이, 싱가포르 등 전 세계 주요 도시가 포함되어 있습니다. 검색 기능을 통해 원하는 도시를 찾아 추가할 수 있습니다.',
      en: 'World Time Hub includes major cities worldwide such as New York, London, Tokyo, Seoul, Paris, Sydney, Dubai, Singapore, and many more. You can search and add any city to your world clock.',
      ja: 'ニューヨーク、ロンドン、東京、ソウル、パリ、シドニー、ドバイ、シンガポールなど、世界の主要都市が含まれています。検索機能で都市を探して追加できます。',
    },
  },
  {
    question: {
      ko: '서머타임(DST)을 지원하나요?',
      en: 'Does World Time Hub support Daylight Saving Time (DST)?',
      ja: 'サマータイム（DST）に対応していますか？',
    },
    answer: {
      ko: '네, World Time Hub는 서머타임을 자동으로 반영합니다. DST 정보 페이지에서 각 지역의 서머타임 시작일과 종료일을 확인할 수 있습니다.',
      en: 'Yes, World Time Hub automatically accounts for Daylight Saving Time. Our DST Info page shows when DST starts and ends for different regions around the world.',
      ja: 'はい、World Time Hubはサマータイムを自動的に反映します。DST情報ページで各地域のサマータイム開始日と終了日を確認できます。',
    },
  },
  {
    question: {
      ko: '타이머와 스톱워치의 차이점은 무엇인가요?',
      en: 'What is the difference between timer and stopwatch?',
      ja: 'タイマーとストップウォッチの違いは何ですか？',
    },
    answer: {
      ko: '타이머는 설정한 시간부터 0까지 카운트다운하며, 스톱워치는 0부터 시작하여 경과 시간을 측정합니다. 타이머는 요리나 운동에, 스톱워치는 기록 측정에 유용합니다.',
      en: 'Timer counts down from a set time to zero, while stopwatch counts up from zero to measure elapsed time. Timer is useful for cooking or exercise, stopwatch is great for recording times.',
      ja: 'タイマーは設定した時間から0までカウントダウンし、ストップウォッチは0から経過時間を測定します。タイマーは料理や運動に、ストップウォッチは記録測定に便利です。',
    },
  },
];

export function FAQPage() {
  const { lang } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const titles = {
    ko: '자주 묻는 질문 (FAQ)',
    en: 'Frequently Asked Questions',
    ja: 'よくある質問（FAQ）',
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {titles[lang]}
      </h2>
      
      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div key={index} className="card p-0 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white pr-4">
                {faq.question[lang]}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xl shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 sm:px-6 pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-4">
                {faq.answer[lang]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
