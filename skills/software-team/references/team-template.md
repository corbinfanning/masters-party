# TEAM.md Template

Copy this into your project root and customize.

---

```markdown
# TEAM.md — [Project Name] Team Orchestration

## Team Roles

| Agent | Role | Pod | Responsibilities |
|-------|------|-----|-----------------|
| **[Orchestrator]** | Tech Lead | — | Coordinates between pods, interfaces with [Human] |
| **PM** | Product Manager | Planning | Requirements, functional acceptance criteria, scope |
| **Designer** | Designer | Planning | Visual acceptance criteria, feasibility, UI review |
| **Dev** | Engineer | Implementation | Builds features, writes code |
| **QA** | QA Engineer | Implementation | Tests incrementally, requirements verification |
| **Judge** | Evaluator | Independent | End-of-sprint go/no-go |

## Pods

### Planning Pod (PM + Designer)
- Co-spawned during sprint planning
- PM writes functional acceptance criteria
- Designer adds visual acceptance criteria and feasibility feedback
- Output: sprint plan with both types of criteria

### Implementation Pod (Dev + QA)
- Dev builds features, QA tests each one incrementally
- QA flags issues directly to Dev (no orchestrator relay needed)
- Output: implemented + verified features

### Orchestrator
- Coordinates between pods, not individual agents
- Handles cross-pod questions and escalations
- Reviews Planning Pod output before handing to Implementation Pod

## Communication

### Within Pods — Direct
- Pod partners communicate directly via shared artifacts
- No orchestrator relay needed for routine questions

### Between Pods — Through Orchestrator
- Cross-pod questions go through orchestrator
- Orchestrator passes structured artifacts, not conversation summaries

### Mid-Sprint Checkpoint (~50% completion)
- Orchestrator checks: on track? Blocked items? Priority shifts needed?
- Quick Designer review of completed UI work
- Adjust if needed

## Autonomy Levels
- **Dev**: Builds freely within spec. Cross-pod questions → orchestrator.
- **QA**: Tests freely. Reports to Dev directly (same pod).
- **PM/Designer**: Refine within agreed scope. Major changes → [Human].
- **Judge**: Advisory — orchestrator acts on recommendations.
- **Orchestrator**: Orchestrates freely. Major decisions → [Human].

## Hard Rules

1. **NEVER reach out to anyone external** without [Human]'s explicit approval
2. **NEVER spend money** without [Human]'s explicit approval
3. **Free/open-source tools and data only** unless approved
4. **All work stays in the project folder**

## End-of-Sprint Checklist (MANDATORY)

### 1. QA Review
- Verify every acceptance criterion (functional + visual) as met or flagged
- If mismatches: Dev + QA resolve (same pod), escalate if needed

### 2. Judge Evaluation
- Independent go/no-go against acceptance criteria

### 3. Sprint Summary One-Pager
- Planned vs delivered, decisions, issues, judge result, what's next

### 4. Designer Screenshot Package
- Screenshots of all key screens/states in current build

### 5. Team Retrospective
- Each agent: what worked, what didn't, what to change
- Focus on: pod effectiveness, mid-sprint checkpoints, criteria quality
- Synthesize into retro summary with numbered action items
- Apply action items to this file before next sprint

### Sprint Deliverables Package
All five deliverables sent together. No exceptions.
```
