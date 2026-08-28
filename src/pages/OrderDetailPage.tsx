import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Group, Stack, Tabs, Text, Title } from '@datavant/dart';
import { IconArrowLeft } from '@tabler/icons-react';
import { type OrderDetailResponse, OrderStatus } from '../types';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { ActionsTabContent } from '../components/ActionsTabContent';
import { formatDate } from '../utils/formatDate';

interface OrderDetailPageProps {
    orders: OrderDetailResponse[];
    onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
    onDueDateChange: (orderId: string, newDate: string) => void;
}

export const OrderDetailPage = ({ orders, onStatusChange, onDueDateChange }: OrderDetailPageProps): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const order = orders.find(o => o.display_id === id);

    if (!order) {
        return (
            <Box p="xl">
                <Text>Order not found.</Text>
            </Box>
        );
    }

    return (
        <Box p="xl">
            <Stack gap="lg">
                <Group gap="sm" align="center">
                    <Button
                        appearance="ghost"
                        intent="neutral"
                        size="xs"
                        leftSection={<IconArrowLeft size={14} />}
                        onClick={() => navigate('/')}
                    >
                        Orders
                    </Button>
                </Group>

                <Stack gap={4}>
                    <Group gap="md" align="center">
                        <Title order={3}>{order.name}</Title>
                        <OrderStatusBadge status={order.status} />
                    </Group>
                    <Group gap="xl">
                        <Text size="sm" c="dimmed">
                            <strong>ID:</strong> {order.display_id}
                        </Text>
                        <Text size="sm" c="dimmed">
                            <strong>Due:</strong> {formatDate(order.due_date)}
                        </Text>
                    </Group>
                </Stack>

                <Tabs defaultValue="actions">
                    <Tabs.List>
                        <Tabs.Tab value="actions">Actions</Tabs.Tab>
                        <Tabs.Tab value="details" disabled>Details</Tabs.Tab>
                        <Tabs.Tab value="history" disabled>History</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="actions" pt="md">
                        <ActionsTabContent
                            order={order}
                            onStatusChange={onStatusChange}
                            onDueDateChange={onDueDateChange}
                        />
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Box>
    );
};
