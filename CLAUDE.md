# Datavant Prototyping Repository

Claude should help designers and product managers build realistic prototypes of the Datavant integrated platform.

## Design System

**Use Datavant Dart design system exclusively**
- Import from `@datavant/dart`, NOT `@mantine/core` directly
- Dart is built on Mantine v8, so Mantine docs apply: https://mantine.dev/
- Use `DatavantProvider` wrapper with `environment="staging"` or `environment="production"`
- Import styles: `import '@datavant/dart/styles.layer.css';`
- Dart Storybook: https://datavant.github.io/dart-storybook/main
- Local Dart repo: `/Users/ernie.guaimano/Documents/Github/dart`
- Local Storybook repo: `/Users/ernie.guaimano/Documents/Github/dart-storybook`

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
import '@datavant/dart/styles.layer.css';
import { DatavantProvider } from '@datavant/dart';
import { Container, Title, Card } from '@mantine/core';

export function ExampleScreen() {
  return (
    <DatavantProvider environment="staging">
      <Container size="lg">
        <Title order={1}>Screen Title</Title>
        {/* Content */}
      </Container>
    </DatavantProvider>
  );
}
```

## Anti-Patterns

- ❌ Don't import from `@mantine/core` for components that Dart provides
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

## Target Users

Designers and PMs with varying technical skills will use this repo with Claude Code. Keep patterns simple and well-documented.
