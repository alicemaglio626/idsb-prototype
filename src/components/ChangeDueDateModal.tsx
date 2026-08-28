import { useEffect, useState } from 'react';
import { Box, Button, DateInput, Divider, Group, Modal, showToast, Stack, Text } from '@datavant/dart';
import { IconArrowRight } from '@tabler/icons-react';

import { type OrderDetailResponse } from '../types';
import { formatDate } from '../utils/formatDate';

interface ChangeDueDateModalProps {
    order: OrderDetailResponse;
    opened: boolean;
    onClose: () => void;
    onDueDateChange: (orderId: string, newDate: string) => void;
}

const LABEL_STYLE = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--mantine-color-dimmed)',
};

export const ChangeDueDateModal = ({ order, opened, onClose, onDueDateChange }: ChangeDueDateModalProps): JSX.Element => {
    const [newDueDate, setNewDueDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNewDueDate(null);
    }, [opened]);

    const currentDueDate = order.due_date.split('T')[0];
    const isUnchanged = newDueDate === currentDueDate;
    const isValid = !!newDueDate && !isUnchanged;

    const onConfirm = (): void => {
        if (!newDueDate) return;
        setIsLoading(true);
        setTimeout(() => {
            onDueDateChange(order.display_id, newDueDate);
            showToast({
                status: 'positive',
                title: `Due date updated to ${formatDate(newDueDate)}`,
                message: '',
            });
            setIsLoading(false);
            onClose();
        }, 400);
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Change Due Date" centered size="md">
            <Stack gap="lg">
                <Group align="flex-start">
                    <Stack gap={4}>
                        <Text style={LABEL_STYLE}>Current Due Date</Text>
                        <Text fw={600}>{formatDate(currentDueDate)}</Text>
                    </Stack>
                    <Box style={{ paddingTop: 4, paddingLeft: 36, paddingRight: 36 }}>
                        <IconArrowRight size={14} color="var(--mantine-color-gray-5)" />
                    </Box>
                    <Stack gap={4}>
                        <Text style={LABEL_STYLE}>New Due Date</Text>
                        <Text fw={600}>{newDueDate ? formatDate(newDueDate) : '—'}</Text>
                    </Stack>
                </Group>
                <Divider />
                <DateInput
                    label="Select new due date"
                    aria-label="New Due Date"
                    value={newDueDate}
                    onChange={value => setNewDueDate(value)}
                    valueFormat="MM/DD/YYYY"
                    clearable
                    error={isUnchanged ? 'Pick a date different from the current due date.' : undefined}
                />
                <Group justify="flex-end" gap={8}>
                    <Button onClick={onClose} appearance="ghost" intent="neutral" type="button" disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="button" disabled={!isValid} loading={isLoading} onClick={onConfirm}>
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
