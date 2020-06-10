const http = require('http');

// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log('recive http');
  console.log(req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`
  <html maaa=a >
    <head>
        <style>
            #container {
                width: 500px;
                height: 300px;
                display: flex;
                background: rgb(0, 0, 0);
            }
            #container #myid {
                width: 200px;
                height: 100px;
                background: rgb(255, 0, 0);
            }
            #container .c1 {
                flex: 1;
                background: rgb(0, 0, 255);
            }
        </style>
    </head>
    <body>
        <div id="container">
            <div id="myid"/>
            <div class="c1" />
        </div>
    </body>
  </html>  
  `);
});

server.listen(9001);
