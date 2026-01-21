import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Layout } from './components/Layout';

// Lazy load all pages for code splitting
const WorldClockPage = lazy(() => import('./pages/WorldClockPage').then(m => ({ default: m.WorldClockPage })));
const TimezoneMapPage = lazy(() => import('./pages/TimezoneMapPage').then(m => ({ default: m.TimezoneMapPage })));
const ConverterPage = lazy(() => import('./pages/ConverterPage').then(m => ({ default: m.ConverterPage })));
const DSTInfoPage = lazy(() => import('./pages/DSTInfoPage').then(m => ({ default: m.DSTInfoPage })));
const TimezoneListPage = lazy(() => import('./pages/TimezoneListPage').then(m => ({ default: m.TimezoneListPage })));
const OnlineClockPage = lazy(() => import('./pages/OnlineClockPage').then(m => ({ default: m.OnlineClockPage })));
const StopwatchPage = lazy(() => import('./pages/StopwatchPage').then(m => ({ default: m.StopwatchPage })));
const TimerPage = lazy(() => import('./pages/TimerPage').then(m => ({ default: m.TimerPage })));
const CountdownPage = lazy(() => import('./pages/CountdownPage').then(m => ({ default: m.CountdownPage })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><WorldClockPage /></Suspense>} />
          <Route path="map" element={<Suspense fallback={<PageLoader />}><TimezoneMapPage /></Suspense>} />
          <Route path="converter" element={<Suspense fallback={<PageLoader />}><ConverterPage /></Suspense>} />
          <Route path="dst" element={<Suspense fallback={<PageLoader />}><DSTInfoPage /></Suspense>} />
          <Route path="timezones" element={<Suspense fallback={<PageLoader />}><TimezoneListPage /></Suspense>} />
          <Route path="clock" element={<Suspense fallback={<PageLoader />}><OnlineClockPage /></Suspense>} />
          <Route path="stopwatch" element={<Suspense fallback={<PageLoader />}><StopwatchPage /></Suspense>} />
          <Route path="timer" element={<Suspense fallback={<PageLoader />}><TimerPage /></Suspense>} />
          <Route path="countdown" element={<Suspense fallback={<PageLoader />}><CountdownPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
