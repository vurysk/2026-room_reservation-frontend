import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
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

    // Fungsi Navigasi ke Form dengan membawa Parameter Kode Ruang
    const handleAddClick = () => {
        if (selectedRoom) {
            navigate(`/reservation/add/${selectedRoom.code}`);
        }
    };

    return (
        <div className="home-container">
            <h1 className="page-title">ROOM RESERVE</h1>

            <div className="controller-toolbar">
                {/* VALIDASI: Tombol hanya menyala jika selectedRoom tidak null */}
                <button onClick={handleAddClick} disabled={!selectedRoom} title="Add Reservation">
                    <FaPlus />
                </button>
                <button disabled={!selectedRoom} title="Read Detail"><FaEye /></button>
                <button disabled={!selectedRoom} title="Update Reservation"><FaEdit /></button>
                <button disabled={!selectedRoom} title="Delete"><FaTrash /></button>
                
                {/* Tombol List tetap menyala */}
                <button onClick={() => navigate('/reservation/list')} title="List Reservations">
                    <BiListUl />
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