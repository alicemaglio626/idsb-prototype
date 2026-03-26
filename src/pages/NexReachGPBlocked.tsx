import React, { useState } from 'react';
import { Box, Stack, Group } from '@mantine/core';
import {
  Button,
  Text,
  Title,
  TextInput,
  Radio,
} from '@datavant/dart';
import { IconSearch, IconLock } from '@tabler/icons-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewState = 'landing' | 'blocked';

// ─── Landing State ────────────────────────────────────────────────────────────

function LandingState({
  phoneValue,
  onPhoneChange,
  callType,
  onCallTypeChange,
  retrieval,
  onRetrievalChange,
  onSearch,
}: {
  phoneValue: string;
  onPhoneChange: (v: string) => void;
  callType: string;
  onCallTypeChange: (v: string) => void;
  retrieval: string;
  onRetrievalChange: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <Box style={{ flex: 1, backgroundColor: '#fff', padding: '32px 32px', overflow: 'auto' }}>
      <Title order={2} fw={600} mb="xl" style={{ fontSize: 20 }}>NexReach</Title>

      <Stack gap="lg" style={{ maxWidth: 480 }}>
        {/* Call Type */}
        <Box>
          <Text size="sm" fw={600} mb="xs">Call Type</Text>
          <Radio.Group value={callType} onChange={onCallTypeChange}>
            <Group gap="lg">
              <Radio value="outbound" label="Outbound" />
              <Radio value="inbound" label="Inbound" />
            </Group>
          </Radio.Group>
        </Box>

        {/* Retrieval Method */}
        <Box>
          <Text size="sm" fw={600} mb="xs">Retrieval Method</Text>
          <Radio.Group value={retrieval} onChange={onRetrievalChange}>
            <Group gap="lg">
              <Radio value="offsite" label="Offsite" />
              <Radio value="onsite" label="Onsite" />
            </Group>
          </Radio.Group>
        </Box>

        {/* Phone search */}
        <Box>
          <TextInput
            placeholder="Search by phone number"
            value={phoneValue}
            onChange={(e) => onPhoneChange(e.currentTarget.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
            rightSection={
              <IconSearch
                size={15}
                color="#9ca3af"
                style={{ cursor: 'pointer' }}
                onClick={onSearch}
              />
            }
            style={{ width: 440 }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

// ─── Blocked State ────────────────────────────────────────────────────────────

function BlockedState({
  phone,
  callType,
  retrieval,
  onReset,
}: {
  phone: string;
  callType: string;
  retrieval: string;
  onReset: () => void;
}) {
  return (
    <Box style={{ flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

      {/* Dimmed echo of the landing form */}
      <Box style={{ padding: '32px 32px 24px', borderBottom: '1px solid #f3f4f6', opacity: 0.45, pointerEvents: 'none' }}>
        <Title order={2} fw={600} mb="xl" style={{ fontSize: 20 }}>NexReach</Title>

        <Stack gap="lg" style={{ maxWidth: 480 }}>
          <Box>
            <Text size="sm" fw={600} mb="xs">Call Type</Text>
            <Radio.Group value={callType} onChange={() => {}}>
              <Group gap="lg">
                <Radio value="outbound" label="Outbound" />
                <Radio value="inbound" label="Inbound" />
              </Group>
            </Radio.Group>
          </Box>

          <Box>
            <Text size="sm" fw={600} mb="xs">Retrieval Method</Text>
            <Radio.Group value={retrieval} onChange={() => {}}>
              <Group gap="lg">
                <Radio value="offsite" label="Offsite" />
                <Radio value="onsite" label="Onsite" />
              </Group>
            </Radio.Group>
          </Box>

          <Box>
            <TextInput
              value={phone}
              readOnly
              rightSection={<IconSearch size={15} color="#9ca3af" />}
              style={{ width: 440 }}
              styles={{ input: { backgroundColor: '#f9fafb', color: '#374151', fontFamily: 'monospace' } }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Blocked empty state */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          gap: 12,
          textAlign: 'center',
        }}
      >
        <IconLock size={32} color="#9ca3af" strokeWidth={1.5} />

        <Text fw={600} style={{ fontSize: 16, color: '#111827' }}>
          This inventory isn't available for your queue
        </Text>

        <Text size="sm" style={{ color: '#6b7280', lineHeight: 1.6, maxWidth: 380 }}>
          This number contains inventory that can only be handled by an onshore agent.
          Enter a different number or contact your supervisor.
        </Text>

        <Box mt="xs">
          <Button intent="prominent" appearance="solid" onClick={onReset}>
            Try another number
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function NexReachGPBlocked() {
  const [view, setView] = useState<ViewState>('landing');
  const [phoneValue, setPhoneValue] = useState('');
  const [callType, setCallType] = useState('outbound');
  const [retrieval, setRetrieval] = useState('offsite');

  const handleSearch = () => {
    if (phoneValue.trim()) setView('blocked');
  };

  const handleReset = () => {
    setPhoneValue('');
    setView('landing');
  };

  const blockedPhone = phoneValue || '(888) 555-0192';

  return (
    <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── Prototype variant switcher ── */}
      <Box
        style={{
          backgroundColor: '#f3f4f6',
          borderBottom: '1px solid #e5e7eb',
          padding: '6px 16px',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Text size="xs" c="dimmed" fw={500} style={{ marginRight: 4 }}>Prototype state:</Text>
        <Button
          intent={view === 'landing' ? 'prominent' : 'neutral'}
          appearance={view === 'landing' ? 'solid' : 'outline'}
          size="xs"
          onClick={() => { setView('landing'); setPhoneValue(''); }}
        >
          State 1 — Landing
        </Button>
        <Button
          intent={view === 'blocked' ? 'prominent' : 'neutral'}
          appearance={view === 'blocked' ? 'solid' : 'outline'}
          size="xs"
          onClick={() => { setView('blocked'); setPhoneValue('(888) 555-0192'); }}
        >
          State 2 — Blocked
        </Button>
      </Box>

      {/* ── Dark topbar ── */}
      <Box
        style={{
          backgroundColor: '#111827',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 200, fontSize: 18, letterSpacing: 1 }}>
          datavant
        </Text>
        <Text size="sm" style={{ color: '#9ca3af' }}>
          user@useremail.com / Tenant
        </Text>
      </Box>

      {/* ── Content ── */}
      {view === 'landing' ? (
        <LandingState
          phoneValue={phoneValue}
          onPhoneChange={setPhoneValue}
          callType={callType}
          onCallTypeChange={setCallType}
          retrieval={retrieval}
          onRetrievalChange={setRetrieval}
          onSearch={handleSearch}
        />
      ) : (
        <BlockedState
          phone={blockedPhone}
          callType={callType}
          retrieval={retrieval}
          onReset={handleReset}
        />
      )}
    </Box>
  );
}
