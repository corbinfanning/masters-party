# TEAM.md Template

Copy this into your project root and customize.

---

```markdown
# TEAM.md — [Project Name] Team Orchestration

## Team Roles

| Agent | Role | Model Tier | Responsibilities |
|-------|------|-----------|-----------------|
| **[Orchestrator]** | Tech Lead | Strong | Coordinates team, architectural decisions, interfaces with [Human] |
| **PM** | Product Manager | Strong | Requirements, priorities, user stories, scope decisions |
| **Designer** | Designer | Strong | UI/UX specs, wireframes, visual design, design reviews |
| **Dev** | Engineer | Strong (coding) | Implementation, technical specs, builds features |
| **QA** | QA Engineer | Mid-tier | Test plans, verification, requirements checking |
| **Judge** | Evaluator | Strong | End-of-sprint go/no-go, quality assessment |

## How They Work Together

### Execution Flow
1. Orchestrator breaks work into tasks **with acceptance criteria** and assigns to agents
2. Every agent spawn includes **inception prompt** (role + constraints + context)
3. Dev builds features, reaching out to PM/Designer via Orchestrator when questions arise
4. Agents produce **structured artifacts** (specs, code, test results) — not chat summaries
5. QA verifies against requirements at sprint close
6. Judge makes go/no-go call before reporting to [Human]

### Autonomy Levels
- **Dev**: Builds freely within spec. Must ask PM/Designer for scope/design questions.
- **QA**: Writes and runs tests freely. Reports issues to Dev.
- **PM/Designer**: Refine within agreed scope. Major changes go to [Human].
- **Judge**: Advisory — Orchestrator acts on recommendations.
- **Orchestrator**: Orchestrates freely. Major decisions go to [Human].

## Hard Rules

1. **NEVER reach out to anyone external** without [Human]'s explicit approval
2. **NEVER spend money** without [Human]'s explicit approval
3. **Free/open-source tools and data only** unless approved
4. **All work stays in the project folder**

## End-of-Sprint Checklist (MANDATORY)

Every sprint must end with ALL steps before reporting to [Human]:

### 1. QA Review
- Requirements check: verify every requirement met or flagged
- If mismatches: team huddle to resolve before sprint closes

### 2. Judge Evaluation
- Go/no-go assessment against acceptance criteria
- Can approve, send back, or recommend re-planning

### 3. Sprint Summary One-Pager
- Planned vs delivered, decisions, issues, judge result, what's next

### 4. Designer Screenshot Package
- Screenshots of all key screens/states in current build

### 5. Team Retrospective
- Each agent: what worked, what didn't, what to change
- Synthesize into retro summary with numbered action items
- Apply action items to this file before next sprint

### Sprint Deliverables Package
All five deliverables sent together. No exceptions.
```
