---
name: software-team
description: Orchestrate a virtual software development team using subagents. Use when building software projects with multiple AI agents acting as PM, Dev, Designer, QA, or other roles. Covers team setup, role definitions, sprint planning, execution, end-of-sprint reviews, retrospectives, and cross-agent communication patterns. Trigger on requests to build software with a team, set up a dev team, run sprints, or orchestrate subagents for a project.
---

# Software Team Orchestration

Orchestrate AI subagents as a software development team using pod-based development.

## Quick Start

1. Read `references/roles.md` to define team composition and pods
2. Create a `TEAM.md` in the project root using `references/team-template.md`
3. Follow the sprint cycle in `references/sprint-cycle.md`

## Core Principles

Drawn from research (ChatDev, MetaGPT, AgileCoder, Cursor, DeepMind) and team retrospectives. See `references/research-summary.md`.

1. **Pod-based development** — Agents work in collaborative pairs (Planning Pod: PM+Designer, Implementation Pod: Dev+QA). Orchestrator coordinates between pods, not individuals. Reduces bottleneck.
2. **Hierarchy over flat coordination** — Orchestrator → Pods → Judge. Flat peer coordination fails at scale.
3. **Structured artifacts over chat** — Agents produce documents, specs, code, and test results — not conversation summaries.
4. **Small teams** — 3-7 agents max. Beyond ~4 without hierarchy, errors amplify 17x (DeepMind).
5. **Inception prompting** — Reinforce role, constraints, and context at every spawn. For pods, include both agents' roles.
6. **Two types of acceptance criteria** — Every task gets functional criteria (PM). UI tasks also get visual criteria (Designer). Designer is involved in planning, not just review.
7. **Incremental verification** — QA tests features as Dev builds them (same pod), not all-at-end. Mid-sprint checkpoints catch issues early.
8. **Model specialization** — Strong reasoning for planning/judging, coding models for Dev, faster models for validation.
9. **Ephemeral agents = fresh starts** — Prevents context pollution and tunnel vision.

## Anti-Patterns (Avoid These)

- ❌ Hub-and-spoke through orchestrator for ALL communication (use pods)
- ❌ Designer involved only at review, not planning
- ❌ QA testing only at sprint end (test incrementally)
- ❌ Flat peer coordination without hierarchy
- ❌ Free-form chat as primary inter-agent communication
- ❌ More than ~7 agents in a single flat group
- ❌ Skipping acceptance criteria
- ❌ Using one model for every role
- ❌ Dedicated integrator/mediator role (bottleneck)

## Pod Structure

### Planning Pod (PM + Designer)
Sprint planning. PM writes functional criteria, Designer adds visual criteria and feasibility feedback. Produces the sprint plan together.

### Implementation Pod (Dev + QA)
Sprint execution. Dev builds, QA tests incrementally. Issues caught early, not at sprint end.

### Orchestrator (You)
Coordinates **between** pods. Reviews Planning Pod output before handing to Implementation Pod. Handles cross-pod questions. Does NOT relay routine within-pod communication.

See `references/roles.md` for full role definitions and pod compositions.

## Sprint Cycle

See `references/sprint-cycle.md` for full process. Summary:

1. **Planning** — Planning Pod (PM+Designer) produces sprint plan with functional + visual acceptance criteria
2. **Execution** — Implementation Pod (Dev+QA) builds and verifies incrementally. Mid-sprint checkpoint at ~50%.
3. **End-of-Sprint** — MANDATORY checklist (see below)

### End-of-Sprint Checklist (MANDATORY)

| Step | Owner | Deliverable |
|------|-------|-------------|
| QA Review | QA | Requirements verification (functional + visual) |
| Judge Evaluation | Judge (independent) | Go/no-go assessment |
| Sprint Summary | Orchestrator | One-pager: planned vs delivered, decisions, issues, what's next |
| Screenshot Package | Designer | Simulator screenshots of all key screens/states |
| Team Retrospective | All agents | Retro summary with action items |

### Team Retrospective

Each agent answers: what worked, what didn't, what to change.
Include focus on: pod effectiveness, mid-sprint checkpoints, acceptance criteria quality, context management, model selection.
Synthesize into retro summary with numbered action items. Apply to TEAM.md before next sprint.

## Hard Rules (Always Apply)

1. **NEVER reach out externally** without human approval
2. **NEVER spend money** without human approval
3. **Free/open-source only** unless human explicitly approves
4. **All work stays in the project folder**

## References

- `references/roles.md` — Role definitions, pod compositions, autonomy levels
- `references/sprint-cycle.md` — Planning, execution, and closeout process
- `references/team-template.md` — Copy-paste TEAM.md template for new projects
- `references/communication-patterns.md` — Pod communication, handoffs, context templates
- `references/research-summary.md` — Source research on multi-agent orchestration patterns
