# Dart Component Reference

Quick reference for using Datavant Dart design system components.

## Import Pattern

```typescript
// ✅ CORRECT: Import from @datavant/dart
import { Button, Text, Badge } from '@datavant/dart';

// ❌ WRONG: Don't import styled components from @mantine/core
import { Button } from '@mantine/core'; // This won't have Dart styling!
```

## Layout Components

These come from Mantine (Dart doesn't override them):
```typescript
import { Stack, Group, Grid, Box, Container, Flex } from '@mantine/core';
```

## Styled Components

### Button

```typescript
import { Button } from '@datavant/dart';

// Props
<Button
  intent="prominent" | "neutral" | "negative"
  appearance="solid" | "outline" | "ghost"
>
  Click me
</Button>

// Examples
<Button intent="prominent" appearance="solid">Primary</Button>
<Button intent="prominent" appearance="outline">Secondary</Button>
<Button intent="neutral" appearance="outline">Neutral</Button>
<Button intent="negative" appearance="solid">Delete</Button>
```

### Text

```typescript
import { Text } from '@datavant/dart';

<Text>Standard text</Text>
<Text size="sm" c="dimmed">Small dimmed text</Text>
```

### Badge

```typescript
import { Badge } from '@datavant/dart';

<Badge color="green">Active</Badge>
<Badge color="blue">Provisioned</Badge>
<Badge color="yellow">Pending</Badge>
```

### Navigation

```typescript
import { SideNav, NavItem } from '@datavant/dart';
import { SearchIcon } from '@datavant/dart';

<SideNav
  topSections={[
    {
      children: <NavItem label="Home" leftSection={<SearchIcon />} active />
    },
    {
      label: 'SECTION',
      children: [
        <NavItem label="Item 1" key="1" />,
        <NavItem label="Item 2" key="2" />
      ]
    }
  ]}
  userNavItemProps={{
    username: "User Name",
    email: "user@datavant.com",
    initials: "UN",
    isExpanded: true
  }}
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
  // ... see /node_modules/@datavant/dart/dist/esm/icons for full list
} from '@datavant/dart';
```

## Form Components

### TextInput
```typescript
import { TextInput } from '@datavant/dart';

<TextInput label="Name" placeholder="Enter name" />
```

### Select
```typescript
import { Select } from '@datavant/dart';

<Select
  label="Choose option"
  data={['Option 1', 'Option 2']}
/>
```

### Checkbox
```typescript
import { Checkbox } from '@datavant/dart';

<Checkbox label="Agree to terms" />
```

## Other Components

### Modal
```typescript
import { Modal } from '@datavant/dart';

<Modal opened={opened} onClose={close} title="Modal title">
  Content
</Modal>
```

### Table
```typescript
import { Table, useTable } from '@datavant/dart';

// See Dart Storybook for detailed Table usage
```

### Toast/Alert
```typescript
import { showToast, showAlert } from '@datavant/dart';

showToast({ message: "Success!" });
showAlert({ title: "Alert", message: "Important message" });
```

## Provider Setup

```typescript
import { DatavantProvider } from '@datavant/dart';
import '@datavant/dart/styles.css';

function App() {
  return (
    <DatavantProvider environment="staging">
      {/* Your app */}
    </DatavantProvider>
  );
}
```

## Resources

- **Storybook**: https://datavant.github.io/dart-storybook/main
- **Mantine Docs** (for base component APIs): https://mantine.dev/
- **Local Dart Repo**: `/Users/ernie.guaimano/Documents/Github/dart`

## Troubleshooting

### Buttons Look Wrong
- Make sure you're using `intent` and `appearance` props, not `variant`
- Verify you're importing from `@datavant/dart`, not `@mantine/core`

### Components Have No Styling
- Check that `@datavant/dart/styles.css` is imported
- Try switching between `styles.css` and `styles.layer.css`
- Verify `postcss.config.cjs` exists with proper plugins

### TypeScript Errors
- Install types: `npm install -D @types/node`
- Check that peer dependencies are installed (see package.json)
