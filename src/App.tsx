import '@datavant/dart/styles.layer.css';
import { Stack, Title, Card, Grid, Box, Group } from '@mantine/core';
import {
  DatavantProvider,
  SideNav,
  NavItem,
  Button,
  Text,
  Badge,
  SearchIcon,
  FolderIcon,
  FileCabinetIcon,
  LockIcon,
  HelpIcon,
} from '@datavant/dart';

function App() {
  return (
    <DatavantProvider environment="staging">
      <Group gap={0} style={{ height: '100vh', overflow: 'hidden' }} align="stretch">
        <SideNav
          topSections={[
            {
              children: <NavItem label="Data Discovery" leftSection={<SearchIcon />} active />,
            },
            {
              label: 'PLATFORM',
              children: [
                <NavItem label="My Studies" leftSection={<FolderIcon />} key="studies" />,
                <NavItem
                  label="Data Sources"
                  leftSection={<FileCabinetIcon />}
                  key="data-sources"
                />,
                <NavItem label="Privacy & Compliance" leftSection={<LockIcon />} key="privacy" />,
              ],
            },
          ]}
          bottomSections={[
            {
              children: <NavItem label="Help & Support" leftSection={<HelpIcon />} />,
            },
          ]}
          userNavItemProps={{
            isExpanded: true,
            username: 'Demo User',
            email: 'demo@datavant.com',
            initials: 'DU',
            onClick: () => console.log('User menu clicked'),
          }}
        />

        <Box style={{ flex: 1, overflow: 'auto', backgroundColor: 'var(--mantine-color-gray-0)' }} p="xl">
          <Stack gap="lg">
            <div>
              <Title order={1} mb="xs">
                Data Discovery
              </Title>
              <Text size="lg" c="dimmed" mb="md">
                Search and explore healthcare data sources for your research
              </Text>
              <Group gap="md">
                <Button>Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="subtle">Subtle Button</Button>
                <Button variant="light">Light Button</Button>
              </Group>
            </div>

            <Grid>
              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Title order={3} mb={4}>
                          Optum CDM
                        </Title>
                        <Badge color="green" size="sm">
                          Active
                        </Badge>
                      </div>
                    </Group>

                    <div>
                      <Text size="sm" fw={500} c="dimmed">
                        Claims Database
                      </Text>
                      <Text size="sm" mt={4}>
                        ~150,000 RA patients
                      </Text>
                      <Text size="xs" c="dimmed">
                        Coverage: 2017-2025
                      </Text>
                    </div>

                    <Group gap="xs" mt="xs">
                      <Badge variant="light" size="xs">
                        Pharmacy
                      </Badge>
                      <Badge variant="light" size="xs">
                        Diagnoses
                      </Badge>
                      <Badge variant="light" size="xs">
                        Procedures
                      </Badge>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Title order={3} mb={4}>
                          Merative MarketScan
                        </Title>
                        <Badge color="blue" size="sm">
                          Provisioned
                        </Badge>
                      </div>
                    </Group>

                    <div>
                      <Text size="sm" fw={500} c="dimmed">
                        Commercial Claims
                      </Text>
                      <Text size="sm" mt={4}>
                        ~200,000 patients
                      </Text>
                      <Text size="xs" c="dimmed">
                        Coverage: 2015-2024
                      </Text>
                    </div>

                    <Group gap="xs" mt="xs">
                      <Badge variant="light" size="xs">
                        Medical
                      </Badge>
                      <Badge variant="light" size="xs">
                        Lab Results
                      </Badge>
                      <Badge variant="light" size="xs">
                        Enrollment
                      </Badge>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={4}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group justify="space-between" align="flex-start">
                      <div>
                        <Title order={3} mb={4}>
                          HealthVerity
                        </Title>
                        <Badge color="yellow" size="sm">
                          Request Access
                        </Badge>
                      </div>
                    </Group>

                    <div>
                      <Text size="sm" fw={500} c="dimmed">
                        Multi-Source Registry
                      </Text>
                      <Text size="sm" mt={4}>
                        ~80,000 patients
                      </Text>
                      <Text size="xs" c="dimmed">
                        Coverage: 2018-2025
                      </Text>
                    </div>

                    <Group gap="xs" mt="xs">
                      <Badge variant="light" size="xs">
                        EHR
                      </Badge>
                      <Badge variant="light" size="xs">
                        Claims
                      </Badge>
                      <Badge variant="light" size="xs">
                        Labs
                      </Badge>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </Box>
      </Group>
    </DatavantProvider>
  );
}

export default App;
