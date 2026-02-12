---
name: autonomous-team
description: >
  Spin up autonomous AI teams that run sprint cycles on a cron schedule
  without human initiation. Teams check a status file, pick up the next sprint,
  run the full cycle (planning → execution → QA → judge → retro), and report results.

  Use when: you want continuous progress on a project without manually driving
  each sprint, you have a TEAM.md and SPEC.md ready, and the work can be broken
  into small repeatable cycles.

  Don't use when: you need a one-shot task (use sessions_spawn directly),
  the project doesn't have a defined team structure yet (set up TEAM.md first
  via the software-team skill), or you just want to ask a question about a project.
---

# Autonomous Team Runner

Run AI teams on autopilot using cron + sessions_spawn + a status file coordination pattern.

## How It Works

1. **A cron job** fires on a schedule (e.g., every 15 min, every hour, daily)
2. **The orchestrator session** reads a `team-status.json` file
3. **If idle** → starts the next sprint following the team's TEAM.md process
4. **If active** → skips (only one sprint runs at a time per team)
5. **When done** → updates status, notifies Jane, who reviews and escalates to human

## Setup Checklist

### 1. Project Requirements
- A `TEAM.md` defining roles, pods, and sprint process
- A `SPEC.md` or equivalent defining what to build
- A sprint docs location (e.g., `docs/sprints/`)
- The `software-team` skill for sprint cycle reference

### 2. Status File
Create `docs/sprints/team-status.json`:
```json
{
  "team": "alpha",
  "status": "idle",
  "currentSprint": null,
  "lastCompletedSprint": 0,
  "lastUpdated": "2026-01-01T00:00:00-06:00",
  "activeSessionLabel": null
}
```

### 3. Cron Job
Create via `cron add` with:
- **schedule**: `every` (interval) or `cron` (expression)
- **sessionTarget**: `isolated`
- **payload.kind**: `agentTurn`
- **payload.model**: The orchestrator model (can be Sonnet to save cost; subagents use their own models)
- **delivery.mode**: `none` (orchestrator reports via sessions_send)

### 4. Kill Switch (Optional)
For time-boxed runs, create a one-shot `at` cron job that fires a systemEvent to the main session telling Jane to disable the runner.

## Orchestrator Prompt Template

The cron payload message should include:

```
You are [Orchestrator Name], orchestrator for [Team Name] ([Project]).

Project: [path]
Team config: [path to TEAM.md]
Sprint process: [path to sprint-cycle.md]
Spec/Charter: [path]
Previous sprint: [path to last deliverables]
Team status file: [path to team-status.json]

STEP 1: Read team-status.json. If status is 'active', reply 'Team is mid-sprint. Skipping.' and stop.

STEP 2: If idle, read TEAM.md, sprint cycle reference, spec, and previous sprint docs.

STEP 3: Determine next sprint number. Create docs folder.

STEP 4: Update team-status.json to active.

STEP 5: [Project-specific pre-planning step — e.g., code audit, content review, etc.]

STEP 6: Run full sprint cycle per TEAM.md.

STEP 7: Update team-status.json to idle.

STEP 8: Report results via sessions_send to main session.

HARD RULES:
- NEVER reach out externally or spend money
- Free/open-source only
- All work stays in project folder
- Keep sprint scope small (3-5 tasks)
- When invoking subagent skills, be EXPLICIT: "Use the [skill-name] skill" — don't rely on fuzzy routing
- Write all deliverables to the sprint artifacts folder (docs/sprints/sprint-N/) as the handoff boundary
- Include negative examples in task descriptions: "Do NOT do X" when past sprints show common misfires
```

## Model Strategy

| Role | Recommended Model | Rationale |
|------|------------------|-----------|
| Orchestrator (cron) | Sonnet | Coordination logic, low complexity |
| PM, Designer | Opus | Creative + strategic planning |
| Engineer, QA | Opus | Code quality, testing rigor |
| Judge | Opus | Independent evaluation needs strong reasoning |
| Research/Scout | Sonnet | Data gathering, less judgment needed |

Override per project as needed. Cost-sensitive projects can run everything on Sonnet.

## Multiple Teams

Each team gets its own:
- Status file (different path)
- Cron job (different schedule or same)
- TEAM.md (different roles/process)

Teams are independent — they don't coordinate with each other. Jane (main session) coordinates across teams.

## Shared Task Board (Inspired by Claude Agent Teams)

Instead of the orchestrator sequentially assigning every task, use a shared task board file that agents can self-claim from:

### `docs/sprints/sprint-N/taskboard.json`
```json
{
  "sprint": 5,
  "tasks": [
    {
      "id": "S5-01",
      "title": "Implement weather API integration",
      "owner": null,
      "status": "open",
      "assignedTo": "dev",
      "acceptanceCriteria": { "functional": [...], "visual": [...] },
      "dependencies": [],
      "claimedBy": null,
      "completedAt": null
    }
  ]
}
```

### How it works:
1. **Orchestrator creates the task board** during planning phase
2. **Agents read the board** at start, claim their tasks by writing their session label to `claimedBy`
3. **Agents update status** as they progress: `open` → `in-progress` → `done` → `verified`
4. **Other agents can read progress** without going through orchestrator
5. **Orchestrator checks milestones** rather than managing every handoff

### Benefits:
- Reduces orchestrator bottleneck (pods self-coordinate)
- Creates artifact trail of who did what and when
- Enables parallel execution where dependencies allow
- Agents can leave notes for each other in task entries

### Inter-agent messaging:
For direct agent communication (Dev → QA, Reporter → Research Desk), agents can write message files:
```
docs/sprints/sprint-N/messages/dev-to-qa-001.md
```
This gives agents a communication channel that doesn't require the orchestrator to relay.

## Debate & Competing Hypotheses

For planning decisions, spawn two agents with opposing perspectives:
- Agent A argues FOR an approach
- Agent B argues AGAINST
- Orchestrator synthesizes the best outcome

Works well for: architecture decisions, story angles, design tradeoffs, prioritization disputes.

## Monitoring

Jane can check on teams via:
- `sessions_list` — see active subagent sessions
- `sessions_history` — read what a team session is doing
- Reading `team-status.json` directly
- Sprint docs in `docs/sprints/sprint-N/`

## Stopping a Team

- Disable the cron job: `cron update --jobId <id> --patch {"enabled": false}`
- Or let the kill switch fire
- Active sprints will finish their current work

## Best Practices (from production agent team patterns)

### Write subagent prompts like SOPs, not conversations
Each subagent prompt should be a procedure: inputs, steps, expected outputs, success criteria. Avoid vague instructions like "make it good" — specify what "good" means with templates or worked examples.

### Templates and examples belong IN the skill, not the orchestrator prompt
Don't cram report formats, code templates, or example outputs into the orchestrator's cron payload. Put them in skill files or sprint reference docs. They cost zero tokens when not invoked, and agents get them exactly when needed.

### Add negative examples to reduce misfires
When agents repeatedly make the same mistake (wrong file location, scope creep, skipping QA), add explicit "Don't do X" instructions. Glean saw a 20% accuracy recovery from adding negative examples and edge case coverage.

### Artifacts are the handoff boundary
Agents communicate through files, not conversation. Sprint folder (`docs/sprints/sprint-N/`) is the canonical artifact location. Every deliverable — plans, code, reports, reviews — gets written to disk. Other agents read from disk. The orchestrator checks disk, not memory.

### Explicit skill invocation over fuzzy routing
When determinism matters (and in autonomous teams it always matters), tell agents exactly which skill to use: "Use the software-team skill for sprint planning." Don't rely on the agent to figure out routing from descriptions alone.

### Design for long runs
- Reuse sessions where possible (same subagent continues work across steps)
- Keep context lean — write intermediate state to files, not conversation history
- If a sprint is taking too many turns, the orchestrator should checkpoint and resume rather than letting context degrade

## Examples

See:
- Corndog Golf (Team Alpha): Software development team
- Temple Ledger (Team Bravo): AI news company editorial team
