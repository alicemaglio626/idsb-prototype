import { Stack, Group, Box, Flex } from '@mantine/core';
import {
  Title,
  Text,
  Button,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Link,
  Alert,
} from '@datavant/dart';
import { useState } from 'react';

const SECTIONS = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'data-access', label: 'Data Access' },
  { id: 'privacy', label: 'Privacy & Compliance' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

interface SettingsData {
  // General
  orgName: string;
  orgDescription: string;
  timezone: string;
  language: string;
  // Notifications
  emailNotifications: boolean;
  studyUpdates: boolean;
  dataAccessAlerts: boolean;
  complianceAlerts: boolean;
  digestFrequency: string;
  // Data Access
  defaultDataSource: string;
  retentionPeriod: string;
  autoApproveInternal: boolean;
  requireJustification: boolean;
  // Privacy
  deidentificationMethod: string;
  auditLogging: string;
  requirePrivacyReview: boolean;
  minimumCellSize: string;
}

export function OrganizationSettings() {
  const [activeSection, setActiveSection] = useState<SectionId>('general');
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    orgName: 'Eli Lilly and Company',
    orgDescription: 'Global pharmaceutical research organization focused on real-world evidence generation and health economics outcomes research.',
    timezone: 'america-new-york',
    language: 'en',
    emailNotifications: true,
    studyUpdates: true,
    dataAccessAlerts: true,
    complianceAlerts: true,
    digestFrequency: 'daily',
    defaultDataSource: 'optum-cdm',
    retentionPeriod: '36',
    autoApproveInternal: false,
    requireJustification: true,
    deidentificationMethod: 'expert',
    auditLogging: 'full',
    requirePrivacyReview: true,
    minimumCellSize: '11',
  });

  const update = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    setSaved(true);
  };

  const handleDiscard = () => {
    setSaved(false);
    // In a real app, this would reload from server
    console.log('Changes discarded');
  };

  return (
    <Box p="xl" style={{ width: '100%' }}>
      <Stack gap="xl">
        <Box>
          <Title order={1} mb="xs">
            Organization Settings
          </Title>
          <Text size="lg" c="dimmed">
            Manage your organization's preferences, notifications, and compliance policies
          </Text>
        </Box>

        {saved && (
          <Alert status="positive" title="Settings saved">
            Your organization settings have been updated successfully.
          </Alert>
        )}

        <Flex gap="xl" align="flex-start">
          {/* Left sidebar navigation */}
          <Box
            style={{
              width: 220,
              flexShrink: 0,
              borderRight: '1px solid var(--mantine-color-gray-3)',
              paddingRight: 'var(--mantine-spacing-lg)',
            }}
          >
            <Stack gap={4}>
              {SECTIONS.map((section) => (
                <Box
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--mantine-radius-sm)',
                    cursor: 'pointer',
                    backgroundColor:
                      activeSection === section.id
                        ? 'var(--mantine-color-gray-1)'
                        : 'transparent',
                    fontWeight: activeSection === section.id ? 600 : 400,
                    color:
                      activeSection === section.id
                        ? 'var(--mantine-color-dark-9)'
                        : 'var(--mantine-color-gray-7)',
                    fontSize: 'var(--mantine-font-size-sm)',
                    transition: 'background-color 150ms ease',
                  }}
                >
                  {section.label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Main settings panel */}
          <Box style={{ flex: 1, maxWidth: 640 }}>
            {activeSection === 'general' && (
              <Stack gap="lg">
                <Box>
                  <Title order={3} mb="xs">General</Title>
                  <Text size="sm" c="dimmed">
                    Basic organization information and regional preferences
                  </Text>
                </Box>

                <TextInput
                  label="Organization Name"
                  value={settings.orgName}
                  onChange={(e) => update('orgName', e.target.value)}
                  description="Your organization's display name across the platform"
                />

                <Textarea
                  label="Organization Description"
                  value={settings.orgDescription}
                  onChange={(e) => update('orgDescription', e.target.value)}
                  minRows={3}
                  maxLength={300}
                  showCharacterCount
                  description="Brief description shown on your organization profile"
                />

                <Select
                  label="Timezone"
                  value={settings.timezone}
                  onChange={(value) => update('timezone', value || '')}
                  data={[
                    { value: 'america-new-york', label: 'Eastern Time (ET)' },
                    { value: 'america-chicago', label: 'Central Time (CT)' },
                    { value: 'america-denver', label: 'Mountain Time (MT)' },
                    { value: 'america-los-angeles', label: 'Pacific Time (PT)' },
                    { value: 'utc', label: 'UTC' },
                  ]}
                  searchable
                />

                <Select
                  label="Display Language"
                  value={settings.language}
                  onChange={(value) => update('language', value || '')}
                  data={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' },
                    { value: 'ja', label: 'Japanese' },
                  ]}
                />
              </Stack>
            )}

            {activeSection === 'notifications' && (
              <Stack gap="lg">
                <Box>
                  <Title order={3} mb="xs">Notifications</Title>
                  <Text size="sm" c="dimmed">
                    Control how and when you receive platform notifications
                  </Text>
                </Box>

                <Stack gap="sm">
                  <Text size="sm" fw={500}>Email Notifications</Text>
                  <Checkbox
                    label="Enable email notifications"
                    checked={settings.emailNotifications}
                    onChange={(e) => update('emailNotifications', e.target.checked)}
                  />
                </Stack>

                <Stack gap="sm">
                  <Text size="sm" fw={500}>Notification Types</Text>
                  <Checkbox
                    label="Study status updates"
                    checked={settings.studyUpdates}
                    onChange={(e) => update('studyUpdates', e.target.checked)}
                  />
                  <Checkbox
                    label="Data access requests and approvals"
                    checked={settings.dataAccessAlerts}
                    onChange={(e) => update('dataAccessAlerts', e.target.checked)}
                  />
                  <Checkbox
                    label="Compliance and audit alerts"
                    checked={settings.complianceAlerts}
                    onChange={(e) => update('complianceAlerts', e.target.checked)}
                  />
                </Stack>

                <Select
                  label="Digest Frequency"
                  value={settings.digestFrequency}
                  onChange={(value) => update('digestFrequency', value || '')}
                  data={[
                    { value: 'realtime', label: 'Real-time' },
                    { value: 'daily', label: 'Daily digest' },
                    { value: 'weekly', label: 'Weekly digest' },
                    { value: 'none', label: 'Never (in-app only)' },
                  ]}
                  description="How often notification emails are batched and sent"
                />
              </Stack>
            )}

            {activeSection === 'data-access' && (
              <Stack gap="lg">
                <Box>
                  <Title order={3} mb="xs">Data Access</Title>
                  <Text size="sm" c="dimmed">
                    Default data source preferences and access policies
                  </Text>
                </Box>

                <Select
                  label="Default Data Source"
                  value={settings.defaultDataSource}
                  onChange={(value) => update('defaultDataSource', value || '')}
                  data={[
                    { value: 'optum-cdm', label: 'Optum CDM' },
                    { value: 'marketscan', label: 'Merative MarketScan' },
                    { value: 'healthverity', label: 'HealthVerity' },
                    { value: 'flatiron', label: 'Flatiron Health' },
                  ]}
                  description="Pre-selected data source when creating new studies"
                  searchable
                  clearable
                />

                <Select
                  label="Data Retention Period"
                  value={settings.retentionPeriod}
                  onChange={(value) => update('retentionPeriod', value || '')}
                  data={[
                    { value: '12', label: '12 months' },
                    { value: '24', label: '24 months' },
                    { value: '36', label: '36 months' },
                    { value: '60', label: '60 months' },
                    { value: 'indefinite', label: 'Indefinite' },
                  ]}
                  description="How long study data is retained after completion"
                />

                <Stack gap="sm">
                  <Text size="sm" fw={500}>Access Policies</Text>
                  <Checkbox
                    label="Auto-approve data requests from internal team members"
                    checked={settings.autoApproveInternal}
                    onChange={(e) => update('autoApproveInternal', e.target.checked)}
                  />
                  <Checkbox
                    label="Require written justification for all data access requests"
                    checked={settings.requireJustification}
                    onChange={(e) => update('requireJustification', e.target.checked)}
                  />
                </Stack>
              </Stack>
            )}

            {activeSection === 'privacy' && (
              <Stack gap="lg">
                <Box>
                  <Title order={3} mb="xs">Privacy & Compliance</Title>
                  <Text size="sm" c="dimmed">
                    De-identification standards, audit logging, and review requirements
                  </Text>
                </Box>

                <Box>
                  <Text size="sm" fw={500} mb="xs">
                    De-identification Method
                  </Text>
                  <Radio.Group
                    value={settings.deidentificationMethod}
                    onChange={(value) => update('deidentificationMethod', value)}
                  >
                    <Stack gap="sm">
                      <Radio
                        value="expert"
                        label="Expert Determination (HIPAA §164.514(b)(1))"
                        aria-label="Expert Determination"
                      />
                      <Radio
                        value="safe-harbor"
                        label="Safe Harbor (HIPAA §164.514(b)(2))"
                        aria-label="Safe Harbor"
                      />
                    </Stack>
                  </Radio.Group>
                </Box>

                <Select
                  label="Audit Logging Level"
                  value={settings.auditLogging}
                  onChange={(value) => update('auditLogging', value || '')}
                  data={[
                    { value: 'full', label: 'Full — All access and modifications' },
                    { value: 'standard', label: 'Standard — Modifications only' },
                    { value: 'minimal', label: 'Minimal — Authentication events only' },
                  ]}
                  description="Level of detail captured in the audit trail"
                />

                <TextInput
                  label="Minimum Cell Size"
                  value={settings.minimumCellSize}
                  onChange={(e) => update('minimumCellSize', e.target.value)}
                  description="Suppress results with fewer patients than this threshold"
                  style={{ maxWidth: 200 }}
                />

                <Checkbox
                  label="Require privacy review before any data export or publication"
                  checked={settings.requirePrivacyReview}
                  onChange={(e) => update('requirePrivacyReview', e.target.checked)}
                />
              </Stack>
            )}

            {/* Save / Discard */}
            <Group gap="md" mt="xl" pt="lg" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
              <Button intent="prominent" appearance="solid" onClick={handleSave}>
                Save Changes
              </Button>
              <Link
                href="#"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  handleDiscard();
                }}
                style={{ fontSize: 'var(--mantine-font-size-sm)' }}
              >
                Discard changes
              </Link>
            </Group>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
