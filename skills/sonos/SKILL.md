---
name: sonos
description: Control Sonos speakers — play/pause, volume, grouping, favorites, and playback. Use when asked to play music, control speakers, adjust volume, group/ungroup rooms, or manage audio throughout the house.
---

# Sonos Control

Control Sonos speakers via soco-cli.

## Available Speakers

| Room | Device | IP |
|------|--------|-----|
| Family Room | Arc | 192.168.1.239 |
| Kitchen | Move 2 | 192.168.1.145 |
| Office | Beam | 192.168.1.190 |

## Commands

All commands use: `sonos "ROOM_NAME" ACTION [ARGS]`

The `sonos` binary is at `/Users/corbin/Library/Python/3.9/bin/sonos`

### Playback

```bash
sonos "Family Room" play          # Resume playback
sonos "Family Room" pause         # Pause
sonos "Family Room" stop          # Stop
sonos "Family Room" next          # Next track
sonos "Family Room" previous      # Previous track
```

### Volume

```bash
sonos "Kitchen" volume            # Get current volume (0-100)
sonos "Kitchen" volume 50         # Set volume to 50
sonos "Kitchen" volume +10        # Increase by 10
sonos "Kitchen" volume -10        # Decrease by 10
sonos "Kitchen" mute              # Mute
sonos "Kitchen" unmute            # Unmute
```

### Now Playing

```bash
sonos "Office" status             # Full status
sonos "Office" track              # Current track info
```

### Grouping

```bash
sonos "Kitchen" group "Family Room"    # Add Kitchen to Family Room group
sonos "Kitchen" ungroup                 # Remove from group
sonos "Family Room" party_mode          # Group all speakers together
```

### Favorites & Playlists

```bash
sonos "Family Room" list_favs           # List Sonos favorites
sonos "Family Room" fav "Favorite Name" # Play a favorite
sonos "Family Room" list_playlists      # List Sonos playlists
sonos "Family Room" playlist "Name"     # Play a playlist
```

### TuneIn Radio

```bash
sonos "Kitchen" tunein_station "BBC Radio 1"
```

### Sleep Timer

```bash
sonos "Office" sleep 30           # Sleep timer in minutes
sonos "Office" sleep off          # Cancel sleep timer
```

## Helper Script

For common operations, use `scripts/sonos.sh`:

```bash
./scripts/sonos.sh play "Family Room"
./scripts/sonos.sh pause all
./scripts/sonos.sh volume "Kitchen" 40
```

## Tips

- Room names with spaces need quotes
- Use `sonos-discover` to refresh speaker list if IPs change
- The Sub is hidden (paired with Family Room Arc)
