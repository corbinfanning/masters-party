# Technical Transformation Leadership Guide
## VP of Engineering at Jeppesen ForeFlight (Aviation Software)

**Context:** Post-Boeing spinoff backed by Thoma Bravo ($10.55B). Engineering expanding in Denmark while consolidating US headcount post-layoffs. Managing IL5 migration, QA automation buildout, legacy platform modernization, and geo-distributed teams.

---

## Table of Contents
1. [IL5 (Impact Level 5) Migration](#1-il5-impact-level-5-migration)
2. [QA Automation Strategy](#2-qa-automation-strategy)
3. [Platform Modernization](#3-platform-modernization-legacy-to-aws)
4. [Distributed Team Leadership](#4-distributed-team-leadership-us--denmark)
5. [Quarter-by-Quarter Execution Plan](#5-quarter-by-quarter-execution-plan)

---

## 1. IL5 (Impact Level 5) Migration

### What IL5 Actually Means

IL5 is DoD's security classification for hosting **unclassified National Security Systems (NSS)** supporting DoD missions. It's the highest level before classified (IL6/Secret).

**Key Requirements:**
- **FedRAMP High baseline** + 47 additional DoD-specific controls (38 from IL4 + 9 IL5-specific)
- **US Citizens only** can access environment and customer data (not just "US Persons" like IL4)
- **Physical separation** of all federal government data from commercial/non-federal organizations
- **NIPRNet connectivity** capability required
- All data must reside in facilities under **exclusive US legal jurisdiction**
- Only **Federal Government Customers** (civilian or DoD agencies) can be tenants

### Cost & Timeline Reality

| Item | Cost Range | Timeline |
|------|-----------|----------|
| FedRAMP High (prerequisite) | $1M - $3M+ initial | 12-24 months |
| IL5 on top of FedRAMP High | Additional $500K-1.5M | 6-12 months additional |
| Annual Continuous Monitoring | $500K - $1M/year | Ongoing |
| 3PAO Assessment (third party) | $100K - $300K | Part of above |

**Realistic Total Timeline: 18-36 months** from starting FedRAMP High to IL5 Provisional Authorization

### Common IL5 Pitfalls

1. **Underestimating the "US Citizen" requirement** - Not just engineering access, but anyone who could theoretically access the environment including DevOps, support, etc.

2. **Encryption gaps** - Must use FIPS 140-3 Level 1 minimum (Level 3+ for some High controls). This often requires replacing existing crypto libraries.

3. **Physical isolation misconceptions** - AWS GovCloud provides IL5, but you need **dedicated instances** ensuring physical/virtual segmentation. This increases infrastructure costs significantly.

4. **Continuous monitoring burden** - Weekly audit log correlation, daily technical sessions, bi-weekly security reviews, weekly vulnerability scanning. This is permanent operational overhead.

5. **Data residency for distributed teams** - Denmark engineers CANNOT access IL5 environments. Period. This has major architectural implications.

### VPE Actions for IL5

**Immediate (Q1):**
- Hire or designate a dedicated **FedRAMP/IL5 Program Manager** (or engage a firm like StackArmor, Coalfire)
- Inventory all systems that will touch government data
- Identify which engineers are US citizens (Denmark team is blocked from IL5 work)
- Commission a formal **Gap Assessment** ($30-150K, 4-8 weeks)

**Near-term (Q2-Q3):**
- Establish isolated IL5 development track with US-only team
- Begin FedRAMP High documentation (SSP - System Security Plan is 300+ pages)
- Implement FIPS-compliant encryption across all candidate systems
- Set up AWS GovCloud infrastructure with dedicated instances
- Begin DevSecOps pipeline hardening for **continuous ATO (cATO)**

**Why cATO Matters:** Traditional ATO takes months and expires in 3 years. Continuous ATO allows ongoing releases if your DevSecOps pipeline is sufficiently hardened. DoD increasingly expects this for modern software. Critical components:
- Continuous vulnerability scanning across all CI/CD stages
- Automated compliance artifact generation
- Security control automation (SIEM, HBSS, etc.)
- Complete audit trail of all changes

---

## 2. QA Automation Strategy

### Test Automation Maturity Model (TMM)

Most orgs with "very few tests" are at **Level 1 (Ad-hoc/Reactive)**:
- No standardized approach
- Knowledge silos around whoever wrote that one script
- Different testers approach features inconsistently
- Scripts break and nobody knows how to fix them

**Target: Level 3 (Strategic Implementation)** in 12-18 months, which means:
- Standardized testing across all teams
- Risk-based testing methodology
- Dedicated automation framework (Page Object Model, etc.)
- Integration with CI/CD pipelines
- 70%+ automation coverage on critical workflows

**Don't try to jump to Level 5.** Companies realistically take 2-3+ years to reach Levels 4-5. Level 3 is where you get real ROI.

### Building Test Culture from Scratch

**The Hard Truth:** Test automation maintenance consumes **40-60% of total automation effort**. A bad framework creates more problems than value.

**Phase 1: Foundation (Months 1-3)**
1. **Hire a Test Automation Architect** - Not just a senior QA, someone who's built frameworks at scale
2. **Pick ONE pilot project** - Choose the most painful manual regression workflow
3. **Establish basic test documentation** - Central repository, not scattered confluence pages
4. **Define acceptance criteria with developers** - Tests aren't QA's job, they're the team's job

**Phase 2: Framework (Months 3-6)**
1. **Build a proper framework** - Page Object Model for UI, clear separation of concerns
2. **Integrate with CI/CD** - Tests run on every commit, block merges when critical tests fail
3. **Start tracking metrics** - Pass rates, execution time, flaky test rate
4. **Train developers** - Everyone writes tests, not just QA

**Phase 3: Scale (Months 6-12)**
1. **Expand beyond pilot** - Apply framework to other products
2. **Establish automation guild** - Cross-team group maintaining standards
3. **Parallel execution** - Tests should run in minutes, not hours
4. **Risk-based prioritization** - Focus automation on business-critical paths

### Aviation-Specific Considerations

ForeFlight + Jeppesen means **safety-critical software**. This changes the equation:
- Regulatory compliance (FAA, EASA) likely requires specific test documentation
- Edge cases in flight planning could have real-world safety implications
- Integration testing across aeronautical data sources is critical
- Need regression coverage for chart/navigation data updates

**Recommendation:** Start automation efforts on **non-safety-critical paths** (user management, billing, analytics) while establishing framework, then expand to flight-critical features with extra rigor.

### Realistic Metrics for Success

| Quarter | Target |
|---------|--------|
| Q1 | 1 pilot project automated, framework selected |
| Q2 | CI/CD integration, 20% coverage on pilot |
| Q3 | Second project onboarded, 50% critical path coverage |
| Q4 | 70% critical path coverage, <5% flaky test rate |
| Year 2 | Expand to all products, begin performance/security automation |

**Industry Benchmark:** Amazon went from 30% to 80% automation coverage using structured maturity approach, cutting manual testing by 50% and speeding releases by 60%. That took years, not quarters.

---

## 3. Platform Modernization (Legacy to AWS)

### The 7 Rs - Pick Your Strategy

| Strategy | Description | Use When |
|----------|-------------|----------|
| **Retire** | Decommission | Functionality no longer needed |
| **Retain** | Keep as-is | Not worth the risk/cost to move |
| **Rehost** | "Lift and shift" | Quick win, no code changes |
| **Relocate** | Move to different cloud | Changing vendors |
| **Repurchase** | Switch to SaaS | Build vs buy decision |
| **Replatform** | Minor modifications | Optimize for cloud basics |
| **Refactor** | Re-architect | Long-term, highest value |

**For Jeppesen legacy systems:** Likely a mix of **replatform** (quick wins) and **refactor** (strategic investments). Full re-architecture for a 90-year-old aviation data company is a multi-year journey.

### AWS Migration Framework (10-Step Process)

1. **Define goals and KPIs** - Not just "move to cloud" but specific business outcomes
2. **Map business processes** - Understand the actual value streams before touching code
3. **Map capabilities to future services** - Design your target microservices
4. **Slice the monolith** - Use domain-driven design bounded contexts
5. **Identify data flows** - Who owns what data? This is always harder than expected
6. **Structure shared services** - Auth, notifications, logging, etc.
7. **Document non-functional requirements** - Latency, throughput, data residency
8. **Make technology choices** - Pick your stack, create target architecture
9. **Develop MVP** - Start with low-complexity, high-value services
10. **Create rollout strategy** - Canary releases, data migration, cutover

### The Strangler Fig Pattern

Don't do a "big bang" cutover. Gradually replace legacy functionality:
1. New features built in modern stack
2. Route specific traffic to new services
3. Legacy and modern coexist
4. Eventually strangle out the legacy system

This is the **only sane approach** for aviation software where uptime matters.

### Aviation/Jeppesen-Specific Modernization Priorities

**High Priority (Safety/Compliance):**
- Aeronautical data pipelines - Charts, NavData, terrain databases
- Flight planning engines
- Dispatch systems for commercial operations
- Regulatory compliance (FAA data standards)

**Medium Priority (Business Value):**
- Crew tracking systems
- Customer-facing apps (ForeFlight mobile)
- Analytics and reporting

**Lower Priority (Support Functions):**
- Internal tools
- Billing/subscription management
- Marketing systems

### CI/CD for Aviation Software

Building modern CI/CD for aviation requires:
- **Environment parity** - Dev/staging must accurately reflect production
- **Feature flags** - Canary releases for safety-critical features
- **Automated rollback** - Instant reversion if issues detected
- **Extensive integration testing** - Aviation data sources are complex
- **Audit trail** - Every deployment tracked for compliance

**IL5 Consideration:** Your CI/CD pipeline for government products needs to meet cATO requirements. May need separate pipelines for commercial vs. government tracks.

---

## 4. Distributed Team Leadership (US + Denmark)

### The Post-Layoff Reality

**Survivor guilt is real.** Your remaining US team watched colleagues leave. Your Denmark team knows they're the "growth" while US is "consolidation." Both feel uncertain.

**What Research Says Works:**
1. **Over-communicate early** - Silence creates speculation
2. **Explain the "why"** - Strategic context for decisions
3. **Acknowledge the loss** - Don't pretend it didn't happen
4. **Define the new structure clearly** - Ambiguity breeds anxiety
5. **Create visible quick wins** - Momentum rebuilds confidence

### Managing 7-8 Hour Time Zone Gap (US + Denmark)

**Overlap window:** Typically 4-6 hours (morning US = afternoon Denmark)

**Communication Strategy:**
- **Async by default** - Documentation, recorded decisions, written updates
- **Sync windows protected** - Reserve overlap hours for collaborative work
- **Follow-the-sun capability** - Eventually enable 16-hour coverage

**What MUST be async:**
- Status updates
- Code reviews
- Design documentation
- Non-urgent decisions

**What NEEDS sync:**
- Sprint planning
- Architecture decisions
- Conflict resolution
- Relationship building

### Team Structure for Distributed Work

**Option A: Time-zone-aligned teams**
- US team owns Americas-focused products
- Denmark team owns EMEA-focused products
- Pros: Less coordination overhead
- Cons: Silos, duplicate expertise needed

**Option B: Cross-timezone feature teams**
- Each feature team spans both locations
- Requires excellent async practices
- Pros: Knowledge sharing, no silos
- Cons: Coordination cost, meeting scheduling hard

**Option C: Hybrid (Recommended)**
- Core platform teams time-zone aligned
- Feature teams cross-timezone
- "Ambassadors" in each location for critical functions

### IL5 Constraint

**Denmark team CANNOT work on IL5 products.** This isn't optional—it's a legal requirement.

**Implications:**
- IL5 track must be fully staffed with US citizens
- Non-IL5 work can leverage full Denmark team
- Clear product/architectural boundaries needed
- This could actually simplify team structure

### Rebuilding Trust After Layoffs

**For US team (survivors):**
- Be honest about why layoffs happened
- Clarify their role in the new structure
- Show investment in their growth (not just cost management)
- Don't pile on work immediately—allow processing time

**For Denmark team (growing):**
- They may feel like "replacement workers"—address it directly
- Clear onboarding with US context
- Build real relationships, not just transactional handoffs
- In-person time is essential early on

### Practical Distributed Team Practices

1. **Shared documentation** - Single source of truth, not scattered wikis
2. **Recorded meetings** - Anyone can catch up async
3. **Clear escalation paths** - When to wake someone up vs. wait
4. **Rotating meeting times** - Share the inconvenience
5. **Regular in-person gatherings** - Quarterly minimum for leads, annual for teams
6. **Explicit communication norms** - Response time expectations, channel usage

---

## 5. Quarter-by-Quarter Execution Plan

### Year 1, Q1: Foundation & Assessment

**IL5:**
- [ ] Hire FedRAMP Program Manager or engage advisory firm
- [ ] Complete gap assessment
- [ ] Inventory systems requiring IL5
- [ ] Identify US citizen engineering pool

**QA:**
- [ ] Hire Test Automation Architect
- [ ] Select pilot project (highest-pain manual process)
- [ ] Establish test documentation repository
- [ ] Begin framework evaluation

**Platform:**
- [ ] Document current Jeppesen architecture
- [ ] Identify top 3 modernization candidates
- [ ] Map business process dependencies
- [ ] Begin AWS GovCloud setup for IL5 track

**Team:**
- [ ] Conduct post-layoff listening sessions
- [ ] Define new org structure clearly
- [ ] Establish async communication norms
- [ ] Plan first Denmark team visit

### Year 1, Q2: Early Execution

**IL5:**
- [ ] Begin FedRAMP High documentation (SSP)
- [ ] Implement FIPS-compliant encryption where missing
- [ ] Set up isolated IL5 development environment
- [ ] Establish US-only IL5 team

**QA:**
- [ ] Complete framework selection and setup
- [ ] Automate first critical path in pilot project
- [ ] Integrate with CI/CD (tests run on commits)
- [ ] Define pass/fail criteria for merge blocking

**Platform:**
- [ ] First replatform proof-of-concept on low-risk system
- [ ] Design target microservices architecture for priority system
- [ ] Establish strangler fig routing infrastructure
- [ ] Set up monitoring/observability for new services

**Team:**
- [ ] VPE in-person visit to Denmark (1 week minimum)
- [ ] Establish cross-timezone working groups for each initiative
- [ ] Implement weekly leadership syncs (rotating times)
- [ ] Create technical decision log (async visibility)

### Year 1, Q3: Scale Initial Wins

**IL5:**
- [ ] Complete SSP draft
- [ ] Begin DevSecOps pipeline hardening for cATO
- [ ] Engage 3PAO for readiness assessment
- [ ] Address major gaps from assessment

**QA:**
- [ ] Achieve 50% critical path coverage on pilot
- [ ] Onboard second project to automation framework
- [ ] Establish automation guild (cross-team)
- [ ] Begin developer training on testing practices

**Platform:**
- [ ] Complete first strangler fig migration
- [ ] Begin second modernization project
- [ ] Establish shared services (auth, logging)
- [ ] Define data migration strategy

**Team:**
- [ ] Bring Denmark leads to US for full team summit
- [ ] Review and adjust communication practices
- [ ] Promote Denmark team members into leadership roles
- [ ] Conduct engagement survey—benchmark morale

### Year 1, Q4: Consolidation & Year 2 Planning

**IL5:**
- [ ] Submit for 3PAO assessment
- [ ] Address assessment findings
- [ ] Prepare continuous monitoring infrastructure
- [ ] Target FedRAMP High milestone (not full IL5 yet)

**QA:**
- [ ] 70% critical path coverage across initial projects
- [ ] <5% flaky test rate
- [ ] Quarterly training program established
- [ ] Begin planning for performance/security test automation

**Platform:**
- [ ] 2+ systems fully migrated or in strangler fig transition
- [ ] CI/CD pipeline operational for modernized systems
- [ ] Define Year 2 modernization roadmap
- [ ] Establish metrics dashboard (deployment frequency, lead time, etc.)

**Team:**
- [ ] Clear career paths for both locations
- [ ] Documented engineering standards (shared between locations)
- [ ] Follow-up engagement survey—measure improvement
- [ ] Plan Year 2 travel budget and gatherings

### Year 2: Acceleration

**IL5:**
- FedRAMP High achieved (Q1-Q2)
- Begin IL5-specific controls implementation
- Target IL5 Provisional Authorization (Q4)
- Continuous ATO infrastructure operational

**QA:**
- Automation extends to all products
- Performance testing automation begins
- Security testing integration
- Target 80%+ critical path coverage

**Platform:**
- Majority of Jeppesen systems on AWS or in transition
- Microservices architecture for core products
- Legacy systems in maintenance mode with clear retirement dates
- Feature velocity demonstrably improved

**Team:**
- Fully integrated distributed operations
- Follow-the-sun capability for critical systems
- Denmark and US teams indistinguishable in capability
- Strong engineering culture despite geographic distribution

---

## Key Success Factors

### For a VPE Specifically

1. **Don't try to do everything yourself** - Hire/promote strong leads for each initiative
2. **Make the IL5 constraint explicit** - Team structure flows from this requirement
3. **Protect engineering time** - Transformation requires focused execution, not just meetings
4. **Communicate constantly** - Especially with distributed teams post-layoff
5. **Celebrate wins publicly** - Momentum matters when morale is fragile

### Red Flags to Watch

- IL5 timeline slipping without plan adjustment
- QA automation becoming shelfware (nobody runs the tests)
- "Modernization" becoming endless refactoring without delivery
- US/Denmark teams developing separate cultures
- Survivor guilt manifesting as attrition

### Questions to Ask Yourself Weekly

1. Can I articulate the next milestone for each initiative?
2. Who is blocked and why?
3. When did I last have a 1:1 with someone in Denmark?
4. What did we ship this week?
5. What's our biggest risk right now?

---

## Resources

### IL5/FedRAMP
- [DoD Cloud Computing SRG](https://public.cyber.mil/dccs/)
- [FedRAMP.gov](https://www.fedramp.gov/)
- [AWS GovCloud IL5 Documentation](https://aws.amazon.com/govcloud-us/dodsrg/)
- SEI's [DevSecOps and Continuous ATO](https://www.sei.cmu.edu/blog/the-role-of-devsecops-in-continuous-authority-to-operate/)

### QA Automation
- [Test Automation Maturity Model](https://aqua-cloud.io/test-automation-maturity/)
- Google's [Testing Blog](https://testing.googleblog.com/)
- [Continuous Testing in DevOps](https://www.tricentis.com/)

### Platform Modernization
- [AWS Migration Strategies (7 Rs)](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- [Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)

### Distributed Teams
- [GitLab Remote Handbook](https://about.gitlab.com/handbook/)
- [Async-first communication](https://twist.com/remote-work-guides/remote-team-communication)

---

*Generated: 2026-02-02*
*For interview preparation at Jeppesen ForeFlight VPE role*
