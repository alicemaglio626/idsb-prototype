import React, { useState } from 'react';
import {
  Box,
  Stack,
  Group,
  Flex,
  Divider,
  ScrollArea,
  Table,
  Checkbox as MantineCheckbox,
} from '@mantine/core';
import {
  Button,
  Badge,
  ActionIcon,
  Tabs,
  Textarea,
  Text,
  Title,
  TextInput,
  Select,
  Radio,
} from '@datavant/dart';
import {
  IconSearch,
  IconRefresh,
  IconNotes,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconRotateClockwise,
  IconX,
  IconArrowBackUp,
  IconInfoCircle,
} from '@tabler/icons-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Note {
  id: number;
  initials: string;
  color: string;
  author: string;
  timestamp: string;
  text: string;
}

type ViewState = 'landing' | 'workspace';
type ContactResult = null | 'connected' | 'not-connected';
type ActionType = 'schedule' | 'research' | 'pend' | 'reroute';

interface PaymentInfo {
  required: string;
  amount: string;
  feesNotPerChart: boolean;
  timeline: string;
  method: string;
  providerPackage: string;
  submissionMethod: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const INITIAL_NOTES: Note[] = [
  { id: 1, initials: 'JS', color: '#7c3aed', author: 'Jordan Schaefer', timestamp: 'Mar 16, 2026', text: 'Site is difficult to reach — receptionist screens all calls. Best to call after 2pm and ask for Carla in medical records.' },
  { id: 2, initials: 'MT', color: '#059669', author: 'Maria Torres', timestamp: 'Mar 13, 2026', text: 'They requested we send a fax cover sheet first before pulling charts. Fax to 718-555-5678, Attn: Records Dept.' },
  { id: 3, initials: 'AR', color: '#006ccf', author: 'Alex Rivera', timestamp: 'Mar 4, 2026', text: 'Confirmed they accept requests for 2024 and 2025 DOS. Flag duplicate name issues — they\'ve raised this before.' },
  { id: 4, initials: 'JS', color: '#7c3aed', author: 'Jordan Schaefer', timestamp: 'Feb 28, 2026', text: 'Office manager said they\'re switching EMR systems in April — may cause delays. Follow up after the 15th.' },
  { id: 5, initials: 'MT', color: '#059669', author: 'Maria Torres', timestamp: 'Feb 20, 2026', text: 'Spoke with Dr. Barnes\' admin directly. She handles all record requests personally and prefers email over fax.' },
  { id: 6, initials: 'AR', color: '#006ccf', author: 'Alex Rivera', timestamp: 'Feb 10, 2026', text: 'Site was closed the week of Feb 3–7 for staff training. Back to normal now.' },
];

const MEMBER_NAMES = [
  'HARPER, ALEXANDER', 'HASSAN, AMINA', 'FERNANDEZ, DIEGO', 'KAPOOR, PRIYA',
  'THOMPSON, ELIJAH', 'SCOTT, BENJAMIN', 'MORETTI, LUCA', 'JOHNSON, KEISH',
  'TANAKA, HIROSHI', 'BROOKS, OLIVIA', 'CHEN, MICHAEL', 'RODRIGUEZ, SOFIA',
  'PATEL, ANANYA', 'WILLIAMS, MARCUS', 'KIM, JIYEON', 'OKAFOR, CHIDI',
  'MARTINEZ, ELENA', 'NGUYEN, THANH', 'ANDERSON, CLAIRE', 'DUBOIS, MARC',
];
const PLANS = ['Aetna', 'Cigna', 'UnitedHealthcare', 'Humana'];
const REQUEST_ROWS = MEMBER_NAMES.map((member, i) => ({
  id: String(387216389 + i),
  plan: PLANS[i % PLANS.length],
  member,
  dob: `${String((i % 12) + 1).padStart(2, '0')}/${String((i % 28) + 1).padStart(2, '0')}/${1985 + (i % 15)}`,
  due: '4/1/2026',
  commit: '—',
  status: 'Unscheduled',
  payment: '—',
  osRef: `87991820${9887 + i}`,
  practitioner: 'BARNES, TAYLOR',
  site: '123 Main St. ...',
}));

const CALL_HISTORY_ROWS = [
  {
    outcome: 'Connected',
    agent: 'Rodriguez, Lorrie',
    requests: 50,
    actions: 'Scheduled: 30\nPended: 20 (PEND24 | PEND5)',
    siteDetails: 'Address',
    providerPkg: 'Fax Sent',
    ppt: '—',
    pkgGreen: true,
    timestamp: '10/1/2025, 8:30 AM EST',
  },
  {
    outcome: 'Not Connected\nNot a Practitioner Office',
    agent: 'May, Shelby',
    requests: 30,
    actions: 'Sent to Research: 30',
    siteDetails: '—',
    providerPkg: '—',
    ppt: '—',
    pkgGreen: false,
    timestamp: '10/1/2025, 8:30 AM EST',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilterPill({ label, options, selected, onToggle }: { label: string; options?: string[]; selected?: Set<string>; onToggle?: (opt: string) => void }) {
  const [open, setOpen] = useState(false);

  const hasSelection = selected ? selected.size > 0 : false;

  const toggle = (opt: string) => {
    if (onToggle) onToggle(opt);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Box
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 2,
          padding: '8px 12px',
          border: hasSelection ? '1px solid #006ccf' : '1px solid #8a8985',
          borderRadius: 1000,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          color: hasSelection ? '#006ccf' : '#4f4e4c',
          backgroundColor: hasSelection ? '#eaf5ff' : 'transparent',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {label}{hasSelection ? ` (${selected.size})` : ''} <IconChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </Box>
      {open && options && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9990 }} />
          <Box style={{
            position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 9991,
            backgroundColor: '#fff', border: '1px solid #e7e5df', borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)', padding: '6px 0', minWidth: 180,
          }}>
            {options.map(opt => (
              <Box
                key={opt}
                onClick={() => toggle(opt)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
                  cursor: 'pointer', fontSize: 14, color: '#242423',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f7f6f4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <MantineCheckbox size="xs" checked={selected ? selected.has(opt) : false} onChange={() => toggle(opt)} />
                {opt}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

// ─── Modals ──────────────────────────────────────────────────────────────────

function ModalOverlay({ title, submitLabel, onClose, onSubmit, children, size = 500 }: {
  title: string; submitLabel?: string; onClose: () => void; onSubmit?: () => void; children: React.ReactNode; size?: number;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', borderRadius: 12, zIndex: 9999, width: size, maxWidth: 'calc(100vw - 40px)', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <Box style={{ padding: '20px 24px 12px', borderBottom: '1px solid #e7e5df', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', borderRadius: '12px 12px 0 0', zIndex: 1 }}>
          <Text fw={400} size="xl">{title}</Text>
          <Text style={{ cursor: 'pointer', color: '#6b7280', fontSize: 20, lineHeight: 1 }} onClick={onClose}>×</Text>
        </Box>
        <Box style={{ padding: '16px 24px 24px' }}>
          <Stack gap="md">
            {children}
            {submitLabel && (
              <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
                <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
                <Button intent="prominent" appearance="solid" onClick={onSubmit || onClose}>{submitLabel}</Button>
              </Group>
            )}
          </Stack>
        </Box>
      </div>
    </>
  );
}

function ScheduleModal({ count, onClose, onSubmit }: { count: number; onClose: () => void; onSubmit?: () => void }) {
  const [activeTab, setActiveTab] = useState<'progress' | 'schedule'>('progress');
  const [showPendModal, setShowPendModal] = useState(false);

  // Progress Update fields
  const [paymentRequired, setPaymentRequired] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [feesNotPerChart, setFeesNotPerChart] = useState(false);
  const [paymentTimeline, setPaymentTimeline] = useState('pre-pay');
  const [paymentMethod, setPaymentMethod] = useState('check');
  const [includeProviderPkg, setIncludeProviderPkg] = useState('yes');
  const [submissionMethod, setSubmissionMethod] = useState<string | null>('mail');
  const [contactEmail, setContactEmail] = useState('mason@manhattanim.com');
  const [notes, setNotes] = useState('This is some autogenerated note text.');

  const needsEmail = paymentMethod === 'credit-card' || submissionMethod === 'email';

  // Schedule tab fields
  const [commitDate, setCommitDate] = useState('2026-04-01');

  const paymentCap = 50;
  const parsedAmount = parseFloat(paymentAmount.replace(/[^0-9.]/g, '')) || 0;
  const isOverCap = paymentRequired === 'yes' && parsedAmount > paymentCap && !feesNotPerChart;
  const isUnderCap = paymentRequired === 'yes' && parsedAmount > 0 && parsedAmount <= paymentCap && !feesNotPerChart;

  const canProceedToSchedule = paymentRequired !== null && (paymentRequired === 'no' || parsedAmount > 0 || feesNotPerChart);

  if (showPendModal) {
    return (
      <ModalOverlay title={`Pending ${count} Record Request(s)`} onClose={onClose}>
        <Select comboboxProps={{ zIndex: 10001 }} label="Pend Reason" required value="PNP-24" data={[
          { value: 'PNP-24', label: 'PNP-24: Request Payment' },
        ]} disabled />
        <TextInput label="Payment Amount Per Chart" required value={`$${parsedAmount}`} readOnly styles={{ input: { backgroundColor: '#f7f6f4', color: '#6b7280' } }} />
        <Flex gap="xl">
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={600} mb={6}>Payment Timeline *</Text>
            <Radio.Group value={paymentTimeline} onChange={setPaymentTimeline}>
              <Group gap="lg"><Radio value="pre-pay" label="Pre-pay" aria-label="Pre-pay" /><Radio value="post-pay" label="Post-pay" aria-label="Post-pay" /></Group>
            </Radio.Group>
          </Box>
          <Box style={{ flex: 1 }}>
            <Text size="sm" fw={600} mb={6}>Payment Method *</Text>
            <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
              <Group gap="lg"><Radio value="check" label="Check" aria-label="Check" /><Radio value="credit-card" label="Credit Card" aria-label="Credit Card" /></Group>
            </Radio.Group>
          </Box>
        </Flex>
        <Textarea label="Notes" required rows={4} value={`Pended inventory with code PNP 24 PAYMENT EXCEEDS LIMIT. Reason: 24 Payment Exceeds Limit. Efforts were made to negotiate the requested payment amount to a lower rate. Alternative retrieval methods were proposed to reduce costs and streamline the process.`} onChange={() => {}} />
        <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
          <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
          <Button intent="prominent" appearance="solid" onClick={onSubmit || onClose}>Pend Record Request(s)</Button>
        </Group>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay title={`Scheduling ${count} Record Request(s)`} onClose={onClose} size={600}>
        {/* Tab switcher — matches Figma pill toggle */}
        <Flex gap={0} style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #006ccf' }}>
          <Box
            onClick={() => setActiveTab('progress')}
            style={{
              flex: 1, padding: '10px 0', textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 600,
              backgroundColor: activeTab === 'progress' ? '#006ccf' : '#fff',
              color: activeTab === 'progress' ? '#fff' : '#006ccf',
            }}
          >Progress Update</Box>
          <Box
            onClick={() => canProceedToSchedule && !isOverCap ? setActiveTab('schedule') : undefined}
            style={{
              flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 14, fontWeight: 600,
              backgroundColor: activeTab === 'schedule' ? '#006ccf' : '#fff',
              color: activeTab === 'schedule' ? '#fff' : '#006ccf',
              cursor: canProceedToSchedule && !isOverCap ? 'pointer' : 'default',
              opacity: canProceedToSchedule && !isOverCap ? 1 : 0.5,
              borderLeft: '1px solid #006ccf',
            }}
          >Schedule</Box>
        </Flex>

        {activeTab === 'progress' ? (
          <>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
              Click "Save Progress" to log progress without scheduling record requests. If you are ready to schedule record requests, click "Proceed to Scheduling" to fill in the commitment date.
            </Text>

            {/* Payment Required */}
            <Box>
              <Text size="sm" fw={600} mb={6}>Payment Required *</Text>
              <Radio.Group value={paymentRequired} onChange={setPaymentRequired}>
                <Group gap="lg"><Radio value="yes" label="Yes" aria-label="Yes" /><Radio value="no" label="No" aria-label="No" /></Group>
              </Radio.Group>
            </Box>

            {/* Payment fields — shown when Yes */}
            {paymentRequired === 'yes' && (
              <>
                <Flex gap="xl" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <TextInput
                      label="Payment Amount Per Chart"
                      required
                      placeholder="$ Enter Amount"
                      value={paymentAmount}
                      onChange={(e) => { if (!feesNotPerChart) setPaymentAmount(e.currentTarget.value); }}
                      styles={feesNotPerChart ? { input: { backgroundColor: '#f7f6f4', color: '#9ca3af' } } : undefined}
                    />
                  </Box>
                  <Box style={{ flex: 1, paddingTop: 24 }}>
                    <Text size="sm" c="dimmed">Payment Cap Per Chart</Text>
                    <Text size="sm" fw={600}>${paymentCap}</Text>
                  </Box>
                </Flex>

                {/* Validation messages */}
                {isUnderCap && (
                  <Text size="sm" style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: 4 }}>
                    &#10003; Payment amount below cap
                  </Text>
                )}
                {isOverCap && (
                  <Box style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#a7850d' }}>
                    <Text style={{ fontSize: 14 }}>&#9888;</Text>
                    <Box>
                      <Text size="sm" fw={600} style={{ color: '#a7850d' }}>Payment Cap Exceeded</Text>
                      <Text size="sm" style={{ color: '#6b7280' }}>Upon submitting this form, these record requests will proceed to the PEND24 (Request Payment) process.</Text>
                    </Box>
                  </Box>
                )}

                <Group gap={8} align="center" style={{ cursor: 'pointer' }} onClick={() => setFeesNotPerChart(!feesNotPerChart)}>
                  <MantineCheckbox checked={feesNotPerChart} onChange={(e) => setFeesNotPerChart(e.currentTarget.checked)} size="sm" />
                  <Text size="sm">Fees not charged on per chart basis</Text>
                </Group>

                <Flex gap="xl">
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb={6}>Payment Timeline *</Text>
                    <Radio.Group value={paymentTimeline} onChange={setPaymentTimeline}>
                      <Group gap="lg"><Radio value="pre-pay" label="Pre-pay" aria-label="Pre-pay" /><Radio value="post-pay" label="Post-pay" aria-label="Post-pay" /></Group>
                    </Radio.Group>
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={600} mb={6}>Payment Method *</Text>
                    <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
                      <Group gap="lg"><Radio value="check" label="Check" aria-label="Check" /><Radio value="credit-card" label="Credit Card" aria-label="Credit Card" /></Group>
                    </Radio.Group>
                  </Box>
                </Flex>
              </>
            )}

            {/* Include Provider Package */}
            <Box>
              <Text size="sm" fw={600} mb={6}>Include Provider Package *</Text>
              <Radio.Group value={includeProviderPkg} onChange={setIncludeProviderPkg}>
                <Group gap="lg"><Radio value="yes" label="Yes" aria-label="Yes" /><Radio value="no" label="No" aria-label="No" /></Group>
              </Radio.Group>
            </Box>

            {/* Submission Method */}
            <Select comboboxProps={{ zIndex: 10001 }} label="Submission Method" required data={[
              { value: 'mail', label: 'Mail' },
              { value: 'fax', label: 'Fax' },
              { value: 'email', label: 'Email' },
  
            ]} value={submissionMethod} onChange={setSubmissionMethod} />

            {needsEmail && (
              <TextInput label="Primary Contact Email" required value={contactEmail} onChange={(e) => setContactEmail(e.currentTarget.value)} />
            )}

            <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />

            <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
              <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
              <Button
                intent="neutral"
                appearance="outline"
                onClick={onClose}
                disabled={paymentRequired === null}
              >Save Progress</Button>
              {isOverCap ? (
                <Button intent="prominent" appearance="solid" onClick={() => setShowPendModal(true)}>Proceed to Pend</Button>
              ) : (
                <Button
                  intent="prominent"
                  appearance="solid"
                  disabled={!canProceedToSchedule}
                  onClick={() => setActiveTab('schedule')}
                >Proceed to Scheduling</Button>
              )}
            </Group>
          </>
        ) : (
          <>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.5 }}>
              Complete the scheduling action by filling in the Commitment Date and clicking "Schedule Record Request(s)." Ensure you have filled in all the required fields in the Progress Update section.
            </Text>

            <Box>
              <Text size="sm" fw={600} mb={6}>Commitment Date *</Text>
              <input
                type="date"
                value={commitDate}
                onChange={(e) => setCommitDate(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px', border: '1px solid #8a8985',
                  borderRadius: 6, fontSize: 14, fontFamily: 'DM Sans, sans-serif',
                  color: '#242423', outline: 'none',
                }}
              />
            </Box>

            <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
              <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
              <Button intent="prominent" appearance="solid" onClick={onSubmit || onClose}>Schedule Record Request(s)</Button>
            </Group>
          </>
        )}
    </ModalOverlay>
  );
}

function ResearchModal({ count, onClose, onSubmit, siteAccessType, onSiteAccessTypeChange }: { count: number; onClose: () => void; onSubmit?: () => void; siteAccessType?: string | null; onSiteAccessTypeChange?: (v: string) => void }) {
  const [phone] = useState('718-555-1234');
  const [reason, setReason] = useState<string | null>('member_verify');
  const [suggestedPhone, setSuggestedPhone] = useState('718-555-1236');
  const [notes, setNotes] = useState('Could not verify 2 [members or providers]. Sent to research.');
  return (
    <ModalOverlay title={`Sending ${count} Record Request(s) to Research`} submitLabel="Send Record Request(s)" onClose={onClose} onSubmit={onSubmit}>
      {/* SiteAccessTypePrompt hidden for now */}
      <TextInput label="Phone Number Attempted" required value={phone} readOnly styles={{ input: { backgroundColor: '#f7f6f4', color: '#6b7280' } }} />
      <Select comboboxProps={{ zIndex: 10001 }} label="Reason" required data={[
        { value: 'member_verify', label: 'Member verification not possible' },
        { value: 'not_on_file', label: 'Provider not on file' },
      ]} value={reason} onChange={setReason} />
      <TextInput label="Suggested Phone Number" value={suggestedPhone} onChange={(e) => setSuggestedPhone(e.currentTarget.value)} />
      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />
    </ModalOverlay>
  );
}

function PendModal({ count, onClose, onSubmit, siteAccessType, onSiteAccessTypeChange }: { count: number; onClose: () => void; onSubmit?: () => void; siteAccessType?: string | null; onSiteAccessTypeChange?: (v: string) => void }) {
  const [reason, setReason] = useState<string | null>(null);
  const [notes, setNotes] = useState('This is an autogenerated note');
  return (
    <ModalOverlay title={`Pending ${count} Record Request(s)`} submitLabel="Pend Record Request(s)" onClose={onClose} onSubmit={onSubmit}>
      {/* SiteAccessTypePrompt hidden for now */}
      <Select comboboxProps={{ zIndex: 10001 }} label="Pend Reason" required placeholder="Select a Pend reason" data={[
        { value: 'PNP-1', label: 'PNP-1: Provider Not Responding' },
        { value: 'PNP-2', label: 'PNP-2: Provider Active Refusal' },
        { value: 'PNP-5', label: 'PNP-5: Provider Capacity Restrictions' },
        { value: 'PNP-6', label: 'PNP-6: Direct Access to EMR' },
        { value: 'PNP-7', label: 'PNP-7: DOS Requested Not Available' },
        { value: 'PNP-11', label: 'PNP-11: Member Record Not At Location' },
        { value: 'PNP-15', label: 'PNP-15: Requesting Member Consent' },
        { value: 'PNP-18', label: 'PNP-18: Post Commitment Refusal' },
        { value: 'PNP-24', label: 'PNP-24: Request Payment' },
        { value: 'PNP-27', label: 'PNP-27: Additional Data Required' },
        { value: 'PNP-42', label: 'PNP-42: Environmental Constraints' },
      ]} value={reason} onChange={setReason} />
      <Box style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '0 0 4px' }}>
        <Text size="xs" style={{ color: '#6b21a8', lineHeight: 1.5 }}>
          &#9432; PNP1 &amp; PNP18 will be auto-assigned based on call counts{'\n'}
          <span style={{ color: '#6b7280' }}>These options are no longer available for manual selection.</span>
        </Text>
      </Box>
      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />
    </ModalOverlay>
  );
}

function RerouteModal({ count, onClose, onSubmit, siteAccessType, onSiteAccessTypeChange }: { count: number; onClose: () => void; onSubmit?: () => void; siteAccessType?: string | null; onSiteAccessTypeChange?: (v: string) => void }) {
  const [method, setMethod] = useState<string | null>('HIH-Major');
  const [vendor, setVendor] = useState<string | null>('epic');
  const [notes, setNotes] = useState('This is some autogenerated note text.');
  const isHIH = method === 'HIH-Major' || method === 'HIH-Other';
  return (
    <ModalOverlay title={`Rerouting ${count} Record Request(s)`} submitLabel="Reroute Record Request(s)" onClose={onClose} onSubmit={onSubmit}>
      {/* SiteAccessTypePrompt hidden for now */}
      <Select comboboxProps={{ zIndex: 10001 }} label="Preferred Retrieval Method" required data={[
        { value: 'Embedded', label: 'Embedded' },
        { value: 'EMR Remote', label: 'EMR Remote' },
        { value: 'HIH-Major', label: 'HIH-Major' },
        { value: 'HIH-Other', label: 'HIH-Other' },
        { value: 'Onsite', label: 'Onsite' },
        { value: 'Offsite', label: 'Offsite' },
      ]} value={method} onChange={setMethod} />
      {isHIH && (
        <Select comboboxProps={{ zIndex: 10001 }} label="Vendor" required data={[
          { value: 'epic', label: 'Epic' },
          { value: 'cerner', label: 'Cerner' },
          { value: 'meditech', label: 'Meditech' },
          { value: 'allscripts', label: 'Allscripts' },
        ]} value={vendor} onChange={setVendor} />
      )}
      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />
    </ModalOverlay>
  );
}

function ActionModal({ action, count, onClose }: { action: ActionType; count: number; onClose: () => void }) {
  if (action === 'schedule') return <ScheduleModal count={count} onClose={onClose} />;
  if (action === 'research') return <ResearchModal count={count} onClose={onClose} />;
  if (action === 'pend') return <PendModal count={count} onClose={onClose} />;
  if (action === 'reroute') return <RerouteModal count={count} onClose={onClose} />;
  return null;
}

function EditSiteModal({ onClose, isEmrRemote, siteAccessType, onSiteAccessTypeChange }: { onClose: () => void; isEmrRemote?: boolean; siteAccessType?: string | null; onSiteAccessTypeChange?: (v: string) => void }) {
  const [siteName, setSiteName] = useState('Manhattan Internal Medicine');
  const [addr1, setAddr1] = useState('123 Main Street');
  const [addr2, setAddr2] = useState('Suite 330');
  const [city, setCity] = useState('Brooklyn');
  const [state, setState] = useState<string | null>('NY');
  const [zip, setZip] = useState('12345');
  const [fax, setFax] = useState('718-888-2345');
  const [contact, setContact] = useState('Mason Reed');
  const [email, setEmail] = useState('mason@manhattanim.com');
  return (
    <ModalOverlay title="Edit Site Details" onClose={onClose}>
      <TextInput label="Site Name" required value={siteName} onChange={(e) => setSiteName(e.currentTarget.value)} />
      <TextInput label="Address 1" required value={addr1} onChange={(e) => setAddr1(e.currentTarget.value)} />
      <TextInput label="Address 2" value={addr2} onChange={(e) => setAddr2(e.currentTarget.value)} />
      <TextInput label="City" value={city} onChange={(e) => setCity(e.currentTarget.value)} />
      <Group grow>
        <Select comboboxProps={{ zIndex: 10001 }} label="State" required data={['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']} value={state} onChange={setState} />
        <TextInput label="Zip" required value={zip} onChange={(e) => setZip(e.currentTarget.value)} />
      </Group>
      <TextInput label="Fax Number" value={fax} onChange={(e) => setFax(e.currentTarget.value)} />
      <TextInput label="Primary Contact" required value={contact} onChange={(e) => setContact(e.currentTarget.value)} />
      <TextInput label="Primary Contact Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      {/* Site Access Type hidden for now */}
      {false && isEmrRemote && onSiteAccessTypeChange && (
        <Select comboboxProps={{ zIndex: 10001 }} label="Site Access Type" data={[
          { value: 'open', label: 'Open Access' },
          { value: 'queued', label: 'Queued Access' },
        ]} value={siteAccessType || ''} onChange={(v) => { if (v) onSiteAccessTypeChange(v); }} />
      )}
      <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
        <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
        <Button intent="prominent" appearance="solid" onClick={onClose}>Update Site Details</Button>
      </Group>
    </ModalOverlay>
  );
}

// ─── EMRR Site Access Type Prompt ──────────────────────────────────────────────

function SiteAccessTypePrompt({ value, onChange, alreadySaved }: { value: string | null; onChange: (v: string) => void; alreadySaved?: boolean }) {
  if (alreadySaved) return null;
  return (
    <Box style={{ border: '1px solid #e7e5df', borderRadius: 6, padding: '10px 14px' }}>
      <Text size="sm" fw={600} mb={4} style={{ color: '#242423' }}>Site Access Type *</Text>
      <Text size="xs" style={{ color: '#6e6d6a', marginBottom: 8 }}>
        Applies to the entire site. Open access sites skip "Awaiting Queued."
      </Text>
      <Radio.Group value={value} onChange={onChange}>
        <Group gap="lg">
          <Radio value="open" label="Open Access" aria-label="Open Access" />
          <Radio value="queued" label="Queued Access" aria-label="Queued Access" />
        </Group>
      </Radio.Group>
    </Box>
  );
}

// ─── EMRR Save Progress Modal ─────────────────────────────────────────────────

function EmrrSaveProgressModal({ count, onClose, onSubmit, siteAccessType, onSiteAccessTypeChange, paymentInfo, onPaymentInfoChange }: {
  count: number; onClose: () => void; onSubmit?: (credentialStatus: string) => void;
  siteAccessType: string | null; onSiteAccessTypeChange: (v: string) => void;
  paymentInfo: PaymentInfo | null; onPaymentInfoChange: (info: PaymentInfo) => void;
}) {
  const [credentialStatus, setCredentialStatus] = useState<string | null>(null);
  const [localSiteType, setLocalSiteType] = useState<string | null>(siteAccessType);
  const [scheduleDate, setScheduleDate] = useState('');
  const [notes, setNotes] = useState('This is some autogenerated note text.');
  const [editingPayment, setEditingPayment] = useState(false);

  // Payment fields — initialize from saved info if available
  const [paymentRequired, setPaymentRequired] = useState<string | null>(paymentInfo?.required || null);
  const [paymentAmount, setPaymentAmount] = useState(paymentInfo?.amount || '');
  const [feesNotPerChart, setFeesNotPerChart] = useState(paymentInfo?.feesNotPerChart || false);
  const [paymentTimeline, setPaymentTimeline] = useState(paymentInfo?.timeline || 'pre-pay');
  const [paymentMethod, setPaymentMethod] = useState(paymentInfo?.method || 'check');
  const [includeProviderPkg, setIncludeProviderPkg] = useState(paymentInfo?.providerPackage || 'yes');
  const [submissionMethod, setSubmissionMethod] = useState<string | null>(paymentInfo?.submissionMethod || 'mail');
  const [contactEmail, setContactEmail] = useState('mason@manhattanim.com');

  const needsScheduleDate = credentialStatus === 'awaiting_assignment';
  const needsEmail = paymentMethod === 'credit-card' || submissionMethod === 'email';
  const isOpen = localSiteType === 'open';
  const paymentCap = 50;
  const parsedAmount = parseFloat(paymentAmount.replace(/[^0-9.]/g, '')) || 0;
  const isOverCap = paymentRequired === 'yes' && parsedAmount > paymentCap && !feesNotPerChart;
  const isUnderCap = paymentRequired === 'yes' && parsedAmount > 0 && parsedAmount <= paymentCap && !feesNotPerChart;
  const showPaymentForm = !paymentInfo || editingPayment;

  const statusOptions = [
    { value: 'outreach_in_progress', label: 'Outreach In Progress' },
    { value: 'credentialing_in_progress', label: 'Credentialing In Progress' },
    { value: 'awaiting_credentials', label: 'Awaiting Credentials' },
    ...(!isOpen ? [{ value: 'awaiting_queued', label: 'Awaiting Queued' }] : []),
    { value: 'awaiting_assignment', label: 'Awaiting Assignment' },
  ];

  const handleSubmit = () => {
    if (localSiteType) onSiteAccessTypeChange(localSiteType);
    if (paymentRequired) {
      onPaymentInfoChange({
        required: paymentRequired,
        amount: paymentAmount,
        feesNotPerChart,
        timeline: paymentTimeline,
        method: paymentMethod,
        providerPackage: includeProviderPkg,
        submissionMethod: submissionMethod || 'mail',
      });
    }
    // Map dropdown value to display label for the table
    const statusLabels: Record<string, string> = {
      outreach_in_progress: 'Outreach In Progress',
      credentialing_in_progress: 'Credentialing In Progress',
      awaiting_credentials: 'Awaiting Credentials',
      awaiting_queued: 'Awaiting Queued',
      awaiting_assignment: 'Awaiting Assignment',
    };
    if (onSubmit && credentialStatus) onSubmit(statusLabels[credentialStatus] || credentialStatus);
  };

  return (
    <ModalOverlay title={`Updating ${count} Record Request(s)`} onClose={onClose} size={600}>

      {/* SiteAccessTypePrompt hidden for now */}

      {/* Payment — summary card or full form */}
      {!showPaymentForm && paymentInfo ? (
        <Box style={{ border: '1px solid #006ccf', borderRadius: 6, padding: '12px 16px' }}>
          <Group justify="space-between" align="center" mb={8}>
            <Text size="sm" fw={600} style={{ color: '#242423' }}>Payment and PP Details</Text>
            <Text size="xs" fw={500} style={{ color: '#006ccf', cursor: 'pointer' }} onClick={() => setEditingPayment(true)}>Edit</Text>
          </Group>
          <Group gap={6} wrap="nowrap" style={{ overflow: 'hidden' }}>
            <Text size="xs" style={{ color: '#6e6d6a', whiteSpace: 'nowrap' }}>
              Payment: {paymentInfo.required === 'yes' ? `$${paymentInfo.amount}/chart${paymentInfo.feesNotPerChart ? ' (flat)' : ''}` : 'None'}
            </Text>
            {paymentInfo.required === 'yes' && (<><Text size="xs" style={{ color: '#c0beb9' }}>|</Text>
            <Text size="xs" style={{ color: '#6e6d6a', whiteSpace: 'nowrap' }}>{paymentInfo.timeline === 'pre-pay' ? 'Pre-pay' : 'Post-pay'}, {paymentInfo.method === 'check' ? 'Check' : 'Credit Card'}</Text></>)}
            <Text size="xs" style={{ color: '#c0beb9' }}>|</Text>
            <Text size="xs" style={{ color: '#6e6d6a', whiteSpace: 'nowrap' }}>Provider Pkg: {paymentInfo.providerPackage === 'yes' ? 'Yes' : 'No'}</Text>
            <Text size="xs" style={{ color: '#c0beb9' }}>|</Text>
            <Text size="xs" style={{ color: '#6e6d6a', whiteSpace: 'nowrap' }}>Submission: {paymentInfo.submissionMethod ? paymentInfo.submissionMethod.charAt(0).toUpperCase() + paymentInfo.submissionMethod.slice(1) : '—'}</Text>
          </Group>
        </Box>
      ) : (
        <>
          {/* Payment Required */}
          <Box>
            <Text size="sm" fw={600} mb={6}>Payment Required *</Text>
            <Radio.Group value={paymentRequired} onChange={setPaymentRequired}>
              <Group gap="lg"><Radio value="yes" label="Yes" aria-label="Yes" /><Radio value="no" label="No" aria-label="No" /></Group>
            </Radio.Group>
          </Box>

          {paymentRequired === 'yes' && (
            <>
              <Flex gap="xl" align="flex-start">
                <Box style={{ flex: 1 }}>
                  <TextInput label="Payment Amount Per Chart" required placeholder="$ Enter Amount" value={paymentAmount}
                    onChange={(e) => { if (!feesNotPerChart) setPaymentAmount(e.currentTarget.value); }}
                    styles={feesNotPerChart ? { input: { backgroundColor: '#f7f6f4', color: '#9ca3af' } } : undefined}
                  />
                </Box>
                <Box style={{ flex: 1, paddingTop: 24 }}>
                  <Text size="sm" c="dimmed">Payment Cap Per Chart</Text>
                  <Text size="sm" fw={600}>${paymentCap}</Text>
                </Box>
              </Flex>

              {isUnderCap && <Text size="sm" style={{ color: '#059669' }}>&#10003; Payment amount below cap</Text>}
              {isOverCap && (
                <Box style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#a7850d' }}>
                  <Text style={{ fontSize: 14 }}>&#9888;</Text>
                  <Box>
                    <Text size="sm" fw={600} style={{ color: '#a7850d' }}>Payment Cap Exceeded</Text>
                    <Text size="sm" style={{ color: '#6b7280' }}>These record requests will proceed to the PEND24 (Request Payment) process.</Text>
                  </Box>
                </Box>
              )}

              <Group gap={8} align="center" style={{ cursor: 'pointer' }} onClick={() => setFeesNotPerChart(!feesNotPerChart)}>
                <MantineCheckbox checked={feesNotPerChart} onChange={(e) => setFeesNotPerChart(e.currentTarget.checked)} size="sm" />
                <Text size="sm">Fees not charged on per chart basis</Text>
              </Group>

              <Flex gap="xl">
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600} mb={6}>Payment Timeline *</Text>
                  <Radio.Group value={paymentTimeline} onChange={setPaymentTimeline}>
                    <Group gap="lg"><Radio value="pre-pay" label="Pre-pay" aria-label="Pre-pay" /><Radio value="post-pay" label="Post-pay" aria-label="Post-pay" /></Group>
                  </Radio.Group>
                </Box>
                <Box style={{ flex: 1 }}>
                  <Text size="sm" fw={600} mb={6}>Payment Method *</Text>
                  <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
                    <Group gap="lg"><Radio value="check" label="Check" aria-label="Check" /><Radio value="credit-card" label="Credit Card" aria-label="Credit Card" /></Group>
                  </Radio.Group>
                </Box>
              </Flex>
            </>
          )}

          <Box>
            <Text size="sm" fw={600} mb={6}>Include Provider Package *</Text>
            <Radio.Group value={includeProviderPkg} onChange={setIncludeProviderPkg}>
              <Group gap="lg"><Radio value="yes" label="Yes" aria-label="Yes" /><Radio value="no" label="No" aria-label="No" /></Group>
            </Radio.Group>
          </Box>

          <Select comboboxProps={{ zIndex: 10001 }} label="Submission Method" required data={[
            { value: 'mail', label: 'Mail' },
            { value: 'fax', label: 'Fax' },
            { value: 'email', label: 'Email' },

          ]} value={submissionMethod} onChange={setSubmissionMethod} />

          {needsEmail && (
            <TextInput label="Primary Contact Email" required value={contactEmail} onChange={(e) => setContactEmail(e.currentTarget.value)} />
          )}
        </>
      )}

      <Select comboboxProps={{ zIndex: 10001 }} label="Credential Progress Status" required placeholder="Select status"
        data={statusOptions}
        value={credentialStatus}
        onChange={setCredentialStatus}
      />

      {needsScheduleDate && (
        <Box>
          <Text size="sm" fw={600} mb={6}>Schedule Date *</Text>
          <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #8a8985', borderRadius: 6, fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: '#242423', outline: 'none' }}
          />
        </Box>
      )}

      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />

      <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
        <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
        <Button intent="prominent" appearance="solid"
          disabled={!credentialStatus || (needsScheduleDate && !scheduleDate)}
          onClick={handleSubmit}
        >Save Progress</Button>
      </Group>
    </ModalOverlay>
  );
}

// ─── No Contact Modals ───────────────────────────────────────────────────────

function NoAnswerModal({ title, defaultReason, reasons, onClose, onSave }: {
  title: string; defaultReason: string; reasons: string[]; onClose: () => void; onSave: () => void;
}) {
  const [reason, setReason] = useState<string | null>(defaultReason);
  const [notes, setNotes] = useState('This is some autogenerated note text.');
  return (
    <ModalOverlay title={title} onClose={onClose}>
      <Select comboboxProps={{ zIndex: 10001 }} label="Reason" required
        data={reasons.map(r => ({ value: r, label: r }))}
        value={reason} onChange={setReason}
      />
      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />
      <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
        <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
        <Button intent="prominent" appearance="solid" onClick={onSave}>Save</Button>
      </Group>
    </ModalOverlay>
  );
}

function SiteClosedModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [phoneProvided, setPhoneProvided] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('718-555-1234');
  const [notes, setNotes] = useState('This is some autogenerated note text.');
  return (
    <ModalOverlay title="Add Note: Site Permanently Closed" onClose={onClose}>
      <Box>
        <Text size="sm" fw={600} mb={6}>Updated phone number provided? *</Text>
        <Radio.Group value={phoneProvided} onChange={setPhoneProvided}>
          <Group gap="lg"><Radio value="yes" label="Yes" aria-label="Yes" /><Radio value="no" label="No" aria-label="No" /></Group>
        </Radio.Group>
      </Box>
      {phoneProvided === 'yes' && (
        <TextInput label="Phone Number Provided" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
      )}
      <Textarea label="Notes" required rows={4} value={notes} onChange={(e) => setNotes(e.currentTarget.value)}
        styles={phoneProvided === null ? { input: { backgroundColor: '#f7f6f4', color: '#9ca3af' } } : undefined}
        placeholder="This is some autogenerated note text."
      />
      <Group justify="flex-end" gap="sm" pt="sm" style={{ borderTop: '1px solid #e7e5df' }}>
        <Button intent="neutral" appearance="ghost" onClick={onClose}>Cancel</Button>
        <Button intent="prominent" appearance="solid" onClick={onSave}>Save</Button>
      </Group>
    </ModalOverlay>
  );
}

// ─── Landing Screen ──────────────────────────────────────────────────────────

function LandingScreen({
  phoneValue, onPhoneChange, callType, onCallTypeChange,
  retrieval, onRetrievalChange, onSearch,
}: {
  phoneValue: string; onPhoneChange: (v: string) => void;
  callType: string; onCallTypeChange: (v: string) => void;
  retrieval: string; onRetrievalChange: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <Box style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Dark topbar */}
      <Box style={{ backgroundColor: '#161515', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, width: '100%' }}>
        <Text style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: -0.3 }}>datavant</Text>
        <Text size="xs" style={{ color: '#fff', opacity: 0.8, textAlign: 'right', lineHeight: 1.4 }}>user@useremail.com<br />Tenant</Text>
      </Box>

      <Box style={{ flex: 1, backgroundColor: '#fff', padding: '20px 20px', overflow: 'auto', width: '100%' }}>
        <Title order={2} fw={500} mb={32} style={{ fontSize: 24 }}>NexReach</Title>

        <Stack gap="lg" style={{ maxWidth: 480 }}>
          <Box>
            <Text size="sm" fw={600} mb="xs">Call Type</Text>
            <Radio.Group value={callType} onChange={onCallTypeChange}>
              <Group gap="lg">
                <Radio value="outbound" label="Outbound" aria-label="Outbound" />
                <Radio value="inbound" label="Inbound" aria-label="Inbound" />
              </Group>
            </Radio.Group>
          </Box>

          <Box>
            <Text size="sm" fw={600} mb="xs">Retrieval Method</Text>
            <Radio.Group value={retrieval} onChange={onRetrievalChange}>
              <Group gap="lg">
                <Radio value="offsite" label="Offsite" aria-label="Offsite" />
                <Radio value="onsite" label="Onsite" aria-label="Onsite" />
                <Radio value="emr-remote" label="EMR Remote" aria-label="EMR Remote" />
              </Group>
            </Radio.Group>
          </Box>

          <Box>
            <TextInput
              placeholder="Search by phone number"
              value={phoneValue}
              onChange={(e) => onPhoneChange(e.currentTarget.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
              rightSection={
                <IconSearch size={15} color="#9ca3af" style={{ cursor: 'pointer' }} onClick={onSearch} />
              }
              style={{ width: '100%' }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── Workspace Screen ────────────────────────────────────────────────────────

function WorkspaceScreen({
  onBackToSearch,
  retrievalMethod,
}: {
  onBackToSearch: () => void;
  retrievalMethod: string;
}) {
  const [contactResult, setContactResult] = useState<ContactResult>(null);
  const [siteAccessType, setSiteAccessType] = useState<string | null>(null);
  const [noContactReason, setNoContactReason] = useState<string | null>(null);
  const [noContactSubmitted, setNoContactSubmitted] = useState(false);
  const [noContactModalOpen, setNoContactModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [actionScope, setActionScope] = useState<'selected' | 'global'>('selected');
  const [editSiteOpen, setEditSiteOpen] = useState(false);
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [drawerDraft, setDrawerDraft] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [requestRows, setRequestRows] = useState(REQUEST_ROWS.map(r => ({
    ...r,
    status: r.status,
  })));
  const [toast, setToast] = useState<string | null>(null);
  const [tableAction, setTableAction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});

  const toggleFilter = (filterKey: string, value: string) => {
    setFilters(prev => {
      const current = prev[filterKey] || new Set<string>();
      const next = new Set(current);
      if (next.has(value)) next.delete(value); else next.add(value);
      return { ...prev, [filterKey]: next };
    });
  };

  const resetFilters = () => setFilters({});

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const addNote = (text: string) => {
    setNotes((prev) => [
      { id: Date.now(), initials: 'JS', color: '#7c3aed', author: 'Jordan Schaefer', timestamp: 'just now', text },
      ...prev,
    ]);
  };

  const isConnected = contactResult === 'connected';
  const isEmrRemote = retrievalMethod === 'emr-remote';

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const unactionedRows = requestRows.filter(r => r.status === 'Unscheduled');

  const toggleAll = () => {
    if (selectedRows.size === unactionedRows.length && unactionedRows.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(unactionedRows.map(r => r.id)));
    }
  };

  const handleChangeAnswer = () => {
    setContactResult(null);
    setNoContactReason(null);
    setNoContactSubmitted(false);
    setNoContactModalOpen(false);
    setSelectedRows(new Set());
  };

  const toastMessages: Record<ActionType, string> = isEmrRemote
    ? { schedule: 'Credential Progress Updated', research: 'Record Requests Sent to Research', pend: 'Record Requests Pended', reroute: 'Record Requests Rerouted' }
    : { schedule: 'Record Requests Scheduled', research: 'Record Requests Sent to Research', pend: 'Record Requests Pended', reroute: 'Record Requests Rerouted' };

  // Apply action to rows (update status + commitment date for schedule)
  const applyAction = (action: ActionType, global?: boolean, customStatus?: string) => {
    const statusMap: Record<ActionType, string> = isEmrRemote
      ? { schedule: 'Outreach In Progress', research: 'In Research', pend: 'Pended', reroute: 'Rerouted' }
      : { schedule: 'Scheduled', research: 'In Research', pend: 'Pended', reroute: 'Rerouted' };
    const finalStatus = customStatus || statusMap[action];
    const targetIds = global ? new Set(requestRows.map(r => r.id)) : selectedRows;

    if (targetIds.size > 0) {
      setRequestRows(prev => prev.map(r =>
        targetIds.has(r.id) ? {
          ...r,
          status: finalStatus,
          commit: action === 'schedule' && !isEmrRemote ? '4/1/2026' : r.commit,
          payment: r.payment,
        } : r
      ));
      setSelectedRows(new Set());
      showToast(toastMessages[action]);
    }
    setActiveAction(null);
    setActionScope('selected');
  };

  // Apply global action to all rows
  const applyGlobalAction = (action: ActionType) => {
    setActionScope('global');
    setActiveAction(action);
  };

  // Count stats
  const statusCounts = requestRows.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const needsActionCount = (statusCounts['Unscheduled'] || 0);
  const pastDueCount = 0;

  // Filtered rows for display
  const filteredRows = requestRows.filter(row => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = row.id.includes(q) || row.member.toLowerCase().includes(q) || row.plan.toLowerCase().includes(q) || row.practitioner.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Filters
    const statusFilter = filters['Scheduling Status'] || filters['Outcome'];
    if (statusFilter && statusFilter.size > 0 && !statusFilter.has(row.status)) return false;
    const practFilter = filters['Practitioner'];
    if (practFilter && practFilter.size > 0 && !practFilter.has(row.practitioner)) return false;
    const osRefFilter = filters['OS-Ref'];
    if (osRefFilter && osRefFilter.size > 0 && !osRefFilter.has(row.osRef)) return false;
    return true;
  });

  return (
    <Box style={{ height: '100vh', width: '100vw', maxWidth: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Dark topbar */}
      <Box style={{ backgroundColor: '#161515', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Text style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: -0.3 }}>datavant</Text>
        <Text size="xs" style={{ color: '#fff', opacity: 0.8, textAlign: 'right', lineHeight: 1.4 }}>user@useremail.com<br />Tenant</Text>
      </Box>

      {/* Page header — sticky */}
      <Box style={{ backgroundColor: '#fff', borderBottom: '1px solid #e7e5df', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Title order={2} fw={500} style={{ fontSize: 24, flexShrink: 0 }}>NexReach</Title>
        <Group gap="sm" style={{ flexShrink: 0 }}>
          <Button intent="neutral" appearance="outline" size="sm" onClick={onBackToSearch}>Back to Search</Button>
          <Button
            intent="prominent"
            appearance="solid"
            size="sm"
          >
            Finish Outreach
          </Button>
        </Group>
      </Box>

      {/* Two-column body */}
      <Box style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

        {/* LEFT PANEL — Site Details */}
        <Box style={{ width: 233, minWidth: 233, flexShrink: 0, overflowY: 'auto', padding: '20px' }}>
          <Box style={{ backgroundColor: '#f7f6f4', borderRadius: 12, padding: '20px 16px' }}>
            <Group justify="space-between" align="center" mb={16}>
              <Text size="md" fw={500}>Site Details</Text>
              <Text size="xs" fw={500} style={{ color: '#006ccf', cursor: 'pointer' }} onClick={() => setEditSiteOpen(true)}>Edit</Text>
            </Group>

            <Stack gap="md">
              {[
                { label: 'Site Name', value: 'Manhattan Internal Medicine' },
                { label: 'Primary Address', value: '123 Main St., #330,\nNew York, NY 12345' },
                { label: 'Phone Number', value: '718-555-1234' },
                { label: 'Fax Number', value: '718-555-5678' },
                { label: 'Primary Contact', value: 'Mason Reed' },
                { label: 'Primary Contact Email', value: 'mason@manhattanim.com' },
                { label: 'Preferred Retrieval Method', value: retrievalMethod === 'onsite' ? 'Onsite' : retrievalMethod === 'emr-remote' ? 'EMR Remote' : 'Offsite' },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Text size="sm" style={{ color: '#4f4e4c' }}>{label}</Text>
                  <Text size="sm" style={{ whiteSpace: 'pre-line', lineHeight: 1.4, color: '#242423' }}>{value}</Text>
                </Box>
              ))}
              {/* Site Access Type hidden for now */}
            </Stack>

            {/* Agent Notes button */}
            <Box style={{ borderTop: '1px solid #e7e5df', marginTop: 16, paddingTop: 16 }}>
              <Box
                onClick={() => setNotesDrawerOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: 8, background: '#fff',
                  border: '1px solid #e7e5df', cursor: 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#eaf5ff'; e.currentTarget.style.borderColor = '#006ccf'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e7e5df'; }}
              >
                <Group gap={8}>
                  <IconNotes size={14} color="#006ccf" />
                  <Text size="sm" fw={500} style={{ color: '#242423' }}>Agent Notes</Text>
                </Group>
                <Badge status="prominent" type="number">{notes.length}</Badge>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* RIGHT CONTENT AREA */}
        <Box style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
          <Box p="xl">

            {/* ── Call Actions ── */}
            <Box mb="lg">
              {/* Top row: heading + reference ID */}
              <Flex justify="space-between" align="flex-start" mb={16}>
                <Text fw={700} size="lg" style={{ fontSize: 18 }}>Call Actions</Text>
                <Box style={{ border: '1px solid #e7e5df', borderRadius: 4, padding: '8px 16px', textAlign: 'right', backgroundColor: '#eaf5ff', flexShrink: 0 }}>
                  <Text size="xs" c="dimmed" mb={2}>Reference ID</Text>
                  <Text fw={700} size="sm">NR-718-555-12345</Text>
                </Box>
              </Flex>

              {/* Contact result row */}
              <Flex align="flex-start" gap={48} wrap="wrap">
                <Box>
                  <Text size="md" fw={500} mb={12} style={{ color: '#242423' }}>Office Contact Result</Text>
                  {contactResult === null ? (
                    <Group gap={10}>
                      <Button intent="prominent" appearance="solid" size="xs" onClick={() => setContactResult('connected')}>
                        Connected
                      </Button>
                      <Button intent="neutral" appearance="outline" size="xs" onClick={() => { setContactResult('not-connected'); setSelectedRows(new Set()); }}>
                        Did Not Connect
                      </Button>
                    </Group>
                  ) : contactResult === 'connected' ? (
                    <Group gap={10}>
                      <Box style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                        Connected
                      </Box>
                      <Group gap={4} style={{ cursor: 'pointer' }} onClick={handleChangeAnswer}>
                        <IconRotateClockwise size={13} color="#2563eb" />
                        <Text size="sm" style={{ color: '#006ccf' }}>Change Answer</Text>
                      </Group>
                    </Group>
                  ) : (
                    <Group gap={10}>
                      <Box style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                        Not Connected
                      </Box>
                      <Group gap={4} style={{ cursor: 'pointer' }} onClick={handleChangeAnswer}>
                        <IconRotateClockwise size={13} color="#2563eb" />
                        <Text size="sm" style={{ color: '#006ccf' }}>Change Answer</Text>
                      </Group>
                    </Group>
                  )}
                </Box>

                {/* Reason for No Contact — shown when Not Connected */}
                {contactResult === 'not-connected' && (
                  <Box>
                    <Text size="md" fw={500} mb={8} style={{ color: '#242423' }}>Reason for No Contact</Text>
                    <Group gap="sm" align="center">
                      <Select
                        comboboxProps={{ zIndex: 10001 }}
                        placeholder="Select"
                        data={[
                          { value: 'no_answer_no_vm', label: 'No Answer (No Voicemail)' },
                          { value: 'no_answer_left_vm', label: 'No Answer (Left Voicemail)' },
                          { value: 'not_practitioner', label: 'Not a Practitioner Office' },
                          { value: 'site_closed', label: 'Site Permanently Closed' },
                        ]}
                        value={noContactReason}
                        onChange={(v) => { setNoContactReason(v); setNoContactSubmitted(false); }}
                        style={{ width: 220 }}
                      />
                      <Button
                        intent="prominent"
                        appearance="solid"
                        size="xs"
                        disabled={!noContactReason}
                        onClick={() => setNoContactModalOpen(true)}
                      >
                        Submit
                      </Button>
                    </Group>
                  </Box>
                )}
              </Flex>
            </Box>

            <Divider mb="lg" />

            <Text fw={700} size="lg" mb="md" style={{ fontSize: 18 }}>Record Request Actions</Text>

            {/* Workspace / Site History tabs */}
            <Tabs variant="pill" defaultValue="workspace">
              <Tabs.List mb="lg">
                <Tabs.Tab value="workspace">Workspace</Tabs.Tab>
                <Tabs.Tab value="history">Call History</Tabs.Tab>
              </Tabs.List>

              {/* ── WORKSPACE TAB ── */}
              <Tabs.Panel value="workspace">
                <Stack gap="xl">

                  {/* Global Outcomes */}
                  <Box>
                    <Text fw={600} mb={4}>Global Outcomes</Text>
                    <Text size="sm" c="dimmed" mb={12}>
                      {isEmrRemote
                        ? 'Use the below buttons to apply the same outcome to all record requests within the group.'
                        : 'Use the below buttons to apply the same outcome to all record requests within the group.'}
                    </Text>
                    <Group gap="sm" wrap="wrap">
                      {(isEmrRemote
                        ? [['Save Progress', 'schedule'], ['Send All to Research', 'research'], ['Pend All', 'pend'], ['Reroute All', 'reroute']] as [string, ActionType][]
                        : [['Schedule All', 'schedule'], ['Send All to Research', 'research'], ['Pend All', 'pend'], ['Reroute All', 'reroute']] as [string, ActionType][]
                      ).map(([label, action]) => (
                        <Button
                          key={label}
                          intent={isConnected ? 'prominent' : 'neutral'}
                          appearance={isConnected ? 'outline' : 'outline'}
                          size="sm"
                          disabled={!isConnected}
                          onClick={() => applyGlobalAction(action)}
                        >
                          {label}
                        </Button>
                      ))}
                    </Group>
                  </Box>

                  <Divider />

                  {/* Individual Outcomes */}
                  <Box>
                    <Text fw={500} size="md" mb={4} style={{ color: '#242423' }}>Individual Outcomes</Text>
                    <Text size="sm" mb={16} style={{ color: '#333231' }}>
                      {isEmrRemote
                        ? 'Select one to many record requests within the table to apply outcomes. Once an outcome has been applied, you may click the undo icon button to remove the outcome.'
                        : 'Select one to many record requests within the table to apply outcomes. Once an outcome has been applied, you may click the undo icon button to remove the outcome, with the exception of scheduling.'}
                    </Text>

                    {/* Stat boxes */}
                    <Flex gap={12} mb="lg" wrap="wrap" align="stretch">
                      {/* Needs Action */}
                      <Box style={{ border: '1px solid #a7850d', backgroundColor: '#fef7d6', borderRadius: 6, padding: '10px 14px' }}>
                        <Group gap={4} mb={6} align="center">
                          <Text style={{ fontSize: 13, color: '#a7850d' }}>&#9888;</Text>
                          <Text size="xs" fw={600} style={{ color: '#242423' }}>{isEmrRemote ? 'RTs Needing Action' : 'Requests Needing Action'}</Text>
                        </Group>
                        <Group gap={16}>
                          <Box>
                            <Text size="xs" style={{ color: '#6e6d6a' }}>Past Due</Text>
                            <Text size="sm" fw={700} style={{ color: '#242423' }}>{pastDueCount}</Text>
                          </Box>
                          <Box>
                            <Text size="xs" style={{ color: '#6e6d6a' }}>Unscheduled</Text>
                            <Text size="sm" fw={700} style={{ color: '#242423' }}>{needsActionCount}</Text>
                          </Box>
                        </Group>
                      </Box>

                      {/* Pipeline statuses */}
                      <Box style={{ flex: 1, minWidth: 240, border: '1px solid #e7e5df', borderRadius: 6, padding: '10px 14px' }}>
                        <Text size="xs" fw={600} mb={6} style={{ color: '#242423' }}>
                          {isEmrRemote ? 'Credential Pipeline' : 'Scheduling Pipeline'}
                        </Text>
                        <Group gap={0} wrap="nowrap" style={{ overflowX: 'auto' }}>
                          {(isEmrRemote
                            ? [
                                { label: 'Outreach In Prog', color: '#006ccf' },
                                { label: 'Credentialing In Prog', color: '#7c3aed' },
                                { label: 'Awaiting Credentials', color: '#d97706' },
                                ...(siteAccessType !== 'open' ? [{ label: 'Awaiting Queued', color: '#d97706' }] : []),
                                { label: 'Awaiting Assignment', color: '#059669' },
                              ]
                            : retrievalMethod === 'onsite'
                              ? [
                                  { label: 'Scheduled', color: '#059669' },
                                  { label: 'Progress Logged', color: '#006ccf' },
                                  { label: 'Unassigned', color: '#d97706' },
                                  { label: 'Assigned', color: '#059669' },
                                  { label: 'No Availability', color: '#dc2626' },
                                ]
                              : [
                                  { label: 'Scheduled', color: '#059669' },
                                  { label: 'Progress Logged', color: '#006ccf' },
                                ]
                          ).map((s, i, arr) => {
                            // Map short labels back to full status names for counts
                            const fullName: Record<string, string> = {
                              'Outreach In Prog': 'Outreach In Progress',
                              'Credentialing In Prog': 'Credentialing In Progress',
                            };
                            const countKey = fullName[s.label] || s.label;
                            return (
                              <Box key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                                <Box style={{ padding: '0 8px' }}>
                                  <Text size="xs" mb={2} style={{ color: '#6e6d6a', whiteSpace: 'nowrap' }}>{s.label}</Text>
                                  <Text size="sm" fw={700} style={{ color: '#242423' }}>{statusCounts[countKey] || 0}</Text>
                                </Box>
                                {i < arr.length - 1 && (
                                  <Text style={{ color: '#c0beb9', fontSize: 11, flexShrink: 0 }}>→</Text>
                                )}
                              </Box>
                            );
                          })}
                        </Group>
                      </Box>

                      {/* Other outcomes */}
                      <Box style={{ border: '1px solid #e7e5df', borderRadius: 6, padding: '10px 14px' }}>
                        <Text size="xs" fw={600} mb={6} style={{ color: '#242423' }}>Other Outcomes</Text>
                        <Group gap={14}>
                          {['In Research', 'Rerouted', 'Pended'].map((s) => (
                            <Box key={s}>
                              <Text size="xs" style={{ color: '#6e6d6a' }}>{s}</Text>
                              <Text size="sm" fw={700} style={{ color: '#242423' }}>{statusCounts[s] || 0}</Text>
                            </Box>
                          ))}
                        </Group>
                      </Box>
                    </Flex>

                    {/* Search + filters */}
                    <Flex justify="space-between" align="flex-start" mb="md" gap="md">
                      <Box style={{ flexShrink: 0, width: 425 }}>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid #8a8985', borderRadius: 6, padding: '6px 12px', paddingRight: 8, backgroundColor: '#fff' }}>
                          <input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: 14, width: '100%', color: '#4f4e4c', background: 'transparent', fontFamily: 'DM Sans, sans-serif' }} />
                          <IconSearch size={16} color="#6e6d6a" style={{ flexShrink: 0 }} />
                        </Box>
                      </Box>
                      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        <Group gap={8} wrap="nowrap">
                          <FilterPill label="Project Due Date" options={['Before 4/1/2026', '4/1/2026', 'After 4/1/2026', 'Past Due']} selected={filters['Project Due Date']} onToggle={(v) => toggleFilter('Project Due Date', v)} />
                          <FilterPill label="Commitment Date" options={['Before 4/1/2026', '4/1/2026', 'After 4/1/2026', 'No Date Set']} selected={filters['Commitment Date']} onToggle={(v) => toggleFilter('Commitment Date', v)} />
                          {retrievalMethod === 'onsite' ? (
                            <FilterPill label="Outcome" options={['Scheduled', 'In Research', 'Rerouted', 'Pended', 'Progress Logged', 'Unassigned', 'Assigned', 'No Availability']} selected={filters['Outcome']} onToggle={(v) => toggleFilter('Outcome', v)} />
                          ) : isEmrRemote ? (
                            <FilterPill label="Scheduling Status" options={['Unscheduled', 'Outreach In Progress', 'Credentialing In Progress', 'Awaiting Credentials', 'Awaiting Queued', 'Awaiting Assignment', 'In Research', 'Rerouted', 'Pended']} selected={filters['Scheduling Status']} onToggle={(v) => toggleFilter('Scheduling Status', v)} />
                          ) : (
                            <FilterPill label="Scheduling Status" options={['Unscheduled', 'Scheduled', 'In Research', 'Rerouted', 'Pended', 'Progress Logged']} selected={filters['Scheduling Status']} onToggle={(v) => toggleFilter('Scheduling Status', v)} />
                          )}
                          <FilterPill label="Practitioner" options={['BARNES, TAYLOR', 'CHEN, SARAH', 'PATEL, RAJ', 'WILLIAMS, JAMES']} selected={filters['Practitioner']} onToggle={(v) => toggleFilter('Practitioner', v)} />
                          <ActionIcon intent="neutral" appearance="ghost" aria-label="Reset filters" onClick={resetFilters} style={{ border: '1px solid #8a8985', borderRadius: 1000, width: 36, height: 36 }}>
                            <IconRefresh size={16} />
                          </ActionIcon>
                        </Group>
                        {retrievalMethod === 'onsite' && (
                          <Box style={{ paddingRight: 44 }}>
                            <FilterPill label="OS-Ref" options={['OS-12398-888', 'OS-12398-889', 'OS-12398-890']} selected={filters['OS-Ref']} onToggle={(v) => toggleFilter('OS-Ref', v)} />
                          </Box>
                        )}
                      </Box>
                    </Flex>

                    {/* Action bar for selected rows */}
                    {selectedRows.size > 0 && isConnected && (
                      <Box style={{ backgroundColor: '#f3f0ff', border: '1px solid #7c3aed', borderRadius: 6, padding: '8px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Group gap={8} align="center">
                          <IconInfoCircle size={16} color="#006ccf" />
                          <Text size="sm" fw={500} style={{ color: '#242423' }}>{selectedRows.size}/{requestRows.length} Requests Selected</Text>
                          <Text size="sm" fw={500} style={{ color: '#006ccf', cursor: 'pointer' }} onClick={() => { setSelectedRows(new Set()); setTableAction(null); }}>Cancel</Text>
                        </Group>
                        <Group gap={8} align="center">
                          <Text size="sm" fw={500} style={{ color: '#242423' }}>Action</Text>
                          <Select
                            comboboxProps={{ zIndex: 10001 }}
                            placeholder="Select"
                            data={isEmrRemote ? [
                              { value: 'schedule', label: 'Save Progress' },
                              { value: 'research', label: 'Send to Research' },
                              { value: 'pend', label: 'Pend' },
                              { value: 'reroute', label: 'Reroute' },
                            ] : [
                              { value: 'schedule', label: 'Schedule' },
                              { value: 'research', label: 'Send to Research' },
                              { value: 'pend', label: 'Pend' },
                              { value: 'reroute', label: 'Reroute' },
                            ]}
                            value={tableAction}
                            onChange={setTableAction}
                            style={{ width: 160 }}
                            size="xs"
                          />
                          <Button
                            intent="prominent"
                            appearance="solid"
                            size="xs"
                            disabled={!tableAction}
                            onClick={() => { if (tableAction) { setActionScope('selected'); setActiveAction(tableAction as ActionType); setTableAction(null); } }}
                          >Apply</Button>
                        </Group>
                      </Box>
                    )}

                    {/* Request table */}
                    <Box style={{ overflowX: 'auto', border: '1px solid #e7e5df', borderRadius: 6 }}>
                        <Table highlightOnHover style={{ minWidth: 1200, borderCollapse: 'collapse' }}>
                          <Table.Thead>
                            <Table.Tr style={{ backgroundColor: '#f7f6f4', borderBottom: '1px solid #e7e5df' }}>
                              <Table.Th style={{ width: 40, padding: '8px' }}><MantineCheckbox size="xs" disabled={!isConnected} checked={selectedRows.size === unactionedRows.length && unactionedRows.length > 0} indeterminate={selectedRows.size > 0 && selectedRows.size < unactionedRows.length} onChange={toggleAll} /></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Request ID</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Health Plan</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Member Name</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Member DOB</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Project Due Date</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>{isEmrRemote ? 'Schedule Date' : 'Commitment Date'}</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Scheduling Status</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Payment Status</Text></Table.Th>
                              {retrievalMethod === 'onsite' && <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>OS-Ref</Text></Table.Th>}
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Practitioner</Text></Table.Th>
                              <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Site</Text></Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody style={{ opacity: isConnected ? 1 : 0.5, pointerEvents: isConnected ? 'auto' : 'none' }}>
                            {filteredRows.map((row) => {
                              const isActioned = row.status !== 'Unscheduled';
                              const isSelected = selectedRows.has(row.id);
                              return (
                                <Table.Tr key={row.id} style={{ borderBottom: '1px solid #e7e5df', backgroundColor: isSelected ? '#eaf5ff' : undefined }}>
                                  <Table.Td style={{ width: 40, padding: '8px' }}>
                                    {isActioned ? (
                                      <IconArrowBackUp
                                        size={16}
                                        color="#8a8985"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setRequestRows(prev => prev.map(r => r.id === row.id ? { ...r, status: 'Unscheduled', commit: '—', payment: '—' } : r))}
                                      />
                                    ) : (
                                      <MantineCheckbox size="xs" disabled={!isConnected} checked={isSelected} onChange={() => toggleRow(row.id)} />
                                    )}
                                  </Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.id}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.plan}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'nowrap', color: '#333231' }}>{row.member}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.dob}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.due}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.commit}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.status}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.payment}</Text></Table.Td>
                                  {retrievalMethod === 'onsite' && <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.osRef}</Text></Table.Td>}
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'nowrap', color: '#333231' }}>{row.practitioner}</Text></Table.Td>
                                  <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'nowrap', color: '#333231' }}>{row.site}</Text></Table.Td>
                                </Table.Tr>
                              );
                            })}
                          </Table.Tbody>
                        </Table>
                    </Box>

                    {/* Pagination */}
                    <Group justify="space-between" align="center" mt="md">
                      <Group gap="xs">
                        <Text size="xs" c="dimmed">Items per page:</Text>
                        <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid #e7e5df', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>
                          500 <IconChevronDown size={11} />
                        </Box>
                        <Text size="xs" c="dimmed">1–{filteredRows.length} of {filteredRows.length} items</Text>
                      </Group>
                      <Group gap="sm">
                        <Group gap={4}>
                          <Text size="xs" c="dimmed">Page</Text>
                          <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid #e7e5df', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>
                            1 <IconChevronDown size={11} />
                          </Box>
                          <Text size="xs" c="dimmed">of 1</Text>
                        </Group>
                        <Group gap={2}>
                          <ActionIcon intent="neutral" appearance="ghost" size="sm" aria-label="Previous page"><IconChevronLeft size={13} /></ActionIcon>
                          <ActionIcon intent="neutral" appearance="ghost" size="sm" aria-label="Next page"><IconChevronRight size={13} /></ActionIcon>
                        </Group>
                      </Group>
                    </Group>
                  </Box>
                </Stack>
              </Tabs.Panel>

              {/* ── SITE HISTORY TAB ── */}
              <Tabs.Panel value="history">
                <Stack gap="md">
                  <Box>
                    <Text fw={700} size="md" mb={4}>Call History</Text>
                    <Text size="sm" c="dimmed">
                      The below data represents all retrieval activity for this phone number.
                    </Text>
                  </Box>

                  <Group justify="flex-end" gap={8}>
                    <FilterPill label="Call Outcome" options={['Connected', 'Not Connected', 'No Answer', 'Voicemail']} />
                    <ActionIcon intent="neutral" appearance="ghost" aria-label="Reset filters" style={{ border: '1px solid #8a8985', borderRadius: 1000, width: 36, height: 36 }}>
                      <IconRefresh size={16} />
                    </ActionIcon>
                  </Group>

                  <Box style={{ overflowX: 'auto' }}>
                    <Box style={{ overflow: 'hidden' }}>
                      <Table highlightOnHover style={{ minWidth: 1000, borderCollapse: 'collapse' }}>
                        <Table.Thead>
                          <Table.Tr style={{ backgroundColor: '#f7f6f4', borderBottom: '1px solid #e7e5df' }}>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Call Outcome</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Agent</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Requests</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Agent Actions</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Site Details Updated</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Provider Package Status</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>PPT</Text></Table.Th>
                            <Table.Th style={{ padding: '8px' }}><Text size="sm" fw={500} style={{ color: '#4f4e4c' }}>Time Stamp</Text></Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {CALL_HISTORY_ROWS.map((row, i) => (
                            <Table.Tr key={i} style={{ borderBottom: '1px solid #e7e5df' }}>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'pre-line', color: '#333231' }}>{row.outcome}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.agent}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.requests}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'pre-line', color: '#333231' }}>{row.actions}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.siteDetails}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}>
                                {row.pkgGreen ? (
                                  <Text size="sm" style={{ color: '#166534', fontWeight: 500 }}>&#10003; {row.providerPkg}</Text>
                                ) : (
                                  <Text size="sm" style={{ color: '#333231' }}>{row.providerPkg}</Text>
                                )}
                              </Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ color: '#333231' }}>{row.ppt}</Text></Table.Td>
                              <Table.Td style={{ padding: '8px' }}><Text size="sm" style={{ whiteSpace: 'nowrap', color: '#333231' }}>{row.timestamp}</Text></Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </Box>

                  {/* Pagination */}
                  <Group justify="space-between" align="center">
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">Items per page:</Text>
                      <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid #e7e5df', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>
                        500 <IconChevronDown size={11} />
                      </Box>
                      <Text size="xs" c="dimmed">1–2 of 2 items</Text>
                    </Group>
                    <Group gap="sm">
                      <Group gap={4}>
                        <Text size="xs" c="dimmed">Page</Text>
                        <Box style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid #e7e5df', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>
                          1 <IconChevronDown size={11} />
                        </Box>
                        <Text size="xs" c="dimmed">of 1</Text>
                      </Group>
                      <Group gap={2}>
                        <ActionIcon intent="neutral" appearance="ghost" size="sm" aria-label="Previous page"><IconChevronLeft size={13} /></ActionIcon>
                        <ActionIcon intent="neutral" appearance="ghost" size="sm" aria-label="Next page"><IconChevronRight size={13} /></ActionIcon>
                      </Group>
                    </Group>
                  </Group>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>

        {/* ── Notes Side Drawer ── */}
        {notesDrawerOpen && (
          <Box
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 360,
              background: '#fff', zIndex: 10, display: 'flex', flexDirection: 'column',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.12)', borderLeft: '1px solid #e7e5df',
            }}
          >
            <Box style={{ padding: '16px 20px 12px', borderBottom: '1px solid #e7e5df', flexShrink: 0 }}>
              <Group justify="space-between" align="flex-start">
                <Text fw={700} size="md">Agent Notes</Text>
                <ActionIcon intent="neutral" appearance="ghost" aria-label="Close" onClick={() => setNotesDrawerOpen(false)}>
                  <IconX size={16} />
                </ActionIcon>
              </Group>
              <Text size="xs" c="dimmed" mt={8} style={{ lineHeight: 1.5 }}>
                Leave site-relevant details that are only visible internally.
              </Text>
            </Box>
            {/* Composer */}
            <Box style={{ padding: '12px 20px', borderBottom: '1px solid #e7e5df', flexShrink: 0 }}>
              <Textarea placeholder="Add a note for the next agent..." rows={2} value={drawerDraft} onChange={(e) => setDrawerDraft(e.currentTarget.value)} styles={{ input: { fontSize: 13 } }} />
              <Group justify="flex-end" gap="xs" mt="xs">
                <Button intent="neutral" appearance="ghost" size="xs" onClick={() => setDrawerDraft('')}>Cancel</Button>
                <Button intent="prominent" appearance="solid" size="xs" onClick={() => { if (drawerDraft.trim()) { addNote(drawerDraft.trim()); setDrawerDraft(''); } }}>Save note</Button>
              </Group>
            </Box>
            {/* Notes list */}
            <ScrollArea style={{ flex: 1 }}>
              <Box style={{ padding: '0 20px' }}>
                {notes.map((note, i) => (
                  <Box key={note.id} style={{ padding: '16px 0', borderBottom: i < notes.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                    <Group gap={6} mb={4} align="center">
                      <Text fw={600} size="sm">{note.author}</Text>
                      <Text size="sm" c="dimmed">|</Text>
                      <Text size="sm" c="dimmed">{note.timestamp}</Text>
                    </Group>
                    <Text size="sm" style={{ color: '#374151', lineHeight: 1.6 }}>{note.text}</Text>
                  </Box>
                ))}
              </Box>
            </ScrollArea>
          </Box>
        )}
      </Box>

      {/* ── Action Modals ── */}
      {activeAction === 'schedule' && (
        isEmrRemote
          ? <EmrrSaveProgressModal count={actionScope === 'global' ? requestRows.length : selectedRows.size} onClose={() => { setActiveAction(null); setActionScope('selected'); }} onSubmit={(status) => applyAction('schedule', actionScope === 'global', status)} siteAccessType={siteAccessType} onSiteAccessTypeChange={setSiteAccessType} paymentInfo={paymentInfo} onPaymentInfoChange={setPaymentInfo} />
          : <ScheduleModal count={actionScope === 'global' ? requestRows.length : selectedRows.size} onClose={() => { setActiveAction(null); setActionScope('selected'); }} onSubmit={() => applyAction('schedule', actionScope === 'global')} />
      )}
      {activeAction === 'research' && (
        <ResearchModal count={actionScope === 'global' ? requestRows.length : selectedRows.size} onClose={() => { setActiveAction(null); setActionScope('selected'); }} onSubmit={() => applyAction('research', actionScope === 'global')} {...(isEmrRemote ? { siteAccessType, onSiteAccessTypeChange: setSiteAccessType } : {})} />
      )}
      {activeAction === 'pend' && (
        <PendModal count={actionScope === 'global' ? requestRows.length : selectedRows.size} onClose={() => { setActiveAction(null); setActionScope('selected'); }} onSubmit={() => applyAction('pend', actionScope === 'global')} {...(isEmrRemote ? { siteAccessType, onSiteAccessTypeChange: setSiteAccessType } : {})} />
      )}
      {activeAction === 'reroute' && (
        <RerouteModal count={actionScope === 'global' ? requestRows.length : selectedRows.size} onClose={() => { setActiveAction(null); setActionScope('selected'); }} onSubmit={() => applyAction('reroute', actionScope === 'global')} {...(isEmrRemote ? { siteAccessType, onSiteAccessTypeChange: setSiteAccessType } : {})} />
      )}
      {editSiteOpen && <EditSiteModal onClose={() => setEditSiteOpen(false)} isEmrRemote={isEmrRemote} siteAccessType={siteAccessType} onSiteAccessTypeChange={setSiteAccessType} />}

      {/* ── No Contact Modals ── */}
      {noContactModalOpen && noContactReason && (() => {
        const handleSave = () => {
          setNoContactModalOpen(false);
          setNoContactSubmitted(true);
          showToast('No Contact reason saved');
        };
        const handleCancel = () => setNoContactModalOpen(false);

        if (noContactReason === 'no_answer_no_vm') {
          return (
            <NoAnswerModal
              title="Add Note: No Answer (No Voicemail)"
              defaultReason="No voicemail available"
              reasons={['No voicemail available', 'Phone disconnected', 'Line busy']}
              onClose={handleCancel}
              onSave={handleSave}
            />
          );
        }
        if (noContactReason === 'no_answer_left_vm') {
          return (
            <NoAnswerModal
              title="Add Note: No Answer (Left Voicemail)"
              defaultReason="Left VM with Human"
              reasons={['Left VM with Human', 'Left VM on machine', 'Left VM with answering service']}
              onClose={handleCancel}
              onSave={handleSave}
            />
          );
        }
        if (noContactReason === 'not_practitioner') {
          return (
            <NoAnswerModal
              title="Add Note: Not a Practitioner Office"
              defaultReason="VM Stated Location Other than Medical Facility"
              reasons={['VM Stated Location Other than Medical Facility', 'Person confirmed not a medical facility', 'Fax line only']}
              onClose={handleCancel}
              onSave={handleSave}
            />
          );
        }
        if (noContactReason === 'site_closed') {
          return (
            <SiteClosedModal onClose={handleCancel} onSave={handleSave} />
          );
        }
        return null;
      })()}

      {/* ── Toast notification ── */}
      {toast && (
        <div style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          background: '#fff', border: '1px solid #e7e5df', borderRadius: 8,
          padding: '10px 16px', zIndex: 10000,
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)', width: 420,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="10" fill="none" stroke="#059669" strokeWidth="1.5"/>
            <path d="M6 10.5l2.5 2.5L14 7.5" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <Text size="sm" style={{ flex: 1, color: '#059669', fontWeight: 500 }}>{toast}</Text>
          <Text style={{ cursor: 'pointer', color: '#9ca3af', fontSize: 18, lineHeight: 1 }} onClick={() => setToast(null)}>×</Text>
        </div>
      )}
    </Box>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function NexReachPrototype() {
  const [view, setView] = useState<ViewState>('landing');
  const [phoneValue, setPhoneValue] = useState('');
  const [callType, setCallType] = useState('outbound');
  const [retrieval, setRetrieval] = useState('offsite');

  const handleSearch = () => {
    if (phoneValue.trim()) setView('workspace');
  };

  if (view === 'workspace') {
    return (
      <WorkspaceScreen
        onBackToSearch={() => { setView('landing'); setPhoneValue(''); }}
        retrievalMethod={retrieval}
      />
    );
  }

  return (
    <LandingScreen
      phoneValue={phoneValue}
      onPhoneChange={setPhoneValue}
      callType={callType}
      onCallTypeChange={setCallType}
      retrieval={retrieval}
      onRetrievalChange={setRetrieval}
      onSearch={handleSearch}
    />
  );
}
