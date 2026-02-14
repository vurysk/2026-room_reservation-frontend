import type { Reservation, RoomSummary } from '../types/reservation';

// Simulasi delay internet (1 detik)
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const reservationService = {
    // 1. Ambil data untuk Grid di Home
    getRoomSummaries: async (): Promise<RoomSummary[]> => {
        await delay(800); // Simulasi loading
        return [
            { id: '1', code: 'A-101', status: 'available' },
            { id: '2', code: 'A-102', status: 'available' },
            { id: '3', code: 'A-103', status: 'available' },
            { id: '4', code: 'A-104', status: 'approved', applicantId: 'user123' },
            { id: '5', code: 'B-103', status: 'approved', applicantId: 'other' },
            { id: '6', code: 'C-104', status: 'pending', applicantId: 'user123' },
            // ... tambahkan data lain sesuai kebutuhan
        ];
    },

    // 2. Fungsi untuk membuat reservasi (POST ke ASP.NET nanti)
    createReservation: async (data: Partial<Reservation>): Promise<boolean> => {
        await delay(1000);
        console.log("Data terkirim ke Backend:", data);
        return true;
    },

    // 3. Fungsi ambil list reservasi
    getAllReservations: async (): Promise<Reservation[]> => {
        await delay(800);
        return [];
    }
};