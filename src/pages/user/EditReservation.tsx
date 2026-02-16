import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import './EditReservation.css';

const EditReservation: React.FC = () => {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reservationId, setReservationId] = useState<string>("");

    const [formData, setFormData] = useState({
        fullName: '',
        nrp: '',
        purpose: '',
        date: '',
        time: ''
    });

    useEffect(() => {
        const fetchOldData = async () => {
            if (roomCode) {
                try {
                    const oldData: any = await reservationService.getReservationByRoom(roomCode);
                    setFormData({
                        fullName: oldData.fullName,
                        nrp: oldData.nrp,
                        purpose: oldData.purpose,
                        date: oldData.date,
                        time: oldData.time
                    });
                    setReservationId(oldData.id.toString());
                    setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    alert("Gagal mengambil data lama.");
                    navigate('/');
                }
            }
        };
        fetchOldData();
    }, [roomCode, navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.fullName.trim() || !formData.nrp.trim()) {
            alert("Full Name dan NRP wajib diisi!");
            return;
        }

        setLoading(true);
        const res = await reservationService.updateReservation(reservationId, { ...formData, roomCode });
        setLoading(false);

        if (res.success) {
            alert("Reservasi berhasil diperbarui!");
            navigate('/');
        } else {
            // Menampilkan pesan spesifik dari backend
            alert(res.message);
        }
    };

    if (loading) return <div style={{color: 'white', padding: '3rem'}}>Memuat Data Lama...</div>;

    return (
        <div className="edit-page">
            <h1 className="header-text">EDIT<br/>RESERVATION</h1>
            <div className="form-card">
                <form onSubmit={handleUpdate}>
                    <div className="input-group"><label>Full Name</label><input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} /></div>
                    <div className="input-group"><label>NRP</label><input type="text" value={formData.nrp} onChange={e => setFormData({...formData, nrp: e.target.value})} /></div>
                    <div className="input-group"><label>Purpose of Use</label><input type="text" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} /></div>
                    <div className="input-group"><label>Date</label><input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                    <div className="input-group"><label>Time</label><input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} /></div>
                    <div className="footer-actions">
                        <div className="back-btn" onClick={() => navigate('/')}>Back</div>
                        <button type="submit" className="save-btn" disabled={loading}>Update Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditReservation;