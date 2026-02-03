# Publishing to Datavant GitHub Organization

This document outlines the steps to move this template from personal account to the Datavant GitHub organization.

## Current Status

- **Current Location**: https://github.com/datavant/design-prototype-template
- **Target Location**: https://github.com/datavant/design-prototype-template (or similar)
- **Visibility**: Internal (private to Datavant organization members)
- **Status**: 🚧 Ready to publish after initial prototype validation

## Pre-Publishing Checklist

Before moving to Datavant org:

### 1. Test the Template
- [ ] Build first real prototype using template
- [ ] Validate that "Use this template" workflow works
- [ ] Verify Claude Code integration works in new chat
- [ ] Confirm documentation is clear for non-engineers
- [ ] Test contributing patterns back to template

### 2. Update Repository References
- [ ] Update all documentation to reference new Datavant org URL
  - [ ] README.md
  - [ ] TEAM_OVERVIEW.md
  - [ ] GETTING_STARTED.md
  - [ ] HOW_TO_USE_WITH_CLAUDE.md
  - [ ] CONTRIBUTING.md
- [ ] Update any hard-coded URLs in code
- [ ] Search for "ernieguai" and replace with "datavant"

### 3. Prepare Repository Settings
- [ ] Decide on repository name (suggestions below)
- [ ] Determine access controls (public vs private)
- [ ] Set up GitHub template repository checkbox
- [ ] Configure branch protection rules (optional)
- [ ] Add repository description and topics

### 4. Team Readiness
- [ ] Share TEAM_OVERVIEW.md with stakeholders
- [ ] Get buy-in from design system team
- [ ] Identify initial template maintainers
- [ ] Plan communication/announcement

## Publishing Steps

### Option 1: Transfer Ownership (Recommended)

This preserves all history, issues, and stars.

1. **In Current Repo Settings**
   - Go to https://github.com/datavant/design-prototype-template/settings
   - Scroll to "Danger Zone"
   - Click "Transfer ownership"
   - Enter: `datavant` (org name)
   - Enter new repo name
   - Confirm transfer

2. **After Transfer**
   - Verify everything transferred correctly
   - Enable template repository checkbox
   - Update repository settings
   - Add team members with appropriate access

### Option 2: Create New Repo (Clean Start)

This starts fresh without personal account history.

1. **Create in Datavant Org**
   - Go to https://github.com/organizations/datavant/repositories/new
   - Name: `design-prototype` (or chosen name)
   - Description: "Template repository for building Datavant product prototypes"
   - Visibility: **Internal** (visible to all Datavant members)
   - Don't initialize (we'll push existing code)

2. **Push Existing Code**
   ```bash
   cd /Users/ernie.guaimano/Documents/Github/datavant-prototype
   git remote add datavant https://github.com/datavant/design-prototype-template.git
   git push datavant main
   ```

3. **Enable Template Repository**
   - Go to repo settings
   - Check "Template repository"

4. **Configure Settings**
   - Add description and topics
   - Set up access controls

## Suggested Repository Names

- `design-prototype` (clear and descriptive)
- `dart-design-prototype` (emphasizes Dart usage)
- `design-design-prototype` (emphasizes design focus)
- `quick-prototype` (emphasizes speed)

**Recommendation**: `design-prototype`

## Repository Settings

### Description
```
Template repository for building realistic, interactive prototypes
of Datavant products using Dart design system and Claude Code
```

### Topics (GitHub tags)
- `template`
- `prototype`
- `dart`
- `design-system`
- `claude-code`
- `react`
- `typescript`

### Access Control

**Internal Repository (Recommended)**

GitHub supports "Internal" visibility for enterprise organizations:
- ✅ Visible to all Datavant organization members
- ✅ Not publicly accessible on the internet
- ✅ No need to manually add each team member
- ✅ Contractors with Datavant org access can see it
- ✅ Can be used in internal documentation and Slack

**How to Set Internal Visibility:**
1. Create or transfer repository to Datavant org
2. Go to Settings → General → Danger Zone
3. Change repository visibility → Internal
4. Confirm the change

**Result**: All Datavant GitHub organization members can access, but it's not publicly searchable or visible outside the organization.

**Recommendation**: Use **Internal** visibility to keep this accessible to all Datavant team members while maintaining privacy.

## Post-Publishing Tasks

### 1. Update Documentation References
```bash
# Find all references to old URL
cd /path/to/datavant-prototype
grep -r "datavant/design-prototype-template" .

# Update to new URL (do this before or after transfer)
# Use text editor or Claude to update all references
```

### 2. Create First Tag/Release
```bash
git tag -a v1.0.0 -m "Initial stable template release"
git push origin v1.0.0
```

Create GitHub release with:
- Release notes summarizing features
- Link to TEAM_OVERVIEW.md
- Link to GETTING_STARTED.md

### 3. Announce to Team
- Post in Slack #design or relevant channel
- Link to TEAM_OVERVIEW.md
- Encourage early adopters
- Offer to help with first prototypes

### 4. Set Up Template Protection (Optional)
- Branch protection on `main` (require reviews)
- CODEOWNERS file for review assignments
- Issue templates for contributions
- PR template for contributions

## Documentation Updates Needed

When publishing, update these URLs:

### Current References to Update
```
datavant/design-prototype-template → datavant/design-prototype-template
```

Files containing references:
- README.md (2 references)
- TEAM_OVERVIEW.md (1 reference)
- GETTING_STARTED.md (3 references)
- HOW_TO_USE_WITH_CLAUDE.md (2 references)
- CONTRIBUTING.md (4 references)

### Automated Update Script
```bash
#!/bin/bash
# Run this in the repo root before publishing

OLD_URL="datavant/design-prototype-template"
NEW_URL="datavant/design-prototype-template"

# Update all markdown files
find . -name "*.md" -type f -exec sed -i '' "s|$OLD_URL|$NEW_URL|g" {} +

echo "Updated all references from $OLD_URL to $NEW_URL"
echo "Review changes with: git diff"
```

## Rollback Plan

If issues arise after publishing:

1. **Template Repo Issues**
   - Revert to previous tag: `git revert <tag>`
   - Fix issues in personal repo first
   - Transfer again when ready

2. **Access Issues**
   - Temporarily make public if access problems
   - Add affected users directly
   - Fix organization settings

3. **Documentation Issues**
   - Quick fixes can be made directly
   - Larger changes should be PRs for review

## Timeline Recommendation

1. **Week 1**: Test with first real prototype
2. **Week 2**: Gather feedback, make improvements
3. **Week 3**: Update URLs, prepare for transfer
4. **Week 4**: Transfer to Datavant org, announce
5. **Ongoing**: Collect contributions, iterate

## Questions to Answer Before Publishing

- [ ] What should the final repository name be?
- [ ] Public or private?
- [ ] Who are the initial maintainers?
- [ ] What's the approval process for contributions?
- [ ] How will we communicate about updates?
- [ ] Who owns updating standards documentation?

---

**Status**: Ready to publish after first prototype validation

**Next Step**: Build first prototype, then revisit this checklist
