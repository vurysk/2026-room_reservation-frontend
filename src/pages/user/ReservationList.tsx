// src/pages/user/ReservationList.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
// Mengambil kontrak data dari folder types
import type { ReservationDetailData } from '../../types/reservation'; 
import './ReservationList.css';

const ReservationList: React.FC = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<ReservationDetailData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await reservationService.getAllReservations();
            setReservations(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div className="loading-text">Loading Reservations...</div>;

    return (
        <div className="list-page">
            <h1 className="header-text">RESERVATION<br/>LIST</h1>

            <div className="list-card">
                <table className="list-table">
                    <thead>
                        <tr>
                            <th>Room Code</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Purpose Of Use</th>
                            {/* BARU: Kolom Status */}
                            <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res, index) => (
                            <tr 
                                key={index} 
                                onClick={() => navigate(`/reservation/detail/${res.roomCode}`)} 
                                className="clickable-row"
                            >
                                <td>{res.roomCode}</td>
                                <td>{res.date}</td>
                                <td>{res.time}</td>
                                <td>{res.purpose}</td>
                                {/* BARU: Menampilkan Status dengan warna dinamis */}
                                <td className={`status-cell ${res.status.toLowerCase()}`}>
                                    {res.status}
                                </td>
                            </tr>
                        ))}
                        
                        {/* Baris Kosong agar tabel tetap proporsional jika data sedikit */}
                        {[...Array(Math.max(0, 5 - reservations.length))].map((_, i) => (
                            <tr key={`empty-${i}`}>
                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="footer-actions">
                <span className="back-btn" onClick={() => navigate('/')}>Back</span>
            </div>
        </div>
    );
};

export default ReservationList;