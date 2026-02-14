import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import './EditReservation.css';

const EditReservation: React.FC = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '',
        nrp: '',
        purpose: '',
        date: '',
        time: ''
    });

    // AMBIL DATA LAMA SAAT MOUNT
    useEffect(() => {
        const fetchOldData = async () => {
            if (roomCode) {
                const oldData = await reservationService.getReservationByRoom(roomCode);
                setFormData(oldData);
                setLoading(false);
            }
        };
        fetchOldData();
    }, [roomCode]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // VALIDASI INPUT SEBELUM KIRIM
        if (!formData.fullName.trim() || !formData.nrp.trim()) {
            alert("Full Name dan NRP wajib diisi!");
            return;
        }

        const res = await reservationService.updateReservation({ ...formData, roomCode });
        if (res.success) {
            alert("Reservasi berhasil diperbarui!");
            navigate('/');
        }
    };

    if (loading) return <div style={{color: 'white', padding: '3rem'}}>Memuat Data Lama...</div>;

    return (
        <div className="edit-page">
            <h1 className="header-text">EDIT<br/>RESERVATION</h1>

            <div className="form-card">
                <form onSubmit={handleUpdate}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>

                    <div className="input-group">
                        <label>NRP</label>
                        <input type="text" value={formData.nrp} onChange={e => setFormData({...formData, nrp: e.target.value})} />
                    </div>

                    <div className="input-group">
                        <label>Purpose of Use</label>
                        <input type="text" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
                    </div>

                    <div className="input-group">
                        <label>Date</label>
                        <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>

                    <div className="input-group">
                        <label>Time</label>
                        <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                    </div>

                    <div className="footer-actions">
                        <div className="back-btn" onClick={() => navigate('/')}>Back</div>
                        <button type="submit" className="save-btn">Update Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReservation;