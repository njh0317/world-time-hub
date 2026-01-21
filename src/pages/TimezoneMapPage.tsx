import { Suspense, lazy } from 'react';
import { useTranslation } from '../i18n/useTranslation';

// Lazy load MapView since Leaflet is heavy
const MapView = lazy(() => import('../components/MapView').then(m => ({ default: m.MapView })));

function MapLoader() {
  return (
    <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function TimezoneMapPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t.timezoneMap.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {t.timezoneMap.description}
      </p>
      <div className="card p-0 overflow-hidden">
        <Suspense fallback={<MapLoader />}>
          <MapView />
        </Suspense>
      </div>
    </div>
  );
}
