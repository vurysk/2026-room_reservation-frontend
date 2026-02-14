// src/types/reservation.ts

export type ReservationStatus = 'Pending' | 'Approved' | 'Rejected';
export type SessionStatus = 'Upcoming' | 'On Progress' | 'Finished';
export type RoomGridStatus = 'available' | 'pending' | 'approved';

// Kontrak Utama untuk Database/Backend
export interface Reservation {
    id: number;
    fullName: string;    // Diselaraskan (sebelumnya applicantName)
    nrp: string;
    roomCode: string;
    purpose: string;
    date: string;
    time: string;        // Diselaraskan (sebelumnya startTime & endTime)
    status: ReservationStatus;
    sessionStatus: SessionStatus;
}

// Kontrak khusus untuk pengiriman data Form (Tanpa ID dan Status)
export interface ReservationFormData {
    fullName: string;
    nrp: string;
    purpose: string;
    date: string;
    time: string;
    roomCode?: string;
}

// Kontrak khusus untuk Detail/List (Form + Status)
export interface ReservationDetailData extends ReservationFormData {
    status: ReservationStatus;
}

export interface RoomSummary {
    id: string;
    code: string;
    status: RoomGridStatus;
    applicantId?: string;
}