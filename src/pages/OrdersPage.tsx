import { useMemo, useState } from 'react';
import { Table } from '@mantine/core';
import {
    Box,
    Button,
    Checkbox,
    Group,
    Menu,
    Select,
    Stack,
    Tabs,
    Text,
    TextInput,
    Title,
} from '@datavant/dart';
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronLeftPipe,
    IconChevronRight,
    IconChevronRightPipe,
    IconRefresh,
    IconSearch,
} from '@tabler/icons-react';
import { type OrderDetailResponse, OrderStatus } from '../types';
import { OrderStatusBadge, STATUS_DISPLAY } from '../components/OrderStatusBadge';
import { OrderSidePanel } from '../components/OrderSidePanel';
import { formatDate } from '../utils/formatDate';
import { isDueDateMet } from '../components/statusTransitions';

interface OrdersPageProps {
    orders: OrderDetailResponse[];
    onResetDemoData: () => void;
    onEditOrder: (orderId: string) => void;
}

const CHARTS_READY = 142;
const PAGE_SIZE_OPTIONS = ['10', '25', '50'];

type SortField = 'record_requests' | 'create_date' | 'due_date';
type SortDir = 'asc' | 'desc';

// ─── Generic multi-select filter dropdown ─────────────────────────────────────

const PILL_BUTTON_STYLE = {
    borderRadius: 999,
    border: '1px solid var(--mantine-color-gray-4)',
    backgroundColor: 'var(--mantine-color-white)',
    color: 'var(--mantine-color-gray-8)',
    fontWeight: 500,
};

const FilterMenu = ({
    label,
    options,
    selected,
    onChange,
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
}): JSX.Element => (
    <Menu closeOnItemClick={false} position="bottom-start">
        <Menu.Target>
            <Button appearance="outline" intent="neutral" size="sm" style={PILL_BUTTON_STYLE} rightSection={<IconChevronDown size={14} />}>
                {label}{selected.length > 0 ? ` (${selected.length})` : ''}
            </Button>
        </Menu.Target>
        <Menu.Dropdown>
            <Stack gap={6} p={8} style={{ minWidth: 200 }}>
                {options.map(option => (
                    <Checkbox
                        key={option}
                        label={option}
                        checked={selected.includes(option)}
                        onChange={() =>
                            onChange(
                                selected.includes(option)
                                    ? selected.filter(v => v !== option)
                                    : [...selected, option]
                            )
                        }
                    />
                ))}
            </Stack>
        </Menu.Dropdown>
    </Menu>
);

const PlaceholderFilterMenu = ({ label }: { label: string }): JSX.Element => (
    <Menu position="bottom-start">
        <Menu.Target>
            <Button appearance="outline" intent="neutral" size="sm" style={PILL_BUTTON_STYLE} rightSection={<IconChevronDown size={14} />}>
                {label}
            </Button>
        </Menu.Target>
        <Menu.Dropdown>
            <Text size="sm" c="dimmed" p={8} style={{ minWidth: 180 }}>Date filtering coming soon.</Text>
        </Menu.Dropdown>
    </Menu>
);

// ─── Sortable column header ────────────────────────────────────────────────────

const SortableHeader = ({
    label,
    field,
    sortField,
    sortDir,
    onSort,
}: {
    label: React.ReactNode;
    field: SortField;
    sortField: SortField | null;
    sortDir: SortDir;
    onSort: (field: SortField) => void;
}): JSX.Element => (
    <Group
        gap={4}
        wrap="nowrap"
        onClick={() => onSort(field)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
    >
        {label}
        <Stack gap={0}>
            <IconChevronUpMini active={sortField === field && sortDir === 'asc'} />
            <IconChevronDownMini active={sortField === field && sortDir === 'desc'} />
        </Stack>
    </Group>
);

const IconChevronUpMini = ({ active }: { active: boolean }): JSX.Element => (
    <svg width="8" height="5" viewBox="0 0 8 5" style={{ display: 'block' }}>
        <path d="M4 0L8 5H0L4 0Z" fill={active ? 'var(--mantine-color-gray-8)' : 'var(--mantine-color-gray-4)'} />
    </svg>
);

const IconChevronDownMini = ({ active }: { active: boolean }): JSX.Element => (
    <svg width="8" height="5" viewBox="0 0 8 5" style={{ display: 'block', marginTop: 1 }}>
        <path d="M4 5L0 0H8L4 5Z" fill={active ? 'var(--mantine-color-gray-8)' : 'var(--mantine-color-gray-4)'} />
    </svg>
);

export const OrdersPage = ({ orders, onResetDemoData, onEditOrder }: OrdersPageProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<'all' | 'pre-dispatch'>('all');
    const [selectedOrder, setSelectedOrder] = useState<OrderDetailResponse | null>(null);
    const [search, setSearch] = useState('');
    const [clientFilter, setClientFilter] = useState<string[]>([]);
    const [projectFilter, setProjectFilter] = useState<string[]>([]);
    const [productFilter, setProductFilter] = useState<string[]>([]);
    const [auditTypeFilter, setAuditTypeFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [pageSize, setPageSize] = useState('25');
    const [page, setPage] = useState(1);

    const uniqueValues = (accessor: (o: OrderDetailResponse) => string): string[] =>
        [...new Set(orders.map(accessor))].sort();

    const clientOptions = useMemo(() => uniqueValues(o => o.client_name), [orders]);
    const projectOptions = useMemo(() => uniqueValues(o => o.project), [orders]);
    const productOptions = useMemo(() => uniqueValues(o => o.product), [orders]);
    const auditTypeOptions = useMemo(() => uniqueValues(o => o.audit_type), [orders]);
    const statusOptions = useMemo(
        () => Object.values(OrderStatus).map(s => STATUS_DISPLAY[s].label),
        []
    );

    const handleSort = (field: SortField): void => {
        if (sortField === field) {
            setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDir('asc');
        }
    };

    const handleResetFilters = (): void => {
        setSearch('');
        setClientFilter([]);
        setProjectFilter([]);
        setProductFilter([]);
        setAuditTypeFilter([]);
        setStatusFilter([]);
        setSortField(null);
        setPage(1);
    };

    const filtered = useMemo(() => {
        let result = activeTab === 'pre-dispatch'
            ? orders.filter(o => o.status === OrderStatus.NEW)
            : orders;

        if (search.trim()) {
            const q = search.trim().toLowerCase();
            result = result.filter(o => o.name.toLowerCase().includes(q) || o.display_id.toLowerCase().includes(q));
        }
        if (clientFilter.length) result = result.filter(o => clientFilter.includes(o.client_name));
        if (projectFilter.length) result = result.filter(o => projectFilter.includes(o.project));
        if (productFilter.length) result = result.filter(o => productFilter.includes(o.product));
        if (auditTypeFilter.length) result = result.filter(o => auditTypeFilter.includes(o.audit_type));
        if (statusFilter.length) result = result.filter(o => statusFilter.includes(STATUS_DISPLAY[o.status].label));

        if (sortField) {
            result = [...result].sort((a, b) => {
                const dir = sortDir === 'asc' ? 1 : -1;
                if (sortField === 'record_requests') return (a.record_requests - b.record_requests) * dir;
                return (new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()) * dir;
            });
        }
        return result;
    }, [orders, activeTab, search, clientFilter, projectFilter, productFilter, auditTypeFilter, statusFilter, sortField, sortDir]);

    const preDispatchCount = useMemo(() => orders.filter(o => o.status === OrderStatus.NEW).length, [orders]);

    const size = Number(pageSize);
    const totalPages = Math.max(1, Math.ceil(filtered.length / size));
    const currentPage = Math.min(page, totalPages);
    const pageStart = filtered.length === 0 ? 0 : (currentPage - 1) * size + 1;
    const pageEnd = Math.min(currentPage * size, filtered.length);
    const pageItems = filtered.slice((currentPage - 1) * size, currentPage * size);

    return (
        <Box p="xl">
            <Stack gap="lg">
                <Group justify="space-between" align="center">
                    <Title order={3}>Orders</Title>
                    <Text
                        component="button"
                        type="button"
                        onClick={onResetDemoData}
                        size="sm"
                        c="blue.7"
                        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                    >
                        Reset demo data
                    </Text>
                </Group>

                <Tabs
                    value={activeTab}
                    onChange={value => { setActiveTab(value as 'all' | 'pre-dispatch'); setPage(1); }}
                >
                    <Tabs.List>
                        <Tabs.Tab value="all">All Orders</Tabs.Tab>
                        <Tabs.Tab value="pre-dispatch" rightSection={
                            <Text size="xs" fw={600} style={{ background: 'var(--mantine-color-gray-2)', padding: '1px 7px', borderRadius: 999 }}>
                                {preDispatchCount}
                            </Text>
                        }>
                            Pre-Dispatch
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                <Group gap={8} align="center">
                    <Text
                        size="xs"
                        fw={700}
                        style={{ background: 'var(--mantine-color-gray-7)', color: 'white', padding: '2px 9px', borderRadius: 999 }}
                    >
                        {filtered.length}
                    </Text>
                    <Text fw={700}>{activeTab === 'pre-dispatch' ? 'Pre-Dispatch' : 'All Orders'}</Text>
                </Group>

                <Group gap={8} wrap="wrap">
                    <TextInput
                        placeholder="Search by Name or Order ID"
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={e => { setSearch(e.currentTarget.value); setPage(1); }}
                        style={{ minWidth: 260 }}
                    />
                    <FilterMenu label="Client" options={clientOptions} selected={clientFilter} onChange={v => { setClientFilter(v); setPage(1); }} />
                    <FilterMenu label="Project" options={projectOptions} selected={projectFilter} onChange={v => { setProjectFilter(v); setPage(1); }} />
                    <FilterMenu label="Product" options={productOptions} selected={productFilter} onChange={v => { setProductFilter(v); setPage(1); }} />
                    <FilterMenu label="Audit Type" options={auditTypeOptions} selected={auditTypeFilter} onChange={v => { setAuditTypeFilter(v); setPage(1); }} />
                    <FilterMenu label="Order Status" options={statusOptions} selected={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} />
                    <PlaceholderFilterMenu label="Create Date" />
                    <PlaceholderFilterMenu label="Due Date" />
                    <Button appearance="outline" intent="neutral" size="sm" style={PILL_BUTTON_STYLE} onClick={handleResetFilters} aria-label="Reset filters">
                        <IconRefresh size={16} />
                    </Button>
                </Group>

                <Table.ScrollContainer minWidth={1450}>
                <Table highlightOnHover withTableBorder withColumnBorders={false} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>
                                <Text size="sm" fw={600}>Order Name</Text>
                                <Text size="xs" c="dimmed" fw={400}>Order ID</Text>
                            </Table.Th>
                            <Table.Th>Client Name</Table.Th>
                            <Table.Th>
                                <Text size="sm" fw={600}>Project</Text>
                                <Text size="xs" c="dimmed" fw={400}>Product</Text>
                            </Table.Th>
                            <Table.Th>Audit Type</Table.Th>
                            <Table.Th>Order Status</Table.Th>
                            <Table.Th>
                                <SortableHeader label="Record Requests" field="record_requests" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                            </Table.Th>
                            <Table.Th>
                                <SortableHeader label="Create Date" field="create_date" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                            </Table.Th>
                            <Table.Th>
                                <SortableHeader label="Due Date" field="due_date" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                            </Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {pageItems.map(order => (
                            <Table.Tr
                                key={order.display_id}
                                onClick={() => setSelectedOrder(order)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Table.Td>
                                    <Text size="sm" fw={500}>{order.name}</Text>
                                    <Text size="xs" c="dimmed">{order.display_id}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm">{order.client_name}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm">{order.project}</Text>
                                    <Text size="xs" c="dimmed">{order.product}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm">{order.audit_type}</Text>
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
                                    <Text size="sm">{order.record_requests.toLocaleString()}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm">{formatDate(order.create_date)}</Text>
                                </Table.Td>
                                <Table.Td>
                                    <Stack gap={2}>
                                        <Text size="sm">{formatDate(order.due_date)}</Text>
                                        {order.status === OrderStatus.IN_PROGRESS && isDueDateMet(order.due_date) && (
                                            <Text size="xs" c="orange.7">Passed</Text>
                                        )}
                                    </Stack>
                                </Table.Td>
                                <Table.Td>
                                    <Text
                                        component="button"
                                        type="button"
                                        size="sm"
                                        c="blue.7"
                                        onClick={e => { e.stopPropagation(); setSelectedOrder(order); }}
                                        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                                    >
                                        View Details
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                        {pageItems.length === 0 && (
                            <Table.Tr>
                                <Table.Td colSpan={9}>
                                    <Text size="sm" c="dimmed" ta="center" py="lg">No orders match your filters.</Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
                </Table.ScrollContainer>

                <Group justify="space-between" align="center">
                    <Group gap={8} align="center">
                        <Text size="sm" c="dimmed">Items per page:</Text>
                        <Select
                            data={PAGE_SIZE_OPTIONS}
                            value={pageSize}
                            onChange={value => { setPageSize(value ?? '25'); setPage(1); }}
                            style={{ width: 70 }}
                        />
                    </Group>
                    <Text size="sm" c="dimmed">
                        {filtered.length === 0 ? '0 of 0 items' : `${pageStart}–${pageEnd} of ${filtered.length} items`}
                    </Text>
                    <Group gap={4}>
                        <Button appearance="ghost" intent="neutral" size="sm" disabled={currentPage === 1} onClick={() => setPage(1)} aria-label="First page">
                            <IconChevronLeftPipe size={16} />
                        </Button>
                        <Button appearance="ghost" intent="neutral" size="sm" disabled={currentPage === 1} onClick={() => setPage(p => p - 1)} aria-label="Previous page">
                            <IconChevronLeft size={16} />
                        </Button>
                        <Text size="sm">Page {currentPage} of {totalPages}</Text>
                        <Button appearance="ghost" intent="neutral" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(p => p + 1)} aria-label="Next page">
                            <IconChevronRight size={16} />
                        </Button>
                        <Button appearance="ghost" intent="neutral" size="sm" disabled={currentPage === totalPages} onClick={() => setPage(totalPages)} aria-label="Last page">
                            <IconChevronRightPipe size={16} />
                        </Button>
                    </Group>
                </Group>
            </Stack>

            <OrderSidePanel
                order={selectedOrder}
                opened={selectedOrder !== null}
                onClose={() => setSelectedOrder(null)}
                onEditOrder={(orderId) => { setSelectedOrder(null); onEditOrder(orderId); }}
            />
        </Box>
    );
};
