# Sprint Cycle

## Phase 1: Planning (Planning Pod)

Spawn PM and Designer together as a **Planning Pod**. They collaborate directly:

1. **PM** reviews carryover from previous sprint + new scope
2. **Designer** provides feasibility feedback and visual acceptance criteria
3. Together they produce:
   - Sprint plan with task breakdown
   - **Functional acceptance criteria** (PM) for every task
   - **Visual acceptance criteria** (Designer) for UI tasks — specific colors, sizes, layouts, interactions
   - Dependency map and priority order
4. Orchestrator reviews plan, adjusts if needed

### Task Sizing
- Each task should be completable by one agent in one session
- If a task requires back-and-forth between agents, split at the handoff point
- Include full context in every task assignment — agents don't share memory

### Acceptance Criteria (Two Types)
Every task gets functional criteria. UI tasks also get visual criteria.

**Functional (PM):**
- ✅ "Shot markers are tappable. Tapping shows club, result, distance."

**Visual (Designer):**
- ✅ "Markers are 12pt circles. Good=green, Missed=red, Trouble=yellow. Selected marker enlarges to 18pt with white border. Callout uses corndogBody (16pt) on dark surface."

### Templates

Use pattern libraries for common task types to reduce planning overhead:

**Feature task template:**
```
Task: [name]
Owner: Dev
Functional criteria: [from PM]
Visual criteria: [from Designer, if UI]
Dependencies: [list]
Files likely affected: [list]
Complexity: S/M/L
```

**Polish task template:**
```
Task: [name]
Owner: Dev
Criteria: [specific behavior with measurements — animation duration, haptic style, etc.]
Complexity: S
```

## Phase 2: Execution (Implementation Pod + Mid-Sprint Checks)

### Pod-Based Execution
Spawn Dev and QA as an **Implementation Pod** where possible:
- Dev implements features in priority order
- QA tests each feature as it's completed (not at sprint end)
- They share context and can flag issues directly

For simpler sprints, sequential spawning is fine — but QA should verify incrementally, not all-at-end.

### Spawning Work
Use `sessions_spawn` with inception prompts and descriptive labels:
```
label: "projectname-dev-sprint4"
task: "You are the Engineer for [Project]...
      You are working with QA who will verify your work.
      Acceptance criteria (functional): [list]
      Acceptance criteria (visual): [list]..."
```

### Mid-Sprint Checkpoint (~50% completion)
Orchestrator checks:
- Is Dev on track? Any blocked items?
- Has QA found issues that need Planning Pod input?
- Should priorities shift?
- Quick Designer review of any completed UI work

If issues: orchestrator relays to Planning Pod or escalates to human.

### Orchestrator During Execution
- Coordinate **between pods**, not between individuals
- Unblock stuck agents
- Track progress
- Handle cross-pod questions (Dev needs PM clarification → orchestrator relays)
- Pass structured artifacts between pods

## Phase 3: End-of-Sprint (MANDATORY)

**Do not report to the human until ALL steps are complete.**

### Step 1: QA Requirements Review
- QA verifies every acceptance criterion (functional AND visual) as **met** or **flagged**
- If already done incrementally in Implementation Pod, this is a final sweep
- **Deliverable:** Requirements verification report

### Step 2: Judge Evaluation
- Spawn Judge with:
  - Sprint acceptance criteria (both types)
  - QA verification report
  - Current implementation state
- Judge assesses: does the output meet the bar?
- **Decisions:** Approve / Send back specific items / Re-plan
- **Deliverable:** Go/no-go assessment

### Step 3: Sprint Summary One-Pager
Orchestrator writes:
- What was planned vs. what was delivered
- Key decisions made during the sprint
- Issues encountered and how they were resolved
- Judge evaluation result
- What's next (next sprint scope)
- **Deliverable:** Summary document

### Step 4: Designer Screenshot Package
- Spawn Designer to capture current app state
- All key screens, states, and flows
- **Deliverable:** Screenshots with annotations

### Step 5: Team Retrospective
- Spawn each agent with retro prompts (or batch)
- Each answers: what worked, what didn't, what to change
- Include specific focus on:
  - Pod effectiveness — did direct collaboration help?
  - Mid-sprint checkpoints — useful or overhead?
  - Acceptance criteria quality (functional + visual)
  - Context management
  - Model selection
- Orchestrator synthesizes into retro summary with numbered action items
- **Deliverable:** Retro summary with action items

### Sprint Deliverables Package
Combine all deliverables and send to human together:
1. QA verification report
2. Judge go/no-go assessment
3. Sprint summary one-pager
4. Screenshot package
5. Team retrospective summary with action items

## Between Sprints

- Apply retro action items to TEAM.md and skill references
- Update pattern/template libraries based on what worked
- Groom next sprint's tasks
- Adjust model assignments and pod compositions if retro surfaced issues
