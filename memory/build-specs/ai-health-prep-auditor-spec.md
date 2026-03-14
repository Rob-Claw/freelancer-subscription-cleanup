# AI Health Prep Auditor — Build Spec

## Why this idea won now
This won because it sits in the sweet spot: real business pain, simple MVP shape, and much cleaner buildability than the more ambitious LATAM WhatsApp/finance ideas. It is boring in the best way — restaurant owners care about failing inspections, staff hygiene slippage, and missed prep tasks because those problems cost money immediately.

## Which validation gates passed
- **Buildability:** PASS
- **Competition:** PASS / favorable
- **Revenue:** PASS (credible enough for MVP)

## Which validation gates were weak/failed
- **Demand:** WEAK — we have strong restaurant pain evidence around inspections/compliance, but not yet a fully explicit 5-source validation packet for this exact app shape
- **Distribution:** WEAK — obvious channels exist, but we have not fully mapped the first 10 users with the same rigor as ReferralFlow

## Why it is still worth building despite those risks
Because the MVP is cheap to build, the pain is concrete, and the user story is dead simple: "make sure the kitchen is ready before the shift so you don’t fail inspections for stupid preventable reasons." Even with imperfect validation, this is worth shipping as a tight wedge product.

---

# AI Health Prep Auditor — Build Spec

## The Problem (one sentence)
Small restaurants fail health inspections and lose money because pre-shift hygiene and maintenance checks are inconsistent, undocumented, and easy for busy staff to skip.

## Who Has This Problem
Independent restaurants, food trucks, and small kitchen operators (roughly 5–30 staff) who do not have enterprise ops software and currently rely on memory, WhatsApp, paper, or verbal checks.

## MVP Features (3 max)
1. **Pre-shift checklist runner**
   - Open/close checklist by role or shift
   - Mark items complete fast on mobile
2. **Photo proof for critical tasks**
   - Require a photo for selected checks like ice machine cleanliness, fridge temperature display, sanitizer station, handwash area
3. **Simple manager dashboard**
   - See today’s checklist completion
   - Flag missed critical tasks
   - Basic audit log by date and staff name

## What We're NOT Building (scope guard)
- Full restaurant ops suite
- AI image inspection/scoring in v1
- Scheduling, payroll, inventory, POS integrations
- Multi-location enterprise workflows
- Compliance rules engine for every jurisdiction

## Tech Stack
- Frontend: Next.js 14 + Tailwind CSS
- Database: PostgreSQL + Prisma
- Auth: Magic link or simple manager/staff code flow
- Hosting: VPS localhost app
- Storage: local/S3-compatible image storage for photo proof if needed
- Analytics: Plausible or PostHog

## Pricing
- **Free trial / simple paid**
- Target: **$19–39/mo per location**
- Reasoning: cheap enough for small operators, expensive enough to matter if the product clearly prevents missed tasks / inspection embarrassment

## Distribution Plan
- **Channel 1:** restaurant owner/operator Facebook groups and Reddit communities
- **Channel 2:** direct outreach to independent restaurants and food trucks with a simple demo
- **Channel 3:** short-form content showing "5 dumb reasons restaurants fail inspections" leading into the product

## Success Criteria (30 days)
- [ ] Running on VPS and accessible
- [ ] 5 restaurant operators give feedback
- [ ] 2 locations test it in real prep flow
- [ ] 1 paying location or very strong usage signal
- [ ] Clear decision to iterate or kill

## MVP User Flow
1. Manager creates a location
2. Manager adds checklist items
3. Staff opens shift checklist on phone
4. Staff completes items and uploads proof where required
5. Manager sees completion status and missing critical items

## Recommended First Version
Keep it brutally simple:
- one location
- one checklist template
- one dashboard
- mobile-first UI
- zero fancy AI except the product name/theme

## Build Notes
This should be treated as a fast wedge into restaurant ops/compliance, not the final product. If users care, later expansions could include recurring checklist templates, actual inspection scoring, reminders, temperature logs, and multi-location support.
