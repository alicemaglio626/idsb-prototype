import { Stack, Box, Grid } from '@mantine/core';
import { Title, Text, Button, Badge } from '@datavant/dart';

interface HEOREvidenceGenerationProps {
  onContinue: () => void;
}

export function HEOREvidenceGeneration({ onContinue }: HEOREvidenceGenerationProps) {
  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            HEOR: Tirzepatide Market Analysis
          </Text>
          <Title order={1} mb="xs">
            Evidence Generation
          </Title>
          <Text size="lg" c="dimmed">
            Transition to deeper analysis
          </Text>
        </Box>

        {/* Platform Summary */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-lg)',
            backgroundColor: 'var(--mantine-color-green-0)',
            border: '2px solid var(--mantine-color-green-6)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Text size="sm" fw={600} mb="md">
            Platform AI:
          </Text>
          <Text size="sm">
            Automatic insights complete. Market validated: <strong>135K-225K addressable opportunity</strong> with
            tirzepatide positioned to win.
          </Text>
        </Box>

        {/* Options Grid */}
        <Box>
          <Title order={3} mb="md">
            What would you like to do next?
          </Title>

          <Grid gutter="lg">
            {/* Run Formal Study */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '2px solid var(--mantine-color-blue-6)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'white',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <Badge status="info" type="number" size="sm" mb="md">
                  Evidence Generation
                </Badge>
                <Title order={4} mb="xs">
                  Run Formal Analysis
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  FDA-grade study design for stakeholders. Opens Substantiate tool for publication-quality
                  research.
                </Text>

                <Stack gap="xs" mb="lg">
                  <Text size="xs" c="dimmed">
                    ✅ Protocol-driven analysis
                    <br />
                    ✅ Statistical rigor
                    <br />
                    ✅ Regulatory documentation
                    <br />
                    ✅ Publication-ready outputs
                  </Text>
                </Stack>

                <Button intent="neutral" appearance="outline" fullWidth>
                  Open Substantiate
                </Button>
              </Box>
            </Grid.Col>

            {/* Explore Patterns */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '2px solid var(--mantine-color-blue-6)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'white',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <Badge status="info" type="number" size="sm" mb="md">
                  Exploratory Analysis
                </Badge>
                <Title order={4} mb="xs">
                  Explore Treatment Patterns
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  Interactive deep dive into drug pathways, Sankey charts, and predictive models.
                </Text>

                <Stack gap="xs" mb="lg">
                  <Text size="xs" c="dimmed">
                    ✅ Drug pathway visualization
                    <br />
                    ✅ Patient journey analysis
                    <br />
                    ✅ Predictive modeling
                    <br />
                    ✅ Interactive exploration
                  </Text>
                </Stack>

                <Button intent="neutral" appearance="outline" fullWidth>
                  Explore Patterns
                </Button>
              </Box>
            </Grid.Col>

            {/* Export Report */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'white',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <Badge status="neutral" type="number" size="sm" mb="md">
                  Business Intelligence
                </Badge>
                <Title order={4} mb="xs">
                  Export Insights Report
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  Generate business intelligence package for stakeholders.
                </Text>

                <Stack gap="xs" mb="lg">
                  <Text size="xs" c="dimmed">
                    ✅ Executive summary
                    <br />
                    ✅ Market intelligence
                    <br />
                    ✅ Competitive analysis
                    <br />
                    ✅ Strategic recommendations
                  </Text>
                </Stack>

                <Button intent="neutral" appearance="outline" fullWidth>
                  Export Report
                </Button>
              </Box>
            </Grid.Col>

            {/* Continue to GPS */}
            <Grid.Col span={6}>
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '2px solid var(--mantine-color-green-6)',
                  borderRadius: 'var(--mantine-radius-md)',
                  backgroundColor: 'var(--mantine-color-green-0)',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                <Badge status="prominent" type="number" size="sm" mb="md">
                  Next Study
                </Badge>
                <Title order={4} mb="xs">
                  Continue to GPS Study
                </Title>
                <Text size="sm" c="dimmed" mb="md">
                  Market opportunity validated. Move to GPS safety study for FDA label expansion.
                </Text>

                <Stack gap="xs" mb="lg">
                  <Text size="xs" c="dimmed">
                    ✅ HEOR complete
                    <br />
                    ✅ Opportunity validated
                    <br />
                    ✅ GPS needs 3-year safety data
                    <br />
                    ✅ Record retrieval ready
                  </Text>
                </Stack>

                <Button intent="prominent" appearance="solid" fullWidth onClick={onContinue}>
                  Return to Dashboard
                </Button>
              </Box>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Talking Points Box */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-md)',
            backgroundColor: 'var(--mantine-color-blue-0)',
            borderRadius: 'var(--mantine-radius-md)',
            border: '1px solid var(--mantine-color-blue-3)',
          }}
        >
          <Text size="sm" fw={600} mb="xs">
            Platform Distinction:
          </Text>
          <Text size="sm" c="dimmed">
            <strong>Automatic insights</strong> gave us the answer: market is real, tirzepatide can
            win. <strong>Evidence generation</strong> is user-led because it has an intended
            audience (regulators, payers, KOLs). For market validation, we have what we need. Let's
            move to GPS - they need to capitalize on this opportunity with a safety study for FDA
            label expansion.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
