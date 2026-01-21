import { MapView } from '../components/MapView';
import { useTranslation } from '../i18n/useTranslation';

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
        <MapView />
      </div>
    </div>
  );
}
