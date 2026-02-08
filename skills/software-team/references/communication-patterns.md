# Communication Patterns

## Core Principle

The orchestrator coordinates between **pods**, not individual agents. Within a pod, agents communicate directly via shared artifacts and co-spawned sessions.

## Pod-Based Development

Instead of hub-and-spoke through the orchestrator, agents work in small collaborative pairs:

### Planning Pod (PM + Designer)
- **Co-spawned** for sprint planning and requirement definition
- PM writes requirements, Designer adds visual acceptance criteria and feasibility feedback
- Produces: sprint plan with both functional AND visual acceptance criteria
- **Direct communication:** Designer can push back on PM's specs in real-time

### Implementation Pod (Dev + QA)
- **Co-spawned** or sequenced tightly for build-test cycles
- Dev implements a feature → QA tests immediately (not at sprint end)
- QA can flag issues to Dev directly without going through orchestrator
- Produces: implemented + verified features incrementally
- **Direct communication:** QA reports bugs to Dev, Dev asks QA about edge cases

### Orchestrator Role (Simplified)
- Coordinates **between pods**, not between individuals
- Planning Pod produces plan → Orchestrator reviews → Implementation Pod executes
- Orchestrator handles: cross-pod dependencies, escalations, human communication
- Does NOT relay routine questions between agents in the same pod

## When to Use Pods vs Hub-and-Spoke

| Situation | Pattern |
|-----------|---------|
| Sprint planning | Planning Pod (PM + Designer together) |
| Feature implementation | Implementation Pod (Dev + QA together) |
| Design review of completed work | Designer reviews Dev output (orchestrator relays) |
| Cross-pod questions | Orchestrator relays (e.g., Dev needs PM clarification mid-sprint) |
| Escalations to human | Always through orchestrator |
| Judge evaluation | Independent agent (not in any pod) |

## Structured Artifacts Over Chat

Agents communicate via **artifacts** (documents, code, test results, specs) — not conversation summaries.

**Do:**
- "Here's the requirements doc the Planning Pod produced: [file path]"
- "Dev's implementation is at src/feature.swift. QA verified against criteria."

**Don't:**
- Long prose summaries of what another agent said
- Relaying conversation fragments between agents

## Mid-Sprint Checkpoints

Instead of end-only review, build in structured checkpoints:

### After Each Feature (Implementation Pod)
1. Dev completes feature → notifies orchestrator
2. QA verifies against acceptance criteria (already in the pod)
3. If UI-heavy: orchestrator sends to Designer for quick review
4. Issues caught early, not at sprint end

### Mid-Sprint Review (Orchestrator)
At ~50% sprint completion:
- Check: are we on track? Any blocked items?
- Quick sync with Planning Pod if scope questions arose
- Adjust priorities if needed

## Context Management

### What to Include in Pod Spawns
- Both agents' roles and constraints (inception prompts for each)
- Shared task context and acceptance criteria
- Relevant file paths
- Decision log from earlier in the sprint

### Context Handoff Templates

**Planning Pod → Implementation Pod:**
```
Sprint plan: [path]
Acceptance criteria (functional): [from PM]
Acceptance criteria (visual): [from Designer]
Priority order: [list]
Open questions resolved: [list]
```

**Implementation Pod → Designer Review:**
```
Feature implemented: [description]
Files changed: [list]
Acceptance criteria it should meet: [list]
Known limitations: [list]
```

## Conflict Resolution

Within a pod: agents resolve directly.
Between pods: orchestrator evaluates and decides, or escalates to human.
Never create a dedicated mediator role — it becomes a bottleneck.

## Inception Prompting

Reinforce at every spawn — whether individual or pod:
```
You are the [ROLE] for [PROJECT].
Your responsibilities: [LIST].
Constraints: [HARD RULES].
Current task: [TASK].
Acceptance criteria: [CRITERIA].
Relevant files: [PATHS].
```

For pod spawns, include BOTH agents' roles and how they should collaborate.
