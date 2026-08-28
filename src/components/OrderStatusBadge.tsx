import { Badge, Group, Tooltip } from '@datavant/dart';
import { IconInfoCircle } from '@tabler/icons-react';
import type { OrderStatus } from '../types';

export type StatusDisplay = { label: string; bg: string; c: string; tooltip?: string };

export const STATUS_DISPLAY: Record<OrderStatus, StatusDisplay> = {
    new: {
        label: 'New',
        bg: 'indigo.6',
        c: 'white',
        tooltip: 'Take action on this order from the Pre-Dispatch tab',
    },
    in_progress: { label: 'In Progress', bg: 'blue.0', c: 'blue.7' },
    complete: { label: 'Complete', bg: 'green.0', c: 'green.9' },
    closing: { label: 'Closing', bg: 'yellow.0', c: 'yellow.9' },
    canceled: { label: 'Canceled', bg: 'gray.1', c: 'gray.7' },
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
    disableTooltip?: boolean;
}

export const OrderStatusBadge = ({ status, disableTooltip }: OrderStatusBadgeProps): JSX.Element => {
    const display = STATUS_DISPLAY[status] ?? { label: status, bg: 'gray.1', c: 'gray.6' };
    const badge = (
        <Badge radius="md" tt="none" type="number" bg={display.bg} c={display.c} p="4px 8px">
            {display.label}
        </Badge>
    );
    if (disableTooltip || !display.tooltip) return badge;
    return (
        <Group gap={4} wrap="nowrap">
            {badge}
            <Tooltip label={display.tooltip} position="top" withArrow>
                <span
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        cursor: 'help',
                        color: 'var(--mantine-color-gray-6)',
                    }}
                >
                    <IconInfoCircle size={16} stroke={1.75} />
                </span>
            </Tooltip>
        </Group>
    );
};
