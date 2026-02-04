import { Stack, Box, Table, Group } from '@mantine/core';
import { Title, Text, Button, Badge } from '@datavant/dart';

interface HEORDataDiscoveryProps {
  onContinue: () => void;
}

export function HEORDataDiscovery({ onContinue }: HEORDataDiscoveryProps) {
  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Group justify="space-between" align="flex-start" mb="md">
            <Box>
              <Text size="sm" c="dimmed" mb="xs">
                HEOR: Tirzepatide Trial Contextualization
              </Text>
              <Title order={1} mb="xs">
                Data Discovery
              </Title>
              <Text size="lg" c="dimmed">
                Conversational AI-powered data search across ecosystem partners
              </Text>
            </Box>
            <Badge status="info" type="number">
              Stage 1 of 4
            </Badge>
          </Group>
        </Box>

        {/* Context Card */}
        <Box
          style={{
            backgroundColor: 'var(--mantine-color-blue-0)',
            padding: 'var(--mantine-spacing-lg)',
            borderRadius: 'var(--mantine-radius-md)',
            border: '1px solid var(--mantine-color-blue-2)',
          }}
        >
          <Stack gap="sm">
            <Text size="sm" fw={600}>
              Your Clinical Trial Data
            </Text>
            <Group gap="xl">
              <Box>
                <Text size="xs" c="dimmed">
                  Patients
                </Text>
                <Text size="lg" fw={600}>
                  150
                </Text>
              </Box>
              <Box>
                <Text size="xs" c="dimmed">
                  Population
                </Text>
                <Text size="sm">Type 1 DM on tirzepatide</Text>
              </Box>
              <Box>
                <Text size="xs" c="dimmed">
                  Duration
                </Text>
                <Text size="sm">52 weeks</Text>
              </Box>
              <Box>
                <Text size="xs" c="dimmed">
                  Status
                </Text>
                <Badge status="prominent" type="number" size="sm">
                  Securely Loaded
                </Badge>
              </Box>
            </Group>
          </Stack>
        </Box>

        {/* Conversation Interface */}
        <Box>
          <Stack gap="lg">
            {/* User Query */}
            <Box
              style={{
                backgroundColor: 'var(--mantine-color-gray-0)',
                padding: 'var(--mantine-spacing-md)',
                borderRadius: 'var(--mantine-radius-md)',
                border: '1px solid var(--mantine-color-gray-3)',
              }}
            >
              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  SC
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed" mb="xs">
                    Sarah Chen (HEOR)
                  </Text>
                  <Text size="sm">
                    "We're running a tirzepatide trial in Type 1 diabetes with 150 patients. I need
                    to understand how representative our trial population is compared to the broader
                    Type 1 diabetes population using GLP-1s off-label. I also need market sizing
                    and competitive benchmarking against semaglutide."
                  </Text>
                </Box>
              </Group>
            </Box>

            {/* AI Response */}
            <Box
              style={{
                backgroundColor: 'white',
                padding: 'var(--mantine-spacing-lg)',
                borderRadius: 'var(--mantine-radius-md)',
                border: '2px solid var(--mantine-color-blue-6)',
              }}
            >
              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'var(--mantine-color-gray-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  AI
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed" mb="xs">
                    Platform AI
                  </Text>
                  <Stack gap="md">
                    <Text size="sm">
                      I understand you want to contextualize your clinical trial with real-world
                      evidence. This is a powerful combination. Let me search for real-world data
                      to complement your trial:
                    </Text>

                    <Box>
                      <Text size="sm" fw={600} mb="xs">
                        What You Have:
                      </Text>
                      <Text size="sm" c="dimmed">
                        • Clinical trial: 150 Type 1 DM patients on tirzepatide
                        <br />• Controlled setting, detailed outcomes
                      </Text>
                    </Box>

                    <Box>
                      <Text size="sm" fw={600} mb="sm">
                        What I Can Add from Ecosystem Partners:
                      </Text>

                      <Table
                        style={{
                          fontSize: '14px',
                          border: '1px solid var(--mantine-color-gray-3)',
                        }}
                      >
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Data Source</Table.Th>
                            <Table.Th>Type 1 DM on GLP-1s</Table.Th>
                            <Table.Th>Includes Tirzepatide</Table.Th>
                            <Table.Th>Data Period</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Td>Optum Clinformatics</Table.Td>
                            <Table.Td>~1,200</Table.Td>
                            <Table.Td>Yes (~340)</Table.Td>
                            <Table.Td>2020-2025</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>Komodo Health</Table.Td>
                            <Table.Td>~1,400</Table.Td>
                            <Table.Td>Yes (~390)</Table.Td>
                            <Table.Td>2020-2025</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>HealthVerity</Table.Td>
                            <Table.Td>~720</Table.Td>
                            <Table.Td>Yes (~200)</Table.Td>
                            <Table.Td>2021-2025</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Td>Merative MarketScan</Table.Td>
                            <Table.Td>~950</Table.Td>
                            <Table.Td>Yes (~270)</Table.Td>
                            <Table.Td>2020-2025</Table.Td>
                          </Table.Tr>
                          <Table.Tr style={{ fontWeight: 600 }}>
                            <Table.Td>Combined Coverage</Table.Td>
                            <Table.Td>~3,500</Table.Td>
                            <Table.Td>~1,200</Table.Td>
                            <Table.Td>-</Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </Box>

                    <Box>
                      <Text size="sm" fw={600} mb="xs">
                        Analysis I Can Run:
                      </Text>
                      <Stack gap="xs">
                        <Text size="sm">
                          1. Compare trial patients to real-world GLP-1 users (representativeness)
                        </Text>
                        <Text size="sm">
                          2. Benchmark trial outcomes against real-world outcomes
                        </Text>
                        <Text size="sm">
                          3. Competitive analysis: Tirzepatide vs. semaglutide performance
                        </Text>
                        <Text size="sm">4. Market sizing for label expansion opportunity</Text>
                      </Stack>
                    </Box>

                    <Box
                      style={{
                        backgroundColor: 'var(--mantine-color-blue-0)',
                        padding: 'var(--mantine-spacing-md)',
                        borderRadius: 'var(--mantine-radius-md)',
                      }}
                    >
                      <Text size="sm" fw={600}>
                        I recommend combining all 4 sources for comprehensive market context.
                        Proceed?
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              </Group>
            </Box>

            {/* User Response */}
            <Box
              style={{
                backgroundColor: 'var(--mantine-color-gray-0)',
                padding: 'var(--mantine-spacing-md)',
                borderRadius: 'var(--mantine-radius-md)',
                border: '1px solid var(--mantine-color-gray-3)',
              }}
            >
              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    flexShrink: 0,
                  }}
                >
                  SC
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed" mb="xs">
                    Sarah Chen (HEOR)
                  </Text>
                  <Text size="sm">"Yes, combine all sources and run the full analysis."</Text>
                </Box>
              </Group>
            </Box>
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Group gap="md">
          <Button intent="prominent" appearance="solid" onClick={onContinue}>
            Continue to Contracting
          </Button>
          <Button intent="neutral" appearance="outline">
            Modify Search Criteria
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
