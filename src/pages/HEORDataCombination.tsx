import { Stack, Box, Group, Card } from '@mantine/core';
import { Title, Text, Button, Badge } from '@datavant/dart';
import { useState } from 'react';

interface HEORDataCombinationProps {
  onContinue: () => void;
}

export function HEORDataCombination({ onContinue }: HEORDataCombinationProps) {
  const [deduplication, setDeduplication] = useState<string>('deduplicate');
  const [timePeriod, setTimePeriod] = useState<string>('all-available');

  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            HEOR: Tirzepatide Market Analysis
          </Text>
          <Title order={1} mb="xs">
            Data Combination Setup
          </Title>
          <Text size="lg" c="dimmed">
            Research methodology trade-offs
          </Text>
        </Box>

        {/* Loading State */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-md)',
            backgroundColor: 'var(--mantine-color-blue-0)',
            borderRadius: 'var(--mantine-radius-md)',
            border: '1px solid var(--mantine-color-blue-3)',
          }}
        >
          <Text size="sm" fw={600}>
            Receiving data from partners... Preparing to combine datasets...
          </Text>
        </Box>

        {/* Datasets to Combine */}
        <Box>
          <Title order={3} mb="md">
            Datasets to Combine
          </Title>
          <Stack gap="sm">
            <Box
              style={{
                padding: 'var(--mantine-spacing-md)',
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Text size="sm" fw={600}>
                1. Lilly Tirzepatide Data
              </Text>
              <Text size="sm" c="dimmed">
                Proprietary patient data
              </Text>
            </Box>
            <Box
              style={{
                padding: 'var(--mantine-spacing-md)',
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Text size="sm" fw={600}>
                2. Ecosystem Data
              </Text>
              <Text size="sm" c="dimmed">
                3,500 patients from 4 partners
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Platform Message */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-lg)',
            backgroundColor: 'white',
            border: '2px solid var(--mantine-color-blue-6)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Text size="sm" fw={600} mb="md">
            Platform AI:
          </Text>
          <Text size="sm">
            Before combining these datasets, I need to help you make some research methodology
            decisions. How you combine data has implications for your analysis.
          </Text>
        </Box>

        {/* Trade-off #1: Patient Overlap */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="lg">
            <Box>
              <Badge status="info" type="number" size="sm" mb="xs">
                Trade-off #1
              </Badge>
              <Title order={3} mb="xs">
                Patient Overlap
              </Title>
              <Text size="sm" c="dimmed">
                Patients may appear in multiple data sources. How should we handle overlap?
              </Text>
            </Box>

            <Stack gap="md">
              {/* Option A */}
              <Box
                onClick={() => setDeduplication('keep-all')}
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  border:
                    deduplication === 'keep-all'
                      ? '2px solid var(--mantine-color-blue-6)'
                      : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    deduplication === 'keep-all'
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb="xs">
                      A. Keep all records (no deduplication)
                    </Text>
                    <Text size="sm" c="dimmed" mb="xs">
                      Treats each data source independently
                    </Text>
                    <Text size="xs" c="dimmed">
                      ✅ Preserves all observations
                      <br />
                      ⚠️ May double-count patients
                      <br />
                      <strong>Use when:</strong> Analyzing data source differences
                    </Text>
                  </Box>
                  {deduplication === 'keep-all' && <Text size="xl">✓</Text>}
                </Group>
              </Box>

              {/* Option B */}
              <Box
                onClick={() => setDeduplication('deduplicate')}
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  border:
                    deduplication === 'deduplicate'
                      ? '2px solid var(--mantine-color-blue-6)'
                      : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    deduplication === 'deduplicate'
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb="xs">
                      B. Deduplicate across sources ⭐ Recommended
                    </Text>
                    <Text size="sm" c="dimmed" mb="xs">
                      Identifies and removes duplicate patients
                    </Text>
                    <Text size="xs" c="dimmed">
                      ✅ True unique patient count
                      <br />
                      ⚠️ Requires matching logic, may lose some data
                      <br />
                      <strong>Use when:</strong> Market sizing, population analysis
                    </Text>
                  </Box>
                  {deduplication === 'deduplicate' && <Text size="xl">✓</Text>}
                </Group>
              </Box>

              {/* Option C */}
              <Box
                onClick={() => setDeduplication('stratify')}
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  border:
                    deduplication === 'stratify'
                      ? '2px solid var(--mantine-color-blue-6)'
                      : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    deduplication === 'stratify'
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb="xs">
                      C. Stratify by source
                    </Text>
                    <Text size="sm" c="dimmed" mb="xs">
                      Keep separate, analyze side-by-side
                    </Text>
                    <Text size="xs" c="dimmed">
                      ✅ Source-specific insights preserved
                      <br />
                      ⚠️ Smaller sample sizes per source
                      <br />
                      <strong>Use when:</strong> Data quality comparison
                    </Text>
                  </Box>
                  {deduplication === 'stratify' && <Text size="xl">✓</Text>}
                </Group>
              </Box>
            </Stack>

            {deduplication === 'deduplicate' && (
              <Box
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-blue-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="sm" fw={600}>
                  Platform Recommendation:
                </Text>
                <Text size="sm">
                  For market analysis, <strong>Option B (Deduplicate)</strong> is recommended. This
                  gives you true market size while preserving analytical validity.
                </Text>
              </Box>
            )}
          </Stack>
        </Card>

        {/* Trade-off #2: Time Period */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="lg">
            <Box>
              <Badge status="info" type="number" size="sm" mb="xs">
                Trade-off #2
              </Badge>
              <Title order={3} mb="xs">
                Time Period Alignment
              </Title>
              <Text size="sm" c="dimmed">
                Data sources cover different time periods. How should we align them?
              </Text>
            </Box>

            <Box
              style={{
                padding: 'var(--mantine-spacing-md)',
                backgroundColor: 'var(--mantine-color-gray-0)',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <Text size="sm" fw={600} mb="xs">
                Your Data:
              </Text>
              <Text size="sm" c="dimmed">
                • Lilly data: 2023-2025
                <br />• Ecosystem: 2020-2025 (varies by source)
              </Text>
            </Box>

            <Stack gap="md">
              {/* Option A */}
              <Box
                onClick={() => setTimePeriod('overlapping')}
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  border:
                    timePeriod === 'overlapping'
                      ? '2px solid var(--mantine-color-blue-6)'
                      : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    timePeriod === 'overlapping'
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb="xs">
                      A. Use overlapping period only (2023-2025)
                    </Text>
                    <Text size="xs" c="dimmed">
                      ✅ Direct comparability
                      <br />
                      ⚠️ Loses historical trends
                    </Text>
                  </Box>
                  {timePeriod === 'overlapping' && <Text size="xl">✓</Text>}
                </Group>
              </Box>

              {/* Option B */}
              <Box
                onClick={() => setTimePeriod('all-available')}
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  border:
                    timePeriod === 'all-available'
                      ? '2px solid var(--mantine-color-blue-6)'
                      : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  cursor: 'pointer',
                  backgroundColor:
                    timePeriod === 'all-available'
                      ? 'var(--mantine-color-blue-0)'
                      : 'transparent',
                }}
              >
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb="xs">
                      B. Use all available data (2020-2025) ⭐ Recommended
                    </Text>
                    <Text size="xs" c="dimmed">
                      ✅ Captures growth trends, larger N<br />
                      ⚠️ Lilly data only available for recent period
                    </Text>
                  </Box>
                  {timePeriod === 'all-available' && <Text size="xl">✓</Text>}
                </Group>
              </Box>
            </Stack>

            {timePeriod === 'all-available' && (
              <Box
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-blue-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="sm" fw={600}>
                  Platform Recommendation:
                </Text>
                <Text size="sm">
                  For market growth analysis, <strong>Option B</strong> is recommended. You can
                  compare recent period (where you have Lilly data) to historical trends (ecosystem
                  only).
                </Text>
              </Box>
            )}
          </Stack>
        </Card>

        {/* Configuration Summary */}
        {deduplication === 'deduplicate' && timePeriod === 'all-available' && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={3}>Configuration Summary</Title>

              <Box>
                <Text size="sm" fw={600} mb="xs">
                  Combination Strategy:
                </Text>
                <Text size="sm" c="dimmed">
                  • Deduplication: Yes (unique patients only)
                  <br />
                  • Time period: 2020-2025 (all available)
                  <br />
                  • Expected output: ~3,650 unique patients (deduplicated)
                  <br />• Lilly data: Integrated for 2023-2025 period
                </Text>
              </Box>

              <Box>
                <Text size="sm" fw={600} mb="xs">
                  Research Implications:
                </Text>
                <Text size="sm" c="dimmed">
                  ✅ True market size (not inflated by duplicates)
                  <br />
                  ✅ Growth trends visible (2020-2025)
                  <br />
                  ✅ Lilly vs. market comparison possible (2023-2025 overlap)
                  <br />⚠️ Lilly data not available for pre-2023 historical analysis
                </Text>
              </Box>

              <Box
                style={{
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="sm" fw={600} mb="xs">
                  Platform:
                </Text>
                <Text size="sm">
                  These decisions are documented in your study protocol. Ready to combine data?
                </Text>
              </Box>

              <Group gap="md">
                <Button intent="prominent" appearance="solid" onClick={onContinue}>
                  Combine Datasets & Continue
                </Button>
                <Button intent="neutral" appearance="outline">
                  Modify Selections
                </Button>
              </Group>
            </Stack>
          </Card>
        )}
      </Stack>
    </Box>
  );
}
