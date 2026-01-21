import { useState } from 'react';
import { dstRegions } from '../data/timezones';
import { isDstActive, getDstInfo } from '../utils/dst';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function DSTInfoPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const selectedInfo = selectedRegion ? getDstInfo(selectedRegion) : null;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
        서머타임 (DST) 정보
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            서머타임 적용 지역
          </h3>
          <div className="space-y-2">
            {dstRegions.map((region) => {
              const isActive = isDstActive(region.timezone);
              return (
                <button
                  key={region.timezone}
                  onClick={() => setSelectedRegion(region.timezone)}
                  className={`w-full card py-2 sm:py-3 text-left transition-all ${
                    selectedRegion === region.timezone
                      ? 'ring-2 ring-blue-500'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      {region.country}
                    </span>
                    {isActive && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full whitespace-nowrap">
                        DST 적용 중
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {selectedInfo ? (
            <div className="card">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                상세 정보
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">시간대</span>
                  <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white break-all">
                    {selectedInfo.timezone}
                  </p>
                </div>
                <div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">DST 적용</span>
                  <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                    {selectedInfo.hasDst ? '예' : '아니오'}
                  </p>
                </div>
                {selectedInfo.hasDst && selectedInfo.dstStart && (
                  <div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">DST 시작</span>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      {format(selectedInfo.dstStart, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
                    </p>
                  </div>
                )}
                {selectedInfo.hasDst && selectedInfo.dstEnd && (
                  <div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">DST 종료</span>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      {format(selectedInfo.dstEnd, 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
                    </p>
                  </div>
                )}
                {selectedInfo.hasDst && (
                  <div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">시간 변경량</span>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                      +{selectedInfo.offsetChange}분
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">현재 상태</span>
                  <p className={`font-medium text-sm sm:text-base ${
                    isDstActive(selectedInfo.timezone)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {isDstActive(selectedInfo.timezone) ? 'DST 적용 중' : '표준시'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              지역을 선택하여 상세 정보를 확인하세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
