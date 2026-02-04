import { Stack, Box, Group, Grid, SimpleGrid } from '@mantine/core';
import { Title, Text, Button, Badge } from '@datavant/dart';

interface HEORAutomaticInsightsProps {
  onContinue: () => void;
}

export function HEORAutomaticInsights({ onContinue }: HEORAutomaticInsightsProps) {
  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            HEOR: Tirzepatide Market Analysis
          </Text>
          <Title order={1} mb="xs">
            Automatic Insights
          </Title>
          <Text size="lg" c="dimmed">
            ML-powered intelligence generation
          </Text>
        </Box>

        {/* Platform Status */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-lg)',
            backgroundColor: 'var(--mantine-color-green-0)',
            border: '2px solid var(--mantine-color-green-6)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Group justify="space-between" align="center">
            <Box>
              <Text size="sm" fw={600} mb="xs">
                Combined dataset ready (3,561 patients). Privacy passed ✓
              </Text>
              <Text size="sm" c="dimmed">
                Platform automatically ran market profiling, ML clustering, anomaly detection, and
                competitive benchmarking. You didn't need to ask - insights appear automatically.
              </Text>
            </Box>
            <Badge status="prominent" type="number">
              Complete
            </Badge>
          </Group>
        </Box>

        {/* Market Intelligence Section */}
        <Box>
          <Group mb="lg">
            <Title order={2}>📊 Market Intelligence</Title>
            <Badge status="info" type="number" size="xs">
              Generated Instantly
            </Badge>
          </Group>

          <SimpleGrid cols={3} spacing="md">
            {/* Market Growth */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '2px solid var(--mantine-color-blue-6)',
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'white',
              }}
            >
              <Text size="sm" fw={600} mb="md">
                Market Growth
              </Text>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">
                  2020: ~400 patients
                  <br />
                  2025: ~3,500 patients
                </Text>
                <Text size="xl" fw={700} style={{ color: 'var(--mantine-color-blue-6)' }}>
                  75% CAGR
                </Text>
                <Text size="sm" fw={600}>
                  → Off-label market is exploding
                </Text>
              </Stack>
            </Box>

            {/* Competitive Position */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '2px solid var(--mantine-color-green-6)',
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'white',
              }}
            >
              <Text size="sm" fw={600} mb="md">
                Competitive Position
              </Text>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">
                  <strong>Tirzepatide:</strong> 28% share (↑ from 15% in 2023)
                  <br />
                  <strong>Semaglutide:</strong> 58% share (↓ from 72% in 2023)
                  <br />
                  <strong>Net switching:</strong> 280 to tirzepatide, 85 from
                </Text>
                <Text size="sm" fw={600}>
                  → Tirzepatide is winning
                </Text>
              </Stack>
            </Box>

            {/* Persistence Analysis */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '2px solid var(--mantine-color-green-6)',
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'white',
              }}
            >
              <Text size="sm" fw={600} mb="md">
                Persistence Analysis
              </Text>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">
                  <strong>Tirzepatide:</strong> 72% at 12 months
                  <br />
                  <strong>Semaglutide:</strong> 65% at 12 months
                </Text>
                <Text size="xl" fw={700} style={{ color: 'var(--mantine-color-green-6)' }}>
                  +7pp
                </Text>
                <Text size="sm" fw={600}>
                  → Superior persistence
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Smart Subgroups Section */}
        <Box>
          <Group mb="md">
            <Title order={2}>🤖 Smart Subgroups</Title>
            <Badge status="info" type="number" size="xs">
              ML-Powered Clustering
            </Badge>
          </Group>

          <Box
            style={{
              padding: 'var(--mantine-spacing-md)',
              backgroundColor: 'var(--mantine-color-blue-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid var(--mantine-color-blue-3)',
              marginBottom: 'var(--mantine-spacing-lg)',
            }}
          >
            <Text size="sm" fw={600}>
              Platform AI:
            </Text>
            <Text size="sm">
              I ran machine learning clustering on your combined dataset and found{' '}
              <strong>3 patient subgroups</strong> that have distinct patterns you didn't ask for:
            </Text>
          </Box>

          <Stack gap="md">
            {/* Subgroup 1 */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '2px solid var(--mantine-color-blue-6)',
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: 'var(--mantine-color-blue-0)',
              }}
            >
              <Group justify="space-between" align="flex-start" mb="md">
                <Box>
                  <Text size="md" fw={600} mb="xs">
                    Subgroup 1: "Weight-Driven Users"
                  </Text>
                  <Badge status="prominent" type="number" size="sm">
                    68% of GLP-1 users
                  </Badge>
                </Box>
              </Group>

              <Grid gutter="md">
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Characteristics:
                  </Text>
                  <Text size="xs" c="dimmed">
                    • High BMI (&gt;30)
                    <br />
                    • Younger (mean age 36)
                    <br />• Suboptimal HbA1c (8.4%)
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Behavior:
                  </Text>
                  <Text size="xs" c="dimmed">
                    High persistence
                    <br />
                    <strong>78% at 12 months</strong>
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Insight:
                  </Text>
                  <Text size="xs" c="dimmed">
                    Using GLP-1s primarily for weight management, glycemic control is secondary
                    benefit
                  </Text>
                </Grid.Col>
              </Grid>

              <Box
                style={{
                  marginTop: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-sm)',
                  backgroundColor: 'white',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              >
                <Text size="sm" fw={600}>
                  → Marketing opportunity: Emphasize weight loss + glucose control together
                </Text>
              </Box>
            </Box>

            {/* Subgroup 2 */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Group justify="space-between" align="flex-start" mb="md">
                <Box>
                  <Text size="md" fw={600} mb="xs">
                    Subgroup 2: "Glycemic Control Seekers"
                  </Text>
                  <Badge status="info" type="number" size="sm">
                    22% of GLP-1 users
                  </Badge>
                </Box>
              </Group>

              <Grid gutter="md">
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Characteristics:
                  </Text>
                  <Text size="xs" c="dimmed">
                    • Normal BMI
                    <br />
                    • Older (mean age 48)
                    <br />• Very high HbA1c (9.2%)
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Behavior:
                  </Text>
                  <Text size="xs" c="dimmed">
                    Moderate persistence
                    <br />
                    <strong>64% at 12 months</strong>
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Insight:
                  </Text>
                  <Text size="xs" c="dimmed">
                    Traditional diabetes management, weight loss less important
                  </Text>
                </Grid.Col>
              </Grid>

              <Box
                style={{
                  marginTop: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-sm)',
                  backgroundColor: 'var(--mantine-color-gray-0)',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              >
                <Text size="sm" fw={600}>
                  → Clinical opportunity: Focus on HbA1c reduction messaging
                </Text>
              </Box>
            </Box>

            {/* Subgroup 3 */}
            <Box
              style={{
                padding: 'var(--mantine-spacing-lg)',
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Group justify="space-between" align="flex-start" mb="md">
                <Box>
                  <Text size="md" fw={600} mb="xs">
                    Subgroup 3: "Early Discontinuers"
                  </Text>
                  <Badge status="caution" type="number" size="sm">
                    10% of GLP-1 users
                  </Badge>
                </Box>
              </Group>

              <Grid gutter="md">
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Characteristics:
                  </Text>
                  <Text size="xs" c="dimmed">
                    • GI side effects (82% had claims)
                    <br />
                    • Younger
                    <br />• Discontinue &lt;3 months
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Behavior:
                  </Text>
                  <Text size="xs" c="dimmed">
                    Very low persistence
                    <br />
                    <strong>18% at 12 months</strong>
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Text size="xs" fw={600} mb="xs">
                    Insight:
                  </Text>
                  <Text size="xs" c="dimmed">
                    Side effect intolerance driving discontinuation
                  </Text>
                </Grid.Col>
              </Grid>

              <Box
                style={{
                  marginTop: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-sm)',
                  backgroundColor: 'var(--mantine-color-yellow-0)',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              >
                <Text size="sm" fw={600}>
                  → Support opportunity: Patient education and side effect management programs
                </Text>
              </Box>
            </Box>
          </Stack>

          <Box
            style={{
              marginTop: 'var(--mantine-spacing-lg)',
              padding: 'var(--mantine-spacing-md)',
              backgroundColor: 'var(--mantine-color-blue-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid var(--mantine-color-blue-3)',
            }}
          >
            <Text size="sm" fw={600}>
              Platform AI:
            </Text>
            <Text size="sm">
              These subgroups weren't predefined - ML clustering found them automatically.{' '}
              <strong>
                Subgroup 1 (Weight-Driven) strongly prefers tirzepatide (35% share vs. 28% overall)
              </strong>
              . This is your target segment for label expansion.
            </Text>
          </Box>
        </Box>

        {/* Smart Risk Section */}
        <Box>
          <Group mb="md">
            <Title order={2}>🔍 Smart Risk</Title>
            <Badge status="info" type="number" size="xs">
              ML-Powered Anomaly Detection
            </Badge>
          </Group>

          <Box
            style={{
              padding: 'var(--mantine-spacing-md)',
              backgroundColor: 'var(--mantine-color-blue-0)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid var(--mantine-color-blue-3)',
              marginBottom: 'var(--mantine-spacing-lg)',
            }}
          >
            <Text size="sm" fw={600}>
              Platform AI:
            </Text>
            <Text size="sm">
              I also ran anomaly detection and found <strong>2 emerging safety signals</strong> to
              monitor:
            </Text>
          </Box>

          <Grid gutter="lg">
            {/* Signal 1 */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '2px solid var(--mantine-color-yellow-6)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'var(--mantine-color-yellow-0)',
                  height: '100%',
                }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <Text size="md" fw={600}>
                    Signal 1: Hypoglycemia in Insulin Users
                  </Text>
                  <Badge status="caution" type="number" size="sm">
                    Monitor
                  </Badge>
                </Group>

                <Stack gap="md">
                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Pattern:
                    </Text>
                    <Text size="xs" c="dimmed">
                      Type 1 DM patients on <strong>both</strong> GLP-1 + intensive insulin
                    </Text>
                  </Box>

                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Rate:
                    </Text>
                    <Text size="xs" c="dimmed">
                      0.8 events per patient-year (2x baseline)
                      <br />
                      Sample: n=380 patients
                    </Text>
                  </Box>

                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Significance:
                    </Text>
                    <Text size="xs" c="dimmed">
                      May need dose adjustment protocols
                    </Text>
                  </Box>

                  <Box
                    style={{
                      padding: 'var(--mantine-spacing-sm)',
                      backgroundColor: 'white',
                      borderRadius: 'var(--mantine-radius-sm)',
                    }}
                  >
                    <Text size="sm" fw={600}>
                      → Flag for GPS team safety study
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Grid.Col>

            {/* Signal 2 */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '2px solid var(--mantine-color-yellow-6)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'var(--mantine-color-yellow-0)',
                  height: '100%',
                }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <Text size="md" fw={600}>
                    Signal 2: GI Side Effects - Peak at Week 3
                  </Text>
                  <Badge status="caution" type="number" size="sm">
                    Monitor
                  </Badge>
                </Group>

                <Stack gap="md">
                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Pattern:
                    </Text>
                    <Text size="xs" c="dimmed">
                      GI-related claims cluster at week 3 post-initiation
                    </Text>
                  </Box>

                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Rate:
                    </Text>
                    <Text size="xs" c="dimmed">
                      42% experience GI effects in first 3 months
                    </Text>
                  </Box>

                  <Box>
                    <Text size="xs" fw={600} mb="xs">
                      Persistence Impact:
                    </Text>
                    <Text size="xs" c="dimmed">
                      60% who discontinue do so due to GI issues
                    </Text>
                  </Box>

                  <Box
                    style={{
                      padding: 'var(--mantine-spacing-sm)',
                      backgroundColor: 'white',
                      borderRadius: 'var(--mantine-radius-sm)',
                    }}
                  >
                    <Text size="sm" fw={600}>
                      → Opportunity for patient education timing
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Summary */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-lg)',
            backgroundColor: 'var(--mantine-color-green-0)',
            border: '2px solid var(--mantine-color-green-6)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Text size="sm" fw={600} mb="xs">
            Key Findings:
          </Text>
          <Text size="sm">
            ✅ Market opportunity validated (135K-225K addressable patients)
            <br />
            ✅ Tirzepatide positioned to win (28% share, growing, superior persistence)
            <br />
            ✅ Target segment identified: "Weight-Driven Users" (68% of market, prefers
            tirzepatide)
            <br />
            ⚠️ Safety signals flagged for GPS team investigation
          </Text>
        </Box>

        {/* Continue Button */}
        <Group gap="md">
          <Button intent="prominent" appearance="solid" onClick={onContinue}>
            Continue to Evidence Generation
          </Button>
          <Button intent="neutral" appearance="outline">
            Explore Insights in Detail
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}
