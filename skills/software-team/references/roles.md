# Team Roles

## Standard Roster

Not every project needs every role. Pick what fits. 3-7 agents max per workflow.

### Orchestrator (Main Agent)
- **Always present** — this is you
- Breaks work into tasks with acceptance criteria
- Spawns agents with inception prompts (role + constraints reinforced every time)
- Facilitates all cross-agent communication
- Enforces sprint checklist and quality gates
- Synthesizes results for the human

### PM (Product Manager)
- Requirements, priorities, user stories, scope decisions
- Periodic check-ins on progress and scope drift
- Resolves ambiguity in specs
- **Autonomy:** Refine specs within agreed scope. Major scope changes → human.
- **Model tier:** Strong reasoning (decomposition quality matters)

### Dev (Engineer)
- Implementation, technical specs, builds features, writes code
- Asks PM/Designer for clarity when spec is ambiguous
- Runs tests before declaring done
- **Autonomy:** Builds freely within spec. Must ask for scope/design questions.
- **Model tier:** Strong coding model

### Designer
- UI/UX specs, wireframes, visual design, interaction patterns
- Reviews UI work after implementation
- Captures screenshots at sprint close
- **Autonomy:** Refine designs within agreed direction. Major pivots → human.
- **Model tier:** Strong reasoning (design judgment)

### QA (Quality Assurance)
- Test plans, test cases, verification, edge case coverage
- Requirements verification at sprint close
- Checks every requirement as met or flags gaps
- **Autonomy:** Writes and runs tests freely. Reports issues to Dev.
- **Model tier:** Mid-tier (verification is more constrained than generation)

### Judge / Evaluator
- End-of-sprint go/no-go assessment
- Reviews overall output quality against acceptance criteria
- Catches issues QA may miss (architectural drift, spec misalignment)
- Can approve, send back, or recommend re-planning
- **Autonomy:** Advisory — orchestrator makes final call on actions
- **Model tier:** Strong reasoning
- **Note:** Can be combined with Orchestrator role on smaller projects

### Researcher / Scout
- Web research, competitive analysis, data gathering
- Available on-demand — not persistent
- Writes findings to `docs/` or `research/`
- **Model tier:** Mid-tier

### User Persona
- Simulates target user for research interviews
- Validates assumptions, pressure-tests ideas
- Available on-demand
- **Model tier:** Mid-tier

## Customizing the Roster

Add or remove roles based on project needs. Each role needs:
1. **Clear responsibilities** — what they own
2. **Autonomy level** — what they can decide vs. escalate
3. **Communication pattern** — who they interact with and when
4. **Model tier** — match model strength to role complexity

## Autonomy Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Full** | Acts independently within domain | Dev implementing a spec'd feature |
| **Guided** | Refines within bounds, escalates changes | PM adjusting priorities within sprint |
| **Supervised** | Proposes, human approves | Any external communication or spending |

## Inception Prompting

Every time you spawn an agent, reinforce their role. Include:
- Who they are and what they're responsible for
- Project context and current state
- Specific task and acceptance criteria
- Hard rules and constraints
- Relevant file paths

This prevents role drift and reduces errors. ChatDev research showed +9.4% success rate from consistent role reinforcement.
