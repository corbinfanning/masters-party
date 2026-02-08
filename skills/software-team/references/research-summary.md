# Research Summary: Multi-Agent Software Development Patterns

> Full research: `/research/subagent-orchestration-patterns.md`

## Key Findings

1. **Hierarchy wins** — Cursor proved Planner→Worker→Judge at scale (hundreds of agents, weeks). Flat peer coordination fails: risk aversion, lock contention, no one tackles hard problems.

2. **Structured artifacts > chat** — MetaGPT passes documents/specs between agents, outperforms ChatDev's dialogue approach. Less information loss.

3. **Sprints beat waterfall** — AgileCoder (+7.7% over MetaGPT) by adding Agile iteration instead of single-pass waterfall.

4. **Failure rates are high** — 41-87% across 7 frameworks (MAST/UC Berkeley). Main culprits: bad task decomposition, inter-agent misalignment, weak verification.

5. **Small teams** — 3-7 agents max. Beyond ~4 without hierarchy → 17x error amplification (DeepMind).

6. **Model specialization** — Different models excel at different roles. Strong reasoning for planning/judging, coding models for implementation, cheaper models for validation.

7. **Inception prompting** — Reinforce role/constraints at every spawn. +9.4% success (ChatDev).

8. **Fresh starts combat drift** — Cursor resets context periodically. Ephemeral subagent sessions provide this naturally.

9. **Remove unnecessary complexity** — Cursor removed their integrator/mediator role (bottleneck). Simpler is better.

## Sources

- ChatDev (ACL 2024) — Chat chain, inception prompting
- MetaGPT (ICLR 2024) — Structured artifact passing, publish-subscribe
- AgileCoder (2024) — Sprint-based iteration, code dependency graphs
- MAST (UC Berkeley 2025) — Failure taxonomy across 7 frameworks
- DeepMind Scaling Study (Dec 2025) — Agent quantity × coordination structure
- Cursor Blog (Jan 2026) — Production-scale planner-worker-judge
