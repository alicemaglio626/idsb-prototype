# Datavant Prototyping Repository

Claude should help designers and product managers build realistic prototypes of the Datavant integrated platform.

## Design System

**Use Datavant Dart design system exclusively**
- Import from `@datavant/dart`, NOT `@mantine/core` for styled components
- Dart is built on Mantine v8, so Mantine docs apply for base APIs: https://mantine.dev/
- Use `DatavantProvider` wrapper with `environment="staging"` or `environment="production"`
- **CRITICAL**: Import styles: `import '@datavant/dart/styles.css';` (NOT styles.layer.css!)
- Dart Storybook: https://datavant.github.io/dart-storybook/main
- Dart GitHub: https://github.com/datavant/dart

**Before building any new components or screens:**
1. Read `DART_COMPONENTS.md` in this repo
2. Check the Quick Reference Table for components you'll use
3. Review the "Common Mistakes" section
4. Use the "Before Building Checklist"

## Domain Context

Datavant is a healthcare data collaboration platform for life sciences organizations.

**7-Stage Workflow**:
1. Data Discovery - Search unified catalog
2. Evaluation & Feasibility - Understand data before committing
3. Privacy & Risk Assessment - Automated compliance
4. Study Setup & Ingestion - Seamless data provisioning
5. Cohort Definition - Aetion study builder
6. Analysis Specification - Statistical methods
7. Results & Lineage - Complete audit trail (key differentiator)

**Use Case Example**: Lilly bakeoff study
- Research question: Compare HF and VTE outcomes in RA patients (JAKi vs bDMARD)
- Data source: Optum CDM claims database
- Methods: IPTW with Cox proportional hazards regression

## Technical Patterns

### Mock API (MSW)
All API calls should be mocked using MSW. Handlers in `src/mocks/handlers/`.

When creating new API calls:
1. Add handler in appropriate file
2. Use realistic delays (500-2000ms)
3. Include error scenarios (10% failure rate)
4. Return TypeScript-typed responses

### Data Patterns

Use realistic healthcare terminology:
- Data sources: Optum CDM, Merative MarketScan, HealthVerity
- Conditions: RA (rheumatoid arthritis), HF (heart failure), VTE
- Medications: JAKi (Janus kinase inhibitors), bDMARD (biologic DMARDs)
- Codes: ICD-10, NDC, CPT

### Component Structure

Follow this pattern for new screens:
```typescript
// src/pages/ExampleScreen.tsx
import { Container, Stack } from '@mantine/core';
import { Title, Button, Badge } from '@datavant/dart';

export function ExampleScreen() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>Screen Title</Title>
        <Button intent="prominent" appearance="solid">Action</Button>
        <Badge status="info" type="number">Status</Badge>
      </Stack>
    </Container>
  );
}
```

Note: `DatavantProvider` wraps the entire app in `App.tsx`, not individual screens.

## Anti-Patterns

- ❌ Don't import styled components from `@mantine/core` (use `@datavant/dart`)
- ❌ Don't use Mantine's `variant` prop on Button/Badge (use Dart's custom props)
- ❌ Don't forget `type="number"` on Badge when displaying text
- ❌ Don't use `styles.layer.css` (use `styles.css`)
- ❌ Don't build real backend/authentication
- ❌ Don't add heavy state management
- ❌ Don't optimize prematurely

## Development

### Node Version
This project requires Node 22+. Use:
```bash
nvm use
```

### NPM Registry
This project uses Datavant's CodeArtifact registry. Before installing packages:
```bash
make login
```

### Running
```bash
npm run dev
```

Open http://localhost:5173

## Documentation Maintenance

When working on this repo in **future Claude Code sessions**, follow these guidelines:

### Where to Document Changes

| Change Type | Document In | Example |
|-------------|-------------|---------|
| Dart component usage patterns | `DART_COMPONENTS.md` | New component props, common mistakes |
| Project-specific instructions | `CLAUDE.md` (this file) | Workflow changes, new conventions |
| Setup/installation steps | `README.md` | New dependencies, auth steps |
| Code-level decisions | Comments in code | Why a specific implementation was chosen |

### When to Update DART_COMPONENTS.md

Update this file when:
- A new Dart component is added to the project
- Component prop requirements change (e.g., new required prop)
- Common mistakes are discovered during development
- Styling/import issues are encountered and resolved
- Best practices are established for component usage

**Format**: Follow the existing structure with wrong/correct examples.

### When to Update CLAUDE.md

Update this file when:
- Project conventions change (new file structure, naming patterns)
- Development workflow changes (new make commands, different dev server)
- Domain knowledge expands (new healthcare terminology, workflow stages)
- Anti-patterns are discovered

### When to Update README.md

Update this file when:
- Setup steps change
- New dependencies are added
- Authentication requirements change
- Troubleshooting steps are discovered

### Checking for Outdated Documentation

Before making changes, Claude should:
1. Read all three documentation files (CLAUDE.md, DART_COMPONENTS.md, README.md)
2. Check if any instructions contradict what's in the code
3. Update documentation if discrepancies are found
4. Add new learnings to appropriate files

## Target Users

Designers and PMs with varying technical skills will use this repo with Claude Code. Keep patterns simple and well-documented. Documentation should be portable and work for any user, not just the original author.
