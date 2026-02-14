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
        reservationService.getReservationHistory().then(data => {
            setHistory(data);
            setLoading(false);
        });
    }, []);

    // LOGIKA SEARCH & FILTER (Frontend Side)
    const filteredData = history.filter(item => {
        const matchesSearch = Object.values(item).some(val => 
            val.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = filterStatus === 'All' || item.status === filterStatus || item.sessionStatus === filterStatus;
        
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
                        <option value="Approved">Accepted Only</option>
                        <option value="Rejected">Declined Only</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="On-Going">On-Going</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <FaFilter className="control-icon" />
                </div>
            </div>

            <div className="history-card">
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
                        {filteredData.map((res, index) => (
                            <tr key={index}>
                                <td>{res.fullName}</td>
                                <td>{res.roomCode}</td>
                                <td>{res.date}</td>
                                <td>{res.time}</td>
                                <td>
                                    <span className={`badge status-${res.status.toLowerCase()}`}>
                                        {res.status === 'Approved' ? 'Accept' : 'Decline'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge session-${res.sessionStatus.toLowerCase().replace(' ', '-')}`}>
                                        {res.sessionStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="footer-actions">
                <span className="back-btn" onClick={() => navigate('/admin/approval')}>Back</span>
            </div>
        </div>
    );
};

export default ReservationHistory;