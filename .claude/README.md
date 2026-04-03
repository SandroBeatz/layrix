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
