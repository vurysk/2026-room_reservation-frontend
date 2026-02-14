import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import './AddReservation.css';

const AddReservation: React.FC = () => {
    const { roomCode } = useParams(); // Ambil kode ruang dari URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        nrp: '',
        purpose: '',
        date: '',
        time: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // VALIDASI INPUT: Sebelum dikirim ke backend
        if (!formData.fullName || !formData.nrp || !formData.purpose || !formData.date || !formData.time) {
            alert("Harap lengkapi semua data form!");
            return;
        }

        setLoading(true);
        // Gabungkan data form dengan data ruangan yang dipilih sebelumnya
        const finalData = { ...formData, roomCode }; 
        const result = await reservationService.createReservation(finalData);
        setLoading(false);

        if (result.success) {
            alert(`Reservasi Ruang ${roomCode} Berhasil!`);
            navigate('/');
        }
    };

    return (
        <div className="add-reservation-page">
            <h1 className="form-header">RESERVATION<br/>FORM</h1>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>Full Name</label>
                        <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>

                    <div className="input-field">
                        <label>NRP</label>
                        <input type="text" value={formData.nrp} onChange={e => setFormData({...formData, nrp: e.target.value})} />
                    </div>

                    <div className="input-field">
                        <label>Purpose of Use</label>
                        <input type="text" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
                    </div>

                    <div className="input-field">
                        <label>Date</label>
                        <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>

                    <div className="input-field">
                        <label>Time</label>
                        <input type="text" placeholder="e.g. 08:00 - 10:00" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                    </div>

                    <div className="form-footer">
                        <div className="back-link" onClick={() => navigate('/')}>Back</div>
                        <div className="btn-group">
                            <button type="button" className="btn-clear" onClick={() => setFormData({fullName:'', nrp:'', purpose:'', date:'', time:''})}>Clear</button>
                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReservation;