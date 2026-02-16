// src/pages/admin/ReservationHistory.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import type { ReservationHistoryData } from '../../types/reservation';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './ReservationHistory.css';

const ReservationHistory: React.FC = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState<ReservationHistoryData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await reservationService.getReservationHistory();
                setHistory(data);
            } catch (error) {
                console.error("Gagal memuat history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    // LOGIKA SEARCH & FILTER (Sinkron dengan Backend)
    const filteredData = history.filter(item => {
        const matchesSearch = Object.values(item).some(val => 
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter sekarang mencocokkan nilai string ASLI dari database
        const matchesFilter = filterStatus === 'All' || 
                             item.status === filterStatus || 
                             item.sessionStatus === filterStatus;
        
        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="loading-text">Loading History...</div>;

    return (
        <div className="history-page">
            <h1 className="header-text">RESERVATION<br/>HISTORY</h1>

            <div className="history-controls">
                <div className="search-box">
                    <FaSearch className="control-icon" />
                    <input 
                        type="text" 
                        placeholder="Search all columns..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-wrapper">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All Status & Session</option>
                        {/* Opsi di bawah ini sekarang sama dengan data di Backend */}
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="On-Going">On-Going</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <FaFilter className="control-icon" />
                </div>
            </div>

            <div className="history-card">
                <div className="table-responsive">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Applicant</th>
                                <th>Room Code</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((res, index) => (
                                    <tr key={index}>
                                        <td>{res.fullName}</td>
                                        <td>{res.roomCode}</td>
                                        <td>{res.date}</td>
                                        <td>{res.time}</td>
                                        <td>
                                            {/* Badge class dan teks sekarang sinkron dengan Backend */}
                                            <span className={`badge status-${res.status.toLowerCase()}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge session-${res.sessionStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                                                {res.sessionStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                        No data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="footer-actions">
                <span className="back-btn" onClick={() => navigate('/admin/approval')}>Back</span>
            </div>
        </div>
    );
};

export default ReservationHistory;