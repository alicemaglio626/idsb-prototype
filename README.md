# Datavant Prototype Template

A **template repository** for building realistic, interactive prototypes of Datavant products using the Dart design system and Claude Code.

## 🎯 What Is This?

This is a **base template** that makes it fast and easy for designers and product managers to build prototypes without starting from scratch. Click "Use this template" to create your own prototype repository with all the setup, documentation, and best practices pre-configured.

## 🚀 Quick Start

### For Prototype Builders

1. **📖 Read First**: [GETTING_STARTED.md](GETTING_STARTED.md)
2. **🔧 Use Template**: Click "Use this template" button above
3. **👨‍💻 Build**: Follow [HOW_TO_USE_WITH_CLAUDE.md](HOW_TO_USE_WITH_CLAUDE.md)
4. **🤝 Share**: Contribute patterns back via [CONTRIBUTING.md](CONTRIBUTING.md)

### For Team Members

**📊 Overview**: Read [TEAM_OVERVIEW.md](TEAM_OVERVIEW.md) for the big picture

## Purpose

This template repository enables designers and product managers to quickly prototype features for Datavant's healthcare data platform. It uses Mock Service Worker (MSW) to simulate realistic API interactions without requiring a backend.

**This template includes:**
- ✅ Pre-configured Dart design system
- ✅ Mock API setup with MSW
- ✅ Comprehensive component documentation
- ✅ Claude Code integration guides
- ✅ Example screens to learn from
- ✅ Best practices and patterns

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

```
datavant-prototype/
├── docs/
│   └── standards/              # Design standards (to be documented)
│       ├── interaction-patterns.md
│       ├── component-usage.md
│       ├── writing-style.md
│       └── data-formatting.md
├── src/
│   ├── pages/
│   │   └── _examples/          # Example pages (delete in your prototype)
│   ├── components/
│   │   ├── templates/          # Reusable page templates (coming soon)
│   │   └── patterns/           # Common UI patterns (coming soon)
│   ├── mocks/                  # MSW handlers and mock data
│   └── types/                  # TypeScript type definitions
├── GETTING_STARTED.md          # Guide for prototype builders
├── HOW_TO_USE_WITH_CLAUDE.md   # Claude Code prompts
├── CONTRIBUTING.md             # How to improve template
├── TEAM_OVERVIEW.md            # Team summary document
└── DART_COMPONENTS.md          # Component reference
```

## 📚 Documentation

- **[TEAM_OVERVIEW.md](TEAM_OVERVIEW.md)** - High-level summary for sharing with team
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Step-by-step guide for prototype builders
- **[HOW_TO_USE_WITH_CLAUDE.md](HOW_TO_USE_WITH_CLAUDE.md)** - Prompts for working with Claude Code
- **[DART_COMPONENTS.md](DART_COMPONENTS.md)** - Complete Dart component reference
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to improve the template
- **[CLAUDE.md](CLAUDE.md)** - Project conventions (for Claude Code)

## Working with Claude Code

This repo is optimized for building prototypes with Claude Code CLI. See **[HOW_TO_USE_WITH_CLAUDE.md](HOW_TO_USE_WITH_CLAUDE.md)** for prompts and workflows.

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

**⚠️ IMPORTANT**: Read [DART_COMPONENTS.md](DART_COMPONENTS.md) before using components!

```typescript
// CORRECT
import '@datavant/dart/styles.css';  // NOT styles.layer.css!
import { Container, Stack } from '@mantine/core';
import { Button, Badge, Text } from '@datavant/dart';

function MyComponent() {
  return (
    <Container>
      <Stack gap="md">
        <Text>Some text</Text>
        <Button intent="prominent" appearance="solid">Click me</Button>
        <Badge status="info" type="number">Status</Badge>
      </Stack>
    </Container>
  );
}
```

**Key points:**
- Import styled components from `@datavant/dart`, not `@mantine/core`
- Use `styles.css`, NOT `styles.layer.css`
- Button uses `intent` + `appearance`, not `variant`
- Badge needs `type="number"` to show text
- See [DART_COMPONENTS.md](DART_COMPONENTS.md) for complete reference

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
