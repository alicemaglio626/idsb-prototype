# Design Standards

This directory contains design and interaction standards for building Datavant prototypes.

## Status: 🚧 In Progress

These standards are **placeholders** that will be documented as teams discover patterns while building prototypes.

## Standards Documentation

### 1. Interaction Patterns (`interaction-patterns.md`)
**Status**: 📋 To Do

Will document:
- Click behaviors and hover states
- Navigation patterns (breadcrumbs, back buttons, deep linking)
- Form submission flows
- Confirmation dialogs for destructive actions
- Loading states (skeleton loaders, spinners, progress indicators)
- Error states (inline errors, error banners, retry mechanisms)
- Success feedback (toasts, inline confirmations)

**Contribute**: If you discover good interaction patterns while building, document them!

### 2. Component Usage Guidelines (`component-usage.md`)
**Status**: 📋 To Do

Will document:
- When to use Badge vs Tag
- When to use Modal vs Drawer vs Popover
- Button intent/appearance mapping (what makes something "prominent" vs "neutral"?)
- Form layout patterns (label placement, field grouping, validation)
- Table patterns (sorting, filtering, pagination, row actions)
- Navigation patterns (tabs, side nav, breadcrumbs)
- Card layouts (when to use cards vs plain containers)

**Contribute**: Document your decision-making process when choosing components!

### 3. Writing Style Guidelines (`writing-style.md`)
**Status**: 📋 To Do

Will document:
- Button labels (verb-first vs noun-first: "Save Changes" vs "Submit")
- Error message tone and structure
- Empty state copy patterns ("No data sources found" vs "Get started by...")
- Healthcare terminology conventions (standardized terms, abbreviations)
- Microcopy patterns (tooltips, help text, placeholder text)
- Accessibility considerations (alt text, aria-labels, screen reader text)

**Contribute**: Share the copy patterns that work well in your prototypes!

### 4. Data Formatting Standards (`data-formatting.md`)
**Status**: 📋 To Do

Will document:
- Date formats (01JAN2017 vs 01/01/2017 vs Jan 1, 2017)
- Date ranges (2017-2025 vs 2017 to 2025)
- Number formatting (150,000 vs 150K vs 150k)
- Large numbers (millions, billions)
- Currency ($150,000.00 vs $150K)
- Percentages (95% vs 0.95)
- Decimal precision (when to show decimals)
- Missing data indicators (N/A vs -- vs empty)
- Data quality indicators (completeness, accuracy scores)
- Patient counts (approximate vs exact: "~150,000" vs "150,432")

**Contribute**: Document the formatting decisions that make data clear and readable!

## How to Contribute Standards

See **CONTRIBUTING.md** in the repo root for detailed instructions.

**Quick version:**
1. Build your prototype
2. Notice patterns that work well or decisions you had to make
3. Document the pattern with examples
4. Submit via GitHub issue or pull request
5. Pattern gets reviewed and added to standards

## Using These Standards

When building prototypes:
1. Check if a standard exists for what you're building
2. Follow the documented pattern if available
3. Make your own decision if not documented yet
4. Document your decision for others!

## Evolution

These standards will:
- **Start empty** - We don't know all the patterns yet
- **Grow organically** - Based on real prototyping needs
- **Stay practical** - Only document what's actually useful
- **Stay current** - Update as Dart design system evolves
- **Stay flexible** - Guidelines, not strict rules

---

**Remember:** The goal is to make prototyping easier, not to create bureaucracy. Document what helps, skip what doesn't.
