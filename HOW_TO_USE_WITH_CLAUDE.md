# How to Use This Template with Claude Code

This guide helps you start a **new Claude Code chat** for building a prototype from this template.

## Why This Guide?

When you start a new Claude Code chat, Claude has no context about:
- This template repository
- Dart design system conventions
- Project structure and standards

This guide provides the exact prompts to get Claude up to speed quickly.

## Scenario 1: Starting a Brand New Prototype

### Initial Prompt

```
I'm creating a new prototype for Datavant using the datavant-prototype
template repository.

My prototype repository is located at: {path-to-your-prototype-repo}

Before we start building, please:
1. Read CLAUDE.md to understand project conventions
2. Read DART_COMPONENTS.md to learn about Dart component usage
3. Read README.md for setup instructions
4. Check the "Before Building Checklist" in DART_COMPONENTS.md

Once you've read those, let me know you're ready and I'll describe
what I want to build.
```

### After Claude Confirms

```
Great! I want to build a prototype for: {describe your product/feature}

The key screens I need are:
1. {Screen 1 name and purpose}
2. {Screen 2 name and purpose}
3. {Screen 3 name and purpose}

The main user flow is: {describe the flow}

Before we start, let's plan the approach at a high level.
```

### Example

```
I'm creating a new prototype for Datavant using the datavant-prototype
template repository.

My prototype repository is located at: /Users/ernie/Documents/Github/connect-prototype

Before we start building, please:
1. Read CLAUDE.md to understand project conventions
2. Read DART_COMPONENTS.md to learn about Dart component usage
3. Read README.md for setup instructions
4. Check the "Before Building Checklist" in DART_COMPONENTS.md

Once you've read those, let me know you're ready and I'll describe
what I want to build.
```

Then:

```
Great! I want to build a prototype for Datavant Connect's data discovery
experience.

The key screens I need are:
1. Search page - users search across 20+ healthcare data sources
2. Data source detail page - shows source metadata, coverage, quality
3. Feasibility check - estimates patient counts for a study

The main user flow is: Search → Select source → View details → Check
feasibility → Request access

Before we start, let's plan the approach at a high level.
```

## Scenario 2: Continuing Work on Existing Prototype

### Initial Prompt

```
I'm working on an existing prototype built with the datavant-prototype
template.

Repository location: {path-to-your-prototype-repo}

Please read:
1. CLAUDE.md
2. DART_COMPONENTS.md
3. README.md
4. The existing code in src/

Then let me know what's currently built and what you understand about
the project.
```

## Scenario 3: Syncing Updates from Base Template

### Initial Prompt

```
I need to sync updates from the base datavant-prototype template into
my prototype repository.

My prototype repo: {path-to-your-prototype-repo}
Base template repo: https://github.com/datavant/design-prototype

Please help me:
1. Add the template repo as a git remote (if not already added)
2. Fetch the latest changes from the template
3. Review what's changed in the template
4. Merge the updates while preserving my prototype-specific code
5. Help resolve any merge conflicts

Let's start by checking the current git remotes.
```

## Scenario 4: Fixing Dart Component Issues

### Initial Prompt

```
I'm working on a prototype and having issues with Dart components.

Repository: {path-to-your-prototype-repo}

The problem is: {describe the issue}

Before suggesting fixes, please:
1. Read DART_COMPONENTS.md (especially the "Common Mistakes" section)
2. Read the relevant component section
3. Check the "Troubleshooting" section

Then help me diagnose and fix the issue.
```

### Example

```
I'm working on a prototype and having issues with Dart components.

Repository: /Users/ernie/Documents/Github/connect-prototype

The problem is: My Badge components are showing as empty colored circles
instead of displaying text.

Before suggesting fixes, please:
1. Read DART_COMPONENTS.md (especially the "Common Mistakes" section)
2. Read the Badge component section
3. Check the "Troubleshooting" section

Then help me diagnose and fix the issue.
```

## Key Documentation Files Claude Should Read

When starting any task, ensure Claude reads:

### Always Read
- **CLAUDE.md** - Project conventions, domain context, anti-patterns
- **DART_COMPONENTS.md** - Component usage, props, common mistakes
- **README.md** - Setup, installation, troubleshooting

### Read When Relevant
- **GETTING_STARTED.md** - If setting up a new prototype
- **CONTRIBUTING.md** - If wanting to contribute patterns back
- **docs/standards/** - When building specific features (once standards are documented)

## Tips for Working with Claude

### 1. Be Explicit About Reading Documentation

❌ Less effective:
```
Build me a button
```

✅ More effective:
```
I need to add a primary action button.

First, check DART_COMPONENTS.md for Button component usage to ensure
you use the correct props (intent and appearance, not variant).

Then create the button following Dart conventions.
```

### 2. Reference Specific Documentation Sections

```
According to the "Before Building Checklist" in DART_COMPONENTS.md,
what should I verify before creating new components?
```

### 3. Ask Claude to Verify Against Documentation

```
I wrote this Badge component:
<Badge status="prominent">Active</Badge>

Please check DART_COMPONENTS.md to see if this is correct or if
I'm missing any required props.
```

### 4. Let Claude Plan First

```
Before we build the data discovery page, let's plan:
1. What Dart components should we use?
2. What's the layout structure?
3. What mock data do we need?

Check DART_COMPONENTS.md and docs/standards/ as you plan.
```

### 5. Use Claude for Documentation Sync

```
I made some changes to my prototype. Can you help me check if any
of these should be contributed back to the base template?

Review CONTRIBUTING.md for the criteria, then review my recent
git commits and suggest what might be worth contributing.
```

## Common Workflows

### Starting Fresh

```
1. "Read project documentation" prompt
2. Wait for Claude to confirm
3. Describe what you want to build
4. Let Claude plan approach
5. Review and approve plan
6. Start building iteratively
```

### Adding a New Screen

```
1. "I want to add a new screen for {purpose}"
2. "First, check docs/standards/ for relevant patterns"
3. "Let's plan the screen layout and components"
4. "Now let's build it step by step"
```

### Debugging Issues

```
1. "I'm having an issue with {component}"
2. "Check DART_COMPONENTS.md troubleshooting section"
3. "What's the likely cause and fix?"
```

### Contributing Back

```
1. "I discovered a useful pattern while building"
2. "Review CONTRIBUTING.md to see if this is worth contributing"
3. "Help me document it properly"
4. "Create an issue or PR to the base template"
```

## What If Claude Forgets Documentation?

If Claude starts using wrong patterns (e.g., Mantine variant prop instead of Dart intent/appearance):

```
Stop. Please re-read the Button section in DART_COMPONENTS.md.
You're using Mantine props instead of Dart props.

Button should use:
- intent: "prominent" | "neutral" | "negative"
- appearance: "solid" | "outline" | "ghost"

NOT Mantine's variant prop.

Please correct the code.
```

## Template for Your First Message

Copy and customize this:

```
I'm building a {type} prototype using the datavant-prototype template.

Repository: {path}

Please read these files to understand the project:
1. CLAUDE.md - Project conventions
2. DART_COMPONENTS.md - Component usage
3. README.md - Setup instructions

After reading, I'll describe what I want to build.

Note: This template uses the Dart design system. Components must be
imported from @datavant/dart (not @mantine/core), and many have
custom props different from Mantine. Pay special attention to the
"Common Mistakes" section in DART_COMPONENTS.md.
```

---

**Pro tip:** Keep this file open in your first Claude Code session. Reference it whenever you start a new chat or need to get Claude re-focused on the documentation.
