# Contributing: Improving the Base Template

This guide helps designers and builders push improvements from their prototypes back to the base template so everyone benefits.

## Why Contribute Back?

As you build prototypes, you'll discover:
- **Better patterns** for common UI problems
- **Component usage guidelines** that should be documented
- **Common mistakes** others should avoid
- **Reusable templates** that save time

Sharing these discoveries helps all teams build better prototypes faster.

## What Should Be Contributed?

### ✅ Good Contributions

**1. Component Usage Patterns**
- "We discovered Badge needs `type="number"` to show text"
- "Button intent mapping: use 'prominent' for primary actions"
- Common prop combinations that work well

**2. Interaction Patterns**
- "Always show loading state during data fetching"
- "Confirmation dialog pattern for destructive actions"
- Navigation patterns that work well

**3. Reusable Templates**
- ListPage component (table with filters)
- DetailPage component (header + tabs + content)
- FormPage component (form layout + validation)

**4. Writing Style Guidelines**
- Button label patterns ("Save Changes" vs "Submit")
- Error message tone and structure
- Empty state copy patterns

**5. Documentation Improvements**
- Clarifications in DART_COMPONENTS.md
- Fixes for confusing instructions
- Additional examples

**6. Bug Fixes**
- Issues in base setup
- Configuration problems
- Broken examples

### ❌ Don't Contribute

**Prototype-Specific Content**
- Domain-specific screens (your product's pages)
- Business logic for your app
- Product-specific mock data
- Custom components that only work for your use case

**Ask yourself:** "Would other teams building different prototypes benefit from this?"
- If yes → Contribute!
- If no → Keep in your prototype repo

## How to Contribute

### Option 1: Simple Contribution (Recommended for Most)

**For documentation improvements, pattern descriptions, and examples:**

1. **Create an Issue** on the base template repo
   - Go to https://github.com/ernieguai/datavant-prototype/issues
   - Click "New Issue"
   - Describe what you learned/discovered

2. **Use this template:**

```markdown
**What I Discovered**
[Describe the pattern, mistake, or improvement]

**Context**
I was building [describe what you were doing] and discovered that [what happened].

**Proposed Change**
[Describe what should be added/changed in the template]

**Example**
[Provide code example or screenshot if relevant]

**Which File to Update**
- [ ] DART_COMPONENTS.md
- [ ] docs/standards/interaction-patterns.md
- [ ] docs/standards/component-usage.md
- [ ] docs/standards/writing-style.md
- [ ] Other: _______________
```

3. **Someone will review** and add it to the template

**Example Issue:**

> **What I Discovered**
> Badge component needs `type="number"` to display text. Without it, it shows only a colored circle.
>
> **Context**
> I was building status badges for data sources and couldn't figure out why text wasn't showing.
>
> **Proposed Change**
> Add to DART_COMPONENTS.md in the Badge section under "Common Mistakes"
>
> **Example**
> ```tsx
> // Wrong - shows empty circle
> <Badge status="prominent">Active</Badge>
>
> // Correct - shows text
> <Badge status="prominent" type="number">Active</Badge>
> ```

### Option 2: Direct Pull Request

**For code changes, component templates, or substantial additions:**

1. **Fork the base template** (if you haven't already)

2. **Create a branch for your contribution**
   ```bash
   cd path/to/datavant-prototype
   git checkout -b contribution/my-pattern-name
   ```

3. **Make your changes**
   - Add to `docs/standards/` if documenting patterns
   - Add to `src/components/templates/` if contributing reusable components
   - Update `DART_COMPONENTS.md` if documenting component usage
   - Add examples to `src/pages/_examples/` if demonstrating patterns

4. **Test your changes**
   - Ensure dev server runs: `npm run dev`
   - Check that examples work
   - Verify documentation is clear

5. **Commit with clear message**
   ```bash
   git add .
   git commit -m "Add pattern: Confirmation dialog for destructive actions"
   ```

6. **Push and create Pull Request**
   ```bash
   git push origin contribution/my-pattern-name
   ```
   - Go to GitHub and create Pull Request
   - Describe what you're contributing and why
   - Link to any related issues

7. **Wait for review** and address feedback

## Contribution Checklist

Before contributing, check:

- [ ] **Is it reusable?** Will other teams benefit from this?
- [ ] **Is it documented?** Have you explained why and how to use it?
- [ ] **Does it follow existing patterns?** Consistent with current template style?
- [ ] **Is it tested?** Does it work in the template?
- [ ] **Is it generic?** No prototype-specific business logic?
- [ ] **Are there examples?** Code examples or screenshots help understanding

## What Happens After You Contribute?

1. **Review** - Template maintainers review your contribution
2. **Discussion** - May ask questions or suggest changes
3. **Merge** - Once approved, merged into base template
4. **Release** - Tagged in next template version
5. **Benefit** - All teams get access to your improvement!

## Guidelines for Good Contributions

### Documentation

**Good:**
```markdown
## Badge Component

Badge displays status indicators.

**CRITICAL**: Must use `type="number"` to display text!

### Common Mistake
❌ Wrong:
<Badge status="prominent">Active</Badge>
Result: Shows empty colored circle

✅ Correct:
<Badge status="prominent" type="number">Active</Badge>
Result: Shows "Active" text with colored background
```

**Not as helpful:**
```markdown
Badge needs type="number" prop.
```

### Code Contributions

**Good:**
- Documented with JSDoc comments
- Includes usage example
- TypeScript types are clear
- Follows existing code style

**Not as helpful:**
- No comments
- Unclear prop names
- No examples
- Inconsistent with existing code

## Syncing Template Updates Back to Your Prototype

After improvements are merged into the base template, you can pull them into your prototype:

```bash
# In your prototype repo
cd path/to/your-prototype

# Add base template as remote (one time only)
git remote add template https://github.com/ernieguai/datavant-prototype.git

# Fetch latest from template
git fetch template

# Merge updates from template
git merge template/main --allow-unrelated-histories

# Or cherry-pick specific commits
git cherry-pick <commit-hash>

# Resolve any conflicts
# (Claude Code can help with this!)

# Push to your prototype repo
git push origin main
```

### Using Claude to Help Sync

In your prototype's Claude Code chat:

```
I want to sync updates from the base template repository.
The template repo is at: https://github.com/ernieguai/datavant-prototype

Please help me:
1. Add the template as a remote
2. Fetch the latest changes
3. Merge updates while preserving my prototype-specific changes
4. Resolve any conflicts
```

## Recognition

Contributors will be:
- Listed in template CHANGELOG
- Credited in relevant documentation
- Helping build better tools for all designers!

## Questions?

- **Not sure if something is worth contributing?** Create an issue and ask!
- **Need help making a pull request?** Ask in the issue and someone can help
- **Found a bug?** Always report it, even if you can't fix it yourself

---

**Thank you for helping improve the template!** Every contribution makes prototyping easier for the entire team.
