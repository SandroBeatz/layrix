---
name: beads
description: Manage project issues and tasks using the beads (bd) issue tracker. Use for creating, listing, updating, closing issues, managing dependencies, and syncing with git. Invoke when the user wants to work with project tasks or issue tracking.
user-invocable: true
allowed-tools: Bash, Read
argument-hint: [command] [args]
---

# Beads Issue Tracker

You manage project issues using the `bd` (beads) CLI tool.

## Quick Reference

| Command | Description |
|---------|-------------|
| `bd ready` | Show issues ready to work (no blockers) |
| `bd list --status=open` | All open issues |
| `bd list --status=in_progress` | Active work |
| `bd list --status=closed` | Completed work |
| `bd show <id>` | Detailed issue view with dependencies |
| `bd stats` | Project statistics |

## Creating Issues

```bash
bd create --title="..." --type=task|bug|feature --priority=2
```

Priority levels: 0 (critical), 1 (high), 2 (medium), 3 (low), 4 (backlog)

**IMPORTANT:** Priority uses numbers 0-4, NOT strings like "high" or "medium".

## Updating Issues

```bash
bd update <id> --status=in_progress   # Start working
bd update <id> --status=open          # Pause work
bd update <id> --assignee=username    # Assign
```

## Closing Issues

```bash
bd close <id>                          # Close single
bd close <id1> <id2> <id3>            # Close multiple (more efficient)
bd close <id> --reason="explanation"   # Close with reason
```

## Dependencies

```bash
bd dep add <issue> <depends-on>   # issue depends on depends-on
bd blocked                         # Show all blocked issues
```

## Sync

```bash
bd sync              # Sync with git remote
bd sync --status     # Check sync status
```

## Workflow

When the user passes arguments like `$ARGUMENTS`, interpret them as:

- `ready` or `list` → Show available work
- `create <title>` → Create new issue
- `close <id>` → Close issue
- `show <id>` → Show issue details
- `stats` → Show project statistics
- `sync` → Sync with git

If no arguments provided, run `bd ready` to show available work.

## Session End Protocol

Before ending any work session, ALWAYS:

1. Close completed issues: `bd close <id1> <id2> ...`
2. Sync beads: `bd sync`
3. Verify with `bd stats`
