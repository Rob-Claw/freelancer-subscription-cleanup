# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Gmail / Google Workspace

**Account:** rob.molt.gg@gmail.com

**Quick Send Email:**
```bash
python3 ~/workspace/gmail-helper.py --to email@example.com --subject "Subject" --body "Message"
```

**Helper Script:** `~/workspace/gmail-helper.py`
- Send emails via Gmail API
- Auto-refresh tokens when needed
- Can import `send_email()` function in Python

**Available Services:**
- ✅ Gmail (sending/reading)
- ✅ Google Drive (file operations)
- ✅ Google Docs (create/edit documents)
- ✅ Google Sheets (spreadsheets)
- ✅ Google Calendar (events/scheduling)
- ✅ Google Tasks (task management)
- ✅ Google Forms (form responses)

**Tokens:** `~/.config/gmail-tokens/rob.molt.gg.json`
- Access token (expires hourly, auto-refresh available)
- Refresh token (long-lived)

**OAuth Credentials:** `~/.gog-credentials.json`

### Google Docs/Drive Auto-Refresh Wrapper

**Problem:** gog CLI keyring storage wasn't working, tokens expired silently.

**Solution:** Use `gtoken.py` — auto-refreshes tokens before every operation.

```bash
# Get valid token (auto-refreshes if needed)
python3 ~/.openclaw/workspace/gtoken.py token

# Create a doc
python3 ~/.openclaw/workspace/gtoken.py create "Doc Title" "Content here"

# Share a doc
python3 ~/.openclaw/workspace/gtoken.py share <doc_id> garavitgabriel@gmail.com
```

**In Python scripts:**
```python
from ~/.openclaw.workspace.gtoken import get_access_token, create_doc, share_doc

token = get_access_token()  # Always valid
doc_id = create_doc("Title", "Content")
share_doc(doc_id, "user@email.com")
```

### Skills

| Skill | Description |
|-------|-------------|
| `morning-brief` | Daily briefing (weather, tasks, content, AI news, tips) |
| `content-newsletter` | Weekly content digest from saved links |
| `larry` | TikTok marketing automation |

Run skill: `clawhub install <slug>`
