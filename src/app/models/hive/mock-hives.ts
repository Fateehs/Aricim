import { Hive } from "./hive.model";


export const MOCK_HIVES: Hive[] = [
    { id: '1', name: 'Kovan A', status: 'Aktif', honeyAmount: 1.2, type: 'Standart', createdAt: '2025-01-01T00:00:00Z', userId: 'user1' },
    { id: '2', name: 'Kovan B', status: 'Dinleniyor', honeyAmount: 0.8, type: 'Standart', createdAt: '2025-01-02T00:00:00Z', userId: 'user1' },
    { id: '3', name: 'Kovan C', status: 'Hasat Yapıldı', honeyAmount: 1.1, type: 'Standart', createdAt: '2025-01-03T00:00:00Z', userId: 'user1' }
];
