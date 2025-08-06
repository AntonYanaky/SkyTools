import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import Home from './pages/Home.tsx';

const BitsMain = lazy(() => import('./pages/BitsMain.tsx'));
const ForgeMain = lazy(() => import('./pages/ForgeMain.tsx'));

export default function App() {

  return (
      <Suspense fallback={<div className="bg-white dark:bg-black text-black dark:text-white">Loading page...</div>}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bits" element={<BitsMain />} />
        <Route path="/forge" element={<ForgeMain />} />
    </Routes>
      </Suspense>
  )
}
