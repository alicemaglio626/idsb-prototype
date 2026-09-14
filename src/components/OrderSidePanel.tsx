import { Accordion, Box, Button, Divider, Group, Stack, Text } from '@datavant/dart';
import { type OrderDetailResponse } from '../types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatDate } from '../utils/formatDate';
import { Drawer } from './AppDrawer';

interface OrderSidePanelProps {
    order: OrderDetailResponse | null;
    opened: boolean;
    onClose: () => void;
    onEditOrder: (orderId: string) => void;
}

const FIELD_LABEL_STYLE = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--mantine-color-dimmed)',
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }): JSX.Element => (
    <Stack gap={4} style={{ flex: 1 }}>
        <Text style={FIELD_LABEL_STYLE}>{label}</Text>
        <Text size="sm" fw={500}>{children}</Text>
    </Stack>
);

const CONFIG_SECTIONS = ['Order Config', 'Retrieval', 'Delivery', 'CDE Config', 'Invoice Config', 'Health Plan Letters'];

export const OrderSidePanel = ({ order, opened, onClose, onEditOrder }: OrderSidePanelProps): JSX.Element => {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            position="right"
            size={480}
            title={order ? <Text fw={700} size="lg">{order.name}</Text> : ''}
        >
            {order && (
                <Stack gap="lg" pb={80}>
                    <Divider label="Order" labelPosition="left" />

                    <Group align="flex-start" wrap="nowrap">
                        <Field label="Order ID">{order.display_id}</Field>
                        <Field label="Status"><OrderStatusBadge status={order.status} disableTooltip /></Field>
                    </Group>
                    <Group align="flex-start" wrap="nowrap">
                        <Field label="Project">{order.project}</Field>
                        <Field label="Client Name">{order.client_name}</Field>
                    </Group>
                    <Group align="flex-start" wrap="nowrap">
                        <Field label="Product">{order.product}</Field>
                        <Field label="Audit Type">{order.audit_type}</Field>
                    </Group>
                    <Group align="flex-start" wrap="nowrap">
                        <Field label="Due Date">{formatDate(order.due_date)}</Field>
                        <Field label="Start Date">{formatDate(order.start_date)}</Field>
                    </Group>
                    <Group align="flex-start" wrap="nowrap">
                        <Field label="Create Date">{formatDate(order.create_date)}</Field>
                        <Box style={{ flex: 1 }} />
                    </Group>

                    <Accordion variant="separated" multiple chevronPosition="right">
                        {CONFIG_SECTIONS.map(section => (
                            <Accordion.Item key={section} value={section}>
                                <Accordion.Control>
                                    <Text size="sm" fw={600}>{section.toUpperCase()}</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Text size="sm" c="dimmed">No configuration data available in this prototype.</Text>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    <Box
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            right: 0,
                            width: 480,
                            background: 'var(--mantine-color-white)',
                            borderTop: '1px solid var(--mantine-color-gray-3)',
                            padding: 16,
                        }}
                    >
                        <Group justify="flex-end" gap={8}>
                            <Button appearance="ghost" intent="neutral" type="button" disabled>
                                Delete Order
                            </Button>
                            <Button type="button" onClick={() => onEditOrder(order.display_id)}>
                                Edit Order
                            </Button>
                        </Group>
                    </Box>
                </Stack>
            )}
        </Drawer>
    );
};
