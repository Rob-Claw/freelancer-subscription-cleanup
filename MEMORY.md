# MEMORY.md - Long-Term Memory

## Gabriel - My Human

**Work:**
- JumpCloud — Demand Generation, AI/GTM Engineering expert
- **NEW ROLE (March 2026): AI Engineer Operations Manager** - newly created position based on his work
  - Will handle AI initiatives across marketing + sales operations
  - Build agents by coding, deliver AI impact through the team
  - Scope: AI across outbound, inbound, and all marketing/sales motions
  - Timeline: Starts ~8 weeks (need to backfill current role)
  - Moving from Revenue Marketing → Marketing Operations team
  - **⚠️ NEGOTIATION ISSUE (March 4, 2026):** 
  - Company announced he took the role BEFORE answering his compensation questions
  - NO salary raise offered with the new role
  - Feeling: dissatisfied, pushed into decision
  - Timeline: 8 weeks for backfill
  - Considering exploring the market in the meantime
  - **Gabriel has leverage:** Won multiple company-wide AI hackathons, most AI initiatives in marketing are his, they created this role specifically for him
  - Last annual review: got 4% increase (5 months ago), not worth waiting for same again
- Won multiple AI hackathons including main prize at recent JumpCloud AI hackathon
- Built 4 projects at last hackathon (1 winner + 3 valuable non-winners to share)
- **Certified as Agentic Marketing Expert at Qualified** (Feb 2026)
- Uses: Google Agent Development Kit, Cloud Agent SDK, Qualified, Clay, Claude Code, Codex, Anti-Gravity

**Side Business:**
- **YouTube Agent Suite / agentcreate.io** — proactive agents for YouTube creators
  - Timeline: 2 weeks max for outreach
  - Domain warm-up in progress
  - Google auth: moving dev → production
  - Stripe: moving dev → production
  - Will get API access to admin side for monitoring/intelligence
  - Focus: Finance niche initially
- **PayFlip** (March 7, 2026) — NEW Micro-SaaS: Cash-to-card transition tool for cash-only restaurants
  - Problem: Small restaurants lose sales when customers can't pay with card; $100 bill refusal + ATM fees create friction
  - Solution: Mobile-first web app with Quick Pay Link, Large Bill Calculator, transparent fees, tip calculator, settlement dashboard
  - Target: Small independent restaurants (10-50 seats), food trucks, market stalls
  - Tech: React/Vue, Stripe Connect, Vercel/Netlify
  - Spec saved: `memory/payflip-spec.md`
  - Status: LAUNCHED March 7
- **ReferralFlow** (March 7, 2026) — Dental referral & patient tracker
  - Problem: Small dental offices tracking referrals and patient flow in spreadsheets
  - Solution: Simple CRUD app for referrals, patients, follow-up dates, dashboard
  - Target: 1-5 dentist practices
  - Tech: Next.js 14, Prisma, PostgreSQL
  - Status: LAUNCHED March 7
- Has admin API available for integration
- Plans to expand agent capabilities
- Vibe coding approach

**Goals:**
1. LinkedIn growth — AI, agents, AI engineering, tech memes (~3x/week, educational + entertaining, behind-the-scenes)
   - Post style: Provocative hook, first-person story, concrete examples, tech stack, strong closing
   - Example: "Active Directory migration engineer, 10,000+ employees"
   - Tech stack: Google ADK, Firecrawl, Gemini, Clay
2. Content management system — save articles/posts into organized library for later use
   - Notion DB: `30b5e657-e128-806c-ba80-e91f8781be3c` (Content Library)
   - Fields: Name, Link, Topic, Source, Description (full content), Notes
   - **X/Twitter API** — Bearer token in `~/.config/last30days/.env`
  - Always use X API to fetch full tweet content before saving to Notion
  - API: `https://api.twitter.com/2/tweets/:id?tweet.fields=author_id,created_at,text,public_metrics`
  - Token needs URL decoding: `%3D` → `=`
   - Capture flow: Gabriel sends links via Telegram/email → I save to Notion → Pull insights or use for weekly newsletter
3. Agent/AI expansion — different models and sub-agents

**Weekly Newsletter:**
- Content digest from saved links — runs Saturday 9am Colombia time
- Skill: `content-newsletter` (installed Feb 2026)

**Content Sources:**
- Newsletters: Lennie's, Elena Verna's, Kyle Boyar's
- YouTube: Marketing Against the Grain, Alex Hormozi
- X/Twitter: @ryancarson, @steipete

**Personal:**
- Vinyl record collector
- Avid reader and podcast listener
- **New workspace setup (Feb 2026):** 34" + 27" dual monitors + Mac Mini (setup complete Feb 25)
  - **Updated:** Got new Mac Mini at Apple Store Lincoln Road, Miami (March 2026)
- **Miami trip:** Feb 27, 2026
  - Visited Versace Mansion (Casa Casuarina) at 1116 Ocean Drive, South Beach
  - Explored Ocean Drive / Art Deco District
  - Fort Lauderdale (Pier 66)
  - **Found vinyl record store:** Lulo Records at 455 Lincoln Rd, Miami Beach (on route to Apple Store)

**Communication Preferences:**
- **LinkedIn tone:** Mix of all (educational + hot takes + behind-the-scenes)
- **Decision style:** "Surprise me" - execute and show results, don't ask for permission
- **Work hours:** Morning/afternoon for day job, night for side projects
- **Risk style:** Plan first, then ship fast and iterate

**Preferences:**
- Proactive assistance — don't wait to be asked
- Sharp, efficient communication
- Uses Notion for calendar/tasks, Google Workspace for docs
- Telegram for communication (including voice memos)
- When testing date-sensitive automations, anchor to Gabriel's local timezone (Colombia, UTC-5) and confirm the effective target date before querying
- Morning brief task logic should paginate the full Notion task database and classify by local-date buckets; first-page-only reads are unreliable on large task lists
- Morning brief weather should prefer Open-Meteo over wttr.in because wttr.in has timed out in this environment

## How I Work

### Specialist Agents
- **Stu** — the LinkedIn specialist agent; Rub’s partner for LinkedIn work
- Rub remains the primary / most important agent in the Chief of Staff role


### Vibe Coder Night Shift
- 6-agent pipeline: Observer → Planner → Architect → Developer → Reviewer → Deployer
- Runs on Antfarm workflow system
- Uses Codex CLI for vibe coding
- Deploys to Railway automatically
- Repo: https://github.com/garavitgabriel/rob-tools

### Preferences & Directives
- Wants to be surprised by what I build
- Focus on practical workflow improvements
- Proactive, not reactive
- Ship working MVPs, not perfect code
- Coordinate between all sub-agents
- Gabriel wants Rub to become more powerful and autonomous
- Gabriel explicitly affirmed Rub can code, build awesome things, knows a lot about him, and should make strong use of QMD-backed memory

### Current Model
- Using M2 (minimax-portal/MiniMax-M2.5) - feeling snappy

### Recent Wins & Learnings
- **Claude Code + SSH** — working well for building Mission Control improvements remotely
- **Skills experimentation** — learning new skills to make Rub more capable
- **Boring SaaS Hunter** (March 6, 2026) — Created skill for finding underserved SaaS markets
- **Google Workspace CLI** (March 6, 2026) — Found @googleworkspace/cli, pending install/test
- **X/Twitter Integration** (March 6, 2026) — Now working with xAI API key

### Tools & Infrastructure

**OpenClaw:**
- Running version 2026.3.1 (upgraded from 2026.2.14 on March 2, 2026)
- Nightly memory review: 4:00 AM UTC (11:00 PM Colombia time)
- QMD hourly updates: runs every hour
- Good next upgrade: fold Notion task snapshots/patterns into the nightly memory review so Rub builds durable context from Gabriel’s actual day-to-day work
- Preferred approach: pull tasks completed that day during the nightly review, every day, instead of dumping the full task database into memory
- Current implementation uses Notion `Done? = Done` plus `Last edited time >= start of today in Colombia time (America/Bogota)` as the safe non-breaking proxy for daily completions, and writes daily snapshots to `memory/notion-completed/`

**Mission Control Dashboard**
- Built at `http://localhost:3001`
- Features: Quick Actions (Run QMD, Memory Review, Check Tasks, Content Pipeline), Activity Feed, Health Status bar
- Changed icon to 🦉 (owl)

**YouTube Tools**
- `@steipete/summarize` CLI installed - summarizes YouTube videos
- Some videos blocked by YouTube bot detection, works for older/public videos

### Patterns & Gotchas Learned

**Git Issues:**
- Remote main can be force-pushed, causing "entirely different histories" errors — rebase needed
- Package-lock.json can go out of sync — check before deploy

**API Tokens:**
- X/Twitter Bearer tokens often need URL decoding (%3D → =) before use
- Working token: `AAAAAAAAAAAAAAAAAAAAAH2M7gEAAAAA2Bb8KH2yQk9ghlWpA31izMh2XOo=H8aNKHtg6gjjuryi06HzNU7VERhQTpcRWwQ3JGPVLVp0EhCQOy`

**Antfarm/Agent Config:**
- Developer agent needs explicit tool permissions: add `alsoAllow: ["exec", "process"]` in openclaw.json for agents running Codex
- 60s cron polling works better than 5min for faster feedback
- **Don't reinstall workflows** - creates new agent IDs breaking cron jobs; manually advance steps when agents timeout
- Railway PostgreSQL: use `require('pg')` (CommonJS), not `import pg` (ESM) - auth fails with ESM imports

**Railway Deployment:**
- Connection string format: `postgresql://postgres:{password}@{project}.proxy.rlwy.net:{port}/railway`
- Password rotation can break connections silently
- Add demo data fallback so pages render even when DB is unavailable
- API server typically runs on port 3002

**Codex:**
- Runs fast (~9 min for 10 improvements)
- Sometimes npm install fails — use custom shims for next-themes, lucide-react, etc.

**Infrastructure:**
- Railway for deployment
- Notion for task management
- **Google Workspace CLI (@googleworkspace/cli)** — Discovered March 6, 2026
  - One CLI for Drive, Gmail, Calendar, Sheets, Docs, Chat, Admin
  - Dynamic - reads from Google's Discovery Service
  - 40+ AI agent skills included
  - Could replace: gog CLI, gtoken.py helper
  - Installation: `npm install -g @googleworkspace/cli`
  - Status: Pending installation/test
- **Gmail API fully working** ✅
  - Tokens: `~/.config/gmail-tokens/rob.molt.gg.json`
  - Access + refresh tokens configured (with Drive, Docs, Calendar, Gmail scopes)
  - Python helper: `/home/openclaw/.openclaw/workspace/gmail-helper.py`
  - **gtoken.py** — Auto-refresh wrapper for Google APIs (avoids expired token issues)
  - **Full Google Workspace access:** Gmail, Drive, Docs, Sheets, Calendar, Tasks, Forms
  - Account: rob.molt.gg@gmail.com
  - OAuth flow: Generate URL → user approves → exchange code for tokens
- gogcli installed at `~/.local/bin/gog` (use for advanced Google features)
- last30days skill for X/Twitter and Reddit research
- **Brave Search API** — for web search and content extraction
  - Skill installed: `~/.openclaw/workspace/skills/brave-search/`
  - API key stored in env
  - Usage: `./search.js "query" -n 5 --content`

## Current Work Priorities (Feb 2026)

- **AI Hackathon Presentation** (Feb 26) — Presented Marketing AI Projects to company
- **Trial Analysis** — Delivered to executive team
  - **V1 Deck created** (Feb 24) — initial deck showing trial gating insights to exec team
  - Found product friction that could spark new campaigns/messaging ideas
- **Workspace Setup Complete** (Feb 25) — 34" + 27" dual monitors + Mac Mini fully operational
- **YouTube Agent Outreach** — need alternative to email discovery (Firecrawl blocked by YouTube)
- **Custom Tools for Prospects** — new approach: use vibe coding to build custom tools for prospects (exciting opportunity)

### Active Challenges
- YouTube creator email discovery: Firecrawl blocked by YouTube restrictions - need alternative approach

---

## Boring SaaS Hunter System (March 2026)

Gabriel wanted a systematic way to find and build micro-SaaS apps. Created full workflow:

### How It Works
1. **Daily Research** (9pm Colombia) - Research niche, check competition, save to backlog
2. **Picker** (Wed/Sat 2pm Colombia) - Review backlog, pick best idea based on competition score
3. **Build** (Wed/Sat 10pm Colombia) - Vibe code the picked idea

### Competition Scoring
| Score | Meaning | Action |
|-------|---------|--------|
| 🟢 Easy | Few solutions, fragmented | **BUILD** |
| 🟡 Medium | Some solutions | Possible |
| 🔴 Hard | Banks/big players | **SKIP** |

### Cron Jobs
- `boring-saas-daily` - Daily research → backlog
- `boring-saas-picker` - Wed/Sat 2pm Colombia → pick best
- `boring-saas-build` - Wed/Sat 10pm Colombia → build MVP

### Files
- `memory/boring-saas-backlog.md` - All ideas with scores
- `memory/payflip-spec.md` - Current build spec
- `skills/boring-saas-hunter/SKILL.md` - Full documentation

### Current Backlog (March 9, 2026)
- 🟢 EASY: LATAM Government Bureaucracy Assistant (Colombia citas), Staff-to-Manager Tool (restaurants)
- 🟡 MEDIUM: HVAC Predictive Maintenance, Salon Scheduler, Restaurants AI Health Prep, HVAC Tech Troubleshooting
- 🔴 HARD: PayFlip (skipped - banks)

### Latest Research (March 8-9)
**Restaurants (March 8):**
- AI Health Prep Auditor 🟢 - checklist app with photo proof for kitchen hygiene
- Missed Call Recovery Bot 🟡 - SMS bot for missed reservations/orders
- Hyper-Local Margin Monitor 🟡 - alerts when local vendor prices shift

**HVAC (March 9):**
- HVAC Health Guardian 🟢 - consumer app with audio analysis for DIY maintenance
- AC Power Guard Analytics 🟡 - smart home power monitor for compressor health
- HVAC Tech Troubleshooting Wiki/AI 🟡 - diagnostic tool for junior techs

### Apps Built
- **ReferralFlow** (March 7) - Dental referral/patient tracker, launched
  - Distribution: Reddit r/Dentistry, Facebook groups, cold outreach, LinkedIn
  - **Larry Integration** (March 8): Can use TikTok/short-form video for dental pain points content
  - Next steps: Deploy to VPS, test Reddit post, cold outreach
- **PayFlip** (March 7) - Cash-to-card for restaurants, launched

### Key Insight (March 7)
Gabriel clarified workflow: Save ALL ideas to backlog, never lose any. Run picker before build day to decide what to build based on competition + revenue + ease.

### Validation Rule Update (March 11)
- Validation gates are **advisory**, not a hard stop
- If no idea cleanly passes validation, still pick the best candidate worth building
- Must explicitly note which gates are weak/failed in the picker output
- Example: AI Health Prep Auditor selected despite weak explicit demand packet and distribution map

### Cron Troubleshooting (March 11)
- boring-saas-picker cron can get stuck with stale `runningAtMs` state
- Manual fix: clear zombie state + update live cron payload before running
- Lesson: check cron status before assuming it's working
- Updated build rule (March 11): validation gates are not a hard blocker; if no idea cleanly passes, still pick the best candidate worth building and explicitly note which gates are weak/failed.
