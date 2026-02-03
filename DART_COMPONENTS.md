# Dart Component Reference

Comprehensive reference for using Datavant Dart design system components. Read this **before** building to ensure correct component usage.

## Critical Import Rules

```typescript
// ✅ CORRECT: Components with Dart-specific props MUST come from @datavant/dart
import { Button, Badge, ActionIcon, Modal, Tabs, Alert, Toast, Radio, Textarea } from '@datavant/dart';

// ✅ CORRECT: Layout components come from @mantine/core (Dart doesn't override them)
import { Stack, Group, Grid, Box, Container, Flex } from '@mantine/core';

// ⚠️ MIXED: Some form components have Dart styling but same props as Mantine
import { TextInput, Select, DatePicker, Checkbox, Link } from '@datavant/dart';

// ❌ WRONG: Don't import styled components from @mantine/core
import { Button } from '@mantine/core'; // This won't have Dart styling!
```

## Component Categories

### Category 1: Custom Dart Props (Must Use Dart)

These components have **different props** from their Mantine equivalents. Using Mantine's props will break them.

#### Button

```typescript
import { Button } from '@datavant/dart';

// DART PROPS (different from Mantine!)
<Button
  intent="prominent" | "neutral" | "negative"
  appearance="solid" | "outline" | "ghost"
>
  Click me
</Button>

// ❌ WRONG: Don't use Mantine's variant prop
<Button variant="filled">Wrong!</Button>

// ✅ CORRECT Examples
<Button intent="prominent" appearance="solid">Primary Action</Button>
<Button intent="prominent" appearance="outline">Secondary Action</Button>
<Button intent="neutral" appearance="outline">Neutral</Button>
<Button intent="negative" appearance="solid">Delete</Button>
```

#### Badge

```typescript
import { Badge } from '@datavant/dart';

// DART PROPS (different from Mantine!)
<Badge
  status="neutral" | "prominent" | "negative" | "caution" | "info"
  type="number" | "dot"
>
  Badge text
</Badge>

// ❌ WRONG: Don't use Mantine's color/variant props
<Badge color="green">Wrong!</Badge>
<Badge variant="filled">Wrong!</Badge>

// ⚠️ CRITICAL: Must use type="number" to display text!
// Without type="number", badge shows as empty colored circle
<Badge status="prominent">Empty circle!</Badge> // ❌ WRONG
<Badge status="prominent" type="number">Shows text!</Badge> // ✅ CORRECT

// ✅ CORRECT Examples
<Badge status="prominent" type="number">Active</Badge>
<Badge status="info" type="number">Provisioned</Badge>
<Badge status="caution" type="number">Pending</Badge>
<Badge status="neutral" type="number" size="xs">Tag</Badge>
<Badge status="prominent" type="dot" /> {/* Colored dot only */}
```

#### ActionIcon

```typescript
import { ActionIcon } from '@datavant/dart';

// Same intent/appearance pattern as Button
<ActionIcon
  intent="prominent" | "neutral" | "negative"
  appearance="solid" | "outline" | "ghost"
  aria-label="Action description" // Required!
>
  <IconComponent />
</ActionIcon>

// ✅ CORRECT Example
<ActionIcon intent="neutral" appearance="ghost" aria-label="Close">
  <CloseIcon />
</ActionIcon>
```

#### Tabs

```typescript
import { Tabs } from '@datavant/dart';

// DART PROPS (different from Mantine!)
<Tabs variant="pill" | "underline" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>

// ❌ WRONG: Don't use Mantine's variant values
<Tabs variant="default">Wrong!</Tabs>

// ✅ CORRECT Examples
<Tabs variant="pill">...</Tabs>
<Tabs variant="underline">...</Tabs>
```

#### Modal

```typescript
import { Modal } from '@datavant/dart';

// Extends Mantine Modal with additional prop
<Modal
  opened={opened}
  onClose={close}
  title="Modal title"
  showWarningIcon={true} // Dart-specific prop
>
  Content
</Modal>
```

#### Alert & Toast

```typescript
import { Alert, showAlert } from '@datavant/dart';
import { Toast, showToast } from '@datavant/dart';

// DART PROPS (different from Mantine!)
<Alert
  status="neutral" | "info" | "positive" | "caution" | "negative"
  title="Alert title"
>
  Alert message
</Alert>

// Helper functions
showAlert({
  status: "positive",
  title: "Success",
  message: "Operation completed successfully"
});

showToast({
  status: "info",
  title: "Info",
  message: "Processing..."
});
```

#### Radio

```typescript
import { Radio } from '@datavant/dart';

// Requires aria-label
<Radio
  value="option1"
  label="Option 1"
  aria-label="Option 1" // Required!
/>

<Radio.Group>
  <Radio value="1" label="First" aria-label="First option" />
  <Radio value="2" label="Second" aria-label="Second option" />
</Radio.Group>
```

#### Textarea

```typescript
import { Textarea } from '@datavant/dart';

// Adds showCharacterCount prop
<Textarea
  label="Description"
  placeholder="Enter description"
  maxLength={500}
  showCharacterCount={true} // Dart-specific prop
/>
```

### Category 2: Dart Styling, Same Props as Mantine

These have Dart styling but use standard Mantine props. Safe to reference Mantine docs for API.

#### TextInput

```typescript
import { TextInput } from '@datavant/dart';

<TextInput
  label="Name"
  placeholder="Enter name"
  required
  description="Enter your full name"
  error="Name is required"
/>
```

#### Select

```typescript
import { Select } from '@datavant/dart';

<Select
  label="Choose option"
  placeholder="Select one"
  data={['Option 1', 'Option 2', 'Option 3']}
  searchable
  clearable
/>

// Or with value/label objects
<Select
  data={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
/>
```

#### DatePicker

```typescript
import { DatePicker } from '@datavant/dart';

<DatePicker
  label="Select date"
  placeholder="Pick a date"
  value={date}
  onChange={setDate}
/>

// For date range
<DatePicker
  type="range"
  value={dateRange}
  onChange={setDateRange}
/>
```

#### Checkbox

```typescript
import { Checkbox } from '@datavant/dart';

<Checkbox label="Agree to terms" />

<Checkbox.Group>
  <Checkbox value="1" label="Option 1" />
  <Checkbox value="2" label="Option 2" />
</Checkbox.Group>
```

#### Link

```typescript
import { Link } from '@datavant/dart';

<Link href="https://example.com">Click here</Link>
<Link href="/page" target="_blank">New tab</Link>
```

### Category 3: Just Re-exported from Mantine

These are unchanged from Mantine. Can import from either @datavant/dart or @mantine/core.

```typescript
// These are the same in Dart and Mantine
import { Text } from '@datavant/dart'; // or '@mantine/core'

<Text size="sm" c="dimmed">Dimmed text</Text>
<Text fw={700}>Bold text</Text>
```

## Layout Components (Always from @mantine/core)

```typescript
import { Stack, Group, Grid, Box, Container, Flex } from '@mantine/core';

// Stack: Vertical layout
<Stack gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Group: Horizontal layout
<Group gap="xs" justify="space-between">
  <div>Left</div>
  <div>Right</div>
</Group>

// Grid: Responsive grid
<Grid>
  <Grid.Col span={6}>Half width</Grid.Col>
  <Grid.Col span={6}>Half width</Grid.Col>
</Grid>

// Box: Generic container with Mantine props
<Box p="xl" bg="gray.1">Content</Box>

// Container: Max-width content container
<Container size="lg">Constrained content</Container>

// Flex: Flexbox container
<Flex direction="column" gap="md">Content</Flex>
```

## Navigation Components

### SideNav

```typescript
import { SideNav, NavItem } from '@datavant/dart';
import { SearchIcon, FolderIcon } from '@datavant/dart';

<SideNav
  topSections={[
    {
      children: <NavItem label="Home" leftSection={<SearchIcon />} active />
    },
    {
      label: 'SECTION HEADER',
      children: [
        <NavItem label="Item 1" leftSection={<FolderIcon />} key="1" />,
        <NavItem label="Item 2" key="2" />
      ]
    }
  ]}
  bottomSections={[
    {
      children: <NavItem label="Help" />
    }
  ]}
  userNavItemProps={{
    username: "User Name",
    email: "user@datavant.com",
    initials: "UN",
    isExpanded: true,
    onClick: () => console.log('User menu clicked')
  }}
/>
```

### NavItem

```typescript
import { NavItem } from '@datavant/dart';

<NavItem
  label="Menu Item"
  leftSection={<IconComponent />}
  active={true}
  onClick={() => {}}
/>
```

## Icons

```typescript
import {
  SearchIcon,
  FolderIcon,
  FileCabinetIcon,
  LockIcon,
  HelpIcon,
  ChevronRight,
  CloseIcon,
  // ... many more
} from '@datavant/dart';

// Use in components
<Button leftSection={<SearchIcon />}>Search</Button>
<ActionIcon aria-label="Close"><CloseIcon /></ActionIcon>
```

Full icon list: `/Users/ernie.guaimano/Documents/Github/dart/packages/dart/src/icons/`

## Provider Setup

```typescript
import { DatavantProvider } from '@datavant/dart';
import '@datavant/dart/styles.css'; // CRITICAL: Use styles.css, NOT styles.layer.css

function App() {
  return (
    <DatavantProvider environment="staging">
      {/* Your app */}
    </DatavantProvider>
  );
}
```

**Required Setup:**
1. Import `@datavant/dart/styles.css` at the top of your App.tsx
2. Wrap app in `<DatavantProvider>`
3. Include DM Sans font in your HTML (see index.html)
4. Set up PostCSS config (see postcss.config.cjs)

## Quick Reference Table

| Component | Import From | Custom Props? | Key Differences from Mantine |
|-----------|-------------|---------------|------------------------------|
| Button | @datavant/dart | ✅ Yes | Uses `intent` + `appearance`, not `variant` |
| Badge | @datavant/dart | ✅ Yes | Uses `status` + `type`, **requires type="number" for text** |
| ActionIcon | @datavant/dart | ✅ Yes | Uses `intent` + `appearance`, requires `aria-label` |
| Tabs | @datavant/dart | ✅ Yes | `variant` is "pill" or "underline" only |
| Modal | @datavant/dart | ✅ Yes | Adds `showWarningIcon` prop |
| Alert/Toast | @datavant/dart | ✅ Yes | Uses `status` prop with specific values |
| Radio | @datavant/dart | ⚠️ Partial | Requires `aria-label` |
| Textarea | @datavant/dart | ⚠️ Partial | Adds `showCharacterCount` prop |
| TextInput | @datavant/dart | ❌ No | Same props as Mantine, Dart styling only |
| Select | @datavant/dart | ❌ No | Same props, adds default CaretRightIcon |
| DatePicker | @datavant/dart | ❌ No | Same props as Mantine, Dart styling only |
| Checkbox | @datavant/dart | ❌ No | Same props as Mantine, Dart styling only |
| Link | @datavant/dart | ❌ No | Same props as Mantine, Dart styling only |
| Text | Either | ❌ No | Unchanged from Mantine |
| Stack/Group/Grid/Box | @mantine/core | ❌ No | Layout components, no Dart override |

## Common Mistakes to Avoid

### ❌ Badge Without type="number"
```typescript
// This shows an empty colored circle!
<Badge status="prominent">Text won't show</Badge>

// Fix: Add type="number"
<Badge status="prominent" type="number">Text shows!</Badge>
```

### ❌ Using Mantine variant Props
```typescript
// Wrong - Button doesn't have variant prop in Dart
<Button variant="filled">Click</Button>

// Correct - Use intent and appearance
<Button intent="prominent" appearance="solid">Click</Button>
```

### ❌ Importing Styled Components from @mantine/core
```typescript
// Wrong - loses Dart styling
import { Button, Badge } from '@mantine/core';

// Correct
import { Button, Badge } from '@datavant/dart';
```

### ❌ Using styles.layer.css Instead of styles.css
```typescript
// Wrong - causes CSS specificity issues in Vite
import '@datavant/dart/styles.layer.css';

// Correct
import '@datavant/dart/styles.css';
```

### ❌ Missing aria-label on ActionIcon/Radio
```typescript
// Wrong - accessibility error
<ActionIcon><CloseIcon /></ActionIcon>

// Correct
<ActionIcon aria-label="Close"><CloseIcon /></ActionIcon>
```

## Resources

- **Storybook**: https://datavant.github.io/dart-storybook/main
- **Mantine Docs** (for base component APIs): https://mantine.dev/
- **Local Dart Repo**: `/Users/ernie.guaimano/Documents/Github/dart`
- **This Repo**: `/Users/ernie.guaimano/Documents/Github/datavant-prototype`

## When to Reference Mantine Docs

You can safely reference Mantine documentation for:
- Layout components (Stack, Group, Grid, Box, Flex, Container)
- Components in Category 2 (TextInput, Select, DatePicker, Checkbox, Link)
- Component 3 (Text)
- General Mantine concepts (responsive styles, theme values)

**Do NOT** reference Mantine docs for prop values on:
- Button (use intent/appearance, not variant)
- Badge (use status/type, not color/variant)
- ActionIcon (use intent/appearance, not variant)
- Tabs (use pill/underline, not Mantine variants)
- Alert/Toast (use status values)

## Troubleshooting

### All Components Look Wrong / No Styling
**Cause**: Using `styles.layer.css` instead of `styles.css`
**Fix**: Change import to `import '@datavant/dart/styles.css';`

### Buttons Look Wrong
**Cause**: Using Mantine `variant` prop instead of Dart's `intent` + `appearance`
**Fix**:
```typescript
// Change from
<Button variant="filled">Click</Button>
// To
<Button intent="prominent" appearance="solid">Click</Button>
```

### Badge Showing Empty Circle
**Cause**: Missing `type="number"` prop
**Fix**: Add `type="number"` to Badge component
```typescript
<Badge status="prominent" type="number">Text</Badge>
```

### Badge Wrong Colors
**Cause**: Using Mantine `color` prop instead of Dart's `status`
**Fix**:
```typescript
// Change from
<Badge color="green">Active</Badge>
// To
<Badge status="prominent" type="number">Active</Badge>
```

### Components Have No Custom Styling
**Cause**: Importing from `@mantine/core` instead of `@datavant/dart`
**Fix**: Change imports to `@datavant/dart` for styled components

### PostCSS Errors
**Cause**: Missing or incorrect postcss.config.cjs
**Fix**: Ensure postcss.config.cjs exists with postcss-preset-mantine

### TypeScript Errors
**Cause**: Missing type definitions
**Fix**: `npm install -D @types/node`

### Font Looks Wrong
**Cause**: DM Sans font not loaded
**Fix**: Add Google Fonts link in index.html:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
```

## Before Building Checklist

Before creating new screens or components, verify:
- [ ] Read this entire document
- [ ] Understand which components have custom Dart props (Category 1)
- [ ] Know that Badge needs `type="number"` to show text
- [ ] Remember to use `intent` + `appearance` for Button/ActionIcon, not `variant`
- [ ] Importing styled components from `@datavant/dart`, not `@mantine/core`
- [ ] Importing layout components from `@mantine/core`
- [ ] Using `styles.css`, not `styles.layer.css`
- [ ] PostCSS config is set up correctly
- [ ] DatavantProvider wraps your app
- [ ] DM Sans font is loaded
