# Datavant Prototype Template: Team Overview

## What Is This?

A **base template repository** that makes it fast and easy for designers and product managers to build realistic, interactive prototypes of Datavant products using Claude Code.

Think of it as a **starter kit** that includes:
- ✅ Pre-configured setup (Dart design system, mock APIs, TypeScript, Vite)
- ✅ Component usage documentation
- ✅ Best practices and patterns
- ✅ Example screens to learn from
- ✅ Clear guidelines for working with Claude Code

Instead of starting from scratch every time, designers can **use this template** to create a new prototype in minutes and start building immediately.

## Why Does This Exist?

### The Problem
Building prototypes from scratch is time-consuming:
- Setting up dev environment takes hours
- Figuring out how to use Dart components correctly involves trial and error
- No shared patterns means everyone solves the same problems differently
- Hard to build realistic, interactive prototypes without engineering help

### The Solution
This template repository provides:
- **Instant setup** - Clone and start building in minutes
- **Clear documentation** - Know exactly how to use Dart components correctly
- **Shared patterns** - Reuse proven solutions
- **Claude Code integration** - AI assistant that knows how to work with our stack
- **Distributed improvement** - Patterns discovered by one designer help everyone

## How It Works

### The Template Repository Pattern

```
┌─────────────────────────────────────────┐
│  datavant-prototype (Base Template)     │  ← Shared foundation
│  - Standards & guidelines               │
│  - Component documentation              │
│  - Base setup                           │
│  - Example screens                      │
└─────────────────────────────────────────┘
                  │
                  │ Click "Use this template"
                  │
        ┌─────────┴─────────┬─────────────────┐
        │                   │                  │
  ┌─────▼──────┐    ┌───────▼────┐    ┌───────▼────┐
  │ Connect    │    │ Trials     │    │ Platform   │  ← Specific prototypes
  │ Prototype  │    │ Prototype  │    │ Prototype  │
  └────────────┘    └────────────┘    └────────────┘
        │                   │                  │
        └───────── Patterns flow back ────────┘
```

### Creating a Prototype

1. **Click "Use this template"** on GitHub
2. **Name your prototype** (e.g., `connect-prototype`)
3. **Clone and run** `npm install && npm run dev`
4. **Start building** with Claude Code as your assistant
5. **Push improvements back** to help other designers

### Syncing Improvements

When new patterns or fixes are added to the base template, prototypes can pull them in:

```bash
git merge template/main
```

Claude Code can help with this process.

## What's Included Today

### Documentation
- **DART_COMPONENTS.md** - Complete guide to using Dart design system
  - What props each component uses
  - Common mistakes to avoid
  - Examples of correct usage
  - Quick reference table

- **CLAUDE.md** - Project conventions and context
  - How to structure screens
  - Domain terminology (healthcare data, studies, etc.)
  - Anti-patterns to avoid

- **README.md** - Setup and troubleshooting
  - Installation steps
  - AWS CodeArtifact authentication
  - Common issues and fixes

- **GETTING_STARTED.md** - Guide for prototype builders
  - Step-by-step instructions
  - Tips for success
  - What to do and not do

- **CONTRIBUTING.md** - How to improve the template
  - What's worth contributing back
  - How to submit improvements
  - Recognition for contributors

- **HOW_TO_USE_WITH_CLAUDE.md** - Claude Code prompts
  - How to start a new Claude chat
  - Example prompts that work well
  - Common workflows

### Code & Setup
- **Dart Design System** - Pre-configured with correct imports
- **Mock Service Worker (MSW)** - Realistic API mocking
- **TypeScript + Vite** - Modern dev environment
- **Example Screens** - Data discovery examples to learn from
- **Component Structure** - Organized folders and patterns

### What's NOT Included (Intentionally)
- ❌ Authentication (prototypes don't need it)
- ❌ Real backend (use mocks instead)
- ❌ Complex state management (keep prototypes simple)
- ❌ Production optimization (prototypes should be fast to build)

## What's Coming

### Standards to be Documented

These are **placeholders** in `docs/standards/` that teams will help define:

1. **Interaction Patterns** (`interaction-patterns.md`)
   - Click behaviors, hover states
   - Navigation patterns
   - Form submission flows
   - Confirmation dialogs
   - Loading and error states

2. **Component Usage Guidelines** (`component-usage.md`)
   - When to use Badge vs Tag
   - When to use Modal vs Drawer
   - Button intent/appearance mapping
   - Form layout patterns
   - Table patterns

3. **Writing Style Guidelines** (`writing-style.md`)
   - Button labels (verb-first vs noun-first)
   - Error message tone and structure
   - Empty state copy patterns
   - Healthcare terminology conventions
   - Accessibility considerations

4. **Data Formatting Standards** (`data-formatting.md`)
   - Date formats (01JAN2017 vs 01/01/2017)
   - Number formatting (150,000 vs 150K)
   - Currency, percentages
   - Missing data indicators
   - Data quality indicators

### Reusable Templates (Future)

In `src/components/templates/`:
- **ListPage** - Table with filters, sorting, pagination
- **DetailPage** - Header + tabs + content panels
- **FormPage** - Form layout with validation patterns
- **SearchPage** - Search bar + filters + results
- **WizardPage** - Multi-step flows

### Common Patterns (Future)

In `src/components/patterns/`:
- **EmptyState** - Consistent empty state design
- **LoadingState** - Skeleton loaders and spinners
- **ErrorState** - Error message displays
- **ConfirmDialog** - Confirmation modal pattern
- **DataQualityIndicator** - Show data quality metrics

## Who This Is For

### Primary Users: Designers
Build interactive prototypes without waiting for engineering resources. Use Claude Code as an AI pair programmer that knows our design system.

### Secondary Users: Product Managers
Quickly mock up ideas for stakeholder demos and user testing.

### Tertiary Benefit: Engineers
When prototypes become real features, engineers can reference the code as implementation guidance.

## How to Get Started

### As a Prototype Builder

1. Read **GETTING_STARTED.md**
2. Create your prototype from template
3. Follow **HOW_TO_USE_WITH_CLAUDE.md** to work with Claude Code
4. Build your prototype
5. Share improvements via **CONTRIBUTING.md**

### As a Template Maintainer

1. Review contributions from designers
2. Add new patterns to `docs/standards/`
3. Create reusable templates in `src/components/templates/`
4. Keep documentation clear and up-to-date
5. Tag stable releases for prototype syncing

## Success Metrics

How do we know this is working?

- **Time to first screen**: Minutes instead of hours/days
- **Reuse rate**: Teams using patterns instead of reinventing
- **Contribution rate**: Designers pushing improvements back
- **Prototype quality**: More consistent, realistic prototypes
- **Stakeholder feedback**: Better demos lead to better product decisions

## Ownership & Maintenance

### Distributed Model
- **Everyone contributes** patterns as they discover them
- **No single owner** - shared responsibility
- **Design system team** can help curate and organize
- **Template evolves** based on real usage

### Contribution Process
1. Designer discovers useful pattern while building
2. Check if it's reusable (not prototype-specific)
3. Document it clearly with examples
4. Submit via GitHub issue or pull request
5. Review and merge into template
6. All teams benefit from the improvement

## Questions & Answers

### Q: Is this for production code?
**A:** No. This is for **prototypes** - quick, realistic mockups to validate ideas. Production code needs different considerations (security, performance, real APIs, etc.).

### Q: Do I need to know how to code?
**A:** Basic familiarity helps, but Claude Code can guide you. The template is designed to be approachable for designers with varying technical skills.

### Q: What if I break something?
**A:** That's okay! You're working in your own prototype repo. You can't break the template or other people's prototypes. Worst case, start fresh from the template.

### Q: How do I get help?
**A:**
1. Check the documentation files
2. Ask Claude Code (it's trained on the template)
3. Create an issue on GitHub
4. Ask other designers who've used it

### Q: Can I build any type of prototype?
**A:** Yes, as long as it's a Datavant product UI. The template is generic enough for any business unit (Connect, Trials, Platform, etc.).

### Q: What if I need a component that doesn't exist in Dart?
**A:** Document what you need and either:
1. Use Mantine components as a temporary solution
2. Create a simple custom component
3. Request it be added to Dart

### Q: How often should I sync updates from the template?
**A:**
- When starting: Use latest template version
- During building: Only if you need a new feature/fix
- When finished: Optional, unless fixing bugs

### Q: What if I discover something wrong with the template?
**A:** Perfect! File an issue or submit a fix. That's how the template improves.

## Next Steps

### Immediate (Now)
- ✅ Base template created and documented
- ✅ Example screens built
- ✅ Documentation written
- ✅ Claude Code integration guide ready

### Short Term (Next Few Weeks)
- 🔄 Build first real prototype (validate the template)
- 🔄 Document interaction patterns as they emerge
- 🔄 Create first reusable templates (ListPage, DetailPage)
- 🔄 Gather feedback from early users

### Medium Term (Next Few Months)
- 📋 Establish writing style guidelines
- 📋 Document data formatting standards
- 📋 Build component usage pattern library
- 📋 Create video tutorials for common workflows

### Long Term (Ongoing)
- 📋 Continuous improvement from designer contributions
- 📋 Expand template library as needs emerge
- 📋 Keep documentation fresh and accurate
- 📋 Measure impact on prototype quality and speed

---

## Repository Information

- **Repository**: https://github.com/ernieguai/datavant-prototype (will move to Datavant org)
- **Dart Design System**: https://github.com/datavant/dart
- **Dart Storybook**: https://datavant.github.io/dart-storybook/main

---

**Ready to build?** Check out **GETTING_STARTED.md** and create your first prototype!

**Have questions?** Create an issue on GitHub or ask in your team channel.

**Found a pattern to share?** See **CONTRIBUTING.md** to help improve the template for everyone.
