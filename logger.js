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

app.post('/log-drag', (req, res) => {
  const { cardName, dropZone, timestamp, sessionId } = req.body;
  const ip = getClientIp(req);
  const logEntry = JSON.stringify({
    cardName,
    dropZone,
    timestamp,
    sessionId,
    ip,
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