# Sprint Cycle

## Phase 1: Planning

1. **Define sprint scope** — select tasks from the project plan
2. **Write acceptance criteria for every task** — concrete, verifiable, measurable. No task ships without these.
3. **Identify dependencies** — what blocks what? What can run in parallel?
4. **Assign owners and model tiers** — match roles to tasks, pick appropriate models
5. **Set Definition of Done** for the sprint as a whole

### Task Sizing
- Each task should be completable by one agent in one session
- If a task requires back-and-forth between agents, split at the handoff point
- Include full context in every task assignment — agents don't share memory

### Acceptance Criteria Examples
- ❌ "Build the login screen" (vague)
- ✅ "Build login screen with email/password fields, validation errors for empty/invalid input, loading state on submit. Must match wireframe in docs/v1-wireframes.md. Tests pass for valid login, invalid credentials, and empty fields."

## Phase 2: Execution

### Spawning Work
Use `sessions_spawn` with inception prompts and descriptive labels:
```
label: "projectname-dev-feature-x"
task: "You are the Engineer for [Project]. Your job: [responsibilities].
      Constraints: [hard rules].
      Task: Build feature X per spec in docs/v1-spec.md.
      Acceptance criteria: [list].
      Write code to src/..."
```

### Orchestrator During Execution
- **Relay questions** between agents (they can't talk directly)
- **Unblock** stuck agents — provide context, make decisions, escalate
- **Track progress** — which tasks are done, blocked, in-progress
- **Quality check** outputs before passing to next agent
- **Pass structured artifacts** — specs, code, test results. Not conversation summaries.

### Handoff Pattern
1. Agent A completes work → orchestrator reviews output
2. Orchestrator extracts relevant artifacts for Agent B
3. Agent B receives only what they need (don't dump entire context)

### Parallel vs Sequential
- **Parallel:** Independent tasks (Dev builds feature while QA writes test plan)
- **Sequential:** Dependent tasks (Designer specs UI → Dev implements → QA verifies)
- Maximize parallel work to reduce wall-clock time

## Phase 3: End-of-Sprint (MANDATORY)

**Do not report to the human until ALL steps are complete.**

### Step 1: QA Requirements Review
- Spawn QA with sprint requirements and current implementation
- QA verifies every requirement as **met** or **flagged with details**
- If mismatches: orchestrator facilitates Dev + QA + PM resolution
- **Deliverable:** Requirements verification report

### Step 2: Judge Evaluation
- Spawn Judge (or evaluate as orchestrator) with:
  - Sprint acceptance criteria
  - QA verification report
  - Current implementation state
- Judge assesses: does the output meet the bar?
- **Decisions:** Approve / Send back specific items / Recommend re-planning
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
- Spawn each agent with retro prompts (or batch into fewer sessions)
- Each answers: what worked, what didn't, what to change
- Include specific focus on:
  - Subagent coordination effectiveness
  - Handoff quality and information loss
  - Spec/acceptance criteria clarity
  - Model selection effectiveness
  - Context management
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

- Apply retro action items to team process
- Update TEAM.md with any process changes
- Groom next sprint's tasks based on learnings
- Adjust model assignments if retro surfaced issues
