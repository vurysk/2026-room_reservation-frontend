// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder untuk halaman lain yang akan kita buat */}
          <Route path="/reservation/add" element={<div style={{color:'white'}}>Halaman Form</div>} />
          <Route path="/reservation/list" element={<div style={{color:'white'}}>Halaman List</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;