---
name: briefing
description: Generate daily briefings with weather forecast, markets, Hacker News, and tech news. Use when asked for a briefing, morning update, daily summary, or news roundup. Produces both formatted text and audio versions.
---

# Briefing Skill

Generate consistent daily briefings for Corbin.

## Output Format

Every briefing includes these sections in order:

1. **Header** — Day, date, greeting
2. **Weather** — Current + 3-day forecast for Austin, TX
3. **Markets** — Dow, NASDAQ, S&P, notable moves, VIX
4. **Hacker News** — Top 5 stories with scores, comment counts, AND comment links
5. **Tech/AI News** — Top 3-5 relevant stories
6. **Sign-off** — Brief friendly close

## Data Sources

### Weather
```bash
# Current + forecast
curl -s "wttr.in/Austin,TX?format=j1"
```
Parse JSON for current conditions + 3-day forecast.

### Hacker News
```bash
# Get top story IDs
curl -s "https://hacker-news.firebaseio.com/v0/topstories.json" | jq '.[0:5]'

# For each ID, get details
curl -s "https://hacker-news.firebaseio.com/v0/item/{id}.json"
```

**Important:** Always include BOTH links:
- Article: `{url}`
- Comments: `https://news.ycombinator.com/item?id={id}`

### Markets
Use web_search or web_fetch from Yahoo Finance / CNBC for current data.

## Text Format Template

```
☀️ **{Day}, {Month} {Date}, {Year}**

━━━━━━━━━━━━━━━━━━

🌡️ **Weather — Austin, TX**
Now: {conditions}, {temp}°F
Today: High {high}°F, Low {low}°F — {description}
Tomorrow: High {high}°F, Low {low}°F — {description}
{Day+2}: High {high}°F, Low {low}°F — {description}

━━━━━━━━━━━━━━━━━━

📈 **Markets**
• Dow: {price} ({change}%)
• S&P 500: {price} ({change}%)
• NASDAQ: {price} ({change}%)
• VIX: {price} ({change}%)

{Brief market narrative if notable}

━━━━━━━━━━━━━━━━━━

🔥 **Hacker News**

1. **{title}** ({score} pts, {comments} comments)
   {one-line summary if helpful}
   Article: <{url}>
   Comments: <https://news.ycombinator.com/item?id={id}>

2. ...

━━━━━━━━━━━━━━━━━━

📱 **Tech News**
• {headline 1}
• {headline 2}
• {headline 3}

━━━━━━━━━━━━━━━━━━

{Friendly sign-off}
```

## Audio Version

After sending text, generate audio:

```bash
# Write briefing text to file
cat << 'EOF' > /tmp/briefing.txt
{Conversational version of briefing - no markdown, no URLs}
EOF

# Generate audio
/Users/corbin/Library/Python/3.9/bin/edge-tts \
  --voice en-US-AndrewNeural \
  --file /tmp/briefing.txt \
  --write-media /tmp/briefing.mp3

# Convert to Telegram voice format
ffmpeg -y -i /tmp/briefing.mp3 -c:a libopus -b:a 64k /tmp/briefing.ogg
```

Send via message tool with `asVoice: true`.

## Audio Script Guidelines

- Keep under 90 seconds (~1200-1500 characters)
- Use conversational language ("Looking at markets..." not "Markets:")
- Skip URLs entirely — they're in the text version
- Round numbers naturally ("about fifty-one degrees", "up two and a half percent")
- Don't list all 5 HN stories — pick top 2-3 interesting ones
- **CRITICAL: Always end with a complete sign-off sentence** (e.g. "Have a great day!" or "Enjoy your Sunday!"). If the script doesn't end with a complete sentence, it was truncated — rewrite it shorter before generating audio.
- **After writing the audio script file, read it back** to verify it's complete and ends properly. If truncated, rewrite it.

## Delivery

1. Send formatted text message first
2. Send voice message second
3. Target: Telegram 8257556259

## Invocation

The cron job or user request should simply say "generate briefing" or "morning briefing". This skill handles the rest.
