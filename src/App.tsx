import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, Component, type ReactNode } from 'react';
import { Layout } from './components/Layout';

// Error Boundary for lazy loading failures
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
          <p className="text-red-500 mb-4">페이지 로딩 중 오류가 발생했습니다.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

function LazyPage({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LazyPage><WorldClockPage /></LazyPage>} />
          <Route path="map" element={<LazyPage><TimezoneMapPage /></LazyPage>} />
          <Route path="converter" element={<LazyPage><ConverterPage /></LazyPage>} />
          <Route path="dst" element={<LazyPage><DSTInfoPage /></LazyPage>} />
          <Route path="timezones" element={<LazyPage><TimezoneListPage /></LazyPage>} />
          <Route path="clock" element={<LazyPage><OnlineClockPage /></LazyPage>} />
          <Route path="stopwatch" element={<LazyPage><StopwatchPage /></LazyPage>} />
          <Route path="timer" element={<LazyPage><TimerPage /></LazyPage>} />
          <Route path="countdown" element={<LazyPage><CountdownPage /></LazyPage>} />
          <Route path="faq" element={<LazyPage><FAQPage /></LazyPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
