// src/pages/user/Home.tsx
import React, { useState, useEffect } from 'react';
// REVISI: Menambahkan FaUserShield untuk ikon Admin
import { FaPlus, FaEye, FaEdit, FaTrash, FaUserShield } from 'react-icons/fa'; 
import { BiListUl } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { reservationService } from '../../services/reservationService';
import type { RoomSummary } from '../../types/reservation';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<RoomSummary[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<RoomSummary | null>(null);

    useEffect(() => {
        reservationService.getRoomSummaries().then(setRooms);
    }, []);

    const canAdd = selectedRoom && selectedRoom.status === 'available';
    const canEditOrDetail = selectedRoom && selectedRoom.status !== 'available';

    return (
        <div className="home-container">
            <h1 className="page-title">ROOM RESERVE</h1>

            {/* BARU: Container pembungkus navigasi untuk memisahkan Toolbar dan Lingkaran Admin */}
            <div className="navigation-wrapper">
                <div className="controller-toolbar">
                    <button 
                        disabled={!canAdd} 
                        onClick={() => navigate(`/reservation/add/${selectedRoom?.code}`)}
                        title="Add New"
                    >
                        <FaPlus />
                    </button>
                    
                    <button 
                        disabled={!canEditOrDetail} 
                        onClick={() => navigate(`/reservation/detail/${selectedRoom?.code}`)}
                        title="Detail"
                    >
                        <FaEye />
                    </button>
            
                    <button 
                        disabled={!canEditOrDetail} 
                        onClick={() => navigate(`/reservation/edit/${selectedRoom?.code}`)}
                        title="Edit Reservation"
                    >
                        <FaEdit />
                    </button>

                    <button 
                        disabled={!canEditOrDetail} 
                        onClick={() => alert(`Hapus reservasi ruang ${selectedRoom?.code}?`)}
                        title="Delete"
                    >
                        <FaTrash />
                    </button>

                    <button onClick={() => navigate('/reservation/list')} title="List">
                        <BiListUl />
                    </button>
                </div>

                {/* BARU: Tombol Admin berbentuk lingkaran di sebelah kanan toolbar */}
                <button 
                    className="admin-circle-btn" 
                    onClick={() => navigate('/admin/approval')}
                    title="Admin Approval"
                >
                    <FaUserShield />
                </button>
            </div>

            <div className="room-grid">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className={`room-box ${room.status} ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                        onClick={() => setSelectedRoom(room.id === selectedRoom?.id ? null : room)}
                    >
                        {room.code}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;