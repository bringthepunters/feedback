const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());

function getClientIp(req) {
  // Try to get the IP address from various headers (works behind proxies)
  return (
    req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress ||
    null
  );
}

app.post('/log-drag', async (req, res) => {
  const { cardName, dropZone, timestamp, sessionId } = req.body;
  const ip = getClientIp(req);

  // Fetch general location from geolocation API
  let city = "Unknown";
  let region = "Unknown";
  let country = "Unknown";
  try {
    if (ip) {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        city = geoData.city || "Unknown";
        region = geoData.region || "Unknown";
        country = geoData.country || "Unknown";
      }
    }
  } catch (err) {
    console.error('Geolocation lookup failed:', err);
  }

  const logEntry = JSON.stringify({
    cardName,
    dropZone,
    timestamp,
    sessionId,
    ip,
    city,
    region,
    country
  }) + '\\n';

  const logPath = path.join(__dirname, 'drag_log.txt');
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log:', err);
      return res.status(500).send('Log failed');
    }
    res.status(200).send('Logged');
  });
});

app.listen(PORT, () => {
  console.log(`Logger server running on http://localhost:${PORT}`);
});