---
name: software-team
description: Orchestrate a virtual software development team using subagents. Use when building software projects with multiple AI agents acting as PM, Dev, Designer, QA, or other roles. Covers team setup, role definitions, sprint planning, execution, end-of-sprint reviews, retrospectives, and cross-agent communication patterns. Trigger on requests to build software with a team, set up a dev team, run sprints, or orchestrate subagents for a project.
---

# Software Team Orchestration

Orchestrate AI subagents as a software development team. The main agent acts as Tech Lead / Orchestrator.

## Quick Start

1. Read `references/roles.md` to define team composition
2. Create a `TEAM.md` in the project root using `references/team-template.md`
3. Follow the sprint cycle in `references/sprint-cycle.md`

## Core Principles

These are drawn from research across ChatDev, MetaGPT, AgileCoder, Cursor, and DeepMind's scaling studies. See `references/research-summary.md` for sources.

1. **Hierarchy over flat coordination** — Planner → Worker → Reviewer/Judge. Flat peer coordination fails: agents become risk-averse, conflicts multiply.
2. **Structured artifacts over chat** — Agents produce documents, specs, code, and test results — not conversation summaries. Reduces information loss.
3. **Small teams** — 3-7 agents max per workflow. Beyond ~4 without hierarchy, errors amplify 17x (DeepMind).
4. **Inception prompting** — Reinforce role, constraints, and context at every agent spawn. Prevents drift (+9.4% success in ChatDev studies).
5. **Acceptance criteria on every task** — Workers can't declare "done" without measurable, verifiable criteria.
6. **Model specialization** — Use strong reasoning models for planning/judging, faster models for validation/simple tasks. Match model strengths to roles.
7. **Ephemeral agents = fresh starts** — Subagent sessions are naturally ephemeral. This prevents context pollution and tunnel vision (a key Cursor finding).

## Anti-Patterns (Avoid These)

- ❌ Flat peer coordination without hierarchy
- ❌ Free-form chat as primary inter-agent communication
- ❌ More than ~7 agents in a single flat group
- ❌ Skipping acceptance criteria on tasks
- ❌ Using one model for every role
- ❌ Dedicated integrator/mediator role (bottleneck — Cursor removed theirs)

## Orchestrator Role

The main agent (you) is the Tech Lead. You:
- Break work into tasks with **explicit acceptance criteria** for each
- Spawn agents with **inception prompts** (role + constraints + context reinforced every time)
- Facilitate all cross-agent communication — relay only what the recipient needs
- Enforce the sprint checklist — no exceptions
- Synthesize results and report to the human

### Spawning Agents
Use `sessions_spawn` with descriptive labels (e.g., `projectname-dev-feature-x`).

**Inception prompt template** (include at the start of every task):
```
You are the [ROLE] for [PROJECT]. Your responsibilities: [LIST].
Constraints: [HARD RULES]. You are working on: [TASK].
Acceptance criteria: [CRITERIA]. Relevant specs: [FILE PATHS].
```

### Model Selection Guidance

| Role | Recommended Model Tier | Why |
|------|----------------------|-----|
| Planner / PM | Strong reasoning | Decomposition quality is critical — bad plans cascade |
| Dev | Strong coding | Core output quality |
| QA / Reviewer | Mid-tier | Verification is more constrained than generation |
| Judge | Strong reasoning | Go/no-go decisions need good judgment |
| Researcher | Mid-tier | Web search + synthesis, less precision-critical |

Adjust based on task complexity. Simple validation → cheaper model. Complex architecture → strongest available.

## Sprint Cycle

See `references/sprint-cycle.md` for full process. Summary:

1. **Planning** — Break phase into tasks with acceptance criteria, assign owners, identify critical path
2. **Execution** — Agents work, orchestrator relays and unblocks
3. **End-of-Sprint** — MANDATORY checklist (see below)

### End-of-Sprint Checklist (MANDATORY)

Every sprint must complete ALL steps before reporting to the human:

| Step | Owner | Deliverable |
|------|-------|-------------|
| QA Review | QA | Requirements verification report — every requirement verified or flagged |
| Judge Evaluation | Judge (or Orchestrator) | Go/no-go assessment: does the sprint output meet the bar? |
| Sprint Summary | Orchestrator | One-pager: planned vs delivered, decisions, issues, what's next |
| Screenshot Package | Designer | Simulator screenshots of all key screens/states |
| Team Retrospective | All agents | Retro summary with action items |

### Judge Evaluation

After QA review, spawn a Judge agent (or evaluate yourself) to make a go/no-go call:
- Does the sprint output meet acceptance criteria?
- Are there quality issues QA missed?
- Should any work be sent back before the sprint closes?
- Is drift occurring from the original plan?

The Judge can: **approve**, **send back specific items**, or **recommend re-planning**.

### Team Retrospective

Orchestrator facilitates. Each agent answers:
- **What worked well** — individually and as a team
- **What didn't work** — bottlenecks, miscommunication, wasted effort
- **What to change** — concrete recommendations for next sprint

Focus areas: subagent coordination, handoff quality, spec clarity, context management, model selection, tool/process improvements.

Synthesize into a Retro Summary with numbered action items. Apply action items to TEAM.md before next sprint.

## Hard Rules (Always Apply)

1. **NEVER reach out externally** (no emails, API signups, contacting companies) without human approval
2. **NEVER spend money** (no paid APIs, purchases, subscriptions) without human approval
3. **Free/open-source only** unless human explicitly approves spending
4. **All work stays in the project folder**

## References

- `references/roles.md` — Role definitions, responsibilities, autonomy levels
- `references/sprint-cycle.md` — Planning, execution, and closeout process
- `references/team-template.md` — Copy-paste TEAM.md template for new projects
- `references/communication-patterns.md` — Handoff patterns and conflict resolution
- `references/research-summary.md` — Source research on multi-agent orchestration patterns
