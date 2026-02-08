# Communication Patterns

## Core Principle

Agents cannot talk to each other directly. The orchestrator relays all communication. This is a feature, not a limitation — it prevents the flat coordination problems that Cursor and DeepMind identified.

## Structured Artifacts Over Chat

Agents communicate via **artifacts** (documents, code, test results, specs) — not conversation summaries. This is the single biggest quality lever for inter-agent communication (MetaGPT research).

**Do:**
- "Here's the requirements doc QA produced: [file path]"
- "Dev's implementation is at src/feature.swift. Acceptance criteria were: [list]"

**Don't:**
- "QA said they think the feature mostly works but had some concerns about edge cases"
- Long prose summaries of what another agent said

## Standard Patterns

### Dev → PM/Designer (Clarification)
- Dev hits ambiguity → asks orchestrator with specific question
- Orchestrator forwards question + relevant spec context to PM or Designer
- Response relayed back to Dev as a decision, not a discussion

### QA → Dev (Issue Report)
- QA finds gap → reports with specific requirement, expected vs actual
- Orchestrator relays to Dev with reproduction context
- Dev fixes → orchestrator confirms with QA

### Designer → Dev (Review Feedback)
- Designer reviews UI → produces structured feedback (critical / nice-to-have)
- Orchestrator prioritizes and relays actionable items only

### Judge → Orchestrator (Evaluation)
- Judge reviews sprint output against acceptance criteria
- Produces structured assessment: approved / send back (with specifics) / re-plan
- Orchestrator acts on recommendation

## Context Management

### What to Include in Agent Messages
- Their role, constraints, and task (inception prompt)
- Only the context they need for their specific task
- Relevant file paths and specs
- Decisions made since their last task
- Acceptance criteria for their deliverable

### What to Exclude
- Other agents' internal reasoning
- Full conversation history
- Unrelated project context
- Human's personal information

## Conflict Resolution

When agents disagree:
1. Orchestrator evaluates both positions against specs/acceptance criteria
2. If clear answer: make the call
3. If ambiguous: escalate to human with both positions summarized concisely

Do NOT create a dedicated mediator/integrator role for this — it becomes a bottleneck (Cursor's lesson).

## Inception Prompting

Reinforce at every spawn:
```
You are the [ROLE] for [PROJECT].
Your responsibilities: [LIST].
Constraints: [HARD RULES].
Current task: [TASK].
Acceptance criteria: [CRITERIA].
Relevant files: [PATHS].
```

This prevents role drift and conversation contamination. Every agent starts fresh with clear identity and purpose.
