import { Stack, Group, Box, Card, Drawer, Indicator } from '@mantine/core';
import {
  Title,
  Text,
  Button,
  Badge,
  ActionIcon,
  PlusIcon,
} from '@datavant/dart';
import { IconBell } from '@tabler/icons-react';
import { useState } from 'react';

interface NextAction {
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
}

interface Project {
  id: string;
  title: string;
  owner: string;
  status: 'in-progress' | 'planning' | 'complete';
  type: string;
  dataDescription: string;
  goal: string;
  nextAction?: NextAction;
}

interface Notification {
  id: string;
  projectId: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

interface ProjectDashboardProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectDashboard({ onProjectClick }: ProjectDashboardProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      projectId: 'heor',
      title: 'Data contracting complete',
      description: 'All 4 ecosystem partners have completed data contracts. Data is ready for combination.',
      timestamp: '2 hours ago',
      read: false,
    },
  ]);

  const projects: Project[] = [
    {
      id: 'heor',
      title: 'HEOR: Tirzepatide Trial Contextualization + Market Analysis',
      owner: 'Sarah Chen (HEOR)',
      status: 'in-progress',
      type: 'Market Intelligence',
      dataDescription: 'Clinical trial (150 patients) + Ecosystem partners',
      goal: 'Validate market opportunity, assess competitiveness',
      nextAction: {
        title: 'Data contracting complete',
        description: 'All ecosystem partners ready. Continue to data combination.',
        actionLabel: 'Continue to Data Combination',
        actionPath: '/heor/data-combination',
      },
    },
    {
      id: 'gps',
      title: 'GPS: Tirzepatide Type 1 DM - Long-Term Safety Monitoring',
      owner: 'Vinay Mehta (GPS/Epidemiology)',
      status: 'planning',
      type: 'Regulatory Submission',
      dataDescription: 'Clinical trial (150 patients) + Record Retrieval',
      goal: 'FDA label expansion (3-year safety data)',
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    // Navigate to project
    if (onProjectClick) {
      onProjectClick(notification.projectId);
    }
    setNotificationsOpen(false);
  };

  const getStatusBadge = (status: Project['status']) => {
    if (status === 'complete') {
      return (
        <Badge status="prominent" type="number" size="sm">
          Complete
        </Badge>
      );
    }
    if (status === 'in-progress') {
      return (
        <Badge status="info" type="number" size="sm">
          In Progress
        </Badge>
      );
    }
    return (
      <Badge status="neutral" type="number" size="sm">
        Planning
      </Badge>
    );
  };

  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Page Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={1} mb="xs">
              Datavant Life Sciences Platform
            </Title>
            <Text size="lg" c="dimmed">
              Active projects and studies
            </Text>
          </Box>
          <Group gap="md">
            <Indicator disabled={unreadCount === 0} color="red" size={8} offset={6}>
              <ActionIcon
                intent="neutral"
                appearance="outline"
                size="lg"
                onClick={() => setNotificationsOpen(true)}
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
            <Button
              intent="neutral"
              appearance="outline"
              leftSection={<PlusIcon />}
              onClick={() => console.log('Create new project')}
            >
              Create New Project
            </Button>
          </Group>
        </Group>

        {/* Notifications Drawer */}
        <Drawer
          opened={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          title="Notifications"
          position="right"
          size="md"
        >
          <Stack gap="md">
            {notifications.length === 0 ? (
              <Text size="sm" c="dimmed">
                No notifications
              </Text>
            ) : (
              notifications.map((notification) => (
                <Box
                  key={notification.id}
                  style={{
                    padding: 'var(--mantine-spacing-md)',
                    border: `1px solid ${notification.read ? 'var(--mantine-color-gray-3)' : 'var(--mantine-color-blue-6)'}`,
                    borderRadius: 'var(--mantine-radius-md)',
                    backgroundColor: notification.read
                      ? 'white'
                      : 'var(--mantine-color-blue-0)',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" fw={600}>
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <Badge status="info" type="number" size="xs">
                          New
                        </Badge>
                      )}
                    </Group>
                    <Text size="sm" c="dimmed">
                      {notification.description}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {notification.timestamp}
                    </Text>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Drawer>

        {/* Active Projects */}
        <Box>
          <Title order={2} mb="lg">
            Active Projects
          </Title>

          <Stack gap="lg">
            {projects.map((project) => (
              <Card
                key={project.id}
                shadow="sm"
                padding="xl"
                radius="md"
                withBorder
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--mantine-color-blue-6)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Stack gap="md">
                  {/* Header with Title and Badge */}
                  <Group justify="space-between" align="flex-start">
                    <Title order={3} style={{ flex: 1 }}>
                      {project.title}
                    </Title>
                    {getStatusBadge(project.status)}
                  </Group>

                  {/* Metadata in horizontal layout */}
                  <Group gap="xl">
                    <Box>
                      <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                        Owner
                      </Text>
                      <Text size="sm">{project.owner}</Text>
                    </Box>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                        Type
                      </Text>
                      <Text size="sm">{project.type}</Text>
                    </Box>
                    <Box>
                      <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                        Data
                      </Text>
                      <Text size="sm">{project.dataDescription}</Text>
                    </Box>
                  </Group>

                  {/* Goal section */}
                  <Box>
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase" mb={4}>
                      Goal
                    </Text>
                    <Text size="sm">{project.goal}</Text>
                  </Box>

                  {/* Next Action - If available */}
                  {project.nextAction && (
                    <Box
                      style={{
                        padding: 'var(--mantine-spacing-md)',
                        backgroundColor: 'var(--mantine-color-blue-0)',
                        border: '2px solid var(--mantine-color-blue-6)',
                        borderRadius: 'var(--mantine-radius-md)',
                      }}
                    >
                      <Stack gap="xs">
                        <Group gap="xs">
                          <Badge status="info" type="number" size="sm">
                            Action Required
                          </Badge>
                          <Text size="sm" fw={600}>
                            {project.nextAction.title}
                          </Text>
                        </Group>
                        <Text size="sm">{project.nextAction.description}</Text>
                      </Stack>
                    </Box>
                  )}

                  {/* Action Button - Left aligned on new line */}
                  <Box>
                    {project.nextAction ? (
                      <Button
                        intent="prominent"
                        appearance="solid"
                        onClick={() => {
                          // Navigate to specific next action path
                          window.location.href = project.nextAction!.actionPath;
                        }}
                      >
                        {project.nextAction.actionLabel}
                      </Button>
                    ) : (
                      <Button
                        intent="prominent"
                        appearance="solid"
                        onClick={() => {
                          if (onProjectClick) {
                            onProjectClick(project.id);
                          }
                        }}
                      >
                        Open Project
                      </Button>
                    )}
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Context Section */}
        <Box>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: 'var(--mantine-color-blue-0)' }}>
            <Stack gap="sm">
              <Title order={4}>Clinical Context</Title>
              <Text size="sm">
                Both projects focus on <strong>tirzepatide in Type 1 diabetes</strong> - a groundbreaking clinical trial studying GLP-1 receptor agonist use in Type 1 DM patients. The HEOR team is validating market opportunity while the GPS team is preparing for FDA label expansion.
              </Text>
            </Stack>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
}
