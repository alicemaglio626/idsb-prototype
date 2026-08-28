import { type OrderDetailResponse, OrderStatus } from './types';

export const MOCK_ORDERS: OrderDetailResponse[] = [
    {
        display_id: 'ORD-1001',
        name: 'Aetna — Q2 2026 Records Batch',
        status: OrderStatus.IN_PROGRESS,
        due_date: '2026-05-01T00:00:00Z', // past due
        delivery_config: {
            pdf: {
                schedule: [],
                is_continuous: false,
                merge: false,
            },
        },
    },
    {
        display_id: 'ORD-1002',
        name: 'BlueCross — Annual Audit Pull',
        status: OrderStatus.IN_PROGRESS,
        due_date: '2026-12-15T00:00:00Z', // future
        delivery_config: {
            pdf: {
                schedule: [],
                is_continuous: false,
                merge: false,
            },
        },
    },
    {
        display_id: 'ORD-1003',
        name: 'UnitedHealth — Chronic Conditions Cohort',
        status: OrderStatus.CLOSING,
        due_date: '2026-05-01T00:00:00Z',
        delivery_config: { pdf: null },
    },
    {
        display_id: 'ORD-1004',
        name: 'Cigna — Oncology Study Records',
        status: OrderStatus.COMPLETE,
        due_date: '2026-04-01T00:00:00Z',
        delivery_config: { pdf: null },
    },
    {
        display_id: 'ORD-1005',
        name: 'Humana — Diabetes Monitoring',
        status: OrderStatus.NEW,
        due_date: '2026-09-30T00:00:00Z',
        delivery_config: {
            pdf: {
                schedule: [],
                is_continuous: false,
                merge: false,
            },
        },
    },
    {
        display_id: 'ORD-1006',
        name: 'Molina — Behavioral Health Pilot',
        status: OrderStatus.CANCELED,
        due_date: '2026-03-15T00:00:00Z',
        delivery_config: { pdf: null },
    },
];
