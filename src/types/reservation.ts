// src/types/reservation.ts

export type ReservationStatus = 'Pending' | 'Approved' | 'Rejected';
export type SessionStatus = 'Upcoming' | 'On Progress' | 'Finished';
export type RoomGridStatus = 'available' | 'pending' | 'approved';

// Struktur Lengkap sesuai permintaanmu
export interface Reservation {
    id: number;
    applicantName: string;
    nrp: string;
    roomCode: string;
    purpose: string;
    date: string;
    startTime: string;
    endTime: string;
    status: ReservationStatus;
    sessionStatus: SessionStatus;
}

// Khusus untuk tampilan kotak-kotak di Home
export interface RoomSummary {
    id: string;
    code: string;
    status: RoomGridStatus;
    applicantId?: string; // Untuk cek siapa yang punya reservasi
}