import { useEffect, useState } from 'react';
import { Box, Button, Divider, Group, Modal, Radio, showToast, Stack, Text } from '@datavant/dart';
import { IconArrowRight, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';

import { type OrderDetailResponse, OrderStatus } from '../types';
import { formatDate } from '../utils/formatDate';
import { OrderStatusBadge, STATUS_DISPLAY } from './OrderStatusBadge';
import { getAllowedTransitions, isDueDateMet } from './statusTransitions';

interface ChangeStatusModalProps {
    order: OrderDetailResponse;
    opened: boolean;
    onClose: () => void;
    onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const LABEL_STYLE = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--mantine-color-dimmed)',
};

const getOptionDescription = (fromStatus: OrderStatus, toStatus: OrderStatus): string => {
    if (toStatus === OrderStatus.CLOSING) return 'Ends dispatch; charts still arrive passively.';
    if (toStatus === OrderStatus.COMPLETE && fromStatus === OrderStatus.IN_PROGRESS) return 'Retrieval ends immediately.';
    if (toStatus === OrderStatus.COMPLETE && fromStatus === OrderStatus.CLOSING) return 'Finalizes the order.';
    if (toStatus === OrderStatus.CANCELED) return 'Order is permanently canceled with no charts delivered.';
    return '';
};

const ImplicationRow = ({ ok, label }: { ok: boolean; label: string }): JSX.Element => (
    <Group gap="xs" wrap="nowrap" align="flex-start">
        {ok ? (
            <IconCheck size={15} color="var(--mantine-color-green-7)" style={{ marginTop: 3, flexShrink: 0 }} />
        ) : (
            <IconX size={15} color="var(--mantine-color-red-6)" style={{ marginTop: 3, flexShrink: 0 }} />
        )}
        <Text size="sm">{label}</Text>
    </Group>
);

const ClosingImplications = (): JSX.Element => (
    <Stack gap="md">
        <Stack gap={6}>
            <Text size="xs" fw={700} tt="uppercase" c="green.7" style={{ letterSpacing: '0.04em' }}>Starts</Text>
            <ImplicationRow ok label="Chart delivery can be initiated by CS at any time" />
        </Stack>
        <Stack gap={6}>
            <Text size="xs" fw={700} tt="uppercase" c="blue.7" style={{ letterSpacing: '0.04em' }}>Continues</Text>
            <ImplicationRow ok label="Charts arrive from already-dispatched providers" />
            <ImplicationRow ok label="QA will continue" />
        </Stack>
        <Stack gap={6}>
            <Text size="xs" fw={700} tt="uppercase" c="red.6" style={{ letterSpacing: '0.04em' }}>Stops</Text>
            <ImplicationRow ok={false} label="No new retrieval targets are activated" />
            <ImplicationRow ok={false} label="Charts are not delivered automatically" />
            <ImplicationRow ok={false} label="Research tasks and pended records are no longer worked" />
        </Stack>
    </Stack>
);

const SkipToCompleteImplications = (): JSX.Element => (
    <Stack gap="md">
        <Stack gap={6}>
            <Text size="xs" fw={700} tt="uppercase" c="green.7" style={{ letterSpacing: '0.04em' }}>Starts</Text>
            <ImplicationRow ok label="Final billing will be started" />
        </Stack>
        <Stack gap={6}>
            <Text size="xs" fw={700} tt="uppercase" c="red.6" style={{ letterSpacing: '0.04em' }}>Stops</Text>
            <ImplicationRow ok={false} label="Retrieval stops immediately" />
            <ImplicationRow ok={false} label="No charts are delivered to the client" />
        </Stack>
    </Stack>
);

const ClosingToCompleteImplications = (): JSX.Element => (
    <Stack gap="md">
        <Stack gap="md">
            <Stack gap={6}>
                <Text size="xs" fw={700} tt="uppercase" c="green.7" style={{ letterSpacing: '0.04em' }}>Starts</Text>
                <ImplicationRow ok label="Final billing will be started" />
            </Stack>
            <Stack gap={6}>
                <Text size="xs" fw={700} tt="uppercase" c="red.6" style={{ letterSpacing: '0.04em' }}>Stops</Text>
                <ImplicationRow ok={false} label="Retrieval stops — no more charts collected" />
                <ImplicationRow ok={false} label="Charts failing AutoQA are not sent to ManualQA" />
            </Stack>
        </Stack>
        <Divider />
        <Group gap="xs" align="flex-start" wrap="nowrap" p="sm" style={{
            background: 'var(--mantine-color-orange-0)',
            borderLeft: '3px solid var(--mantine-color-orange-4)',
            borderRadius: 4,
        }}>
            <IconInfoCircle size={16} color="var(--mantine-color-orange-7)" style={{ flexShrink: 0, marginTop: 1 }} />
            <Stack gap={2}>
                <Text size="sm" c="orange.8" fw={500}>Deliver charts before continuing</Text>
                <Text size="sm" c="orange.8">
                    There are <strong>142 charts</strong> ready for delivery. Charts cannot be delivered after an order is marked Complete — use the Chart Delivery card to deliver them first.
                </Text>
            </Stack>
        </Group>
    </Stack>
);

const InlineImplications = ({
    fromStatus,
    toStatus,
}: {
    fromStatus: OrderStatus;
    toStatus: OrderStatus;
}): JSX.Element | null => {
    if (fromStatus === OrderStatus.IN_PROGRESS && toStatus === OrderStatus.CLOSING)
        return <ClosingImplications />;
    if (fromStatus === OrderStatus.IN_PROGRESS && toStatus === OrderStatus.COMPLETE)
        return <SkipToCompleteImplications />;
    if (fromStatus === OrderStatus.CLOSING && toStatus === OrderStatus.COMPLETE)
        return <ClosingToCompleteImplications />;
    return null;
};

export const ChangeStatusModal = ({ order, opened, onClose, onStatusChange }: ChangeStatusModalProps): JSX.Element => {
    const [target, setTarget] = useState<OrderStatus | null>(null);
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const [showDeliveryPrompt, setShowDeliveryPrompt] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTarget(null);
        setCancelConfirm(false);
        setShowDeliveryPrompt(false);
    }, [opened]);

    const options = getAllowedTransitions(order);
    const dueDateBlocksClose = order.status === OrderStatus.IN_PROGRESS && !isDueDateMet(order.due_date);

    const fireUpdate = (): void => {
        if (!target) return;
        const movingToClosing = order.status === OrderStatus.IN_PROGRESS && target === OrderStatus.CLOSING;
        setIsLoading(true);
        setTimeout(() => {
            onStatusChange(order.display_id, target);
            showToast({
                status: 'positive',
                title: `Status updated to ${STATUS_DISPLAY[target].label}`,
                message: '',
            });
            setIsLoading(false);
            if (movingToClosing && isDueDateMet(order.due_date)) {
                setShowDeliveryPrompt(true);
            } else {
                onClose();
            }
        }, 400);
    };

    const onConfirmClick = (): void => {
        if (target === OrderStatus.CANCELED) {
            setCancelConfirm(true);
        } else {
            fireUpdate();
        }
    };

    // ── Delivery prompt after In Progress → Closing ───────────────────────────
    if (showDeliveryPrompt) {
        return (
            <Modal opened={opened} onClose={onClose} title="Order moved to Closing" centered size="md">
                <Stack gap="lg">
                    <Group gap="xs" align="flex-start" wrap="nowrap" p="sm" style={{
                        background: 'var(--mantine-color-blue-0)',
                        borderLeft: '3px solid var(--mantine-color-blue-4)',
                        borderRadius: 4,
                    }}>
                        <IconInfoCircle size={16} color="var(--mantine-color-blue-6)" style={{ flexShrink: 0, marginTop: 1 }} />
                        <Text size="sm" c="blue.7">
                            <strong>142 charts</strong> collected since the due date are ready for delivery. You can deliver them now from the Chart Delivery card, or initiate delivery at any time while the order is in Closing.
                        </Text>
                    </Group>
                    <Group justify="flex-end" gap={8}>
                        <Button type="button" onClick={onClose}>
                            Got it
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        );
    }

    // ── Cancel confirmation step ──────────────────────────────────────────────
    if (cancelConfirm) {
        return (
            <Modal opened={opened} onClose={onClose} title="Change Status" centered size="md">
                <Stack gap="lg">
                    <Group align="flex-start" gap="md">
                        <Stack gap={4}>
                            <Text style={LABEL_STYLE}>Current Status</Text>
                            <OrderStatusBadge status={order.status} disableTooltip />
                        </Stack>
                        <Box style={{ paddingTop: 4, paddingLeft: 36, paddingRight: 36 }}>
                            <IconArrowRight size={14} color="var(--mantine-color-gray-5)" />
                        </Box>
                        <Stack gap={4}>
                            <Text style={LABEL_STYLE}>New Status</Text>
                            <OrderStatusBadge status={OrderStatus.CANCELED} disableTooltip />
                        </Stack>
                    </Group>
                    <Divider />
                    <Text size="sm" c="dimmed">
                        This action cannot be undone. The order will be permanently canceled.
                    </Text>
                    <Group justify="flex-end" gap={8}>
                        <Button onClick={() => setCancelConfirm(false)} appearance="ghost" intent="neutral" type="button" disabled={isLoading}>
                            Back
                        </Button>
                        <Button type="button" intent="negative" loading={isLoading} onClick={fireUpdate}>
                            Confirm
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        );
    }

    return (
        <Modal opened={opened} onClose={onClose} title="Change Status" centered size="md">
            <Stack gap="lg">
                <Group align="flex-start">
                    <Stack gap={4}>
                        <Text style={LABEL_STYLE}>Current Status</Text>
                        <OrderStatusBadge status={order.status} disableTooltip />
                    </Stack>
                    <Box style={{ paddingTop: 4, paddingLeft: 36, paddingRight: 36 }}>
                        <IconArrowRight size={14} color="var(--mantine-color-gray-5)" />
                    </Box>
                    <Stack gap={4}>
                        <Text style={LABEL_STYLE}>New Status</Text>
                        {target
                            ? <OrderStatusBadge status={target} disableTooltip />
                            : <Text fw={600}>—</Text>
                        }
                    </Stack>
                </Group>
                <Divider />
                <Text size="sm" c="dimmed">Select a status to view more details.</Text>

                <Radio.Group
                    label="Move to:"
                    value={target ?? ''}
                    onChange={value => setTarget(value as OrderStatus)}
                >
                    <Stack gap="md" pt="sm">
                        {options.map(option => (
                            <Stack key={option} gap={0}>
                                <Radio
                                    value={option}
                                    styles={{
                                        body: { alignItems: 'flex-start' },
                                        inner: { marginTop: 3 },
                                    }}
                                    label={
                                        <Stack gap={3}>
                                            <Text size="sm" fw={600}>{STATUS_DISPLAY[option].label}</Text>
                                            <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
                                                {getOptionDescription(order.status, option)}
                                            </Text>
                                        </Stack>
                                    }
                                />
                                {target === option && (
                                    <Box pt="xs" pl={26}>
                                        <InlineImplications
                                            fromStatus={order.status}
                                            toStatus={option}
                                        />
                                    </Box>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Radio.Group>

                {dueDateBlocksClose && (
                    <Group gap="xs" align="flex-start" wrap="nowrap" p="sm" style={{
                        background: 'var(--mantine-color-violet-0)',
                        borderLeft: '3px solid var(--mantine-color-violet-4)',
                        borderRadius: 4,
                    }}>
                        <IconInfoCircle size={16} color="var(--mantine-color-violet-6)" style={{ flexShrink: 0, marginTop: 1 }} />
                        <Text size="sm" c="violet.7">
                            You may change the status to Closing or Complete on or after the due date ({formatDate(order.due_date)}).
                        </Text>
                    </Group>
                )}

                <Group justify="flex-end" gap={8}>
                    <Button onClick={onClose} appearance="ghost" intent="neutral" type="button">
                        Cancel
                    </Button>
                    <Button type="button" disabled={!target} loading={isLoading} onClick={onConfirmClick}>
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
