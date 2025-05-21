import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
