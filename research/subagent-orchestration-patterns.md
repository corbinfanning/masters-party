# Multi-Agent AI Software Development: Orchestration Patterns Research

> Researched: 2026-02-07 | Sources: Academic papers, GitHub repos, blog posts, industry reports

---

## 1. Established Frameworks & Systems

### ChatDev (OpenBMB)
- **Model:** Virtual software company with waterfall-style phases
- **Roles:** CEO, CTO, CPO, Programmer, Reviewer, Tester, Art Designer
- **Communication:** Chat-based dialogue between role pairs (e.g., CTO↔Programmer)
- **Key innovation:** "Chat Chain" — decomposes the dev process into sequential chat phases (designing → coding → testing → documenting). Each phase is a dialogue between two assigned roles.
- **Anti-hallucination:** "Inception prompting" — reinforces each agent's role, goals, and permissible interactions at the start of every dialogue
- **Limitation:** Waterfall-only, no iteration/sprints
- **GitHub:** 25K+ stars, ChatDev 2.0 accepted to NeurIPS 2025

### MetaGPT (FoundationAgents)
- **Model:** Software company with SOPs (Standard Operating Procedures)
- **Roles:** Product Manager, Architect, Project Manager, Engineer, QA Engineer
- **Communication:** Structured outputs (documents, diagrams, specs) rather than free-form chat
- **Key innovation:** Agents communicate via artifacts not conversation. PM produces PRD → Architect produces system design → Engineer produces code. Each agent subscribes to relevant messages via a publish-subscribe model.
- **Result:** 100% task completion rate on benchmarks, better code execution than ChatDev
- **Strength:** Structured communication reduces information loss vs. ChatDev's dialogue approach

### AgileCoder (FPT Software)
- **Model:** Agile methodology with sprints
- **Roles:** Product Manager, Developer, Tester (Scrum Master implicit)
- **Key innovation:** Sprint-based iteration — work is organized into sprints with incremental development. Introduces **Dynamic Code Graph Generator** that maintains a Code Dependency Graph as the codebase evolves, giving agents better context.
- **Result:** Outperforms ChatDev and MetaGPT on HumanEval/MBPP benchmarks (+7.7% over MetaGPT)
- **Why it matters:** First to move beyond waterfall to iterative development

### AgentMesh
- **Model:** Sequential pipeline with 4 specialized agents
- **Roles:** Planner, Coder, Debugger, Reviewer
- **Communication:** Shared project state ("blackboard" pattern) — agents read/write to common codebase, specs, and error logs
- **Flow:** User request → Planner (decompose) → Coder (implement) → Debugger (test & fix) → Reviewer (validate)

### AutoGen (Microsoft)
- **Model:** Flexible multi-agent conversation framework
- **Strength:** Not domain-specific — general-purpose agent orchestration
- **Communication:** Agents converse and cooperate with flexible role definitions
- **Supports:** External tools, human-in-the-loop, custom topologies

### CrewAI
- **Model:** Role-based teams with task delegation
- **Strength:** Production-oriented, good developer experience
- **Recommended for:** Production workloads (per framework comparison studies)

### OpenAI Swarm
- **Model:** Minimal agent + handoff abstraction
- **Strength:** Learning/prototyping — extremely simple (Agent + Handoff, that's it)
- **Limitation:** Experimental only, not production-ready, OpenAI-only

---

## 2. Role Structures

### Common Roles Across Frameworks

| Role | Frameworks Using It | Responsibilities |
|------|-------------------|-----------------|
| Product Manager / Planner | MetaGPT, AgileCoder, AgentMesh | Requirements → specs, task decomposition |
| Architect / System Designer | MetaGPT, ChatDev (CTO) | System design, API design, tech decisions |
| Developer / Coder | All | Code generation, implementation |
| Tester / Debugger | All | Test generation, execution, bug finding |
| Reviewer / QA | MetaGPT, AgentMesh, ChatDev | Code review, quality validation |
| Project Manager | MetaGPT | Sprint planning, coordination, tracking |

### Less Common But Valuable Roles

| Role | Source | Purpose |
|------|--------|---------|
| **Judge / Evaluator** | Cursor, debate patterns | Final quality assessment, go/no-go decisions |
| **Sub-Planner** | Cursor | Recursive planning for specific areas |
| **Documenter** | ChatDev | Documentation generation |
| **Art Designer** | ChatDev | UI/visual asset generation |
| **Stakeholder** | Requirements frameworks | User proxy, acceptance criteria |
| **Collector** | Requirements frameworks | Gathering context, research |
| **Checker** | Requirements frameworks | Validation of requirements models |

### Cursor's Three-Tier Model (Production-Proven)
From Cursor's blog post on scaling autonomous coding:
1. **Planners** — Explore codebase, decompose into tasks. Can spawn sub-planners recursively.
2. **Workers** — Execute assigned tasks. No coordination with other workers. Just grind.
3. **Judges** — Evaluate cycle output, decide whether to continue or restart.

**Key insight:** They initially tried an "integrator" role for quality control/conflict resolution but removed it — it created bottlenecks. Workers handled conflicts themselves.

---

## 3. Communication Patterns

### Pattern 1: Sequential Pipeline (Waterfall)
- **Used by:** ChatDev, AgentMesh
- **Flow:** Phase 1 → Phase 2 → Phase 3 → ...
- **Pros:** Simple, predictable
- **Cons:** No backtracking, errors propagate forward

### Pattern 2: Structured Artifact Passing (Publish-Subscribe)
- **Used by:** MetaGPT
- **How:** Agents publish structured documents (PRDs, design docs, code). Other agents subscribe to relevant artifacts.
- **Key advantage:** Reduces information loss vs. free-form chat. Forces agents to produce concrete, reusable outputs.

### Pattern 3: Chat-Based Dialogue
- **Used by:** ChatDev, AutoGen
- **How:** Two agents converse in natural language to resolve a task
- **Risk:** Conversation drift, hallucination, role confusion

### Pattern 4: Blackboard / Shared State
- **Used by:** AgentMesh, Cursor (shared codebase)
- **How:** Agents read/write to shared project state (code, specs, errors)
- **Key challenge:** Concurrency control. Cursor tried locks (failed — bottlenecks, deadlocks), then optimistic concurrency (better but still problematic), then settled on planner-worker hierarchy.

### Pattern 5: Hierarchical Delegation
- **Used by:** Cursor, hierarchical MAS patterns
- **How:** Manager/planner creates tasks → workers execute independently → judge evaluates
- **Key finding:** Far superior to flat/peer coordination. Without hierarchy, agents become risk-averse and avoid hard problems.

### Pattern 6: Adversarial Debate
- **Used by:** Various research systems
- **How:** Multiple agents propose solutions, engage in structured debate rounds, optional judge makes final decision
- **Use case:** Reducing hallucination, improving reasoning quality

### Handoff Patterns
- **Direct handoff:** Agent A completes, passes to Agent B
- **Conditional handoff:** Based on output quality/type, route to different next agent
- **Recursive:** Planners spawn sub-planners, creating tree-like delegation

---

## 4. Sprint / Iteration Patterns

### Waterfall (ChatDev, MetaGPT)
Design → Code → Test → Review. One pass. No backtracking except within-phase retries.

### Agile Sprints (AgileCoder)
- Product Manager writes user stories and creates backlog
- Each sprint: select stories → develop → test → review
- Cross-sprint: code dependency graph carries forward context
- Sprint outputs inherit into next sprint

### Cursor's Cycle Pattern
- Planner creates task batch → Workers execute in parallel → Judge evaluates → Next cycle starts fresh
- "Periodic fresh starts to combat drift and tunnel vision"
- Cycles run for weeks with hundreds of concurrent workers

### Proposed Best Practice
1. **Planning phase:** Decompose requirements into discrete tasks with clear acceptance criteria
2. **Execution phase:** Workers implement in parallel, isolated worktrees
3. **Review phase:** Automated tests + reviewer agent validates
4. **Integration phase:** Merge, resolve conflicts
5. **Retrospective:** Judge/evaluator assesses progress, creates next cycle's plan

---

## 5. Quality Gates

### Code Review Agent
- Most frameworks include a dedicated reviewer
- MetaGPT: QA engineer reviews against specs
- ChatDev: Reviewer checks code quality
- AgentMesh: Reviewer validates final output holistically

### Test-Driven Quality
- **AgentCoder / CodeCoR:** Generate test cases, run code against them, prune failing solutions
- **AgileCoder:** Tester agent creates and runs tests each sprint
- **Debugger agents:** Execute code, catch errors, iteratively patch

### Judge / Gating Agent
- Cursor uses a judge at the end of each cycle
- Binary decision: continue or restart
- Can evaluate against original requirements

### Structured Output Validation
- MetaGPT: Each phase must produce structured artifacts (not just chat)
- Forces concrete outputs that downstream agents can validate

### Inception Prompting (Anti-Drift)
- ChatDev reinforces role/goal/constraints at the start of every dialogue
- Prevents role confusion and conversation drift

### What Works in Practice
1. **Automated test execution** — most reliable quality signal
2. **Structured artifacts** over free-form chat — forces clarity
3. **Independent reviewer agent** — catches errors the creator misses
4. **Periodic fresh starts** — prevents tunnel vision and context pollution

---

## 6. Failure Modes & Lessons Learned

### MAST Taxonomy (UC Berkeley, 2025)
From "Why Do Multi-Agent LLM Systems Fail?" — analyzed 1600+ traces across 7 frameworks. Found **41-86.7% failure rates**. 14 failure modes in 3 categories:

#### Category 1: System Design Issues
- **Disobey Role Specification** — agents act outside their assigned role (e.g., ChatDev's CPO terminates conversation without CEO consensus → +9.4% success rate when fixed)
- **Poor task decomposition** — planner creates tasks that are too vague, overlapping, or incorrect
- **Rigid pipeline** — no ability to backtrack when earlier phases produce errors

#### Category 2: Inter-Agent Misalignment
- **Information loss** between agents — context drops as work passes through the pipeline
- **Conflicting actions** — agents undo each other's work
- **Echo chamber / groupthink** — agents agree too readily, not catching errors
- **Role confusion** — agents drift from their assigned persona

#### Category 3: Task Verification
- **No ground truth** — hard to verify if the output actually meets requirements
- **Insufficient testing** — agents skip or generate weak tests
- **False success** — agents claim completion when work is incomplete

### DeepMind "Science of Scaling" Findings (Dec 2025)
- **"Bag of Agents" trap:** Throwing more agents at a problem without structure → **17.2x error amplification**
- **Coordination Tax:** Performance gains saturate or fluctuate beyond ~4 agents without proper topology
- **Sweet spot:** Multi-agent coordination yields highest returns when single-agent baseline is **below 45%**. If base model hits 80%+, more agents may add noise.
- **4 key factors:** Agent Quantity × Coordination Structure × Model Capability × Task Complexity

### Cursor's Hard-Won Lessons
1. **Flat coordination fails:** Equal-status agents with shared files → lock contention, risk aversion, no one tackles hard problems
2. **Locks don't work for agents:** Agents hold locks too long, forget to release, fail while holding locks
3. **Optimistic concurrency is better but insufficient** without hierarchy
4. **Removing complexity helps:** Integrator role created more bottlenecks than it solved
5. **Prompts matter most:** "A surprising amount of the system's behavior comes down to how we prompt the agents"
6. **Model choice matters:** Different models excel at different roles. GPT-5.2 better planner, Opus 4.5 tends to take shortcuts and yield control early.
7. **Periodic fresh starts needed** to combat drift and tunnel vision

### Common Pitfalls (Synthesized)
1. **Over-engineering coordination** — simpler is usually better
2. **Error propagation** — bad output from phase 1 cascades through all phases
3. **Context window exhaustion** — long conversations blow past token limits
4. **Infinite loops** — agents retry endlessly without progress
5. **Sycophancy** — reviewer agents rubber-stamp instead of critically reviewing
6. **Token waste** — coordination chatter consumes budget without progress
7. **Single point of failure** — one bad agent output derails entire pipeline

---

## 7. Novel Ideas & Creative Patterns

### Recursive Planning (Cursor)
Planners can spawn sub-planners, making planning itself parallel. Creates a tree of increasingly specific plans. Not just one PM — a hierarchy of planners.

### Dynamic Code Dependency Graph (AgileCoder)
Static analysis module that maintains a live dependency graph as code evolves. Agents query the graph for relevant context instead of reading entire codebase. Solves the "how do agents understand a growing codebase" problem.

### Evolving Orchestration (ChatDev 2.0, NeurIPS 2025)
"Multi-Agent Collaboration via Evolving Orchestration" — the orchestration pattern itself evolves/adapts rather than being fixed.

### Adversarial Code Review
Multiple agents independently review code, then debate disagreements. Judge makes final call. Goes beyond single-reviewer pattern.

### Spec-First / Contract-First Development
Agents write interface contracts and specs before implementation. Other agents implement against the spec. Reviewer validates against the spec, not just "does it look right."

### Model Specialization per Role
Don't use one model for everything. Use the best model for each role:
- Strong reasoning model → Planner
- Code-specialized model → Coder  
- Fast/cheap model → Simple validation tasks
- Different models have different failure modes — diversity reduces correlated errors

### Isolated Worktrees (Cursor Pattern)
Each worker agent gets its own git worktree. No merge conflicts during work. Integration happens at defined checkpoints. "Agents as managed processes with isolated worktrees and shared plans."

### Human-in-the-Loop Checkpoints
AutoGen supports human input at any point. For real production use, having a human approve plans before execution prevents cascading errors from bad decomposition.

### Small Teams > Large Teams
Multiple sources converge on: **3-7 agents per workflow**. Beyond that, use hierarchical structures with team leaders coordinating subgroups. This mirrors real team dynamics (two-pizza teams).

### The "Fresh Start" Pattern
Periodically wipe agent context and restart from the current state of the codebase + plan. Prevents context pollution, tunnel vision, and accumulated confusion. Cursor found this essential for multi-week runs.

---

## 8. Practical Recommendations for Our Orchestration Skill

Based on all research, here's what we should build:

### Architecture: Hierarchical Planner-Worker-Reviewer
```
Orchestrator (human or meta-agent)
  ├── Planner Agent
  │     ├── Decomposes requirements into tasks with acceptance criteria
  │     └── Can spawn sub-planners for complex subsystems
  ├── Worker Agents (parallel)
  │     ├── Each gets isolated workspace (git worktree or separate files)
  │     ├── Implements one task at a time
  │     └── Runs tests before declaring done
  ├── Reviewer Agent
  │     ├── Reviews against specs/acceptance criteria
  │     ├── Runs integration tests
  │     └── Can reject and send back to worker
  └── Judge Agent (per cycle)
        ├── Evaluates overall progress
        ├── Decides: continue, re-plan, or escalate to human
        └── Triggers fresh start if drift detected
```

### Key Design Decisions
1. **Structured artifacts over chat** — agents pass specs, code, test results — not conversations
2. **Inception prompting** — reinforce role at every interaction
3. **Small teams** — 3-5 agents per workflow, hierarchical for larger projects
4. **Model specialization** — match model strengths to roles
5. **Automated test gates** — no progression without passing tests
6. **Periodic fresh starts** — reset context every N cycles
7. **Isolated workspaces** — prevent conflicts during parallel execution
8. **Human checkpoints** — especially after planning, before large execution

### What NOT to Build
- ❌ Flat peer coordination (proven to fail at scale)
- ❌ Lock-based shared state coordination  
- ❌ Integrator/mediator role (bottleneck, per Cursor)
- ❌ More than ~7 agents in a single flat group
- ❌ Free-form chat as primary communication (use structured outputs)

---

## Sources

1. [ChatDev Paper](https://arxiv.org/html/2307.07924v5) — ACL 2024
2. [MetaGPT Paper](https://arxiv.org/html/2308.00352v6) — ICLR 2024
3. [AgileCoder Paper](https://arxiv.org/html/2406.11912v1) — 2024
4. [AgentMesh Paper](https://arxiv.org/html/2507.19902v1) — July 2025
5. [Why Do Multi-Agent LLM Systems Fail? (MAST)](https://arxiv.org/abs/2503.13657) — UC Berkeley 2025
6. [Towards a Science of Scaling Agent Systems](https://arxiv.org/pdf/2512.08296) — Google DeepMind Dec 2025
7. [Cursor: Scaling Long-Running Autonomous Coding](https://cursor.com/blog/scaling-agents) — Jan 2026
8. [10 Multi-Agent Frameworks Tested](https://langcopilot.com/posts/2025-11-01-top-multi-agent-ai-frameworks-2024-guide) — Nov 2025
9. [TDS: Why Your Multi-Agent System is Failing](https://towardsdatascience.com/why-your-multi-agent-system-is-failing-escaping-the-17x-error-trap-of-the-bag-of-agents/) — Jan 2026
10. [IBM: What is ChatDev](https://www.ibm.com/think/topics/chatdev) — Nov 2025
11. [IBM: What is MetaGPT](https://www.ibm.com/think/topics/metagpt) — Nov 2025
