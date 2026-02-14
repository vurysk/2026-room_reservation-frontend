// src/pages/user/Home.tsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { BiListUl } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'; // Untuk pindah halaman
import { reservationService } from '../../services/reservationService';
import type { RoomSummary } from '../../types/reservation';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    
    // --- STATE MANAGEMENT ---
    const [rooms, setRooms] = useState<RoomSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // --- EFFECT: Ambil data saat halaman dibuka ---
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await reservationService.getRoomSummaries();
                setRooms(data);
            } catch (err) {
                console.error("Gagal ambil data", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // --- HANDLERS ---
    const handleAction = (path: string) => {
        if (!selectedId && path !== '/reservation/list' && path !== '/reservation/add') {
            alert("Pilih ruangan terlebih dahulu!");
            return;
        }
        // Jika ada selectedId, kita bisa kirim ID-nya lewat URL (misal: /detail/1)
        navigate(selectedId ? `${path}/${selectedId}` : path);
    };

    if (loading) return <div className="loading">Memuat Ruangan...</div>;

    return (
        <div className="home-container">
            <h1 className="page-title">ROOM RESERVE</h1>

            {/* CONTROLLER TOOLBAR */}
            <div className="controller-toolbar">
                <button onClick={() => handleAction('/reservation/add')} title="Create"><FaPlus /></button>
                <button onClick={() => handleAction('/reservation/detail')} disabled={!selectedId} title="Read"><FaEye /></button>
                <button onClick={() => handleAction('/reservation/edit')} disabled={!selectedId} title="Update"><FaEdit /></button>
                <button onClick={() => handleAction('/delete')} disabled={!selectedId} title="Delete"><FaTrash /></button>
                <button onClick={() => handleAction('/reservation/list')} title="List"><BiListUl /></button>
            </div>

            {/* GRID RUANGAN */}
            <div className="room-grid">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className={`room-box ${room.status} ${selectedId === room.id ? 'selected' : ''}`}
                        onClick={() => setSelectedId(room.id === selectedId ? null : room.id)}
                    >
                        {room.code}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;