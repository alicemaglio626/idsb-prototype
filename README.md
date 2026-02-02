# Datavant Prototyping Repository

A prototyping environment for building realistic mockups of the Datavant integrated platform using the Dart design system.

## Purpose

This repository enables designers and product managers to quickly prototype features for Datavant's healthcare data platform. It uses Mock Service Worker (MSW) to simulate realistic API interactions without requiring a backend.

## Tech Stack

- React 19 + TypeScript
- Vite 7 (dev server)
- Dart Design System (Datavant's component library built on Mantine v8)
- MSW (Mock Service Worker)
- React Router v6

## Getting Started

### Prerequisites
- Node.js 22+ (managed via nvm)
- Access to Datavant GitHub and CodeArtifact

### Installation

1. **Login to CodeArtifact**
   ```bash
   make login
   ```
   This will authenticate you with AWS SSO and configure npm to use CodeArtifact.

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to http://localhost:5173

### Node Version

This project requires Node 22+. The `.nvmrc` file specifies the version. Use:
```bash
nvm use
```

## Project Structure

- `src/pages/` - Screen components
- `src/components/` - Reusable components organized by domain
- `src/mocks/` - MSW handlers and mock data
- `src/types/` - TypeScript type definitions
- `.claude/skills/` - Claude Code skills for AI-assisted development (future)

## Working with Claude Code

This repo is optimized for building prototypes with Claude Code CLI. See `CLAUDE.md` for detailed instructions for Claude.

## Domain Context

Datavant's integrated platform follows a 7-stage workflow:

1. **Data Discovery** - Search unified data catalog
2. **Evaluation & Feasibility** - Understand data characteristics
3. **Privacy & Risk Assessment** - Automated compliance checking
4. **Study Setup & Ingestion** - Seamless data provisioning
5. **Cohort Definition** - Define study populations
6. **Analysis Specification** - Configure statistical analyses
7. **Results & Lineage** - View results with complete audit trail

## Design System

This project uses **Dart** (Datavant React Toolkit), our component library built on Mantine v8.

- **Dart GitHub**: https://github.com/datavant/dart
- **Dart Storybook**: https://datavant.github.io/dart-storybook/main
- **Mantine Docs**: https://mantine.dev/ (Dart is built on this)

### Using Dart Components

```typescript
import '@datavant/dart/styles.layer.css';
import { DatavantProvider } from '@datavant/dart';
import { Button, Card, Title } from '@mantine/core';

function MyComponent() {
  return (
    <DatavantProvider environment="staging">
      <Title>My Title</Title>
      <Button>Click me</Button>
    </DatavantProvider>
  );
}
```

## Mock Data

All API calls use MSW for realistic mocking:
- Realistic delays (500-2000ms)
- Error scenarios
- Healthcare-specific data (Optum CDM, RA studies, etc.)

Edit mock data in `src/mocks/data/` and handlers in `src/mocks/handlers/`.

## Troubleshooting

### SSL Certificate Errors

If you encounter `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` errors, use:
```bash
npm install --strict-ssl=false
```

### CodeArtifact Authentication

If npm returns 401 errors, your CodeArtifact token has expired. Run:
```bash
make login
```

### Node Version Errors

Vite 7 requires Node 22+. If you see version errors, run:
```bash
nvm use
```

## Resources

- [Dart Design System](https://github.com/datavant/dart)
- [Dart Storybook](https://datavant.github.io/dart-storybook/main)
- [Mantine Documentation](https://mantine.dev/)
- [MSW Documentation](https://mswjs.io/)
- [#dart-forum Slack](https://datavant.enterprise.slack.com/archives/C08N97N1L11)
