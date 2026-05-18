import { Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import TrabajosPage from './pages/TrabajosPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/trabajos" element={<TrabajosPage />} />
    </Routes>
  );
}

export default App;