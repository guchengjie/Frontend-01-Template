const http = require('http');
const querystring = require('querystring');
const archiver = require('archiver');
const fs = require('fs');

let packname = './package';

// fs.stat(filename, (err, stat) => {
  const options = {
    host: 'localhost',
    port: 8091,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  };

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory(packname, false);

  // archive.pipe(fs.createWriteStream('./package.zip'));

  const req = http.request(options);

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.on('end', (e) => {
    console.error('request end');
  });

  archive.pipe(req);

  archive.finalize();

  archive.on('end', () => {
    console.error('request end');
    req.end();
  });

  // let readStream = fs.createReadStream(packname);
  // readStream.pipe(req);

  // readStream.on('end', () => {
  //   req.end();
  // })
// })

// const postData = querystring.stringify({
//   'content': 'Hello World1111!'
// });