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

    // Fetch data saat komponen dimuat
    useEffect(() => {
        reservationService.getRoomSummaries().then(setRooms);
    }, []);

    // --- LOGIKA VALIDASI TOMBOL ---
    
    // 1. Add (+) hanya bisa jika ada ruang dipilih DAN statusnya 'available'
    const canAdd = selectedRoom && selectedRoom.status === 'available';

    // 2. Edit, Detail, & Delete hanya bisa jika ada ruang dipilih DAN statusnya BUKAN 'available'
    const canEditOrDetail = selectedRoom && selectedRoom.status !== 'available';

    // --- HANDLERS ---
    const handleAddClick = () => {
        if (canAdd) {
            navigate(`/reservation/add/${selectedRoom.code}`);
        }
    };

    const handleEditClick = () => {
        if (canEditOrDetail) {
            navigate(`/reservation/edit/${selectedRoom.code}`);
        }
    };

    return (
        <div className="home-container">
            <h1 className="page-title">ROOM RESERVE</h1>

            <div className="controller-toolbar">
                {/* Tombol ADD: Aktif jika ruang kosong */}
                <button 
                    onClick={handleAddClick} 
                    disabled={!canAdd} 
                    title="Add Reservation"
                >
                    <FaPlus />
                </button>
                
                {/* Tombol DETAIL: Aktif jika sudah di-reservasi */}
                <button 
                    disabled={!canEditOrDetail} 
                    title="Read Detail"
                    onClick={() => navigate(`/reservation/detail/${selectedRoom?.code}`)}
                >
                    <FaEye />
                </button>

                {/* Tombol EDIT: Aktif jika sudah di-reservasi */}
                <button 
                    onClick={handleEditClick}
                    disabled={!canEditOrDetail} 
                    title="Update Reservation"
                >
                    <FaEdit />
                </button>

                {/* Tombol DELETE: Aktif jika sudah di-reservasi */}
                <button 
                    disabled={!canEditOrDetail} 
                    title="Delete"
                    onClick={() => {
                        if(window.confirm(`Hapus reservasi ruang ${selectedRoom?.code}?`)) {
                            console.log("Menghapus reservasi...");
                        }
                    }}
                >
                    <FaTrash />
                </button>
                
                {/* Tombol LIST: Selalu aktif */}
                <button 
                    onClick={() => navigate('/reservation/list')} 
                    title="List Reservations"
                >
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