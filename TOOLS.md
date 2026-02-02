# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

---

## iMessage (imsg)

- ✅ Can **read** messages when needed
- ⚠️ **NEVER send** without explicit permission from Corbin
- 🚫 Corbin prefers I do not send texts at this time
- If I ever need to send: ask first, wait for approval

---

## Directions / Travel Time (OSRM)

- **API:** `https://router.project-osrm.org/route/v1/driving/{lon1},{lat1};{lon2},{lat2}?overview=false`
- **Free, no API key required**
- Uses OpenStreetMap data
- ⚠️ **No real-time traffic** — gives baseline drive time, not current conditions
- Good for: estimates, planning, "how far is X"
- Add 15-30 min buffer for traffic-heavy routes or peak times

---

## Sonos Speakers

| Room | Device | IP |
|------|--------|-----|
| Family Room | Arc | 192.168.1.239 |
| Kitchen | Move 2 | 192.168.1.145 |
| Office | Beam | 192.168.1.190 |
| Sub | Subwoofer | 192.168.1.102 |

- **CLI:** `/Users/corbin/Library/Python/3.9/bin/sonos`
- **Helper:** `skills/sonos/scripts/sonos.sh`
- **Rediscover:** `sonos-discover` if IPs change

---

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
