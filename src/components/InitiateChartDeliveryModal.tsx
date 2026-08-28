import { useState } from 'react';
import { Button, Group, Modal, Stack, Text, showToast } from '@datavant/dart';

const CLIENT_NAME = 'Datavant Demo Client';
const TOTAL_RECORD_REQUESTS = 1842;
const CHARTS_COLLECTED_TOTAL = 1205;
const CURRENT_YIELD = Math.round((CHARTS_COLLECTED_TOTAL / TOTAL_RECORD_REQUESTS) * 100);

interface InitiateChartDeliveryModalProps {
    opened: boolean;
    chartsReady: number;
    onClose: () => void;
    onDeliveryInitiated: () => void;
}

const DetailRow = ({ label, value }: { label: string; value: string }): JSX.Element => (
    <Stack gap={2}>
        <Text size="sm" c="dimmed">{label}</Text>
        <Text size="sm" fw={500}>{value}</Text>
    </Stack>
);

export const InitiateChartDeliveryModal = ({
    opened,
    chartsReady,
    onClose,
    onDeliveryInitiated,
}: InitiateChartDeliveryModalProps): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = (): void => {
        setIsLoading(true);
        setTimeout(() => {
            onDeliveryInitiated();
            showToast({
                status: 'positive',
                title: 'Delivery initiated',
                message: `${chartsReady} charts are being transferred to ${CLIENT_NAME}. This will take 15–20 minutes.`,
            });
            setIsLoading(false);
            onClose();
        }, 600);
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Deliver ${chartsReady} Charts to Client`}
            centered
            size="md"
        >
            <Stack gap="lg">
                <Group gap="xl" align="flex-start">
                    <DetailRow label="Estimated delivery" value="15–20 minutes" />
                    <DetailRow
                        label="Current yield"
                        value={`${CURRENT_YIELD}% (${CHARTS_COLLECTED_TOTAL.toLocaleString()} of ${TOTAL_RECORD_REQUESTS.toLocaleString()} records)`}
                    />
                </Group>

                <Text size="sm" c="dimmed">
                    Once delivery is initiated, you will not be able to move the order to Complete until the transfer is complete.
                </Text>

                <Group justify="flex-end" gap={8}>
                    <Button
                        onClick={onClose}
                        appearance="ghost"
                        intent="neutral"
                        type="button"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button type="button" loading={isLoading} onClick={handleConfirm}>
                        Deliver Charts
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
