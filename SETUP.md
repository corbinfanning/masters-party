# SETUP.md — Machine Setup Guide

This document captures everything needed to set up Jane (OpenClaw) on a new machine.

*Last updated: 2026-02-02*

---

## 1. Prerequisites

### Install Node.js (v22+)
```bash
brew install node
```

### Install Python 3 (for soco-cli)
```bash
# Usually pre-installed on macOS
python3 --version
```

---

## 2. Install OpenClaw

```bash
npm install -g openclaw
openclaw onboard
```

---

## 3. Environment Variables

Add to `~/.zshrc`:

```bash
# OpenAI API Key (for models, TTS, Whisper)
export OPENAI_API_KEY="YOUR_OPENAI_KEY"

# Brave Search API Key (for web search)
export BRAVE_API_KEY="YOUR_BRAVE_KEY"

# Python user bin (for soco-cli, etc)
export PATH="$PATH:$HOME/Library/Python/3.9/bin"
```

Then reload: `source ~/.zshrc`

### Where to get keys:
- **OpenAI:** https://platform.openai.com/api-keys
- **Brave Search:** https://brave.com/search/api/ (free tier: 2,000 queries/month)

---

## 4. OpenClaw Configuration

The config lives at `~/.openclaw/openclaw.json`. Key sections to configure:

### Auth Profiles
```json
{
  "auth": {
    "profiles": {
      "anthropic:openclaw": {
        "provider": "anthropic",
        "mode": "token"
      },
      "openai:default": {
        "provider": "openai",
        "mode": "token"
      }
    }
  }
}
```

### Agent Identity (Avatar)
```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "identity": {
          "name": "Jane",
          "avatar": "assets/avatar/jane-avatar.png"
        }
      }
    ]
  }
}
```

### Brave Search
```json
{
  "tools": {
    "web": {
      "search": {
        "provider": "brave",
        "apiKey": "YOUR_BRAVE_KEY"
      }
    }
  }
}
```

### Telegram Bot
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN",
      "dmPolicy": "pairing"
    }
  }
}
```

---

## 5. Additional Tools

### Sonos Control (soco-cli)
```bash
pip3 install soco-cli
sonos-discover  # Run to find speakers
```

---

## 6. Workspace Files to Copy

Copy these from the old machine's `~/.openclaw/workspace/`:

| File/Dir | Purpose |
|----------|---------|
| `SOUL.md` | Personality and behavior |
| `USER.md` | Info about Corbin |
| `IDENTITY.md` | Jane's identity |
| `AGENTS.md` | Operating instructions |
| `TOOLS.md` | Local tool notes (speaker IPs, etc) |
| `MEMORY.md` | Long-term memories |
| `memory/` | Daily memory files |
| `skills/` | Custom skills (e.g., sonos/) |
| `openclaw-docs/` | Cached OpenClaw documentation |

---

## 7. Cron Jobs to Recreate

After setup, recreate these via OpenClaw:

### Daily Briefing (7 AM)
```
Schedule: 0 7 * * * (America/Chicago)
Target: isolated session → Telegram
Content: Weather, HN top 10, tech news, aviation news
```

### OpenClaw Update Check (9 AM)
```
Schedule: 0 9 * * * (America/Chicago)
Target: main session
Content: Check npm for updates, notify if new version
```

### Weekly Calendar Reminder (Sunday 10 AM)
```
Schedule: 0 10 * * 0 (America/Chicago)
Target: main session
Content: Remind to upload calendar screenshots
```

---

## 8. Post-Setup Verification

Run these to verify everything works:

```bash
# OpenClaw running
openclaw status

# Web search
# Ask: "search for Austin weather"

# Sonos
sonos-discover
sonos "Family Room" status

# Telegram connected
# Send a message to the bot
```

---

## 9. Machine-Specific Notes

### Current Machine: Corbin's Mac mini
- IP: 192.168.1.218 (may change)
- Sonos speakers on same network
- Running as local gateway (port 18789)

### Sonos Speaker IPs (may change on new network)
- Family Room (Arc): 192.168.1.239
- Kitchen (Move 2): 192.168.1.145
- Office (Beam): 192.168.1.190
- Sub: 192.168.1.102

Run `sonos-discover` after network changes to update.

---

## 10. Backup Strategy

To migrate to a new machine:

1. **Export config:** `cp ~/.openclaw/openclaw.json ~/backup/`
2. **Copy workspace:** `cp -r ~/.openclaw/workspace ~/backup/`
3. **Note API keys** (or export from .zshrc)
4. **On new machine:** Follow steps 1-7 above, then restore workspace

---

*This file should be updated whenever significant setup changes are made.*
