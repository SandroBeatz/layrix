# Claude Skills for Layrix

This directory contains skills that help Claude understand and work with the Layrix codebase.

## Available Skills

| Skill Name | Description | User Invocable |
|------------|-------------|----------------|
| [breadcrumbs-usage](./skills/breadcrumbs-usage/SKILL.md) | Guide for using the Breadcrumbs component | ✅ Yes |

## Skill Structure

Each skill is stored in its own directory under `.claude/skills/[skill-name]/` and contains:

- `SKILL.md`: The main skill documentation with frontmatter metadata
  - `name`: Unique identifier for the skill
  - `description`: Brief description of what the skill covers
  - `user-invocable`: Whether users can explicitly invoke this skill
  - `allowed-tools`: Tools that can be used when executing this skill
  - `argument-hint`: Help text for invoking the skill

## Adding New Skills

To add a new skill:

1. Create a new directory: `.claude/skills/[skill-name]/`
2. Create `SKILL.md` with proper frontmatter
3. Add an entry to this README's skill table
4. Follow the existing skill patterns for consistency

## Skill Guidelines

When creating skills:

- Focus on practical, actionable guidance
- Include code examples
- Document common pitfalls and best practices
- Reference actual component implementations
- Keep information up-to-date with codebase changes
# Claude Code Configuration — Layrix

This directory contains Claude Code configuration for the Layrix project: custom agents, skills (slash commands), and project metadata.

## Directory Structure

```
.claude/
├── agents/                        # Custom subagents
│   ├── fsd-reviewer/              # FSD compliance code reviewer
│   ├── component-builder/         # Shared UI component scaffolder
│   ├── feature-builder/           # Feature slice scaffolder
│   └── architecture-auditor/      # Full architecture audit
├── skills/                        # Slash commands
│   ├── beads/                     # Issue tracker (bd) integration
│   ├── new-component/             # Scaffold shared/ui primitive
│   ├── new-feature/               # Scaffold feature slice
│   ├── new-page/                  # Scaffold page + route
│   ├── lint-check/                # Run ESLint + vue-tsc
│   └── fsd-check/                 # Quick FSD compliance scan
├── project.json                   # Project metadata
├── settings.local.json            # Personal permission overrides
├── README.md                      # This file
└── SUMMARY.md                     # Project summary for AI context
```

## Agents

Agents are specialized subprocesses Claude can delegate to for focused tasks.

| Agent | Purpose | Model | Tools |
|-------|---------|-------|-------|
| **fsd-reviewer** | Reviews code for FSD layer violations, import direction, Quasar isolation | sonnet | Read, Grep, Glob (read-only) |
| **component-builder** | Creates new `shared/ui/primitives/` components with types, Vue SFC, barrel exports | sonnet | Read, Write, Edit, Glob, Grep |
| **feature-builder** | Scaffolds new feature slices (domain/action) with composables, components, barrels | sonnet | Read, Write, Edit, Glob, Grep |
| **architecture-auditor** | Comprehensive audit: import rules, Quasar isolation, barrel exports, naming, types | sonnet | Read, Grep, Glob, Bash (read-only) |

## Skills (Slash Commands)

Skills are invocable via `/skill-name` in Claude Code.

| Skill | Usage | Description |
|-------|-------|-------------|
| `/beads` | `/beads [command] [args]` | Manage project issues via bd CLI |
| `/new-component` | `/new-component DataTable` | Scaffold shared/ui primitive |
| `/new-feature` | `/new-feature user/create` | Scaffold feature slice |
| `/new-page` | `/new-page settings` | Scaffold page + route |
| `/lint-check` | `/lint-check` | Run ESLint + TypeScript checks |
| `/fsd-check` | `/fsd-check` | Quick FSD compliance scan |
| `/icons` | `/icons [icon-name]` | Reference for Tabler Icons usage |
| `/input-usage` | `/input-usage [input-type]` | Complete guide for Input component usage |
| `/list-usage` | `/list-usage [use-case]` | Complete guide for List and ListItem component usage |

## Architecture Overview

Layrix follows **Feature-Sliced Design (FSD)** with strict layer boundaries:

```
app → pages → widgets → features → entities → shared
```

Imports flow top-to-bottom only. No horizontal cross-imports within a layer.

**Key constraint:** Quasar components are ONLY imported in `shared/ui/primitives/`. All other layers use the wrapped components from `@shared/ui`.

## Issue Tracking

This project uses **beads** (`bd` CLI) for issue tracking. Issues are stored in `.beads/` and synced via git.

Common commands:
```bash
bd ready              # Available work
bd create --title="..." --type=task --priority=2
bd close <id>
bd sync
```

## Settings

- `settings.local.json` — Personal permissions (auto-gitignored)
- Team settings should go in `settings.json` (not yet created)
