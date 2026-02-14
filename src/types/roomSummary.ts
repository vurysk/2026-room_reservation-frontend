// Definisikan status yang mungkin dimiliki ruangan
export type RoomStatus = 'available' | 'pending' | 'approved';

// Bentuk data untuk satu kotak ruangan di Halaman Home
export interface RoomSummary {
    id: string;       // ID unik ruangan (contoh: 'r1')
    code: string;     // Kode yang tampil (contoh: 'A-101')
    status: RoomStatus; // Statusnya (warna)
    applicantId?: string; // ID peminjam (opsional, ada jika status bukan 'available')
}