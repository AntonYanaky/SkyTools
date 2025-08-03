import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home.tsx';
import BitsMain from './pages/BitsMain.tsx';

export default function App() {

  return (
    <BrowserRouter basename="/SkyTools" >
      <Route path="/" element={<Home />} />
      <Route path="/bits" element={<BitsMain />} />
    </BrowserRouter>
  )
}
