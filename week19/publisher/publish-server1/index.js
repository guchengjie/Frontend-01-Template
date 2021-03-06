const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');
const https = require('https');

const server = http.createServer((req, res) => {
  // let matched = req.url.match(/filename=([^&]+)/);
  // let filename = matched && matched[1];
  // if (!filename) return;

  // let writeStream = fs.createWriteStream('../server/public/' + filename);
  // req.pipe(writeStream);

  let writeStream = unzip.Extract({ path: '../server/public/'});
  // req.pipe(writeStream);
  req.on('data', (chunk) => {
    writeStream.write(chunk);
  });

  req.on('end', (chunk) => {
    writeStream.end(chunk);
  });

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    res.end();
  })
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

function auth(req, res) {
  let code = req.url.match(/code=([^&]+)/)[1];

  let state = 'abc123';
  let client_secret = '4a8f2ff77783660040768099c10165345ff60f0a';
  let client_id = 'Iv1.832c7795ac17f136'
  let redirect_uri = encodeURIComponent('http://locahost:8091/auth');

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  let url = `https://github.com/login/oauth/access_token`;

  const options = {
    hostname: 'github.com',
    port: 443,
    path: '/login/oauth/access_token',
    method: 'POST'
  };

  https.request(options, {
    method: 'POST'
  })

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end();
}

server.listen(8091);