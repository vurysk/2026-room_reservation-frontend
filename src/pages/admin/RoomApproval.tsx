// src/pages/admin/RoomApproval.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import type { ReservationDetailData } from '../../types/reservation';
// Import ikon sejarah untuk navigasi history
import { FaHistory } from 'react-icons/fa'; 
import './RoomApproval.css';

const RoomApproval: React.FC = () => {
    const navigate = useNavigate();
    const [pendingList, setPendingList] = useState<ReservationDetailData[]>([]);
    const [loading, setLoading] = useState(true);

    // loadData diletakkan di dalam useEffect untuk menghindari error linter
    useEffect(() => {
        const loadData = async () => {
            const data = await reservationService.getPendingReservations();
            setPendingList(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAction = async (roomCode: string, action: 'Approved' | 'Rejected') => {
        const confirmMsg = action === 'Approved' ? 'Terima pengajuan ini?' : 'Tolak pengajuan ini?';
        if (window.confirm(confirmMsg)) {
            const res = await reservationService.updateReservationStatus(roomCode!, action);
            if (res.success) {
                alert(`Reservasi Ruang ${roomCode} telah di-${action}`);
                // Menghapus data dari list secara otomatis (State Management)
                setPendingList(prev => prev.filter(item => item.roomCode !== roomCode));
            }
        }
    };

    if (loading) return <div className="loading-text">Loading Pending Requests...</div>;

    return (
        <div className="approval-page">
            <h1 className="header-text">ROOM<br/>APPROVAL</h1>

            {/* NAVIGASI: Tombol Lingkaran + Tulisan Informatif */}
            <div className="navigation-wrapper">
                <div className="history-nav-item">
                    <button 
                        className="history-circle-btn" 
                        onClick={() => alert("Menuju Halaman History...")}
                        title="Reservation History"
                    >
                        <FaHistory />
                    </button>
                    <span className="history-label">Reservation History</span>
                </div>
            </div>

            <div className="approval-card">
                <table className="approval-table">
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>Room Code</th>
                            <th style={{ width: '40%' }}>Purpose Of Use</th>
                            {/* colSpan={2} agar header Actions menaungi kolom Detail dan kolom Tombol */}
                            <th colSpan={2} style={{ width: '45%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingList.map((item, index) => (
                            <tr key={index}>
                                <td>{item.roomCode}</td>
                                <td>{item.purpose}</td>
                                {/* Kolom terpisah untuk Detail (garis vertikal muncul) */}
                                <td className="detail-col">
                                    <span className="detail-link" onClick={() => navigate(`/reservation/detail/${item.roomCode}`)}>
                                        Detail
                                    </span>
                                </td>
                                {/* Kolom terpisah untuk Tombol */}
                                <td className="btns-col">
                                    <div className="btn-group">
                                        <button className="btn-decline" onClick={() => handleAction(item.roomCode!, 'Rejected')}>Decline</button>
                                        <button className="btn-accept" onClick={() => handleAction(item.roomCode!, 'Approved')}>Accept</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* Baris kosong dengan 4 sel (td) agar garis tetap konsisten */}
                        {[...Array(Math.max(0, 5 - pendingList.length))].map((_, i) => (
                            <tr key={`empty-${i}`}>
                                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
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

export default RoomApproval;