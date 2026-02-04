import { Stack, Box } from '@mantine/core';
import { Title, Text, Badge, Button } from '@datavant/dart';

interface HEORContractingProps {
  onContinue: () => void;
}

export function HEORContracting({ onContinue }: HEORContractingProps) {
  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            HEOR: Tirzepatide Market Analysis
          </Text>
          <Title order={1} mb="xs">
            Contracting with Data Partners
          </Title>
          <Text size="lg" c="dimmed">
            Seamless data delivery to platform
          </Text>
        </Box>

        {/* Contracting Status */}
        <Box
          style={{
            backgroundColor: 'white',
            padding: 'var(--mantine-spacing-xl)',
            borderRadius: 'var(--mantine-radius-md)',
            border: '2px solid var(--mantine-color-blue-6)',
          }}
        >
          <Stack gap="lg">
            <Box>
              <Text size="lg" fw={600} mb="md">
                Contracting with data partners...
              </Text>
            </Box>

            <Stack gap="md">
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="xl">✓</Text>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600}>
                    Optum Clinformatics
                  </Text>
                  <Text size="xs" c="dimmed">
                    Ready
                  </Text>
                </Box>
              </Box>

              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="xl">✓</Text>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600}>
                    Komodo Health
                  </Text>
                  <Text size="xs" c="dimmed">
                    Ready
                  </Text>
                </Box>
              </Box>

              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="xl">✓</Text>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600}>
                    HealthVerity
                  </Text>
                  <Text size="xs" c="dimmed">
                    Ready
                  </Text>
                </Box>
              </Box>

              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--mantine-spacing-md)',
                  padding: 'var(--mantine-spacing-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Text size="xl">✓</Text>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600}>
                    Merative MarketScan
                  </Text>
                  <Text size="xs" c="dimmed">
                    Ready
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
              }}
            >
              <Text size="sm" fw={600} mb="xs">
                Data will be delivered to platform automatically
              </Text>
              <Text size="sm" c="dimmed">
                No exiting the platform, no manual data transfer required
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Info */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-md)',
            backgroundColor: 'var(--mantine-color-gray-0)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Text size="sm" c="dimmed">
            <strong>Platform Feature:</strong> In the dream scenario, you contract directly in the
            platform and data is delivered automatically to AWS. This is the seamless experience.
          </Text>
        </Box>

        {/* Continue Button */}
        <Button intent="prominent" appearance="solid" onClick={onContinue}>
          Continue to Data Combination
        </Button>
      </Stack>
    </Box>
  );
}
