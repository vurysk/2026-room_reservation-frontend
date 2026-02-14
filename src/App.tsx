import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import AddReservation from './pages/user/AddReservation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Alur: /reservation/add/A-101 */}
          <Route path="/reservation/add/:roomCode" element={<AddReservation />} />
          
          {/* Placeholder untuk halaman lainnya nanti */}
          <Route path="/reservation/list" element={<div style={{padding: '50px', color: 'white'}}>Halaman List (Next Step)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;