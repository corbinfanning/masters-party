# Backend Engineering Value Creation at a PE-Owned Aviation Software Company
## Actionable Playbook for Corbin Fanning — Server & Web Engineering, Flight Deck

**Date:** February 4, 2026  
**Context:** Jeppesen ForeFlight, acquired by Thoma Bravo for $10.55B (closed Nov 2025). Corbin leads Server & Web Engineering for Flight Deck, with scope including Jeppesen Ground Controls, FliteBrief, ForeFlight backend services, ForeFlight Web. Teams in US, Denmark, and India.

---

## Table of Contents

1. [The PE Value Equation — What Actually Matters](#1-the-pe-value-equation)
2. [Backend Engineering Improvements That Directly Impact EBITDA](#2-ebitda-impact)
3. [Infrastructure Consolidation — Jeppesen + ForeFlight](#3-infrastructure-consolidation)
4. [Test Automation as a Cost Savings Engine](#4-test-automation)
5. [Platform Modernization in PE Timeframes](#5-platform-modernization)
6. [The Timeline — Quick Wins, Medium-Term, Long-Term](#6-the-timeline)
7. [Metrics & Visibility — Making Your Impact Legible to PE](#7-metrics-and-visibility)

---

## 1. The PE Value Equation — What Actually Matters {#1-the-pe-value-equation}

### How Thoma Bravo Thinks About Value

Thoma Bravo's documented playbook (quantified across Instructure, SolarWinds, Informatica) follows a two-phase model:

**Phase 1 (Months 0–18): Rapid Margin Improvement**
- One-time restructuring to eliminate inefficiency
- R&D as % of revenue: typically reduced from 30%+ → 15-20%
- Operating margin swings of 40-50 percentage points (Instructure went from -30% to +21%)
- This is the "cost-cutting should be a one-time event" philosophy Orlando Bravo articulates

**Phase 2 (Months 12–48): Profitable Growth + Add-On Acquisitions**
- Focus on revenue expansion with existing cost structure
- Cross-sell/up-sell existing customer base
- Bolt-on acquisitions integrated into the platform
- Revenue growth outpacing customer growth = pricing power

### What This Means for Backend Engineering

You are not in sales. You cannot directly close deals. But backend engineering is the **largest controllable cost center** in a software company after sales & marketing. Every dollar you save in COGS (infrastructure, operations, support escalations) flows **directly to EBITDA**. This is your superpower.

**The formula:**
```
Engineering Value = (Cost Reduction) + (Revenue Enablement) + (Risk Mitigation)
```

- **Cost Reduction:** Infrastructure spend, headcount efficiency, support ticket deflection
- **Revenue Enablement:** Platform capabilities that unlock new pricing tiers, faster product delivery
- **Risk Mitigation:** Uptime, security, compliance (IL5/FedRAMP), data integrity

---

## 2. Backend Engineering Improvements That Directly Impact EBITDA {#2-ebitda-impact}

### 2.1 Cloud Infrastructure Cost Optimization (5-30% savings on cloud spend)

**Why it matters:** Cloud spend is typically 10-25% of COGS for SaaS companies. For a $10.55B acquisition, even a few percentage points of margin improvement translates to hundreds of millions in enterprise value at PE exit multiples.

**Specific actions:**

| Initiative | Expected Savings | Effort | Timeline |
|-----------|-----------------|--------|----------|
| Reserved Instances / Savings Plans audit | 20-40% on compute | Low | 30 days |
| Right-sizing (oversized instances, idle resources) | 10-25% on compute | Medium | 60 days |
| Storage tiering (S3 lifecycle policies, cold storage) | 15-30% on storage | Low | 30 days |
| Database optimization (query tuning, connection pooling, read replicas) | 10-20% on DB | Medium | 90 days |
| Container density improvement (Kubernetes pod packing) | 15-25% on compute | Medium | 90 days |
| Data transfer cost reduction (CDN optimization, VPC endpoints) | 10-30% on networking | Medium | 60 days |
| Spot instances for non-critical workloads (batch processing, testing) | 60-90% on those workloads | Medium | 60 days |
| Eliminate orphaned resources (unused EBS volumes, unattached EIPs, stale snapshots) | Variable, often $50K-500K/yr | Low | 14 days |

**PE-ready metric:** Cost per API request, cost per active user, infrastructure cost as % of revenue.

### 2.2 Reducing Support Escalation Through Backend Quality

**Why it matters:** Orlando Bravo himself says "Product quality reveals itself in support metrics. Companies claiming great products but showing low gross margins on support calls are exposing fundamental product weaknesses." Support headcount is COGS. Fewer escalations = fewer support staff needed = margin improvement.

**Specific actions:**
- **Observability investment:** Structured logging, distributed tracing, real-time alerting → catch issues before customers notice them
- **Self-healing systems:** Auto-scaling, circuit breakers, automatic failover → fewer incidents requiring human intervention
- **API contract validation:** Catch breaking changes before they reach production → fewer integration-related support tickets
- **Improve data pipeline reliability:** Aviation data (charts, NOTAMs, weather) delivery failures are likely a top support driver. Invest in retry logic, dead-letter queues, monitoring

**Target:** Reduce P1/P2 incidents by 50% in Year 1. Each avoided incident = saved engineering hours + saved support hours + preserved customer trust.

### 2.3 Developer Productivity (Doing More With Existing Headcount)

**Why it matters:** After restructuring (the layoffs already happened), you need to deliver the same or more output with fewer people. Developer productivity improvements are the "how" behind maintaining velocity post-cuts.

**Specific actions:**
- **CI/CD pipeline optimization:** Cut build times from 30+ minutes to <10 minutes. Every engineer saves 30-60 min/day.
- **Developer environment standardization:** Containerized dev environments, reproducible builds. Reduce "works on my machine" debugging.
- **Shared libraries and services:** Common authentication, logging, configuration management, feature flags across all products. Stop reinventing wheels.
- **Internal API documentation and developer portal:** Reduce time-to-productivity for new engineers (especially important with India ramp-up).

**PE-ready metric:** Deployments per week, lead time for changes, MTTR (Mean Time to Recovery), % of time on new features vs. maintenance.

### 2.4 Headcount Efficiency Through Automation

**Why it matters:** The blunt PE math — an engineer costs $200-400K fully loaded (US) or $60-120K (India/Denmark). Every manual process you automate either saves heads or frees them for revenue-generating work.

**High-value automation targets:**
- **Deployment automation:** If any deployments are manual or require "the person who knows how," automate it
- **Database maintenance:** Automated schema migrations, index management, partition management
- **Certificate and credential rotation:** Automated renewal, zero-touch rotation
- **Incident response:** Automated runbooks for common failure modes
- **Environment provisioning:** Self-service staging/QA environments (critical for the test engineering team)
- **Compliance reporting:** Automated evidence collection for security audits (especially valuable for IL5/FedRAMP)

---

## 3. Infrastructure Consolidation — Jeppesen + ForeFlight {#3-infrastructure-consolidation}

### 3.1 The Consolidation Landscape

You're inheriting two distinct technology lineages:

| Dimension | Jeppesen (Legacy) | ForeFlight (Modern) |
|-----------|-------------------|---------------------|
| **Heritage** | Founded 1934, Boeing-owned since 2000 | Founded 2007, Boeing acquired 2019 |
| **Products in your scope** | Ground Controls, FliteBrief | Backend services, ForeFlight Web |
| **Likely stack** | Enterprise Java, on-prem or Boeing cloud, SOA-era architecture | Modern cloud-native, likely AWS, RESTful APIs |
| **Customer base** | Airlines, military, commercial aviation ops | GA pilots, business aviation, growing commercial |
| **Data model** | Aeronautical data at core (charts, nav data, terrain) | Flight planning, weather, EFB ecosystem |
| **Development culture** | Waterfall/SAFe, Boeing process overhead | Agile, startup-paced |
| **Team location** | Primarily Denmark (+ Germany, India) | Primarily US (Austin/Houston) |

### 3.2 Specific Consolidation Opportunities

#### A. Unified Authentication & Identity (Quick Win)

**Current state (likely):** Separate auth systems for Jeppesen products and ForeFlight products. Separate customer databases. Separate subscription management.

**Target state:** Single SSO / identity provider across all Flight Deck products. Unified customer record.

**Value:**
- Enables cross-sell (ForeFlight GA customer → Jeppesen commercial upsell, and vice versa)
- Reduces auth-related support tickets
- Single customer identity = better analytics = better pricing decisions
- Required foundation for any product bundling strategy

**Effort:** Medium-high. 6-12 months. Start with federated identity (both systems trust a shared IdP) before full migration.

#### B. Common Data Pipeline (Strategic)

**Current state (likely):** FliteBrief and ForeFlight both ingest aeronautical data, weather data, NOTAMs — but through separate pipelines with separate processing logic.

**Target state:** Unified data ingestion and processing pipeline feeding all products.

**Value:**
- Eliminate duplicate infrastructure for data processing
- Single source of truth for aviation data = fewer discrepancies between products
- Faster data delivery to all products when pipeline is shared
- Estimated 20-40% reduction in data pipeline infrastructure costs

**Effort:** High. 12-18 months. Start with data catalog and schema alignment.

#### C. API Gateway & Service Mesh Consolidation (Medium-Term)

**Current state (likely):** Separate API layers for each product. Separate rate limiting, monitoring, authentication at the API level.

**Target state:** Shared API gateway with product-specific routing. Common observability and rate limiting.

**Value:**
- Operational simplicity (one pane of glass for all API health)
- Foundation for public API / partner ecosystem (new revenue stream)
- Shared caching layer across products
- Reduces per-product DevOps overhead

**Effort:** Medium. 6-9 months.

#### D. Shared Compute & Database Infrastructure (Long-Term)

**Current state (likely):** Separate AWS accounts, separate database clusters, separate Kubernetes clusters (or no K8s for Jeppesen legacy).

**Target state:** Consolidated cloud accounts with shared platform services (logging, monitoring, secrets management, CI/CD) but product-specific workload isolation.

**Value:**
- Reserved Instance pooling across all products = better discount tiers
- Shared SRE/platform engineering team (don't need product-specific ops)
- Standardized security posture (critical for IL5)
- 20-35% reduction in total infrastructure overhead

**Effort:** High. 12-24 months. Don't merge databases — unify the platform layer.

#### E. Support & Operational Tooling Consolidation (Quick Win)

**Current state (likely):** Separate monitoring stacks, separate incident management, separate on-call rotations.

**Target state:** Unified observability (Datadog, Grafana, or similar), shared incident management (PagerDuty/OpsGenie), consolidated on-call.

**Value:**
- Fewer tools = lower licensing costs
- Cross-trained on-call = fewer people needed
- Unified dashboards = faster incident resolution
- Single SLA framework across all products

**Effort:** Low-medium. 3-6 months.

### 3.3 What NOT to Consolidate (Yet)

- **Application code.** Don't merge codebases. Maintain separate deployable services.
- **Release cycles.** Products have different customer expectations and regulatory constraints.
- **Databases.** Shared platform ≠ shared data stores. Keep logical separation.
- **Product roadmaps.** Consolidation is an engineering initiative, not a product merger.

---

## 4. Test Automation as a Cost Savings Engine {#4-test-automation}

### 4.1 The ROI Case for Test Automation

You have a dedicated test engineering team. This is a PE gold mine if positioned correctly.

**The math:**

| Metric | Manual Testing | Automated Testing |
|--------|---------------|-------------------|
| Cost per test execution | $15-50 (engineer time) | $0.01-0.10 (compute time) |
| Regression suite execution | 2-5 days | 2-4 hours |
| Release frequency enabled | Monthly/quarterly | Daily/weekly |
| Defect escape rate | 15-25% | 3-8% |
| Production incident cost | $5K-100K per incident | Prevention cost: pennies |

**For a company the size of Jeppesen ForeFlight:**
- If you're running 1,000 manual test cases per release cycle: that's ~100 person-days per release
- Automating 80% saves ~80 person-days per release
- At 12 releases/year: **960 person-days saved = ~4 FTEs worth of work**
- At $200K/FTE fully loaded: **~$800K/year in direct savings or reallocable capacity**

### 4.2 Aviation-Specific Test Automation Priorities

Aviation software has unique testing requirements that make automation even more valuable:

**Priority 1: Data Integrity Testing (Highest Value)**
- Automated validation of aeronautical data publications (charts, nav data, obstacle data)
- Data is published on 28-day AIRAC cycles — this is a fixed, predictable testing cadence
- **Wrong data in aviation = potential loss of life.** Automation here is a safety AND cost play.
- Automated regression of data processing pipelines against known-good outputs

**Priority 2: API Contract Testing**
- FliteBrief ↔ Aviator EFB communication
- ForeFlight ↔ backend service contracts
- Third-party integrations (avionics manufacturers, flight planning services)
- Contract tests run in seconds, catch breaking changes before deployment

**Priority 3: Performance & Load Testing**
- Automated performance baselines for backend services
- Load testing that simulates realistic traffic patterns (morning departure rush, weather events)
- Catch performance regressions before they cause outages
- Particularly critical during infrastructure consolidation migrations

**Priority 4: Cross-Platform Integration Testing**
- End-to-end scenarios: file a flight plan on ForeFlight → appears in FliteBrief → delivered to cockpit via Aviator
- Currently likely tested manually (if at all) across product boundaries
- Automation here directly validates the consolidation thesis

**Priority 5: Security & Compliance Testing**
- Automated security scanning in CI/CD pipeline
- SAST/DAST running on every commit
- Compliance control validation (critical for IL5/FedRAMP path)
- Automated evidence collection for audit trails

### 4.3 Test Automation KPIs to Report

| Metric | Current (Estimate) | 90-Day Target | 1-Year Target |
|--------|-------------------|---------------|---------------|
| Automated test coverage (%) | 20-40% | 50% | 80% |
| Regression suite execution time | 3-5 days | 1 day | 4 hours |
| Release frequency | Monthly | Bi-weekly | Weekly |
| Defect escape rate to production | 15-20% | 10% | 5% |
| Mean time to detect regression | Days | Hours | Minutes |
| Manual QA FTEs required per release | 8-12 | 5-7 | 2-3 |

### 4.4 India Team Leverage for Test Automation

The India team is strategically positioned for test automation work:
- Test automation development is well-defined, measurable work that translates well across time zones
- AIRAC cycle testing is calendar-driven, making workload predictable
- India cost advantage: ~$60-80K/engineer vs. $200-300K in US = 3-4x leverage
- Build the automation framework and standards in the US, scale execution and maintenance in India

---

## 5. Platform Modernization in PE Timeframes {#5-platform-modernization}

### 5.1 The PE Reality: 3-5 Year Exit Horizon

Thoma Bravo's typical hold period is 3-5 years (occasionally longer). The deal closed November 2025, so the target exit window is **2028-2030**. This fundamentally shapes what "modernization" means:

**What PE cares about at exit:**
- Revenue growth rate
- EBITDA margin (and trend)
- Customer retention / net revenue retention
- Scalability of the platform (can it absorb add-on acquisitions?)
- Technical debt (is this a liability or manageable?)
- Recurring revenue quality

**What PE does NOT care about:**
- Whether you use the latest framework
- Microservices vs. monolith religious debates
- "Best practices" that don't move financial metrics
- Rewriting things that work

### 5.2 Modernization That Fits PE Timelines

#### Tier 1: Must-Do Modernization (Directly impacts exit value)

**Unified APIs for cross-sell enablement (0-12 months)**
- Build the API layer that lets sales bundle Jeppesen + ForeFlight products
- This directly enables revenue growth, the #1 PE value lever after initial margin improvement
- Every $1M in incremental revenue at a 15x revenue multiple = $15M in exit value

**Observability & reliability modernization (0-6 months)**
- Modern monitoring, alerting, and incident management
- Directly reduces COGS (fewer incidents, faster resolution, smaller on-call team needed)
- Improves gross margin on support — something PE sponsors explicitly evaluate

**CI/CD modernization (0-6 months)**
- Automated deployments, feature flags, canary releases
- Enables faster product iteration = faster revenue growth
- Reduces deployment risk = fewer production incidents

#### Tier 2: Strategic Modernization (Builds exit narrative)

**Data platform consolidation (6-18 months)**
- Unified data pipeline for aeronautical data across all products
- "Single platform" narrative is worth billions at exit (multiple expansion)
- Enables "platform" positioning vs. "collection of products"

**Self-service customer administration (6-12 months)**
- Customer portal for account management, subscription changes, user provisioning
- Reduces support headcount (COGS) and improves customer NPS
- Standard PE playbook across all Thoma Bravo portfolio companies

**Containerization of legacy services (6-18 months)**
- Migrate remaining non-containerized services (likely Jeppesen legacy) to containers
- Enables infrastructure consolidation savings
- Makes the platform acquirer-friendly (important for exit)

#### Tier 3: Opportunistic Modernization (If resources allow)

**API-first architecture for partner ecosystem (12-24 months)**
- Public APIs for avionics manufacturers, FBO chains, airline IT departments
- Creates platform lock-in and potential API-based revenue stream
- Increases switching costs (PE loves this)

**Event-driven architecture migration (12-24 months)**
- Move from request/response to event-driven for appropriate workloads
- Reduces coupling between Jeppesen and ForeFlight services
- Enables real-time data delivery (competitive advantage)

### 5.3 Modernization Anti-Patterns in PE Context

🚫 **"Big bang" rewrites** — No PE sponsor will fund a 2-year rewrite with no incremental value. Use the strangler fig pattern.

🚫 **Technology-for-technology's-sake** — Migrating to Kubernetes because it's modern, without a cost/velocity case, won't impress anyone.

🚫 **Over-engineering for scale you don't have** — Build for 3x current load, not 100x. PE wants capital efficiency.

🚫 **Ignoring revenue-generating maintenance** — Legacy systems that generate revenue are assets, not liabilities. Stabilize them, don't rewrite them.

🚫 **Infrastructure projects without business metrics** — Every initiative needs a dollar sign attached to it.

---

## 6. The Timeline — Quick Wins, Medium-Term, Long-Term {#6-the-timeline}

### Phase 1: Quick Wins (Days 0-90) — "Stop the Bleeding, Show Momentum"

**Goal:** Demonstrate cost awareness and operational discipline. Build credibility with PE sponsors.

| Initiative | Impact | Effort | EBITDA Impact |
|-----------|--------|--------|---------------|
| Cloud cost audit & RI/SP optimization | Immediate | 1-2 engineers, 2 weeks | 15-30% cloud cost reduction |
| Kill orphaned resources (unused instances, volumes, snapshots) | Immediate | 1 engineer, 1 week | $50K-500K/yr |
| Consolidate monitoring tools (eliminate duplicate licenses) | 30 days | 1-2 engineers | $50K-200K/yr |
| Establish DORA metrics baseline (deploy frequency, lead time, MTTR, change failure rate) | 30 days | 1 engineer | Visibility |
| Automate top 5 most common manual operational tasks | 60 days | 2-3 engineers | 1-2 FTE equivalent saved |
| Begin test automation of AIRAC cycle regression testing | 60-90 days | Test engineering team | Foundation for Phase 2 |
| Inventory all infrastructure across both Jeppesen and ForeFlight | 30 days | 1 engineer | Foundation |
| Implement cost tagging across all cloud resources | 14 days | 1 engineer | Visibility → future savings |
| Create unified on-call rotation across products | 30 days | Leadership time | Operational simplification |

**Deliverable to PE:** Cost savings report with before/after numbers. DORA metrics baseline. Infrastructure inventory.

### Phase 2: Medium-Term (Months 3-12) — "Build the Platform, Prove the Thesis"

| Initiative | Impact | Effort | EBITDA Impact |
|-----------|--------|--------|---------------|
| Unified authentication / identity across products | Cross-sell enablement | 3-4 engineers, 6 months | Revenue enablement |
| Common observability stack (consolidated Datadog/Grafana) | Operational efficiency | 2 engineers, 3 months | 20-30% reduction in ops overhead |
| CI/CD standardization across all products | Developer velocity | 2-3 engineers, 4 months | Faster time-to-market |
| Test automation to 50-60% coverage | Release velocity + quality | Test team, ongoing | ~$400K-800K/yr in QA savings |
| Database optimization program (query tuning, indexing, connection management) | Performance + cost | 1-2 engineers, ongoing | 15-25% DB cost reduction |
| API gateway consolidation | Operational simplification | 2 engineers, 4 months | Foundation + cost reduction |
| Begin data pipeline alignment (schema mapping, data catalog) | Consolidation foundation | 2 engineers, 6 months | Foundation |
| Self-service customer admin portal (reduce support burden) | Support cost reduction | 3-4 engineers, 6 months | $200K-500K/yr support savings |
| Container migration for legacy Jeppesen services | Infrastructure flexibility | 2-3 engineers, ongoing | Foundation |

**Deliverable to PE:** Quarterly infrastructure cost trend (declining). Test automation ROI report. Cross-product integration milestones. DORA metrics improvement.

### Phase 3: Long-Term (Year 1-3) — "Platform Scale, Exit Readiness"

| Initiative | Impact | Effort | EBITDA Impact |
|-----------|--------|--------|---------------|
| Unified data pipeline across all products | Platform consolidation | Dedicated team, 12-18 months | 30-40% data infrastructure savings |
| Public API / partner ecosystem | New revenue stream + lock-in | 3-4 engineers, 12 months | Revenue growth |
| Platform capability for bolt-on acquisition integration | M&A readiness | Architecture + standards | Multiple expansion at exit |
| IL5/FedRAMP certification (military/government market) | TAM expansion | Dedicated team, 18-36 months | $10M+ TAM expansion |
| Event-driven architecture for real-time data | Competitive differentiation | Ongoing migration | Reduced infrastructure + better product |
| Multi-tenant platform architecture | Enables volume pricing | Architecture evolution | Revenue scalability |

**Deliverable to PE:** "Platform" narrative for exit — unified technology, proven integration playbook, expandable via M&A, government-market ready.

---

## 7. Metrics & Visibility — Making Your Impact Legible to PE {#7-metrics-and-visibility}

### 7.1 The Metrics That Matter

PE operating partners don't read sprint retrospectives. They read financial dashboards. Translate your engineering work into their language:

**Cost Metrics (Monthly)**
| Metric | What to Track | Why PE Cares |
|--------|--------------|-------------|
| Infrastructure cost / revenue | Total cloud + hosting / total revenue | Gross margin driver |
| Cost per API request | Total infra cost / total API calls | Efficiency at scale |
| Cost per active user | Total infra cost / MAU | Unit economics |
| Support ticket volume (engineering-caused) | Tickets from bugs/outages | Gross margin on support |
| Manual operations hours | Hours spent on manual ops tasks | Headcount efficiency |

**Velocity Metrics (Monthly)**
| Metric | What to Track | Why PE Cares |
|--------|--------------|-------------|
| Deployment frequency | Deploys per week per product | Revenue velocity |
| Lead time for changes | Commit → production | Feature delivery speed |
| Change failure rate | % of deploys causing incidents | Quality = lower support cost |
| MTTR | Minutes to restore service | Reliability = retention |

**Quality Metrics (Monthly)**
| Metric | What to Track | Why PE Cares |
|--------|--------------|-------------|
| Automated test coverage | % of critical paths covered | Release confidence |
| Defect escape rate | Bugs found in prod / total bugs | Support cost predictor |
| Uptime / SLA adherence | Per product, per service | Customer retention |
| P1/P2 incidents per month | Trend over time | Operational maturity |

### 7.2 Reporting Cadence

- **Weekly:** Operational dashboard (uptime, incidents, deployments) → your boss
- **Monthly:** Cost trend + velocity metrics → your boss + CPO
- **Quarterly:** Strategic progress report (consolidation milestones, test automation ROI, cost savings) → formatted for PE operating partner consumption

### 7.3 Framing Your Narrative

When communicating to PE (through your boss/CPO), frame everything in three categories:

1. **"We reduced cost by $X"** — Direct EBITDA impact. Most credible.
2. **"We enabled $X in revenue"** — Cross-sell capabilities, faster feature delivery.
3. **"We eliminated $X in risk"** — Compliance, uptime, security. Frame as "downside protection."

**Example narrative for a quarterly review:**
> "Backend engineering delivered $1.2M in annualized infrastructure cost savings through cloud optimization and tool consolidation. Test automation reduced our regression cycle from 5 days to 6 hours, enabling bi-weekly releases (up from monthly) and reducing QA labor costs by $400K annually. We completed phase 1 of identity consolidation, which product reports is enabling $2M in cross-sell pipeline for Q3."

---

## Appendix A: Thoma Bravo Playbook — What We Know

From quantitative analysis of public Thoma Bravo deals (Instructure, SolarWinds, Informatica):

- **R&D as % of revenue:** Typically reduced from 30%+ to 15-20%
- **Operating margin improvement:** 40-50 percentage point swings in 2-3 years
- **Revenue growth:** Maintained or accelerated (driven by pricing, not just customer acquisition)
- **Cost cuts:** Positioned as "one-time events" — restructure once, then grow
- **Phase 1 focus:** Rapid margin improvement (months 0-18)
- **Phase 2 focus:** Profitable growth + add-on acquisitions
- **Operating partner involvement:** Board-level, focused on KPI tracking and management coaching
- **CEO assessment priority:** Open-mindedness, caring about numbers, strong followership
- **Product quality signal:** Gross margin on support — low margins = product problems

## Appendix B: Revenue Lever Opportunities Under Your Scope

While your primary lever is cost, you also enable revenue in specific ways:

| Opportunity | How Backend Enables It | Estimated Impact |
|------------|----------------------|-----------------|
| Product bundling (Jeppesen + ForeFlight) | Unified identity, unified billing APIs | Unlocks cross-sell |
| Usage-based pricing tiers | API metering, usage analytics | 10-20% ARPU increase |
| Self-service onboarding | Provisioning APIs, automated fleet setup | Reduces sales cycle |
| Partner / API ecosystem | Public APIs with rate limiting & billing | New revenue stream |
| Government / military market | IL5/FedRAMP backend infrastructure | $10M+ TAM |
| White-label / OEM licensing | Multi-tenant architecture | New channel |

## Appendix C: Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Consolidation causes outages | Medium | High | Strangler fig pattern, canary deployments, rollback plans |
| Key person dependency on legacy Jeppesen systems | High | High | Knowledge transfer program, documentation sprints, pair programming across teams |
| Denmark team attrition during transition | Medium | High | Retain senior Jeppesen engineers, involve them in architecture decisions |
| India team ramp-up slower than expected | Medium | Medium | Start with well-defined test automation work, invest in onboarding docs |
| Over-cutting causes capability gaps | Medium | High | Maintain a "capability map" — know who can do what before any further reductions |
| IL5 timeline delays | High | Medium | Start gap assessment early, hire dedicated program management |
| Post-layoff morale impacting velocity | High | Medium | Quick wins, visible impact, autonomy, clear vision for remaining team |

---

*This document is a living reference. Update as you learn the actual state of the Jeppesen technology stack and as PE operating partner priorities become clearer.*
