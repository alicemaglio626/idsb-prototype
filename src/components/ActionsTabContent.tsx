import { useState } from 'react';
import { Box, Button, Group, Paper, Stack, Text, Tooltip } from '@datavant/dart';
import { IconActivity, IconCalendar, IconSend } from '@tabler/icons-react';

import { type OrderDetailResponse, OrderStatus } from '../types';
import { OrderStatusBadge, STATUS_DISPLAY } from './OrderStatusBadge';
import { ChangeStatusModal } from './ChangeStatusModal';
import { ChangeDueDateModal } from './ChangeDueDateModal';
import { InitiateChartDeliveryModal } from './InitiateChartDeliveryModal';
import { getAllowedTransitions, isDueDateMet } from './statusTransitions';
import { formatDate } from '../utils/formatDate';

interface ActionsTabContentProps {
    order: OrderDetailResponse;
    onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
    onDueDateChange: (orderId: string, newDate: string) => void;
}

const statusDisabledReason = (order: OrderDetailResponse, deliveryInProgress: boolean): string | undefined => {
    if (deliveryInProgress) return 'A chart delivery is in progress. Come back in 15–20 minutes to update the status.';
    if (getAllowedTransitions(order).length > 0) return undefined;
    if (order.status === OrderStatus.NEW) return 'Dispatch the order before changing its status.';
    return `${STATUS_DISPLAY[order.status].label} orders can't be moved to another status.`;
};

const dueDateDisabledReason = (order: OrderDetailResponse): string | undefined => {
    if (order.status !== OrderStatus.IN_PROGRESS) return 'Due date can only be changed when the order is In Progress.';
    const pdf = order.delivery_config.pdf;
    if (!pdf) return 'No chart (PDF) delivery configured on this order.';
    if (pdf.merge) return "Merged-PDF deliveries can't be rescheduled here.";
    return undefined;
};

const dueDateContext = (order: OrderDetailResponse): string | undefined => {
    if (order.status !== OrderStatus.IN_PROGRESS) return undefined;
    return 'Due dates can be extended to allow more time for active retrieval.';
};

// ─── Bullet helper ────────────────────────────────────────────────────────────

const Bullet = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <Group gap={6} align="flex-start" wrap="nowrap">
        <Text size="sm" c="dimmed" style={{ flexShrink: 0 }}>·</Text>
        <Text size="sm" c="dimmed">{children}</Text>
    </Group>
);

// ─── Status card educational content ─────────────────────────────────────────

const StatusCardNote = ({ order }: { order: OrderDetailResponse }): JSX.Element | null => {
    const dueMet = isDueDateMet(order.due_date);

    if (order.status === OrderStatus.IN_PROGRESS) {
        return (
            <Stack gap={6} mt={2}>
                <Text size="sm" c="dimmed">
                    Active retrieval is underway.{dueMet ? ' Automated delivery to the client has ended.' : ''}
                </Text>
                <Stack gap={4}>
                    <Text size="sm" c="dimmed" fw={500}>This order can move to:</Text>
                    {dueMet ? (
                        <Stack gap={4}>
                            <Bullet>Closing — ends dispatch; charts still arrive passively</Bullet>
                            <Bullet>Complete — skips Closing, ends retrieval immediately</Bullet>
                            <Bullet>Canceled — permanently cancels the order</Bullet>
                        </Stack>
                    ) : (
                        <Stack gap={4}>
                            <Bullet>Canceled — permanently cancels the order</Bullet>
                            <Text size="sm" c="dimmed">Closing and Complete become available on or after the due date.</Text>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        );
    }

    if (order.status === OrderStatus.CLOSING) {
        return (
            <Stack gap={6} mt={2}>
                <Text size="sm" c="dimmed">Active dispatch has ended. Charts continue arriving from already-dispatched providers.</Text>
                <Stack gap={4}>
                    <Text size="sm" c="dimmed" fw={500}>This order can move to:</Text>
                    <Bullet>Complete — finalizes the order; collected charts can be delivered to the client</Bullet>
                </Stack>
            </Stack>
        );
    }

    const staticNote: Partial<Record<OrderStatus, string>> = {
        complete: 'Retrieval is complete. No further charts will be collected or delivered.',
        canceled: 'This order has been canceled.',
        new: "This order hasn't been dispatched yet.",
    };

    const note = staticNote[order.status];
    return note ? <Text size="sm" c="dimmed" mt={2}>{note}</Text> : null;
};

// ─── Stat card ────────────────────────────────────────────────────────────────

const StatCard = ({
    label,
    icon,
    children,
    note,
    disabledReason,
    buttonLabel,
    onClick,
}: {
    label: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    note?: React.ReactNode;
    disabledReason?: string;
    buttonLabel: string;
    onClick: () => void;
}): JSX.Element => (
    <Paper
        withBorder
        p="md"
        radius="md"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
        <Group gap="xs" align="center">
            <span style={{ color: 'var(--mantine-color-gray-6)', display: 'flex' }}>{icon}</span>
            <Text fw={600}>{label}</Text>
        </Group>
        <Stack gap={4} style={{ flex: 1 }}>
            {children}
            {disabledReason ? (
                <Text size="sm" c="dimmed" mt={2}>{disabledReason}</Text>
            ) : note ? (
                typeof note === 'string'
                    ? <Text size="sm" c="dimmed" mt={2}>{note}</Text>
                    : <Box mt={2}>{note}</Box>
            ) : null}
        </Stack>
        <Group justify="flex-end">
            <Tooltip label={disabledReason ?? ''} disabled={!disabledReason} position="top">
                <span>
                    <Button
                        appearance="outline"
                        disabled={!!disabledReason}
                        onClick={onClick}
                        size="sm"
                    >
                        {buttonLabel}
                    </Button>
                </span>
            </Tooltip>
        </Group>
    </Paper>
);

// ─── Main component ───────────────────────────────────────────────────────────

const CHARTS_READY_INITIAL = 142;

export const ActionsTabContent = ({ order, onStatusChange, onDueDateChange }: ActionsTabContentProps): JSX.Element => {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [dueDateModalOpen, setDueDateModalOpen] = useState(false);
    const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
    const [chartsReady, setChartsReady] = useState(CHARTS_READY_INITIAL);
    const [deliveryInProgress, setDeliveryInProgress] = useState(false);

    const isClosing = order.status === OrderStatus.CLOSING;
    const currentDueDate = order.due_date.split('T')[0];

    const handleDeliveryInitiated = (): void => {
        setChartsReady(0);
        setDeliveryInProgress(true);
        // Prototype: re-enable after 20s (real: 15–20 min)
        setTimeout(() => setDeliveryInProgress(false), 20_000);
    };

    return (
        <Box py="md" style={{ maxWidth: isClosing ? 960 : 640 }}>
            <Stack gap="md">
                <Group align="stretch" gap="sm" wrap="nowrap">
                    <StatCard
                        label="Order Status"
                        icon={<IconActivity size={16} />}
                        disabledReason={statusDisabledReason(order, deliveryInProgress)}
                        buttonLabel="Change Status"
                        onClick={() => setStatusModalOpen(true)}
                    >
                        <OrderStatusBadge status={order.status} disableTooltip />
                        <StatusCardNote order={order} />
                    </StatCard>

                    {isClosing && (
                        <StatCard
                            label="Chart Delivery"
                            icon={<IconSend size={16} />}
                            note="You can initiate delivery multiple times as more charts arrive in Closing."
                            disabledReason={chartsReady === 0 ? 'No charts ready for delivery.' : undefined}
                            buttonLabel="Initiate Delivery"
                            onClick={() => setDeliveryModalOpen(true)}
                        >
                            <Text fw={600}>{chartsReady} charts ready</Text>
                        </StatCard>
                    )}

                    <StatCard
                        label="Due Date"
                        icon={<IconCalendar size={16} />}
                        note={dueDateContext(order)}
                        disabledReason={dueDateDisabledReason(order)}
                        buttonLabel="Change Due Date"
                        onClick={() => setDueDateModalOpen(true)}
                    >
                        <Group gap="xs" align="center">
                            <Text fw={600}>{formatDate(currentDueDate)}</Text>
                            {order.status === OrderStatus.IN_PROGRESS && isDueDateMet(order.due_date) && (
                                <Text size="xs" fw={600} style={{ background: 'var(--mantine-color-orange-1)', color: 'var(--mantine-color-orange-7)', padding: '2px 8px', borderRadius: 999 }}>
                                    Passed
                                </Text>
                            )}
                            {order.status === OrderStatus.IN_PROGRESS && !isDueDateMet(order.due_date) && (
                                <Text size="xs" fw={600} style={{ background: 'var(--mantine-color-gray-1)', color: 'var(--mantine-color-gray-6)', padding: '2px 8px', borderRadius: 999 }}>
                                    Not met
                                </Text>
                            )}
                        </Group>
                    </StatCard>
                </Group>
            </Stack>

            <ChangeStatusModal
                order={order}
                opened={statusModalOpen}
                onClose={() => setStatusModalOpen(false)}
                onStatusChange={onStatusChange}
            />
            <ChangeDueDateModal
                order={order}
                opened={dueDateModalOpen}
                onClose={() => setDueDateModalOpen(false)}
                onDueDateChange={onDueDateChange}
            />
            <InitiateChartDeliveryModal
                opened={deliveryModalOpen}
                chartsReady={chartsReady}
                onClose={() => setDeliveryModalOpen(false)}
                onDeliveryInitiated={handleDeliveryInitiated}
            />
        </Box>
    );
};
