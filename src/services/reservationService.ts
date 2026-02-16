// src/services/reservationService.ts
import type { 
    RoomSummary, 
    ReservationFormData, 
    ReservationDetailData, 
    ReservationHistoryData
} from '../types/reservation';

const API_BASE_URL = 'http://localhost:5084/api'; 

// Helper untuk mengekstrak pesan error dari Backend ASP.NET
const extractErrorMessage = async (response: Response): Promise<string> => {
    try {
        const result = await response.json();
        
        // 1. Cek jika ada error dari Data Annotations (ValidationProblemDetails)
        if (result.errors) {
            // Mengambil pesan pertama dari list error yang ada
            const firstErrorField = Object.keys(result.errors)[0];
            return result.errors[firstErrorField][0];
        }
        
        // 2. Cek jika ada error manual (BadRequest({ message: "..." }))
        if (result.message) return result.message;

        return "Terjadi kesalahan pada server.";
    } catch {
        return "Gagal menghubungi server.";
    }
};

export const reservationService = {
    getRoomSummaries: async (): Promise<RoomSummary[]> => {
        const response = await fetch(`${API_BASE_URL}/rooms`);
        if (!response.ok) throw new Error('Gagal mengambil data ruangan');
        return await response.json();
    },

    createReservation: async (data: ReservationFormData): Promise<{ success: boolean; message?: string }> => {
        const response = await fetch(`${API_BASE_URL}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMsg = await extractErrorMessage(response);
            return { success: false, message: errorMsg };
        }
        return { success: true };
    },

    getReservationByRoom: async (roomCode: string): Promise<ReservationFormData> => {
        const response = await fetch(`${API_BASE_URL}/reservations/room/${roomCode}`);
        if (!response.ok) throw new Error('Ruangan kosong atau tidak ditemukan');
        return await response.json();
    },

    getReservationDetail: async (roomCode: string): Promise<ReservationDetailData> => {
        const response = await fetch(`${API_BASE_URL}/reservations/room/${roomCode}`);
        if (!response.ok) throw new Error('Gagal mengambil detail reservasi');
        return await response.json();
    },
    
    updateReservation: async (id: string, data: ReservationFormData): Promise<{ success: boolean; message?: string }> => {
        const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMsg = await extractErrorMessage(response);
            return { success: false, message: errorMsg };
        }
        return { success: true };
    },

    deleteReservation: async (id: string): Promise<{ success: boolean; message?: string }> => {
        const response = await fetch(`${API_BASE_URL}/reservations/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorMsg = await extractErrorMessage(response);
            return { success: false, message: errorMsg };
        }
        return { success: true };
    },

    getAllReservations: async (): Promise<ReservationDetailData[]> => {
        const response = await fetch(`${API_BASE_URL}/reservations`);
        if (!response.ok) throw new Error('Gagal mengambil daftar reservasi');
        return await response.json();
    },

    getPendingReservations: async (): Promise<ReservationDetailData[]> => {
        const response = await fetch(`${API_BASE_URL}/admin/pending`);
        if (!response.ok) throw new Error('Gagal mengambil data pending');
        return await response.json();
    },

    updateReservationStatus: async (roomCode: string, newStatus: string): Promise<{ success: boolean }> => {
        const response = await fetch(`${API_BASE_URL}/admin/status/${roomCode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newStatus: newStatus })
        });
        return { success: response.ok };
    }, 

    getReservationHistory: async (): Promise<ReservationHistoryData[]> => {
        const response = await fetch(`${API_BASE_URL}/admin/history`);
        if (!response.ok) throw new Error('Gagal mengambil riwayat');
        return await response.json();
    }
};