import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlassAurora from './designs/design1';
import MinimalBlack from './designs/design2';
import PlayfulGradient from './designs/design3';
import LiquidCrystal from './designs/design4';
import SwissPrecision from './designs/design5';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/1" replace />} />
        <Route path="/1" element={<GlassAurora />} />
        <Route path="/2" element={<MinimalBlack />} />
        <Route path="/3" element={<PlayfulGradient />} />
        <Route path="/4" element={<LiquidCrystal />} />
        <Route path="/5" element={<SwissPrecision />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

