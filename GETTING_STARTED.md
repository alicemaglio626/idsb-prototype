# Getting Started: Building Your Prototype

This guide helps designers and product managers create a new prototype using this template.

## Step 1: Create Your Prototype Repository

### Using GitHub (Easiest)

1. Go to https://github.com/ernieguai/datavant-prototype
2. Click the green **"Use this template"** button (top right)
3. Name your new repo: `{product}-prototype`
   - Examples: `connect-prototype`, `trials-prototype`, `platform-vision-prototype`
4. Choose: **Public** or **Private** (your choice)
5. Click **"Create repository"**
6. Clone your new repo to your machine

### Using Git Command Line

```bash
# Clone the template
git clone https://github.com/ernieguai/datavant-prototype.git my-prototype
cd my-prototype

# Remove the connection to the template repo
rm -rf .git

# Initialize as a new repo
git init
git add .
git commit -m "Initial commit from datavant-prototype template"

# Push to your new repo (create it on GitHub first)
git remote add origin https://github.com/YOUR_USERNAME/my-prototype.git
git push -u origin main
```

## Step 2: Set Up Your Development Environment

### Prerequisites

- Node.js 22+ (use `nvm use` to auto-switch)
- npm or pnpm
- Access to Datavant's AWS CodeArtifact

### Installation

```bash
# Log in to AWS CodeArtifact (required for @datavant/dart package)
make login

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

## Step 3: Clean Up Example Content

The template includes example pages to show you how things work. **Delete these before building your prototype:**

```bash
# Delete example pages
rm -rf src/pages/_examples

# Delete example mock handlers (optional - you might want to reference them first)
rm -rf src/mocks/handlers/_examples

# Delete example mock data (optional - you might want to reference them first)
rm -rf src/mocks/data/_examples
```

**Keep these:**
- `src/components/templates/` - Reusable page templates (coming soon)
- `src/components/patterns/` - Common UI patterns (coming soon)
- `src/pages/Dashboard.tsx` - Use as starting point or delete

## Step 4: Plan Your Prototype

Before writing code, clarify:

1. **What are you prototyping?**
   - New product features?
   - Integrated workflow?
   - Speculative future vision?

2. **What screens do you need?**
   - List them out (e.g., "Search page, Detail page, Settings page")

3. **What data/workflows?**
   - What mock data will you need?
   - What user flows should work?

4. **What's out of scope?**
   - Authentication? (usually skip)
   - Real APIs? (use MSW mocks)
   - Full CRUD? (often just read/view)

## Step 5: Build Your First Screen

### Update App.tsx

The template has an example app. Update it for your prototype:

```typescript
// src/App.tsx
import '@datavant/dart/styles.css';
import { Stack } from '@mantine/core';
import { DatavantProvider, SideNav, NavItem } from '@datavant/dart';

function App() {
  return (
    <DatavantProvider environment="staging">
      <Stack>
        {/* Your app structure here */}
      </Stack>
    </DatavantProvider>
  );
}

export default App;
```

### Create Your First Page

```typescript
// src/pages/MyFirstPage.tsx
import { Container, Stack } from '@mantine/core';
import { Title, Text, Button } from '@datavant/dart';

export function MyFirstPage() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>My First Page</Title>
        <Text>Start building your prototype here!</Text>
        <Button intent="prominent" appearance="solid">
          Take Action
        </Button>
      </Stack>
    </Container>
  );
}
```

### Read the Documentation First!

**Before writing components, read:**
1. `DART_COMPONENTS.md` - Learn how to use Dart components correctly
2. `CLAUDE.md` - Understand project conventions
3. `docs/standards/` - Follow established patterns (when available)

**Use the checklists:**
- "Before Building Checklist" in `DART_COMPONENTS.md`
- Common mistakes section

## Step 6: Create Mock Data

Use MSW (Mock Service Worker) to simulate API calls:

```typescript
// src/mocks/handlers/myData.ts
import { http, HttpResponse } from 'msw';

export const myDataHandlers = [
  http.get('/api/items', () => {
    return HttpResponse.json([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
  }),
];
```

See `src/mocks/handlers/_examples/` for examples (before you delete them!).

## Step 7: Update Documentation

**In your prototype repo**, update:

1. **README.md** - Describe what this prototype is for
2. **CLAUDE.md** - Add domain-specific context
   - Healthcare terminology for your domain
   - Specific workflows being prototyped
   - Business context
3. **Create docs/prototype/** (optional) - Add prototype-specific docs

**Don't modify:**
- `DART_COMPONENTS.md` - This is base template documentation
- `docs/standards/` - These are shared standards

## Step 8: Work with Claude Code

### Starting a New Claude Chat for Your Prototype

See `HOW_TO_USE_WITH_CLAUDE.md` for detailed instructions on prompting Claude in a new chat.

**Quick version:**
```
I'm building a prototype using the datavant-prototype template.
This repo is located at {path-to-your-prototype}.
Please read CLAUDE.md, DART_COMPONENTS.md, and README.md to
understand how to work with Dart components and this project structure.

I want to build: {describe your prototype}
```

## Tips for Successful Prototyping

### Do ✅
- Read documentation before building
- Use Dart components from `@datavant/dart`
- Follow existing patterns
- Use realistic mock data
- Keep it simple (prototypes, not production)
- Document decisions in your prototype's docs

### Don't ❌
- Import styled components from `@mantine/core`
- Build real authentication
- Add complex state management
- Optimize prematurely
- Modify base template docs in your prototype repo
- Use `styles.layer.css` (use `styles.css`)

## Need Help?

1. **Check documentation:**
   - `DART_COMPONENTS.md` for component usage
   - `CLAUDE.md` for project conventions
   - Dart Storybook: https://datavant.github.io/dart-storybook/main

2. **Ask Claude Code:**
   - Claude has been trained on this template
   - Refer to `HOW_TO_USE_WITH_CLAUDE.md`

3. **Found a bug or want to improve the template?**
   - See `CONTRIBUTING.md` for how to contribute back

## What's Next?

Once your prototype is working:

1. **Share it** - Deploy to Vercel/Netlify or share video recordings
2. **Gather feedback** - Get stakeholder input
3. **Iterate** - Make changes quickly
4. **Contribute patterns back** - If you discover good patterns, add them to the base template (see `CONTRIBUTING.md`)

---

**Ready to build?** Start with Step 1 above and create your first prototype!
