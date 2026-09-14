import { type OrderDetailResponse, OrderStatus } from '../types';

export const isDueDateMet = (dueDate: string): boolean => new Date(dueDate).getTime() <= Date.now();

export const getAllowedTransitions = (
    order: Pick<OrderDetailResponse, 'status' | 'due_date'>
): OrderStatus[] => {
    switch (order.status) {
        case OrderStatus.NEW:
            return [OrderStatus.CANCELED];
        case OrderStatus.IN_PROGRESS:
            return isDueDateMet(order.due_date)
                ? [OrderStatus.CLOSING, OrderStatus.COMPLETE]
                : [];
        case OrderStatus.CLOSING:
            return [OrderStatus.COMPLETE];
        default:
            return [];
    }
};
