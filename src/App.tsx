import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WorldClockPage } from './pages/WorldClockPage';
import { TimezoneMapPage } from './pages/TimezoneMapPage';
import { ConverterPage } from './pages/ConverterPage';
import { DSTInfoPage } from './pages/DSTInfoPage';
import { TimezoneListPage } from './pages/TimezoneListPage';
import { OnlineClockPage } from './pages/OnlineClockPage';
import { StopwatchPage } from './pages/StopwatchPage';
import { TimerPage } from './pages/TimerPage';
import { CountdownPage } from './pages/CountdownPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WorldClockPage />} />
          <Route path="map" element={<TimezoneMapPage />} />
          <Route path="converter" element={<ConverterPage />} />
          <Route path="dst" element={<DSTInfoPage />} />
          <Route path="timezones" element={<TimezoneListPage />} />
          <Route path="clock" element={<OnlineClockPage />} />
          <Route path="stopwatch" element={<StopwatchPage />} />
          <Route path="timer" element={<TimerPage />} />
          <Route path="countdown" element={<CountdownPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
