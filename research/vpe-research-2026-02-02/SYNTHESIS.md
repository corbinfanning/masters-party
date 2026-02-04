# VPE Research Synthesis
*For Corbin — Feb 2, 2026*

**Context:** VP of Engineering at Jeppesen ForeFlight. ~160 engineers (US + Denmark). Just laid off 60 people. Received $3M equity from Thoma Bravo. Transitioning to backend-focused role. Priorities: IL5 migration, QA automation, platform modernization, geo-diversification to Denmark.

---

## The Big Picture

You're in a unique position: **Thoma Bravo paid you $3M to execute their playbook while you deal with the human fallout of layoffs.** That's the job. The question is whether you can do it in a way that's sustainable and builds something you're proud of.

---

## What You Should Be Doing Right Now (Next 30 Days)

### 1. People First
- **Don't pretend the layoffs didn't happen.** Acknowledge the loss. Create space for grief.
- **1:1s with every direct report** in the next two weeks. Ask: "How are you really doing?"
- **Identify flight risks.** Your top performers have options. Proactively engage them.
- **Protect workload.** You have fewer people doing more work. Kill projects explicitly. Say out loud: "We're now X people doing what Y people did. Here's what we're NOT going to do."

### 2. Credibility Through Delivery
- Chad Dickerson: *"Your credibility in taking stands will always rest on delivery of product/infrastructure."*
- Pick 2-4 focus areas this quarter. Don't try to fix everything.
- Your job is **delivery**. Everything else flows from it.

### 3. Technical Priorities (Start Assessment)
- **IL5:** Hire a FedRAMP Program Manager or engage a firm. Commission a gap assessment.
- **QA:** Hire a Test Automation Architect. Pick ONE pilot project (highest pain).
- **Platform:** Document current Jeppesen architecture. Identify top 3 modernization candidates.

---

## The Thoma Bravo Reality

**Rule of 60:** Revenue Growth Rate + Profit Margin ≥ 60%. If growth is 15%, you need 45% EBITDA margins. Engineering is the biggest cost lever.

**What the $3M means:** They're buying your execution on margin expansion, political cover for cuts, retention through the hard part, and your technical judgment on what's dispensable.

**Timeline:** Typical hold period is 3-5 years. They'll expect geo-optimization plan within 6-12 months ("30% of engineering spend in lower-cost regions by year 2").

**The hard truth:** You were hired to execute cuts. That's the job, not a side effect. The question is whether you can do it well and build something sustainable.

---

## The VPE Job in 60 Seconds

**Wear three hats:** Executive (drive business), Manager (org/people), Engineer (technical bar). Most fail by over-indexing on one.

**Partner relentlessly with Product.** If you're aligned, everything is easier. If you're not, engineering suffers.

**Stay technical enough.** Don't become a bureaucrat. Get into details when there's no clear path or when people violently disagree.

**Translate between engineering and business.** That's on you. Replace engineering shorthand with language executives understand.

**Time allocation:**
- 30-40% — Leadership & 1:1s
- 25-30% — Strategy & planning
- 15-20% — Hiring & org health
- 10-15% — Stakeholder management
- 5-10% — Staying technical

---

## Technical Transformation Reality Check

### IL5 Migration
- **Platform:** Using SecondFront (Game Warden) — pre-authorized IL5 platform
- **Timeline:** Likely 6-12 months (vs 18-36 if building from scratch) since you inherit their ATO
- **Cost:** Platform licensing + integration work (less than DIY infrastructure build)
- **Critical constraint:** Only US citizens can access IL5 environments. Denmark team is completely blocked.
- **This actually simplifies things:** US team on government track, Denmark on commercial.

### QA Automation
- **Target:** Level 3 maturity in 12-18 months (standardized, integrated). Don't try to jump higher.
- **Start:** One pilot project (highest-pain manual regression). Prove value, then scale.
- **Hard truth:** Maintenance consumes 40-60% of automation effort. Framework choice matters.

### Platform Modernization
- **Pattern:** Strangler Fig (gradual replacement, not big bang). Essential for aviation uptime.
- **Reality:** Jeppesen's 90-year legacy means multi-year journey, not quick fixes.
- **IL5 consideration:** Separate CI/CD pipelines for government vs commercial products.

---

## Key Relationships

| Relationship | What Matters |
|--------------|--------------|
| **CEO** | Build credibility through delivery before taking stands. Be the bridge between tech and business. |
| **CPO/Product** | Partner "absurdly closely." If you're aligned, life is easier. Create shared artifacts. |
| **Your Directs** | Weekly 1:1s. Skip-levels monthly. Hold them accountable. Don't lower the bar. |
| **Thoma Bravo** | Learn PE-speak. Understand what they measure. Get ahead of the playbook—propose restructuring before it's imposed. |

---

## Common Failure Modes to Avoid

1. **Becoming a bureaucrat** — staying so far from details you can't engage on architecture
2. **Trying to fix everything at once** — pick 2-4 focus areas per quarter
3. **Poor communication** — "it's going well" with no specifics, never surfacing risks
4. **Misaligned with Product** — if this relationship is strained, engineering suffers
5. **Assuming context from previous roles applies** — do "conflict mining" before implementing changes

---

## The Deeper Tension (For Later)

You said: *"I was feeling like there is no future in tech until Claude Code, Codex, and OpenClaw came around. Now I'm super excited, but want to work on cool stuff."*

The VP role is about managing people, politics, and process. The $3M is real money, but it's payment for doing hard, often unpopular work for 3-5 years. 

The question isn't just "what should I be doing at work" — it's whether this is the work that actually energizes you. We can explore that when you're not exhausted.

---

## TL;DR

**This week:**
1. Apologize to Hailli ✓
2. Get some sleep
3. Start 1:1s with your directs
4. Don't pretend the layoffs didn't happen

**This month:**
1. Identify flight risks and engage them
2. Kill projects explicitly (say what you're NOT doing)
3. Start assessments: IL5 gap, QA pilot selection, Jeppesen architecture doc
4. Plan a Denmark trip for Q2

**This quarter:**
1. Stabilize team morale (30-day mark: people should feel acknowledged)
2. Land one visible win (proves you can still ship)
3. Get ahead of the geo-optimization conversation with TB

---

*Full research in the other files. Read them when you have time.*
