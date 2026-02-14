import type { Reservation, RoomSummary } from '../types/reservation';

// Simulasi delay internet (agar terasa seperti mengambil data beneran)
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const API_BASE_URL = 'https://localhost:7000/api'; 

export const reservationService = {
    // 1. TETAP ADA: Untuk Grid Ruangan di Halaman Home
    getRoomSummaries: async (): Promise<RoomSummary[]> => {
        await delay(800); 
        return [
            { id: '1', code: 'A-101', status: 'available' },
            { id: '2', code: 'A-102', status: 'available' },
            { id: '3', code: 'A-103', status: 'available' },
            { id: '4', code: 'A-104', status: 'approved', applicantId: 'user123' },
            { id: '5', code: 'B-103', status: 'approved', applicantId: 'other' },
            { id: '6', code: 'C-104', status: 'pending', applicantId: 'user123' },
        ];
    },

    // 2. BARU: Untuk Mengirim Data dari Halaman Form
    // Kita gunakan return object { success: boolean } agar Form bisa memberikan feedback ke user
    createReservation: async (data: unknown): Promise<{ success: boolean; message?: string }> => {
        console.log("Menghubungkan ke ASP.NET di:", `${API_BASE_URL}/reservations`);
        console.log("Payload Data:", data);
        
        await delay(1000); // Simulasi proses di server
        
        // Logika sederhana: anggap selalu berhasil untuk sekarang
        return { success: true };
    },

    // 3. TETAP ADA: Untuk Halaman List/History nantinya
    getAllReservations: async (): Promise<Reservation[]> => {
        await delay(800);
        return [];
    }
};