const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

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
server.listen(8091);