// Local types replacting the generated payer-order-management-api types

export type OrderStatus = 'new' | 'in_progress' | 'complete' | 'closing' | 'canceled';

export const OrderStatus = {
    NEW: 'new' as OrderStatus,
    IN_PROGRESS: 'in_progress' as OrderStatus,
    COMPLETE: 'complete' as OrderStatus,
    CLOSING: 'closing' as OrderStatus,
    CANCELED: 'canceled' as OrderStatus,
} as const;

export interface OrderDetailResponse {
    display_id: string;
    status: OrderStatus;
    name: string;
    due_date: string; // ISO datetime string e.g. '2026-05-01T00:00:00Z'
    delivery_config: {
        pdf?: {
            schedule?: string[];
            is_continuous?: boolean | null;
            merge?: boolean;
        } | null;
    };
}
