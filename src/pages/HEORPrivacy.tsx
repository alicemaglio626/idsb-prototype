import { Stack, Box, Group, Grid, Table } from '@mantine/core';
import { Title, Text, Button, Badge, Select } from '@datavant/dart';
import { useState } from 'react';

interface HEORPrivacyProps {
  onContinue: () => void;
}

export function HEORPrivacy({ onContinue }: HEORPrivacyProps) {
  const [dateBlur, setDateBlur] = useState('120');
  const [ageBanding, setAgeBanding] = useState('5-year');

  // Calculate risk based on selections
  const calculateRisk = () => {
    let risk = 2.3;
    if (dateBlur === '120') risk -= 0.6;
    if (dateBlur === '180') risk -= 0.8;
    if (ageBanding === '10-year') risk -= 0.3;
    // Small cell suppression always applied: -0.8
    risk -= 0.8;
    return Math.max(0.3, risk).toFixed(1);
  };

  // Calculate utility based on selections
  const calculateUtility = () => {
    let utility = 100;
    // Small cell suppression: -2.4%
    utility -= 2.4;
    if (dateBlur === '120') utility -= 2.6;
    if (dateBlur === '180') utility -= 5;
    if (ageBanding === '10-year') utility -= 3;
    return Math.max(85, utility).toFixed(0);
  };

  const currentRisk = calculateRisk();
  const currentUtility = calculateUtility();
  const riskStatus = parseFloat(currentRisk) <= 1.0 ? 'passed' : 'failed';

  return (
    <Box p="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Text size="sm" c="dimmed" mb="xs">
            HEOR: Tirzepatide Market Analysis
          </Text>
          <Title order={1} mb="xs">
            Privacy Assessment & Remediation
          </Title>
          <Text size="lg" c="dimmed">
            Expert determination with real-time risk vs. utility trade-offs
          </Text>
        </Box>

        {/* Initial Assessment Banner */}
        <Box
          style={{
            padding: 'var(--mantine-spacing-lg)',
            backgroundColor: 'var(--mantine-color-yellow-0)',
            border: '2px solid var(--mantine-color-yellow-4)',
            borderRadius: 'var(--mantine-radius-md)',
          }}
        >
          <Group justify="space-between" align="center">
            <Box>
              <Text size="sm" fw={600} mb="xs">
                Initial Risk Assessment: 2.3% (Above 1.0% threshold)
              </Text>
              <Text size="sm" c="dimmed">
                13 issues identified. Apply remediations to reduce risk below threshold.
              </Text>
            </Box>
            <Badge status="caution" type="number">
              Medium-High Risk
            </Badge>
          </Group>
        </Box>

        {/* Two-panel layout */}
        <Grid gutter="lg">
          {/* Left Panel: Remediation Controls */}
          <Grid.Col span={7}>
            <Stack gap="lg">
              <Box>
                <Title order={3} mb="md">
                  Remediation Controls
                </Title>
                <Text size="sm" c="dimmed" mb="lg">
                  Your data has numerous areas of risk. Let us walk you through the risks and help
                  you explore remediation trade-offs.
                </Text>
              </Box>

              {/* Small Cell Suppression (Required) */}
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <Box>
                    <Text size="sm" fw={600} mb="xs">
                      Small Cell Suppression
                    </Text>
                    <Badge status="negative" type="number" size="xs">
                      Required
                    </Badge>
                  </Box>
                  <Badge status="negative" type="number" size="sm">
                    High Risk
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="md">
                  12 subgroups with n&lt;11 detected. Must be suppressed to meet privacy standards.
                </Text>

                <Box
                  style={{
                    padding: 'var(--mantine-spacing-sm)',
                    backgroundColor: 'var(--mantine-color-gray-0)',
                    borderRadius: 'var(--mantine-radius-sm)',
                  }}
                >
                  <Text size="xs" c="dimmed">
                    ☑ Suppress 12 subgroups (89 patients removed)
                    <br />
                    <strong>Impact:</strong> -2.4% of dataset, -0.8 risk points
                    <br />
                    <em>Note: This remediation cannot be disabled (HIPAA required)</em>
                  </Text>
                </Box>
              </Box>

              {/* Temporal Precision (Configurable) */}
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
                    <Text size="sm" fw={600} mb="xs">
                      Temporal Precision
                    </Text>
                    <Badge status="caution" type="number" size="xs">
                      Configurable
                    </Badge>
                  </Box>
                  <Badge status="negative" type="number" size="sm">
                    High Risk
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="md">
                  Date shifting reduces re-identification risk by obscuring exact timing of events.
                </Text>

                <Stack gap="md">
                  <Box>
                    <Text size="sm" fw={600} mb="xs">
                      Trial Patients Date Shift
                    </Text>
                    <Select
                      value={dateBlur}
                      onChange={(value) => setDateBlur(value || '120')}
                      data={[
                        { value: '90', label: '±90 days (original)' },
                        { value: '120', label: '±120 days (recommended)' },
                        { value: '180', label: '±180 days (maximum privacy)' },
                      ]}
                    />
                    <Text size="xs" c="dimmed" mt="xs">
                      {dateBlur === '90' && '⚠️ Risk reduction: -0.4 points, Monthly precision'}
                      {dateBlur === '120' &&
                        '✅ Risk reduction: -0.6 points, Quarterly precision (recommended)'}
                      {dateBlur === '180' &&
                        '✅ Risk reduction: -0.8 points, Semi-annual precision only'}
                    </Text>
                  </Box>

                  <Box>
                    <Text size="sm" fw={600} mb="xs">
                      Ecosystem Partners Date Shift
                    </Text>
                    <Select value="90" disabled data={[{ value: '90', label: '±90 days (locked)' }]} />
                    <Text size="xs" c="dimmed" mt="xs">
                      Pre-applied by partners, cannot be modified
                    </Text>
                  </Box>
                </Stack>
              </Box>

              {/* Age Banding (Optional) */}
              <Box
                style={{
                  padding: 'var(--mantine-spacing-lg)',
                  border: '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                <Group justify="space-between" align="flex-start" mb="md">
                  <Box>
                    <Text size="sm" fw={600} mb="xs">
                      Age Banding
                    </Text>
                    <Badge status="info" type="number" size="xs">
                      Optional
                    </Badge>
                  </Box>
                  <Badge status="caution" type="number" size="sm">
                    Medium Risk
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed" mb="md">
                  Aggregate ages into broader bands for additional privacy protection.
                </Text>

                <Box>
                  <Select
                    value={ageBanding}
                    onChange={(value) => setAgeBanding(value || '5-year')}
                    data={[
                      { value: '5-year', label: '5-year bands (current)' },
                      { value: '10-year', label: '10-year bands' },
                      { value: '20-year', label: '20-year bands' },
                    ]}
                  />
                  <Text size="xs" c="dimmed" mt="xs">
                    {ageBanding === '5-year' &&
                      '✅ Current setting, maintains age stratification granularity'}
                    {ageBanding === '10-year' &&
                      '⚠️ Risk reduction: -0.3 points, reduced age stratification precision'}
                    {ageBanding === '20-year' &&
                      '⚠️ Risk reduction: -0.5 points, minimal age stratification capability'}
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right Panel: Live Impact Dashboard */}
          <Grid.Col span={5}>
            <Box
              style={{
                position: 'sticky',
                top: 'var(--mantine-spacing-xl)',
              }}
            >
              <Stack gap="lg">
                {/* Current Risk Score */}
                <Box
                  style={{
                    padding: 'var(--mantine-spacing-lg)',
                    border: '2px solid var(--mantine-color-gray-3)',
                    borderRadius: 'var(--mantine-radius-md)',
                    backgroundColor: 'white',
                  }}
                >
                  <Text size="sm" fw={600} mb="md" style={{ textAlign: 'center' }}>
                    CURRENT RISK SCORE
                  </Text>

                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--mantine-spacing-md)',
                    }}
                  >
                    <Box
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        backgroundColor:
                          riskStatus === 'passed'
                            ? 'var(--mantine-color-green-1)'
                            : 'var(--mantine-color-yellow-1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `4px solid ${riskStatus === 'passed' ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-yellow-6)'}`,
                      }}
                    >
                      <Text size="32px" fw={700}>
                        {currentRisk}%
                      </Text>
                    </Box>

                    <Box style={{ textAlign: 'center' }}>
                      <Text size="xs" c="dimmed" mb="xs">
                        Risk Threshold: 1.0%
                      </Text>
                      <Badge
                        status={riskStatus === 'passed' ? 'prominent' : 'caution'}
                        type="number"
                        size="sm"
                      >
                        {riskStatus === 'passed'
                          ? `${(1.0 - parseFloat(currentRisk)).toFixed(1)}% below threshold ✓`
                          : `${(parseFloat(currentRisk) - 1.0).toFixed(1)}% above threshold`}
                      </Badge>
                    </Box>
                  </Box>

                  <Box
                    style={{
                      marginTop: 'var(--mantine-spacing-md)',
                      padding: 'var(--mantine-spacing-sm)',
                      backgroundColor: 'var(--mantine-color-gray-0)',
                      borderRadius: 'var(--mantine-radius-sm)',
                    }}
                  >
                    <Text size="xs" c="dimmed">
                      Risk Breakdown:
                      <br />
                      🔴 High Risk Items: {dateBlur === '120' && ageBanding === '5-year' ? '0' : '1'}
                      <br />
                      🟠 Medium Risk Items: {ageBanding === '5-year' ? '2' : '1'}
                      <br />
                      🟢 Low Risk Items: 9
                    </Text>
                  </Box>
                </Box>

                {/* Data Utility */}
                <Box
                  style={{
                    padding: 'var(--mantine-spacing-lg)',
                    border: '2px solid var(--mantine-color-gray-3)',
                    borderRadius: 'var(--mantine-radius-md)',
                    backgroundColor: 'white',
                  }}
                >
                  <Text size="sm" fw={600} mb="md">
                    DATA UTILITY
                  </Text>

                  <Box mb="md">
                    <Text size="xs" c="dimmed" mb="xs">
                      Sample Size
                    </Text>
                    <Text size="sm">
                      Original: 3,650 patients
                      <br />
                      Current: 3,561 patients
                      <br />
                      Removed: 89 patients (-2.4%)
                    </Text>
                    <Text size="xs" fw={600} style={{ color: 'var(--mantine-color-green-6)' }}>
                      ✅ 97.6% of data retained
                    </Text>
                  </Box>

                  <Box mb="md">
                    <Text size="xs" c="dimmed" mb="xs">
                      Analysis Capabilities
                    </Text>
                    <Stack gap="xs">
                      <Group gap="xs">
                        <Text size="xs">✅</Text>
                        <Text size="xs">Market Sizing</Text>
                      </Group>
                      <Group gap="xs">
                        <Text size="xs">✅</Text>
                        <Text size="xs">Competitive Analysis</Text>
                      </Group>
                      <Group gap="xs">
                        <Text size="xs">{dateBlur !== '180' ? '✅' : '⚠️'}</Text>
                        <Text size="xs">
                          Temporal Trends
                          {dateBlur === '90' && ' (monthly)'}
                          {dateBlur === '120' && ' (quarterly)'}
                          {dateBlur === '180' && ' (semi-annual)'}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <Text size="xs">{ageBanding === '5-year' ? '✅' : '⚠️'}</Text>
                        <Text size="xs">
                          Age-Stratified ({ageBanding === '5-year' ? '5yr' : ageBanding === '10-year' ? '10yr' : '20yr'}{' '}
                          bands)
                        </Text>
                      </Group>
                    </Stack>
                  </Box>

                  <Box>
                    <Group justify="space-between" mb="xs">
                      <Text size="xs" c="dimmed">
                        Overall Utility
                      </Text>
                      <Text size="sm" fw={600}>
                        {currentUtility}%
                      </Text>
                    </Group>
                    <Box
                      style={{
                        width: '100%',
                        height: 8,
                        backgroundColor: 'var(--mantine-color-gray-2)',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        style={{
                          width: `${currentUtility}%`,
                          height: '100%',
                          backgroundColor:
                            parseFloat(currentUtility) >= 90
                              ? 'var(--mantine-color-green-6)'
                              : parseFloat(currentUtility) >= 75
                                ? 'var(--mantine-color-yellow-6)'
                                : 'var(--mantine-color-red-6)',
                          transition: 'width 0.5s ease-in-out',
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Platform Recommendation */}
                <Box
                  style={{
                    padding: 'var(--mantine-spacing-lg)',
                    border: '2px solid var(--mantine-color-blue-6)',
                    borderRadius: 'var(--mantine-radius-md)',
                    backgroundColor: 'var(--mantine-color-blue-0)',
                  }}
                >
                  <Text size="sm" fw={600} mb="xs">
                    💡 Platform Recommendation
                  </Text>

                  {riskStatus === 'passed' ? (
                    <>
                      <Text size="sm" mb="md">
                        Current configuration achieves:
                        <br />
                        Risk: {currentRisk}% ✅ (below 1.0% threshold)
                        <br />
                        Utility: {currentUtility}% {parseFloat(currentUtility) >= 90 ? '✅' : '⚠️'}
                      </Text>
                      <Button intent="prominent" appearance="solid" fullWidth onClick={onContinue}>
                        Approve & Continue
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text size="sm" mb="md">
                        ⚠️ Risk still above threshold. Adjust remediations to reduce risk below 1.0%.
                      </Text>
                      <Button intent="neutral" appearance="outline" fullWidth disabled>
                        Configuration Not Compliant
                      </Button>
                    </>
                  )}
                </Box>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
    </Box>
  );
}
