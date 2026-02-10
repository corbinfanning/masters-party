#!/usr/bin/env node
// Generate jane.ics from schedule data
// Usage: node generate-ics.js

const fs = require('fs');
const path = require('path');

const ICS_PATH = path.join(__dirname, 'jane.ics');

// Helper: format date to ICS format (YYYYMMDDTHHMMSS)
function icsDate(dateStr, time) {
  // dateStr: "2026-02-09", time: "05:30"
  const [h, m] = time.split(':');
  return dateStr.replace(/-/g, '') + 'T' + h.padStart(2,'0') + m.padStart(2,'0') + '00';
}

function icsUid(prefix, date, index) {
  return `${prefix}-${date}-${index}@jane.openclaw`;
}

function icsEvent({ uid, summary, dtstart, dtend, description, color, location }) {
  let lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')}`,
    `DTSTART;TZID=America/Chicago:${dtstart}`,
    `DTEND;TZID=America/Chicago:${dtend}`,
    `SUMMARY:${summary}`,
  ];
  if (description) lines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
  if (location) lines.push(`LOCATION:${location}`);
  // Apple Calendar color categories
  if (color) lines.push(`CATEGORIES:${color}`);
  lines.push('END:VEVENT');
  return lines.join('\r\n');
}

// Schedule data
const events = [];
let idx = 0;

// === RECURRING WEEKLY EVENTS (for next 8 weeks) ===
const startDate = new Date('2026-02-09');
for (let week = 0; week < 8; week++) {
  for (let dow = 0; dow < 7; dow++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + week * 7 + dow);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon, ...

    // Morning workout
    const workouts = {
      0: { name: '🧘 Yoga + Walk (Recovery)', start: '06:00', end: '07:30' },
      1: { name: '🚴 Peloton 30min + Yoga 15min', start: '05:30', end: '06:30' },
      2: { name: '💪 Strength — Upper Body', start: '05:30', end: '06:30' },
      3: { name: '🚴 Peloton 30min + Yoga 15min', start: '05:30', end: '06:30' },
      4: { name: '💪 Strength — Lower + Core', start: '05:30', end: '06:30' },
      5: { name: '🚴 Peloton 30min + Yoga 15min', start: '05:30', end: '06:45' },
      6: { name: '💪 Strength — Full Body', start: '06:00', end: '07:30' },
    };

    const wo = workouts[dayOfWeek];
    events.push(icsEvent({
      uid: icsUid('workout', dateStr, idx++),
      summary: wo.name,
      dtstart: icsDate(dateStr, wo.start),
      dtend: icsDate(dateStr, wo.end),
      description: dayOfWeek === 2 ? 'Bench, incline press, flies, rows, overhead press, curls, triceps' :
                   dayOfWeek === 4 ? 'Goblet squats, RDLs, lunges, dead bugs, planks, back extensions' :
                   dayOfWeek === 6 ? 'Full body: upper + lower + core. Best training window of the week.' :
                   '',
      color: 'Workout'
    }));

    // Dinner prep reminder (weekdays + weekends)
    const cookDays = { 0: true, 1: true, 3: true, 5: true, 6: true }; // Sun, Mon, Wed, Fri, Sat
    if (cookDays[dayOfWeek]) {
      events.push(icsEvent({
        uid: icsUid('dinner', dateStr, idx++),
        summary: '🍳 Dinner Prep (you cook)',
        dtstart: icsDate(dateStr, '17:00'),
        dtend: icsDate(dateStr, '17:30'),
        color: 'Family'
      }));
    }

    // Family dinner
    events.push(icsEvent({
      uid: icsUid('family-dinner', dateStr, idx++),
      summary: '🍽️ Family Dinner',
      dtstart: icsDate(dateStr, '17:30'),
      dtend: icsDate(dateStr, '18:15'),
      color: 'Family'
    }));

    // Archer bedtime
    events.push(icsEvent({
      uid: icsUid('archer-bed', dateStr, idx++),
      summary: '🌙 Archer Bedtime',
      dtstart: icsDate(dateStr, '19:30'),
      dtend: icsDate(dateStr, '20:30'),
      color: 'Family'
    }));

    // Personal time rotation (weekdays)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const personalTime = {
        1: '💻 OpenClaw',
        2: '📖 Reading',
        3: '🏠 House/Yard',
        4: '💻 OpenClaw',
        5: '🎉 Free / Date Night',
      };
      events.push(icsEvent({
        uid: icsUid('personal', dateStr, idx++),
        summary: personalTime[dayOfWeek],
        dtstart: icsDate(dateStr, '20:30'),
        dtend: icsDate(dateStr, dayOfWeek === 5 ? '22:00' : '21:30'),
        color: 'Personal'
      }));
    }

    // Odense block (weekdays)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      events.push(icsEvent({
        uid: icsUid('odense', dateStr, idx++),
        summary: '🇩🇰 Odense Team Block',
        dtstart: icsDate(dateStr, '08:00'),
        dtend: icsDate(dateStr, '10:00'),
        description: 'Denmark team meetings — prep the night before if needed',
        color: 'Work'
      }));
    }
  }
}

// === SPECIFIC EVENTS: Feb 9-20 ===

// Daily briefing cron - 9 PM nightly
for (let i = 0; i < 56; i++) {
  const d = new Date(startDate);
  d.setDate(d.getDate() + i);
  const dateStr = d.toISOString().split('T')[0];
  if (d.getDay() >= 0 && d.getDay() <= 4) { // Sun-Thu (night before)
    events.push(icsEvent({
      uid: icsUid('briefing', dateStr, idx++),
      summary: '📋 Jane: Tomorrow\'s Plan',
      dtstart: icsDate(dateStr, '21:00'),
      dtend: icsDate(dateStr, '21:05'),
      description: 'Jane sends tomorrow\'s schedule and workout plan via Telegram',
      color: 'Jane'
    }));
  }
}

// Build ICS file
const icsContent = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Jane//OpenClaw Calendar//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'X-WR-CALNAME:Jane',
  'X-WR-TIMEZONE:America/Chicago',
  'BEGIN:VTIMEZONE',
  'TZID:America/Chicago',
  'BEGIN:STANDARD',
  'DTSTART:20251102T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
  'TZOFFSETFROM:-0500',
  'TZOFFSETTO:-0600',
  'TZNAME:CST',
  'END:STANDARD',
  'BEGIN:DAYLIGHT',
  'DTSTART:20260308T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
  'TZOFFSETFROM:-0600',
  'TZOFFSETTO:-0500',
  'TZNAME:CDT',
  'END:DAYLIGHT',
  'END:VTIMEZONE',
  ...events,
  'END:VCALENDAR'
].join('\r\n');

fs.writeFileSync(ICS_PATH, icsContent);
console.log(`Generated ${events.length} events → ${ICS_PATH}`);
