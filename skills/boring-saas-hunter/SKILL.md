---
name: boring-saas-hunter
description: >
  Automated micro-SaaS idea research pipeline. Researches real problems people complain about
  across niche verticals using last30days, scores competition, validates demand, maintains a
  ranked backlog, picks the best candidates for build days, and tracks post-launch performance.
  Use when the user wants to find SaaS ideas, research a niche, check the backlog, validate
  an idea, pick something to build, or review how launched apps are performing.
argument-hint: 'research [niche], status, pick, validate [idea], track'
allowed-tools: Bash, Read, Write, WebFetch, message
user-invocable: true
---

# Boring SaaS Hunter

Find real problems people pay to solve. Research them, validate them, build them, track them.

**Origin story:** This skill produced PayFlip — a cash-to-card tool for restaurants — from a single research run that found cash-only restaurants losing sales when customers can't pay by card. The system works. Trust the process.

## Philosophy

- **Boring beats clever.** Invoice tools, appointment schedulers, compliance checkers — unsexy problems with steady revenue.
- **Pain over preference.** "I NEED this" beats "this would be nice." Look for frustration, not wishes.
- **Small market, low competition.** A $5K/mo niche with zero competitors beats a $5M/mo market with 50.
- **Ship fast, validate faster.** Weekend MVP → deploy → see if anyone cares. Kill fast if not.
- **Revenue is the only metric that matters.** Signups are vanity. Paying users are validation.

---

## First Run — Onboarding

When this skill is first loaded and no backlog exists yet, have a conversation with the user. Don't dump instructions — talk to them.

Start with:

> "Hey! Let's get your SaaS research pipeline going. A few quick questions so I can tailor the research to you."

Ask naturally, one at a time, reacting to their answers:

1. **What industries do you know?** "Do you have experience in any specific industry? Restaurant owner, dentist, work in HVAC? Personal experience is a huge advantage — you already know the pain points."

2. **What's your build capacity?** "Can you ship a working MVP in a weekend? What's your stack — Next.js, Python, something else? This affects what ideas are realistic."

3. **What's your revenue goal?** "Are you looking for $500/mo side income or trying to build to $5K+/mo? This changes which ideas are worth pursuing."

4. **Location advantage?** "Are you based somewhere specific? LATAM, US, Europe? Some niches are geography-dependent and being local is a massive edge."

Based on their answers:
- Customize the niche rotation (put their known industries first)
- Set realistic build expectations
- Store preferences in `~/.openclaw/workspace/memory/boring-saas-config.json`

```json
{
  "knownIndustries": ["restaurants", "real-estate"],
  "techStack": "Next.js + PostgreSQL + Railway",
  "buildCapacity": "weekend MVP",
  "revenueGoal": "$2K/mo",
  "location": "Colombia",
  "locationAdvantage": ["LATAM government services", "Spanish-speaking markets"],
  "nicheRotation": ["restaurants", "LATAM government", "dentists", "salons", "HVAC", "lawyers", "accountants", "freelancers", "real-estate", "retail", "AI beginners", "small-business-US"],
  "lastResearchedIndex": 0,
  "createdAt": "2026-03-07"
}
```

---

## Commands

The user can invoke these directly:

- **`boring-saas-hunter research [niche]`** — Run deep research on a specific niche
- **`boring-saas-hunter research`** — Run research on the next niche in rotation
- **`boring-saas-hunter status`** — Show the current backlog with scores
- **`boring-saas-hunter pick`** — Select the best idea for the next build day
- **`boring-saas-hunter validate [idea]`** — Deep-dive validation on a specific idea
- **`boring-saas-hunter track`** — Show post-launch performance of all built apps
- **`boring-saas-hunter niches`** — Show and edit the niche rotation list

---

## Phase 1: Research

Research is the foundation. Bad research → bad ideas → wasted build days.

### How to Research a Niche

When researching a niche (either from cron or manual trigger), follow this exact process:

#### Step 1: Problem Discovery with last30days

Run multiple targeted queries using the `last30days` skill. This is your primary research engine — it scans Reddit, X, YouTube, TikTok, Hacker News, and the web, then synthesizes findings with real citations and engagement metrics (upvotes, likes, comment counts).

Run these queries for each niche:

```
last30days "[niche] problems software"
last30days "[niche] frustrated with tools"
last30days "[niche] wish there was an app"
last30days "[niche] spreadsheet workaround"
last30days "[niche] small business software"
```

**Why these queries work:**
- "problems software" → finds people complaining about existing tools
- "frustrated with tools" → finds pain points with current solutions
- "wish there was an app" → finds unmet demand expressed directly
- "spreadsheet workaround" → finds people duct-taping solutions together (strongest signal — they have the problem AND are actively trying to solve it)
- "small business software" → finds discussions about what's missing in the market

last30days returns grounded narratives with direct quotes, engagement metrics, and source breakdowns (e.g. "8 Reddit threads + 31 X posts"). Each run takes 2-8 minutes and auto-saves the full briefing to `~/Documents/Last30Days/`. Use the engagement metrics to gauge how widespread a problem is — a complaint post with 400 upvotes is a very different signal than one with 2.

**What to look for in results:**
- **Recurring complaints** across multiple posts/platforms — one person ranting is noise, 10 people with the same complaint across Reddit AND X is signal
- **Workarounds people have built** — spreadsheets, Zapier chains, manual processes. If someone built a hacky solution, they'd pay for a real one
- **Emotional language** — "I HATE that...", "drives me crazy", "waste of time" → real pain
- **Willingness to pay signals** — "I'd pay for...", "is there a tool that...", "shut up and take my money"
- **High engagement on complaint posts** — last30days shows upvote/like counts. A Reddit complaint with 200+ upvotes = widespread problem

**What to ignore:**
- Generic complaints with no specifics ("software sucks")
- Problems that only huge enterprises have (can't serve them with a weekend MVP)
- Problems that require deep domain expertise you don't have (medical devices, financial compliance)
- One-off rants with no engagement (just one angry person)

#### Step 2: Competition Analysis

For every promising problem found, check what already exists:

```
last30days "best [niche] [problem] software"
last30days "alternatives to [existing tool]"
```

Then also check directly:
- **Google/web search**: "best [problem] software for [niche]"
- **G2/Capterra**: Search the category — look at ratings, pricing, number of reviews
- **Product Hunt**: Search for similar tools — when were they launched? Still active?
- **App Store / Google Play**: If it's a mobile-friendly problem

**Competition Scoring Rubric:**

| Signal | Score | Why |
|--------|-------|-----|
| Zero competitors found | 🟢 EASY | Blue ocean — validate that demand actually exists though |
| 1-3 competitors, all have bad reviews or outdated UI | 🟢 EASY | Market exists, solutions are weak — best scenario |
| 1-3 competitors, one is decent but expensive ($50+/mo) | 🟢 EASY | Undercut on price with a simpler tool |
| 3-5 competitors, mixed quality | 🟡 MEDIUM | Possible if you have a clear differentiator |
| Dominant player with strong brand (Square, Toast, etc.) | 🔴 HARD | Skip unless you're serving a niche they ignore |
| VC-funded competitors with free tiers | 🔴 HARD | Can't compete on price, they'll outlast you |

**Key question:** Can you build something 10x simpler that solves the core problem for 1/10th the price? If yes, competition doesn't matter.

#### Step 3: Save to Backlog

After research is complete, append findings to `~/.openclaw/workspace/memory/boring-saas-backlog.md` using the format in `references/format.md`.

**Critical rules:**
- APPEND only — never overwrite existing backlog entries
- Include the date, niche, source citations, and engagement metrics from last30days
- Every idea gets a competition score with justification (not just a color)
- Note the specific last30days queries that produced the best results
- Update the config to mark this niche as researched and advance the rotation index

---

## Phase 2: Validation

**This is the most important phase. Most ideas die here — and that's the point.** Validating before building saves entire weekends of wasted work.

When the user runs `validate [idea]` or the picker selects an idea, run it through these gates:

### Gate 1: Demand Check — "Do at least 5 real people have this problem?"

Go back to last30days results (or run fresh queries). Find **5 distinct people** expressing this exact pain in the last 30 days. Not vague complaints — specific, actionable frustration.

```
last30days "[specific problem] [niche]"
last30days "[specific problem] solution"
```

- **5+ distinct complainers with engagement** → PASS — real demand confirmed
- **2-4 complainers** → WEAK — might work for a very small niche, proceed with caution
- **0-1 complainers** → FAIL — you imagined this problem, move on

### Gate 2: Willingness to Pay — "Is someone already paying for a bad solution?"

This is the strongest signal. If people currently pay for something that solves this problem badly, they'll pay for something that solves it well.

Check:
- Are there competitors charging money? (Even bad ones)
- Are people paying for workarounds? (Hiring VAs, buying templates, paying for Zapier)
- Are businesses in this niche spending on related tools? (Check G2 pricing pages)

```
last30days "[niche] software pricing"
last30days "[niche] tool cost"
```

- **Competitors charge $20+/mo and have paying users** → STRONG PASS
- **People pay for workarounds (VAs, consultants, templates)** → PASS
- **Everything is free and nobody pays** → FAIL — no market

### Gate 3: Buildability — "Can you ship an MVP this weekend?"

Evaluate honestly:
- Can you build the core feature in 1-2 days with your stack?
- Does it need external APIs you don't have access to? (payment processing, SMS, maps)
- Does it need data you can't get? (proprietary databases, licensed content)
- Does it need regulatory compliance? (HIPAA, PCI, financial regulations)

- **Solo dev, 1-2 days, standard stack** → PASS
- **Needs 1 external API but it's accessible** → PASS with note
- **Needs proprietary data, compliance, or >1 week of work** → FAIL — scope it down or skip

### Gate 4: Distribution — "How will the first 10 users find this?"

The best product nobody knows about makes $0. Before building, identify:
- Where do these people already hang out online? (specific subreddits, Facebook groups, forums)
- Can you post about it there without being spammy?
- Is there a direct outreach angle? (cold email small businesses, partner with industry associations)
- Can you get organic search traffic? (SEO for "[niche] [problem] tool")

- **Clear distribution channel identified** → PASS
- **"I'll figure it out after building"** → FAIL — figure it out NOW or don't build

### Validation Verdict

Validation is a prioritization system, **not a hard stop**.

Use these verdicts:

| Result | Action |
|--------|--------|
| 4/4 PASS | → Move to READY. Strongest build candidate. |
| 3/4 PASS | → Move to READY-WITH-RISK. Buildable, but note the weak gate explicitly. |
| 2/4 PASS | → Keep in BACKLOG, but it is still eligible if it is the best option available for build day. |
| 1/4 or fewer PASS | → Usually DROP unless there is an unusually strong strategic reason to build anyway. |
| Any HARD FAIL | → Prefer DROP, but if the user explicitly wants momentum over purity, you may still pick the best available idea and mark the hard-fail risk clearly. |

**New build rule:** if no idea cleanly passes, still pick the best candidate worth building and explicitly state which gates are weak or failed. Do not let the system stall just because nothing is perfect.

Update the backlog entry with validation results:

```markdown
### [Idea Name]
- Competition: 🟢 EASY — [justification]
- Validation: PASSED (4/4)
  - Demand: 7 distinct complainers on Reddit + X (source: last30days)
  - WTP: Competitors charge $29-79/mo, all have 3-star reviews on G2
  - Buildability: Next.js + Prisma + Railway, 2-day build
  - Distribution: r/[subreddit] (45K members), cold email via Google Maps listings
- Status: READY
```

---

## Phase 3: Build Day

When the picker selects an idea (or the user says "let's build"), create a focused build spec.

### Build Spec

When selecting an idea for build day, always include a short preface before the build spec:
- **Why this idea won now**
- **Which validation gates passed**
- **Which validation gates were weak/failed**
- **Why it is still worth building despite those risks**

Generate `~/.openclaw/workspace/memory/build-specs/[app-name]-spec.md`:

```markdown
# [App Name] — Build Spec

## The Problem (one sentence)
[From research, with citation from last30days]

## Who Has This Problem
[Specific persona]

## MVP Features (3 max)
1. [Core feature that solves the main pain]
2. [Feature that makes #1 usable]
3. [Feature that makes users come back]

## What We're NOT Building (scope guard)
- [Feature that's tempting but not MVP]
- [Feature that adds a week of work for marginal value]

## Tech Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Database: PostgreSQL + Prisma (or SQLite for ultra-simple)
- Auth: [if needed — magic link, Google OAuth, or none for MVP]
- Hosting: VPS (localhost, accessed via SSH tunnel)
- Analytics: Plausible or PostHog (free tier)

## Pricing
- [Free / Freemium / Paid from day 1]
- [If paid: price point and justification from competitor research]

## Distribution Plan
- [Channel 1: specific subreddit/group with member count]
- [Channel 2: cold outreach method]
- [Channel 3: SEO keyword target]

## Success Criteria (30 days)
- [ ] Running on VPS and accessible
- [ ] 10+ signups
- [ ] 1+ paying user (if paid model)
- [ ] Clear signal to continue or kill
```

### Build Process — Handoff to Dev Agent

**Do NOT build the app yourself.** Hand off to the Dev agent, who handles all implementation, testing, deployment, and tracking.

### Build-Day Reliability Rule

Build day should be **self-healing**.

If the build-day runner does not find a fresh READY handoff, it must **not** immediately skip. Instead:
1. Check whether a recent unbuilt spec already exists in `~/.openclaw/workspace/memory/build-specs/`
2. If not, re-run picker logic against the backlog in the same build-day turn
3. Generate a fresh spec for the best candidate worth building now
4. Then hand off to Dev

Only skip if, after this recovery path, there is still no viable candidate. The pipeline should prefer momentum over dead air.

#### How to Hand Off

After generating the build spec at `~/.openclaw/workspace/memory/build-specs/[app-name]-spec.md`, send a message to the Dev agent:

```
message developer "New build ready: [App Name]. Spec at ~/.openclaw/workspace/memory/build-specs/[app-name]-spec.md. Run build-app [app-name]-spec.md"
```

The Dev agent will:
1. Read the build spec
2. Scaffold the project (Next.js + TypeScript + Prisma + Tailwind)
3. Implement all MVP features from the spec
4. Test (`npm run build` must pass)
5. Create a git branch, commit, push, and create a PR
6. Deploy to VPS on an available port
7. Update `boring-saas-tracker.json` with the new app
8. Report back with the PR URL and SSH tunnel command

#### What You Do After Handoff

- **Wait for Dev to report completion.** Don't check in repeatedly.
- **Once Dev reports done:** verify the tracker was updated, then update the backlog entry (see below).
- **If Dev reports a failure:** review the error, fix the build spec if needed, re-send.

#### Build Rules (enforced by Dev)
1. **Ship ugly.** Functional > beautiful. This is an MVP.
2. **Deploy to VPS immediately.** Localhost with a dedicated port. No Railway, no Vercel.
3. **Add analytics from day 1.** Track what matters.
4. **Register the port.** Dev updates the tracker automatically.

After build, update the backlog entry:

```markdown
- Status: LAUNCHED
- VPS Port: [PORT]
- SSH Tunnel: ssh -i ~/.ssh/openclaw_ed25519 -L [PORT]:localhost:[PORT] openclaw@5.161.91.237 -N
- Launched: 2026-03-15
- Stack: Next.js + PostgreSQL + VPS
```

## Phase 4: Post-Launch Tracking

**This is the feedback loop. Without it, you're just building and hoping.**

For every launched app, track weekly.

### Tracked Metrics

Store in `~/.openclaw/workspace/memory/boring-saas-tracker.json`:

```json
{
  "apps": [
    {
      "name": "AppName",
      "vpsPort": 3000,
      "sshTunnel": "ssh -i ~/.ssh/openclaw_ed25519 -L 3000:localhost:3000 openclaw@5.161.91.237 -N",
      "projectPath": "~/projects/app-name",
      "launched": "2026-03-07",
      "niche": "niche",
      "problem": "one sentence",
      "status": "LAUNCHED",
      "weeklyChecks": [
        {
          "week": "2026-03-14",
          "pageViews": 0,
          "signups": 0,
          "payingUsers": 0,
          "revenue": 0,
          "notes": "Just launched, no distribution yet",
          "action": "Start Reddit/cold outreach this week"
        }
      ],
      "distributionLog": [
        {
          "date": "2026-03-14",
          "channel": "r/restaurantowners",
          "action": "Posted asking for feedback",
          "result": "12 upvotes, 3 comments, 2 signups"
        }
      ],
      "decision": null
    }
  ]
}
```

### Decision Framework (Weekly Review)

After each weekly check, apply this framework:

**Week 1-2: Distribution Phase**
- Focus entirely on getting the first 10 users
- Don't change the product yet — just get it in front of people
- If you can't get 10 people to even LOOK at it, the distribution plan needs fixing

**Week 3-4: Signal Check**

| Signal | Meaning | Action |
|--------|---------|--------|
| 10+ signups, 1+ paying | Product-market fit signal | DOUBLE DOWN — add features, invest in growth |
| 10+ signups, 0 paying | Interest but no conversion | Fix pricing, paywall, or value proposition |
| 1-9 signups, engaged | Weak distribution, product might be fine | Fix distribution — try new channels |
| 0 signups after real outreach | No demand or wrong audience | KILL IT — move on, research was wrong |

**The Kill Decision:**
If after 4 weeks of real effort (not passive waiting) there are zero paying users and minimal signups, kill the app. Update the backlog:

```markdown
- Status: KILLED
- Killed: 2026-04-07
- Reason: "No signups after posting in 3 subreddits and 50 cold emails"
- Lesson: "Problem was real but users not willing to pay / better free alternatives exist"
```

**Lessons are the most valuable output of a killed app.** They prevent you from making the same mistake twice. Always record why it failed.

---

## Niche Rotation

Default rotation (customize during onboarding):

| # | Niche | Why |
|---|-------|-----|
| 1 | restaurants | High pain, low-tech owners, proven (PayFlip) |
| 2 | dentists | Appointment + compliance pain, willing to pay |
| 3 | HVAC | Field service gaps, existing tools are expensive |
| 4 | salons | Booking + inventory, fragmented market |
| 5 | small business US | Broad, good for finding cross-niche patterns |
| 6 | small business LATAM | Underserved, language advantage if Spanish-speaking |
| 7 | lawyers | Document + billing pain, high willingness to pay |
| 8 | accountants | Seasonal workflow pain, compliance needs |
| 9 | freelancers | Invoice + client management, huge market |
| 10 | real estate agents | CRM + listing pain, commission-funded budgets |
| 11 | retail shops | Inventory + POS gaps, Square/Toast don't cover everything |
| 12 | AI beginners | Tool overwhelm, prompt management, workflow gaps |

The daily cron advances through this list one niche per day, cycling back to #1 after #12.

---

## Cron Jobs

Set up three cron jobs through OpenClaw's cron system:

### 1. Daily Research (9:00 PM user's timezone)

```
Schedule: daily at 21:00
Task:
  1. Load config from ~/.openclaw/workspace/memory/boring-saas-config.json
  2. Get the next niche from rotation (advance index)
  3. Run Phase 1 research (5 last30days queries + competition analysis)
  4. Append findings to backlog
  5. Update config with new rotation index
  6. Message user: "Researched [niche] tonight. Found [N] ideas, best one: [name] (score)."
```

### 2. Build Day Picker (Wednesday + Saturday, 2:00 PM user's timezone)

```
Schedule: Wed,Sat at 14:00
Task:
  1. Read the full backlog
  2. Prioritize the strongest candidates based on competition, revenue potential, buildability, and validation notes
  3. Run Phase 2 validation on the top 3 candidates if needed
  4. Pick the best idea worth building now — even if it has weak or failed gates
  5. Generate build spec
  6. Message user: "Build day! I picked [idea]. Worth building because [reason]. Risks: [weak gates]."
```

### 3. Build Day Runner (Wednesday + Saturday, 10:00 PM user's timezone)

```
Schedule: Wed,Sat at 22:00
Task:
  1. Check tracker for an existing READY / READY-WITH-RISK handoff that has not been launched
  2. If none exists, look for the newest unbuilt spec in ~/.openclaw/workspace/memory/build-specs/
  3. If no unbuilt spec exists, re-run picker logic immediately against the backlog and generate one
  4. Hand the selected spec to Dev / workflow for implementation
  5. Only skip if there is still no viable candidate after the recovery path
  6. Message user clearly whether it built, recovered, or truly skipped
```

### 4. Weekly Tracker (Sunday, 10:00 AM user's timezone)

```
Schedule: Sun at 10:00
Task:
  1. For each LAUNCHED app in the tracker
  2. Check if the app is still running: curl -s http://localhost:[PORT]
  3. Update weekly metrics (if analytics configured)
  4. Apply the decision framework
  5. Message user: "[App]: [X] signups, [Y] paying. Recommendation: [action]."
```

---

## Files

```
~/projects/[app-name]/                  # Each app is a standalone project
  src/
  prisma/
  package.json
  .env

~/.openclaw/workspace/memory/
  boring-saas-config.json               # User preferences, niche rotation state
  boring-saas-backlog.md                # All researched ideas with scores (append-only)
  boring-saas-tracker.json              # Post-launch tracking for all built apps
  build-specs/
    [app-name]-spec.md                  # Build spec for each picked idea

~/.openclaw/workspace/skills/boring-saas-hunter/
  SKILL.md                              # This file
  references/
    format.md                           # Output format templates

~/workspace/mission-control/
  README.md                             # Port registry and project index
  projects/
    [app-name].md                       # Per-project docs
```

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Treating validation like a hard blocker | Use validation to rank risk, not to freeze action |
| Building before validating | Run all 4 validation gates first, but still build the best candidate if nothing passes cleanly |
| Saving vague ideas to backlog | Every idea needs specific problem, audience, competition score with justification |
| "I'll find users later" | Distribution plan BEFORE building. No plan = no build. |
| Ignoring killed apps | Record the lesson. Killed apps teach you what NOT to build. |
| Over-scoping the MVP | 3 features max. Ship ugly. Add polish after validation. |
| Passive waiting after launch | Actively distribute for 4 weeks. No organic traffic will come on its own. |
| Researching the same niche twice in a row | Follow the rotation. Variety finds unexpected opportunities. |
| Competition = skip | Competition means demand exists. Only skip if there's a dominant well-funded player. |
| Running generic last30days queries | Be specific: "dentists frustrated scheduling software" not "dentist problems" |
| Not reading last30days engagement metrics | A complaint with 400 upvotes is 100x more signal than one with 2 |
| Pushing to GitHub/Railway for every app | Apps are standalone on the VPS. Run on localhost, access via SSH tunnel. |
| Port conflicts | Check what's already running before picking a port. Register ports in mission control. |
