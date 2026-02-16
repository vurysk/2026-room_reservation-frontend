// src/pages/user/Home.tsx
import React, { useState, useEffect } from 'react';
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
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data ruangan (dipisah agar bisa dipanggil ulang setelah hapus)
    const fetchRooms = async () => {
        try {
            const data = await reservationService.getRoomSummaries();
            setRooms(data);
        } catch (error) {
            console.error("Gagal memuat data ruangan:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const canAdd = selectedRoom && selectedRoom.status === 'available';
    const canEditOrDetail = selectedRoom && selectedRoom.status !== 'available';

    // --- PERBAIKAN: LOGIKA HAPUS (DELETE) ---
    const handleDelete = async () => {
        if (!selectedRoom || !selectedRoom.applicantId) return;

        // 1. Proteksi: Jika status Approved (Hijau), arahkan ke Admin
        if (selectedRoom.status === 'approved') {
            alert("Reservasi sudah disetujui Admin. Untuk pembatalan, silakan hubungi petugas Admin ruangan.");
            return;
        }

        // 2. Konfirmasi untuk status Pending (Kuning)
        const confirmDelete = window.confirm(
            `Apakah Anda yakin ingin membatalkan reservasi ruang ${selectedRoom.code}?`
        );

        if (confirmDelete) {
            try {
                // Panggil service delete dengan applicantId (ID Reservasi)
                const result = await reservationService.deleteReservation(selectedRoom.applicantId);
                
                if (result.success) {
                    alert("Reservasi berhasil dibatalkan!");
                    setSelectedRoom(null); // Reset pilihan
                    fetchRooms(); // Refresh grid agar kotak kembali coklat
                } else {
                    alert(result.message || "Gagal menghapus reservasi.");
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                alert("Terjadi kesalahan koneksi ke server.");
            }
        }
    };

    if (loading) return <div className="loading-text">Loading Rooms...</div>;

    return (
        <div className="home-container">
            <h1 className="page-title">ROOM RESERVE</h1>

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

                    {/* PERUBAHAN: onClick sekarang memanggil fungsi handleDelete */}
                    <button 
                        disabled={!canEditOrDetail} 
                        onClick={handleDelete}
                        title="Delete"
                    >
                        <FaTrash />
                    </button>

                    <button onClick={() => navigate('/reservation/list')} title="List">
                        <BiListUl />
                    </button>
                </div>

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