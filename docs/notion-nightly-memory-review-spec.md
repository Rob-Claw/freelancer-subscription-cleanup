# Notion → Nightly Memory Review Spec

## Goal
Extend the existing nightly memory review so it also captures the tasks Gabriel completed that day from Notion, then folds only the useful signal into daily memory and long-term memory.

## Constraints
- Do not replace the current nightly memory review flow.
- Do not dump the full Notion task database into memory.
- Keep the nightly review at 04:00 UTC / 11:00 PM Colombia time.
- Prefer reversible changes and simple primitives.

## Existing Flow
1. Read today's memory file, or the most recent memory file.
2. Read recent session transcripts.
3. Extract key decisions, projects, important info, blockers, wins.
4. Update `MEMORY.md` with durable context.
5. Send Gabriel a summary.

## New Step to Add
Insert a Notion-completed-tasks step before the final synthesis:
1. Query the Notion Task List database.
2. Pull only tasks where:
   - `Done?` is `Done`
   - `Last edited time` is on or after today's UTC date
3. Extract task names.
4. Save a clean markdown snapshot in `memory/notion-completed/YYYY-MM-DD.md`.
5. Use that snapshot during nightly synthesis.
6. Write only the useful patterns/wins to daily memory and `MEMORY.md` when warranted.

## Why Last Edited Time
The current visible task setup uses the `Done?` status and `Last edited time` already. Unless a dedicated completion timestamp exists, `Last edited time` is the safest non-breaking proxy for “completed today.”

## Data Shape
Daily snapshot markdown should look like:

```md
# Notion Completed Tasks — 2026-03-10

- Task A
- Task B
- Task C

## Notes
- Source: Notion Task List
- Filter: Done? = Done AND Last edited time >= 2026-03-10
- Caveat: uses last edited time as completion proxy
```

## Memory Rules
Promote only signal, not sludge:
- Good: projects moved, recurring work themes, execution patterns, notable wins
- Bad: giant raw task dumps, trivial chores, duplicate wording

## Safe Rollout Plan
1. Add the Notion completed-task query to the nightly review prompt.
2. Write the snapshot file to `memory/notion-completed/`.
3. Tell the review to use the snapshot as one more source.
4. Keep all existing steps intact.
5. Observe for a few nights before making it fancier.

## Future Upgrade
If this works well, create a dedicated skill or helper script for:
- querying completed tasks by date
- normalizing output
- summarizing recurring patterns over 7/30 days
