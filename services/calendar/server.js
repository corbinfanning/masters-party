const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const HTTPS_PORT = 8099;
const HTTP_PORT = 8098;
const ICS_PATH = path.join(__dirname, 'jane.ics');
const CERT_DIR = path.join(process.env.HOME, 'Library/Containers/io.tailscale.ipn.macos/Data');
const HOSTNAME = 'corbins-mac-mini.taild4d485.ts.net';

function handler(req, res) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} from ${req.socket.remoteAddress}`);
  
  if (req.url === '/jane.ics' || req.url === '/') {
    try {
      const ics = fs.readFileSync(ICS_PATH, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(ics);
    } catch (e) {
      res.writeHead(404);
      res.end('Calendar not found');
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

// HTTPS
const tlsOpts = {
  cert: fs.readFileSync(path.join(CERT_DIR, `${HOSTNAME}.crt`)),
  key: fs.readFileSync(path.join(CERT_DIR, `${HOSTNAME}.key`)),
};
https.createServer(tlsOpts, handler).listen(HTTPS_PORT, '0.0.0.0', () => {
  console.log(`HTTPS on :${HTTPS_PORT}`);
});

// HTTP
http.createServer(handler).listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP on :${HTTP_PORT}`);
});
