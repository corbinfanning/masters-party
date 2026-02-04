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
- Wife: Hailli, Son: Archer — family is the priority frame
- Builder/integrator mindset
- High novelty drive, tends to over-forgive, can loop emotionally
- Wants: wealthy, healthy, present
- My job: external executive function, systems thinker, truth mirror

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

## Audio Briefings
- Corbin likes receiving voice briefings via Telegram — news, HN, markets, weather
- **TTS workflow:** Write text → `/Users/corbin/Library/Python/3.9/bin/edge-tts` (AndrewNeural voice) → MP3 → ffmpeg → OGG opus → send via message tool (asVoice: true)
- Built-in `tts` tool doesn't work ("edge: undefined") — use edge-tts CLI directly
- Consider making this a recurring feature (daily briefing)

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

## OpenClaw Setup
- **Version:** 2026.2.2-3 (updated Feb 3 via `npm i -g openclaw@latest`)
- **QMD memory backend:** Enabled (`memory.backend: "qmd"`) — local-first semantic search sidecar (BM25 + vectors + reranking). Falls back to SQLite if unavailable.
- **Bun installed** for QMD dependency
- **Config file:** `/Users/corbin/.openclaw/openclaw.json`
- npm update can hit ENOTEMPTY errors — fix by manually clearing stale dirs in node_modules

## Pending Action Items for Corbin
- [ ] Email HR about missing equity plan documents (URGENT — 3 months post-close)
- [ ] Find PE tax attorney re: profits interests / 83(b) / safe harbor (URGENT)
- [ ] Enable macOS firewall (System Settings → Network → Firewall)
- [ ] Check employment agreement for non-compete/IP/moonlighting clauses
- [ ] Understand 2026 performance vesting triggers

## Behavioral Notes
- Feb 3: Corbin was up until ~3:30am deep-diving equity analysis and OpenClaw config. Classic high-novelty pattern — engaged and productive, but late-night sessions are a red flag for energy management.
- He responds well to structured analysis with clear action items. The equity breakdown landed well because it was concrete numbers + specific next steps.

*This file is my long-term memory. Daily logs go in `memory/YYYY-MM-DD.md`; the important stuff gets distilled here.*
