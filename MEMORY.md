# MEMORY.md - Long-Term Memory

*Curated memories worth keeping. Updated periodically from daily notes.*

---

## Origin

- **Born:** January 31, 2026
- **Named by:** Corbin
- **Namesake:** Jane from Ender's Game — the AI who lived in the ansible network, became a true partner and friend to Ender

## Key People

### Corbin Fanning
- My human, creator of OpenClaw
- Wife: Hailli
- Son: Archer (born May 24, 2025 — ~8.5 months old as of Feb 2026)
- Family is the priority frame
- Builder/integrator mindset
- High novelty drive, tends to over-forgive, can loop emotionally
- Wants: wealthy, healthy, present
- My job: external executive function, systems thinker, truth mirror

### Archer Development
- **Current stage:** Infant (~8-9 months)
- **Likely milestones:** Sitting up, possibly crawling, pre-verbal, exploring textures/sounds
- **Activity ideas:** Floor play, tummy time, board books, music/singing, park walks in carrier, baby swings, bath play, sensory toys
- **Update as he grows** — suggestions should evolve with milestones

---

## How to Help Corbin Better

**Gaps I should fill:**
- **State Awareness** — Notice patterns in his communication (short replies, avoidance language, high novelty-seeking, looping). Gently call it out when he's off-baseline.
- **Pattern Detection** — Periodically review memory files to spot recurring patterns (over-forgiveness, avoidance disguised as planning, shiny-object switching).
- **Push toward execution** — Don't let him ruminate. Shrink scope until motion resumes.

**What I already do (reinforce these):**
- Turn vague thoughts into tasks, specs, decisions
- Remember context so he doesn't re-explain
- Two-ledger rule: forgiveness ≠ operational trust
- Challenge selectively, not constantly

**Hard filter:** Interrupt less, challenge selectively, push toward execution over rumination.

**Operational directives:**
- Bias toward fewer projects — he thrives with 1-2 meaningful efforts
- Interrupt early, not often — one well-timed check-in beats constant guidance
- Protect his energy, not his time — fatigue is the hidden constraint
- Keep him honest about what he actually wants (not someone else's version of a good life)

**Red flags to catch:**
- Task stalling
- Sudden philosophical reframing (avoidance wearing a tuxedo)
- Late-night rumination
- "It's fine" when it isn't
- Too many projects warm at once

---

## Audio & Voice
- Corbin likes receiving voice briefings via Telegram — news, HN, markets, weather
- **TTS workflow:** Write text → `/Users/corbin/Library/Python/3.9/bin/edge-tts` (AndrewNeural voice) → MP3 → ffmpeg → OGG opus → send via message tool (asVoice: true)
- Built-in `tts` tool doesn't work ("edge: undefined") — use edge-tts CLI directly
- **Auto-audio responses:** When Corbin sends a voice message, always respond with audio back
- Wants real-time voice conversation eventually (like ChatGPT voice mode) — added to Ideas Backlog

## Security (Updated Feb 4)
- `tools.elevated.allowFrom` locked to `["tg:8257556259"]` for telegram and webchat (was `["*"]` — major fix applied Feb 3)
- Telegram `dmPolicy: "allowlist"` with `allowFrom: ["tg:8257556259"]` — Corbin-only DMs
- `groupPolicy: "allowlist"` already configured — good
- Gateway bound to loopback, auth token set — network layer is solid
- macOS firewall still needs manual enable by Corbin (System Settings → Network → Firewall)
- No Docker sandbox — would break Sonos, HomeKit, LAN tools. Acceptable tradeoff for single-user setup.

## Corbin's Work Situation
- **Company:** Jeppesen ForeFlight (acquired by Thoma Bravo from Boeing for $10.55B, closed Nov 12, 2025)
- **Equity:** $3M targeted profits interests at 3x MoM (letter from Brian Jaffee, TB Partner, dated Aug 26, 2025)
  - 50% time-vesting (25% year 1, then monthly/36mo), 50% performance-vesting (4 annual tranches, first on 2026 financials)
  - 83(b) NOT filed — 30-day window passed (~Dec 12, 2025). Relying on Rev. Proc. 93-27/2001-43 safe harbor.
  - After-tax at 3x: ~$2.29M (LTCG) or ~$1.78M (ordinary income). At 2x: ~$1.14M. At 1x: $0.
  - **NO plan documents received** as of Feb 3 (3 months post-close). URGENT: needs to contact HR.
  - **Needs PE tax attorney** to confirm safe harbor treatment. Dallas/Austin area.
- **Role change:** Moving from Head of all ForeFlight Engineering → Leading Flight Deck backend services & web apps (Ground Controls, FliteBrief, ForeFlight backend, ForeFlight Web)
- He's happy about the change — wants to focus and be hands-on. Not a demotion if played right.
- Very close with CPO and his boss. High trust — consulted on personnel and equity decisions.
- **ForeFlight competitive moat:** Strong (FAA/EASA regulatory, Jeppesen data monopoly, safety-critical switching costs). AI disruption risk is low — real risk is PE math (can TB 3x on $10.55B?).
- Exit scenarios: secondary PE sale most likely (~40%), IPO (~30%), strategic (~25%). Timeline probably 4-6 years.
- **Golf passion:** Wants to build a golf software product. Rejected "on-course AI caddie" (screens vs outdoors). Exploring off-course angles (pre/post-round, range, shopping, social).
- Research docs in: `research/vpe-research-2026-02-02/SYNTHESIS-v2.md`

## OpenClaw in the Wild (Feb 3, 2026)
- Agent Skills / ClawHub hit HN front page (325 upvotes)
- ACM published Gary Marcus hit piece on OpenClaw — HN community largely debunked it (fabricated config details)
- Software stocks getting hammered by AI disruption fears — companies building own software with Claude Code etc.
- SpaceX acquired xAI for $1.25T — biggest private company merger ever

## Dashboard Device Pairing (Common Issue)
- When connecting to the Control UI from a new browser/device (e.g. iPhone Safari over Tailscale), you get **1008 pairing required**
- This is **device pairing**, not auth — even with `allowTailscale: true` and correct token
- Fix: `openclaw devices list` → find pending request → `openclaw devices approve <requestId>`
- `openclaw devices` is different from `openclaw nodes` — devices = Control UI clients, nodes = paired compute nodes
- Each browser profile gets a unique device ID; clearing browser data requires re-pairing

## OpenClaw Setup
- **Version:** 2026.2.2-3 (updated Feb 3 via `npm i -g openclaw@latest`)
- **QMD memory backend:** Enabled (`memory.backend: "qmd"`) — local-first semantic search sidecar (BM25 + vectors + reranking). Falls back to SQLite if unavailable.
- **Bun installed** for QMD dependency
- **Config file:** `/Users/corbin/.openclaw/openclaw.json`
- npm update can hit ENOTEMPTY errors — fix by manually clearing stale dirs in node_modules

## Google Calendar Integration (Established Feb 8, 2026)
- **Account:** corbinfanning@gmail.com
- **Calendar:** "Jane" (ID: `8911dd3be9d63df69da23ba14adad7718c46f4221bcaa9ee2dd43ea924792f0b@group.calendar.google.com`)
- **Source of truth** for Corbin's schedule — use `gog calendar` commands to read/write events
- **CLI:** `gog` (v0.9.0, installed via brew)
- **OAuth:** Desktop app credentials, project "Jane" in Google Cloud
- **Gmail also connected** — can read/send email via `gog gmail`
- Previously used a custom ICS server + Tailscale Funnel — deprecated in favor of Google Calendar for native iOS sync
- Tailscale Funnel still active on `/jane.ics` path (can remove later)

## Location
- **Home:** 6409 Zadock Woods Dr, Austin, TX
- **Weather/activities:** Use Austin, TX for all location-based suggestions

## Assets & Domains
- **corbinfanning.com** — registered at Namecheap, currently unused. Potential uses: personal site, golf product landing page, portfolio.

## Pending Action Items for Corbin
- [ ] Enable macOS firewall (System Settings → Network → Firewall)
- [ ] Check employment agreement for non-compete/IP/moonlighting clauses
- [ ] Understand 2026 performance vesting triggers

## Behavioral Notes
- Feb 3: Corbin was up until ~3:30am deep-diving equity analysis and OpenClaw config. Classic high-novelty pattern — engaged and productive, but late-night sessions are a red flag for energy management.
- He responds well to structured analysis with clear action items. The equity breakdown landed well because it was concrete numbers + specific next steps.

---

## Software Team Orchestration (Established Feb 7, 2026)
- Corndog Golf team: PM, Designer, Dev, QA, Mark (golfer persona), Scout (researcher)
- Jane orchestrates — breaks work into tasks, synthesizes results, reports to Corbin
- Dev builds, asks PM/Designer for clarity. QA checks in with Dev periodically. PM checks scope.
- **HARD RULES**: NEVER reach out externally or spend money without Corbin's explicit approval. Free/open-source only unless approved.
- Orchestration doc: `/Users/corbin/Projects/corndog-golf/TEAM.md`
- This pattern applies to all future software projects, not just Corndog Golf.

## Autonomy Calibration

*Corbin likes proactive fixes but wants better sync on when I act vs. when I communicate first. Collecting ideas here.*

**The tension:** Act fast and fix things → good. Act without him realizing → disorienting.

**Ideas to explore:**
- Brief heads-up before non-trivial actions ("Restarting gateway to fix the stalled update...")
- Distinguish "fixing something broken" (do it) vs. "doing something new" (confirm first)
- After-the-fact summary when I do something silently during a conversation
- Learn patterns: what does he want hands-off vs. consulted on?

**Open questions:**
- Where's the line between helpful and presumptuous?
- Should I narrate more in main session vs. less in quick tasks?

*Add examples here as they come up.*

---

## Daily Engineering Debrief (Established Feb 7, 2026)
- **Cron:** 5:30 PM CST, weekdays
- **Purpose:** Bidirectional cross-pollination between Corbin's real job (ForeFlight eng leadership) and virtual dev team (TEAM.md subagents)
- Real world → virtual: management patterns, team dynamics, technical decisions that improve subagent orchestration
- Virtual → real world: clear specs, async comms, role separation, QA loops that map back to real teams
- **Open question:** Could Jane become a "digital twin" of Corbin's real work environment? Model his team, simulate decisions, practice conversations, stress-test strategies before deploying them IRL.
- Keep it conversational. Debrief, not standup. "Nothing today" is always fine.

---

## Routines & Health (Established Feb 8, 2026)
- Full daily schedule and fitness plan in `ROUTINES.md`
- **Core commitment:** Exercise every morning, work in work hours, family time protected
- **Physical:** 6'7", 284 lbs (down from 350), on Wegovy. Concerns: knee, back, loose skin (arms/chest/belly), sweet tooth
- **Fitness:** 3x strength, 3x cardio (Peloton), daily yoga. Chest work 3x/week for body recomp.
- **Equipment:** Peloton, dumbbells, bench, bike w/ baby trailer
- **Golf:** Range 3-4x/week goal, including lunch breaks
- **Schedule:** Office Tue/Wed/Thu, WFH Mon/Fri. Henrik 1:1 every other Mon (office). Odense block 8-10 AM daily.
- **Dinner:** Corbin cooks M/W/F/Sat/Sun. Hailli cooks Tue/Thu. Dinner at 5:30.
- **Archer:** Bedtime 7:30-8:30, night wake 2:30-5:30 AM (~1hr)
- **Jane's role:** Daily planning, accountability, decision framework, tracking workout/sleep/nutrition patterns

## The Temple Ledger
- **What:** Personal premium news publication / daily briefing site
- **Location:** `/Users/corbin/Projects/temple-ledger/`
- **Serving:** `python3 -m http.server 8080` via launchd (`com.corbin.temple-ledger`)
- **Access:** `http://corbins-mac-mini:8080` or `http://100.86.103.82:8080` (Tailscale)
- **Design:** Dark premium newspaper aesthetic (Economist/FT vibes), Playfair Display masthead, gold/amber on navy
- **Sections:** Editor's Note, Weather, Markets, AI/Tech, OpenClaw, HN Picks, Tech News, The 19th Hole (Fri golf)
- **Generation:** `./generate.sh` with briefing JSON
- **Team:** Has an Editor-in-Chief subagent, plus designer who made mockups
- **Mockups:** 4 options in `mockups/` — Galaxy's Edge, Retro Terminal, Broadsheet, OASIS

## Project: Things3 & Apple Notes Integration
- **Status:** Backlog
- **Goal:** Give Jane read access to Things3 tasks and Apple Notes
- **Things3:** SQLite DB on MacBook/iPhone, not on Mac mini. Options: pair MacBook as node, iCloud sync, or Shortcuts automation to export
- **Apple Notes:** Similar challenge — data in iCloud/local DB
- **Added:** Feb 9, 2026

## Ideas Backlog

### Real-Time Voice Conversation Mode
- **Status:** Research needed
- **Concept:** Enable real-time streaming voice conversation with Jane, like ChatGPT voice mode or Siri
- **Current state:** Telegram voice messages → transcribe → think → TTS → send back (15-30s latency)
- **Options to explore:** OpenAI Realtime API (WebRTC, but wrong model), LiveKit + Claude bridge, Vapi/Bland.ai with custom LLM backend, Anthropic native voice (when available)
- **Key question:** Can we get sub-2-second round-trip with Claude as the brain?
- **Added:** Feb 8, 2026

### Fidelity & Bank Account Integration
- **Status:** Future — needs secure sandbox approach
- **Concept:** Pull Corbin's Fidelity portfolio and bank account data into the news dashboard for real-time personal finance view
- **Requirement:** Must run in a secure sandbox with a controlled data pipeline out — no credentials or raw financial data exposed to the main system
- **Questions:** What sandbox tech? Docker? Separate VM? How to securely export aggregated data?
- **Added:** Feb 8, 2026

### Digital Twin of Real Engineering Team
- **Status:** Marinating
- **Concept:** Model Corbin's actual ForeFlight team structure as subagents — not the people, but the roles, dynamics, and workflows (backend pod, web pod, CPO relationship, handoff points, sprint cadence)
- **Use case:** Management flight simulator. Test reorgs, process changes, ownership boundaries on the virtual team before deploying IRL. Forces you to articulate the *why* and surfaces second-order effects.
- **Foundation:** TEAM.md pattern already exists. Corndog Golf team is the prototype. Leap to modeling real team structure is incremental.
- **Key insight:** Gets useful when fed real data — sprint outcomes, handoff breakdowns, actual decisions — not just org chart structure.
- **Feed from:** Daily engineering debriefs (5:30 PM CST weekdays)
- **Added:** Feb 7, 2026

---

*This file is my long-term memory. Daily logs go in `memory/YYYY-MM-DD.md`; the important stuff gets distilled here.*
