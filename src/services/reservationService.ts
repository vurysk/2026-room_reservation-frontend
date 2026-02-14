// src/services/reservationService.ts
import type { Reservation, RoomSummary } from '../types/reservation';

// Kita buat interface khusus untuk data yang ada di Form
export interface ReservationFormData {
    fullName: string;
    nrp: string;
    purpose: string;
    date: string;
    time: string;
    roomCode?: string; // Opsional
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const API_BASE_URL = 'https://localhost:7000/api'; 

// Interface baru untuk Detail (dengan tambahan Status)
export interface ReservationDetailData extends ReservationFormData {
    status: string;
}

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
        console.log("Payload Data Baru:", data);
        await delay(1000);
        return { success: true };
    },

    // PERBAIKAN: Ganti any dengan ReservationFormData
    getReservationByRoom: async (roomCode: string): Promise<ReservationFormData> => {
        await delay(700);
        // Simulasi data dari database
        return {
            fullName: "Budi Tabuti", 
            nrp: "5025211000",
            purpose: "Rapat Koordinasi Projek",
            date: "2026-02-20",
            time: "10:00 - 12:00",
            roomCode: roomCode
        };
    },

    // BARU: Fungsi untuk mengambil detail lengkap termasuk status
    getReservationDetail: async (roomCode: string): Promise<ReservationDetailData> => {
        await delay(700);
        return {
            roomCode: roomCode,
            fullName: "Budi Tabuti", 
            nrp: "5025211000",
            purpose: "Rapat Koordinasi Projek",
            date: "2026-02-20",
            time: "10:00 - 12:00",
            status: "Approved" // Simulasi status dari DB
        };
    },
    

    // PERBAIKAN: Ganti any dengan ReservationFormData
    updateReservation: async (data: ReservationFormData): Promise<{ success: boolean }> => {
        console.log("Mengirim UPDATE ke ASP.NET di:", `${API_BASE_URL}/reservations`);
        console.log("Payload Update:", data);
        await delay(1000);
        return { success: true };
    },

    getAllReservations: async (): Promise<Reservation[]> => {
        await delay(800);
        return [];
    }
};