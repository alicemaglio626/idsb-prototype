import '@datavant/dart/styles.css';
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mantine/core';
import {
    DatavantProvider,
    SideNav,
    NavItem,
    FileTextIcon,
} from '@datavant/dart';

import { type OrderDetailResponse, OrderStatus } from './types';
import { MOCK_ORDERS } from './mockData';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [orders, setOrders] = useState<OrderDetailResponse[]>(MOCK_ORDERS);

    const handleStatusChange = (orderId: string, newStatus: OrderStatus): void => {
        setOrders(prev =>
            prev.map(o =>
                o.display_id === orderId ? { ...o, status: newStatus } : o
            )
        );
    };

    const handleDueDateChange = (orderId: string, newDate: string): void => {
        setOrders(prev =>
            prev.map(o =>
                o.display_id === orderId
                    ? { ...o, due_date: newDate + 'T00:00:00Z' }
                    : o
            )
        );
    };

    return (
        <DatavantProvider environment="staging">
            <Box style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
                <SideNav
                    topSections={[
                        {
                            label: 'INTAKE',
                            children: [
                                <NavItem
                                    key="orders"
                                    label="Orders"
                                    leftSection={<FileTextIcon />}
                                    active={location.pathname === '/' || location.pathname.startsWith('/orders')}
                                    onClick={() => navigate('/')}
                                />,
                            ],
                        },
                    ]}
                    userNavItemProps={{
                        isExpanded: true,
                        username: 'Alice Maglio',
                        email: 'alice.maglio@datavant.com',
                        initials: 'AM',
                        onClick: () => {},
                    }}
                />

                <Box
                    style={{
                        flex: 1,
                        height: '100vh',
                        overflow: 'auto',
                        backgroundColor: 'var(--mantine-color-gray-0)',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<OrdersPage orders={orders} />} />
                        <Route
                            path="/orders/:id"
                            element={
                                <OrderDetailPage
                                    orders={orders}
                                    onStatusChange={handleStatusChange}
                                    onDueDateChange={handleDueDateChange}
                                />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </DatavantProvider>
    );
}

export default App;
