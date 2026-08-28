import { useNavigate } from 'react-router-dom';
import { Box, Group, Stack, Table, Text, Title } from '@datavant/dart';
import { type OrderDetailResponse, OrderStatus } from '../types';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { formatDate } from '../utils/formatDate';
import { isDueDateMet } from '../components/statusTransitions';

interface OrdersPageProps {
    orders: OrderDetailResponse[];
}

const CHARTS_READY = 142;

export const OrdersPage = ({ orders }: OrdersPageProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Box p="xl">
            <Stack gap="lg">
                <Group justify="space-between" align="center">
                    <Title order={3}>Orders</Title>
                </Group>

                <Table highlightOnHover withTableBorder withColumnBorders={false} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Order ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Due Date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {orders.map(order => (
                            <Table.Tr
                                key={order.display_id}
                                onClick={() => navigate(`/orders/${order.display_id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Table.Td>
                                    <Text size="sm" fw={500}>{order.display_id}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm">{order.name}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Stack gap={4}>
                                        <OrderStatusBadge status={order.status} disableTooltip />
                                        {order.status === OrderStatus.CLOSING && (
                                            <Text size="xs" c="dimmed">{CHARTS_READY} charts ready</Text>
                                        )}
                                    </Stack>
                                </Table.Td>
                                <Table.Td>
                                    <Stack gap={2}>
                                        <Text size="sm">{formatDate(order.due_date)}</Text>
                                        {order.status === OrderStatus.IN_PROGRESS && isDueDateMet(order.due_date) && (
                                            <Text size="xs" c="orange.7">Passed</Text>
                                        )}
                                    </Stack>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Text size="xs" c="dimmed">
                    Click any order to view details and take actions.
                </Text>
            </Stack>
        </Box>
    );
};
