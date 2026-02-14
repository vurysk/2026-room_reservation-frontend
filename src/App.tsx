// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import AddReservation from './pages/user/AddReservation';
import EditReservation from './pages/user/EditReservation'; 
import ReservationDetail from './pages/shared/ReservationDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation/add/:roomCode" element={<AddReservation />} />
          <Route path="/reservation/edit/:roomCode" element={<EditReservation />} />
          
          {/* ROUTE DETAIL BARU */}
          <Route path="/reservation/detail/:roomCode" element={<ReservationDetail />} />

          <Route path="/reservation/list" element={<div style={{padding: '50px', color: 'white'}}>Halaman List (Next Step)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;