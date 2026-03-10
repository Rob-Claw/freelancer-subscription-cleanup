---
name: morning-brief
description: Daily morning briefing for Gabriel. Fetches weather, classifies Notion tasks into focus-today/overdue, upcoming, and open-without-date buckets, shows completed-yesterday items using Colombia time, checks the content library, and shares a productivity tip. Use when running or fixing Gabriel’s morning brief automation.
---

# Morning Brief Skill

Generate Gabriel's daily morning brief in a way that matches how he actually works, not a lazy generic task dump.

## Core behavior

### 1. Weather
- Fetch Bogotá weather.
- If weather fails, say so briefly and move on.

### 2. Notion tasks
Use **Task List 2026** database: `2fd5e657-e128-808b-a866-cfd42dc0ad3c`

**Critical facts:**
- `Done?` is a **Status** property, not a checkbox.
- `Date` is the task due/scheduled date.
- For Gabriel, task logic must be anchored to **Colombia time (`America/Bogota`, UTC-5)**.

### 3. Required task buckets
Do **not** collapse all open work into one “pending” blob.

Always classify open tasks into these buckets:
- **🔥 Focus Today / Overdue**
  - status is not `Done`
  - `Date` is today or earlier in Colombia time
- **🗓 Upcoming**
  - status is not `Done`
  - `Date` is later than today in Colombia time
- **📝 Open, No Date**
  - status is not `Done`
  - no `Date` is set

For completed work, show:
- **✅ Completed Yesterday**
  - status is `Done`
  - use `last_edited_time` as the safe completion proxy
  - compare against **yesterday in Colombia time**

### 4. Content library
Use **Content Library** database: `30b5e657-e128-806c-ba80-e91f8781be3c`

Show a small recent list. Keep it concise.

### 5. Productivity tip
Include one actionable tip.

## Query rules

### Task query
Fetch directly from the database, not Notion search.

Use a broad query like:
```json
{
  "page_size": 100,
  "sorts": [
    { "property": "Date", "direction": "ascending" },
    { "timestamp": "last_edited_time", "direction": "descending" }
  ]
}
```

If the database has more than 100 rows, **paginate until exhaustion** using `start_cursor`. Do not trust the first page alone.

Then classify in code/Python after fetch.

### Status parsing
Use this logic:
```python
done = props.get('Done?', {})
if done.get('status'):
    status = done['status']['name']
elif done.get('checkbox') is not None:
    status = 'Done' if done['checkbox'] else 'Not done'
else:
    status = 'No status'
```

Treat anything except `Done` as open.

## Output style
Keep it sharp and useful for Telegram.

Preferred structure:
```text
☀️ Morning Brief

🔥 Focus Today / Overdue
🗓 Upcoming
📝 Open, No Date
✅ Completed Yesterday
📚 Content Library
💡 Productivity Tip
```

## Things to avoid
- Do not say “no pending tasks” if future-dated or undated open tasks exist.
- Do not use UTC day boundaries for Gabriel-facing summaries.
- Do not rely on Notion API status filters for open-task logic; fetch and classify yourself.
- Do not trust only the first Notion page when the database is large; paginate.
- Do not dump dozens of tasks. Show the useful slice.

## Fix rule
If the brief looks wrong, inspect the actual Notion fields first (`Done?`, `Date`, `last_edited_time`) before changing logic.
