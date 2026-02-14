// src/services/reservationService.ts
import type { 
    RoomSummary, 
    ReservationFormData, 
    ReservationDetailData 
} from '../types/reservation';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
//const API_BASE_URL = 'https://localhost:7000/api'; 

export const reservationService = {
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

    createReservation: async (data: ReservationFormData): Promise<{ success: boolean; message?: string }> => {
        console.log("Payload Data Baru ke ASP.NET:", data); // 'data' digunakan di sini
        await delay(1000);
        return { success: true };
    },

    getReservationByRoom: async (roomCode: string): Promise<ReservationFormData> => {
        await delay(700);
        return {
            fullName: "Budi Tabuti", 
            nrp: "5025211000",
            purpose: "Rapat Koordinasi Projek",
            date: "2026-02-20",
            time: "10:00 - 12:00",
            roomCode: roomCode
        };
    },

    getReservationDetail: async (roomCode: string): Promise<ReservationDetailData> => {
        await delay(700);
        return {
            roomCode: roomCode,
            fullName: "Budi Tabuti", 
            nrp: "5025211000",
            purpose: "Rapat Koordinasi Projek",
            date: "2026-02-20",
            time: "10:00 - 12:00",
            status: "Approved" 
        };
    },
    
    // PERBAIKAN: Masukkan 'data' ke dalam console.log agar tidak dianggap "Unused Parameter"
    updateReservation: async (data: ReservationFormData): Promise<{ success: boolean }> => {
        console.log("Mengirim UPDATE ke ASP.NET:", data); // Sekarang 'data' dipanggil
        await delay(1000);
        return { success: true };
    },

    getAllReservations: async (): Promise<ReservationDetailData[]> => {
        await delay(800);
        return [
            { 
                roomCode: 'A-104', 
                fullName: 'Budi Tabuti', 
                nrp: '5025211000', 
                date: '2026-02-20', 
                time: '10:00 - 12:00', 
                purpose: 'Rapat Koordinasi Projek', 
                status: 'Approved' 
            },
            { 
                roomCode: 'B-103', 
                fullName: 'Siti Aminah', 
                nrp: '5025211001', 
                date: '2026-02-21', 
                time: '13:00 - 15:00', 
                purpose: 'Seminar Kerja Praktek', 
                status: 'Approved' 
            },
            { 
                roomCode: 'C-104', 
                fullName: 'Andi Wijaya', 
                nrp: '5025211002', 
                date: '2026-02-22', 
                time: '08:00 - 11:00', 
                purpose: 'Praktikum Pemrograman', 
                status: 'Pending' 
            }
        ];
    },

    getPendingReservations: async (): Promise<ReservationDetailData[]> => {
        await delay(800);
        return [
            { 
                roomCode: 'C-104', 
                fullName: 'Andi Wijaya', 
                nrp: '5025211002', 
                date: '2026-02-22', 
                time: '08:00 - 11:00', 
                purpose: 'Praktikum Pemrograman', 
                status: 'Pending' 
            },
            { 
                roomCode: 'D-101', 
                fullName: 'Rina Rose', 
                nrp: '5025211005', 
                date: '2026-02-23', 
                time: '10:00 - 12:00', 
                purpose: 'Rapat Internal', 
                status: 'Pending' 
            },
        ];
    },

    /**
     * Memperbarui status reservasi (Accept/Decline).
     * @param roomCode Kode ruangan yang statusnya akan diubah.
     * @param newStatus Status baru ('Approved' atau 'Rejected').
     */
    updateReservationStatus: async (roomCode: string, newStatus: 'Approved' | 'Rejected'): Promise<{ success: boolean }> => {
        console.log(`API Call (Admin): Merubah status ${roomCode} menjadi ${newStatus}`);
        await delay(1000); // Simulasi koneksi ke database ASP.NET
        return { success: true };
    }
    
};