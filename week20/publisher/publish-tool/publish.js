const http = require('http');
const querystring = require('querystring');
const archiver = require('archiver');
const fs = require('fs');
const child_process = require('child_process');

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
    let redirect_uri = encodeURIComponent('http://localhost:8091/auth');
    let url = `https://github.com/login/oauth/authorize?client_id=Iv1.832c7795ac17f136&redirect_uri=${redirect_uri}&state=abs123&scope=read%3Auser`;
    switch (process.platform) {
      //mac系统使用 一下命令打开url在浏览器
      case "darwin":
        child_process.exec(`open ${url}`);
      //win系统使用 一下命令打开url在浏览器
      case "win32":
        child_process.exec(`start ${url}`);
          // 默认mac系统
      default:
        child_process.exec(`open ${url}`);
    }
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