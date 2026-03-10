#!/usr/bin/env node
const { execSync } = require('child_process');
const { readFileSync } = require('fs');

const NOTION_KEY = readFileSync(require('os').homedir() + '/.config/notion/api_key', 'utf8').trim();
const NOTION_HEADERS = `-H "Authorization: Bearer ${NOTION_KEY}" -H "Notion-Version: 2022-06-28" -H "Content-Type: application/json"`;

const TIPS = [
  "Time-block your deep work. Save 2 hours in the morning for focused work before checking messages.",
  "Use the 2-minute rule: if it takes less than 2 minutes, do it now.",
  "Review your calendar the night before to prepare for the next day.",
  "Batch similar tasks together — emails, calls, meetings.",
  "Start your day by eating the frog — do your hardest task first.",
  "Use the 'NOT' method: NOT doing something is also a decision.",
  "Take breaks every 90 minutes — your brain needs rest to stay sharp.",
  "Write down 3 priorities for tomorrow before ending your day."
];

function runCmd(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch {
    return null;
  }
}

function weatherCodeToText(code) {
  const map = {
    0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
    80: 'Rain showers', 81: 'Heavy rain showers', 82: 'Violent rain showers', 95: 'Thunderstorm'
  };
  return map[code] || `Weather code ${code}`;
}

function getWeather() {
  const primary = runCmd('curl -s --max-time 10 "https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America%2FBogota"');
  if (primary) {
    try {
      const data = JSON.parse(primary);
      const c = data.current;
      if (c) {
        return `${weatherCodeToText(c.weather_code)}, ${c.temperature_2m}°C (feels like ${c.apparent_temperature}°C), wind ${c.wind_speed_10m} km/h`;
      }
    } catch {}
  }

  const fallback = runCmd('curl -s --max-time 10 "https://wttr.in/Bogota?format=%c%t+%w"');
  return fallback ? fallback.trim() : 'Weather unavailable';
}

function getLocalDateParts() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const today = formatter.format(now);
  const yesterday = formatter.format(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  return { today, yesterday };
}

function parseDateOnly(dateStr) {
  return dateStr ? dateStr.slice(0, 10) : null;
}

function getStatus(props) {
  const done = props['Done?'] || {};
  if (done.status) return done.status.name || 'No status';
  if (done.checkbox !== undefined) return done.checkbox ? 'Done' : 'Not done';
  return 'No status';
}

function getTaskName(props) {
  const title = props.Name?.title || [];
  return title.map(t => t.plain_text || '').join('').trim() || 'Untitled';
}

function getDueDate(props) {
  return parseDateOnly(props.Date?.date?.start);
}

function notionDatabaseQuery(databaseId, body) {
  const payload = JSON.stringify(body).replace(/'/g, `'\\''`);
  const cmd = `curl -s -X POST "https://api.notion.com/v1/databases/${databaseId}/query" ${NOTION_HEADERS} -d '${payload}'`;
  const response = runCmd(cmd);
  if (!response) return null;
  try {
    return JSON.parse(response);
  } catch {
    return null;
  }
}

function fetchAllDatabaseRows(databaseId, sorts = []) {
  const results = [];
  let start_cursor = undefined;
  for (let i = 0; i < 20; i++) {
    const body = { page_size: 100 };
    if (sorts.length) body.sorts = sorts;
    if (start_cursor) body.start_cursor = start_cursor;
    const data = notionDatabaseQuery(databaseId, body);
    if (!data || !Array.isArray(data.results)) break;
    results.push(...data.results);
    if (!data.has_more || !data.next_cursor) break;
    start_cursor = data.next_cursor;
  }
  return results;
}

function getNotionTasks() {
  const rows = fetchAllDatabaseRows('2fd5e657-e128-808b-a866-cfd42dc0ad3c', [
    { property: 'Date', direction: 'ascending' },
    { timestamp: 'last_edited_time', direction: 'descending' }
  ]);
  const { today, yesterday } = getLocalDateParts();
  const focus = [];
  const upcoming = [];
  const noDate = [];
  const completedYesterday = [];

  for (const page of rows) {
    const props = page.properties || {};
    if (!props.Name || !props['Done?']) continue;
    const name = getTaskName(props);
    const status = getStatus(props);
    const due = getDueDate(props);
    const edited = parseDateOnly(page.last_edited_time || '');
    const task = { name, status, due };

    if (status === 'Done') {
      if (edited === yesterday) completedYesterday.push(task);
      continue;
    }

    if (!due) noDate.push(task);
    else if (due <= today) focus.push(task);
    else upcoming.push(task);
  }

  return { focus, upcoming, noDate, completedYesterday };
}

function getContentLibrary() {
  const data = notionDatabaseQuery('30b5e657-e128-806c-ba80-e91f8781be3c', { page_size: 5 });
  if (!data || !Array.isArray(data.results)) return [];
  return data.results.map((page) => {
    const props = page.properties || {};
    const name = (props.Name?.title || []).map(t => t.plain_text || '').join('').trim() || 'Untitled';
    return { name };
  });
}

function getTip() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TIPS[dayOfYear % TIPS.length];
}

function main() {
  const weather = getWeather();
  const tasks = getNotionTasks();
  const content = getContentLibrary();
  const tip = getTip();

  let output = `☀️ *Morning Brief*\n\n`;
  output += `🌤 *Weather* ${weather}\n\n`;

  output += `🔥 *Focus Today / Overdue* (${tasks.focus.length})\n`;
  output += tasks.focus.length ? tasks.focus.slice(0, 7).map(t => `- ${t.name} [${t.status}]`).join('\n') + '\n\n' : `- None\n\n`;

  output += `🗓 *Upcoming* (${tasks.upcoming.length})\n`;
  output += tasks.upcoming.length ? tasks.upcoming.slice(0, 5).map(t => `- ${t.name} (${t.due})`).join('\n') + '\n\n' : `- None\n\n`;

  output += `📝 *Open, No Date* (${tasks.noDate.length})\n`;
  output += tasks.noDate.length ? tasks.noDate.slice(0, 5).map(t => `- ${t.name} [${t.status}]`).join('\n') + '\n\n' : `- None\n\n`;

  output += `✅ *Completed Yesterday* (${tasks.completedYesterday.length})\n`;
  output += tasks.completedYesterday.length ? tasks.completedYesterday.slice(0, 8).map(t => `- ${t.name}`).join('\n') + '\n\n' : `- None\n\n`;

  output += `📚 *Content Library*\n`;
  output += content.length ? content.slice(0, 5).map(c => `- ${c.name}`).join('\n') + '\n\n' : `- No recent content\n\n`;

  output += `💡 *Productivity Tip*\n${tip}`;
  console.log(output);
}

main();
