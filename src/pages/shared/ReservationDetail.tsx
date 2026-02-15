// src/pages/shared/ReservationDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
// REVISI: Ambil tipe data dari folder types
import type { ReservationDetailData } from '../../types/reservation';
import './ReservationDetail.css';

const ReservationDetail: React.FC = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<ReservationDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (roomCode) {
                const detail = await reservationService.getReservationDetail(roomCode);
                setData(detail);
                setLoading(false);
            }
        };
        fetchDetail();
    }, [roomCode]);

    if (loading) return <div className="loading-text">Loading Details...</div>;

    return (
        <div className="detail-page">
            <h1 className="header-text">RESERVATION<br/>DETAIL</h1>

            <div className="detail-card">
                <table className="detail-table">
                    <tbody>
                        <tr>
                            <td className="label-col">Room Code</td>
                            <td className="value-col">{data?.roomCode}</td>
                        </tr>
                        <tr>
                            <td className="label-col">Full Name</td>
                            <td className="value-col">{data?.fullName}</td>
                        </tr>
                        <tr>
                            <td className="label-col">NRP</td>
                            <td className="value-col">{data?.nrp}</td>
                        </tr>
                        <tr>
                            <td className="label-col">Purpose of Use</td>
                            <td className="value-col">{data?.purpose}</td>
                        </tr>
                        <tr>
                            <td className="label-col">Date</td>
                            <td className="value-col">{data?.date}</td>
                        </tr>
                        <tr>
                            <td className="label-col">Time</td>
                            <td className="value-col">{data?.time}</td>
                        </tr>
                        <tr>
                            <td className="label-col">Status</td>
                            <td className="value-col">{data?.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="footer-actions">
                <span className="back-btn" onClick={() => navigate('/')}>Back</span>
            </div>
        </div>
    );
};

export default ReservationDetail;