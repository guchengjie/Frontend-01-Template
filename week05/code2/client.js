const net = require('net');

let connection = null;
class Request {
  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host || 'localhost';
    this.port = options.port || 80;
    this.body = options.body || {};
    this.path = options.path || '/';
    this.headers = options.headers || {};
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map((i) => `${i}=${encodeURIComponent(this.body[i])}`).join('&');
    }

    this.headers['Content-Length'] = this.bodyText.length;
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
Host: ${this.host}\r
${Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}
`;
  }

  send() {
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          port: this.port,
          host: this.host,
        }, () => {
          connection.write(this.toString());
        });
      }
      
      connection.on('data', (data) => {
        resolve(data.toString());
        connection.end();
      });
      
      connection.on('end', () => {
        console.log('disconnected from server');
      });
      
      connection.on('error', (error) => {
        reject(error);
        connection.end();
      });
    });
  }
}

void async function() {
  const req = new Request({
    port: '9001',
    headers: {
      'X-ff-cc': 'check',
      body: { name: 'mrgu' }
    }
  });
  const resp = await req.send();
  console.log(resp);
}();



class Response{

}

class ResponseParser {
  constructor() {
    this.WAITING_STARUS_LINE = 0;
    this.WAITING_STARUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STARUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
  }

  receive(str) {
    for (let i = 0; i < str.length; i += 1) {
      this.receiveChar(str.charAt(i));
    }
  }

  receiveChar(char) {
    if (this.current === this.WAITING_STARUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
      } if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    }

    if (this.current === this.WAITING_STARUS_LINE) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    }

    if (this.current === this.WAITING_HEADER_NAME) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
      } if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      } else {
        this.statusLine += char;
      }
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.length = 0;
    this.content = [];

    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {

  }
}

// const client = net.createConnection({
//     host: '127.0.0.1',
//     port: 9001
// }, () => {
//   console.log('conneted to server!');
//   // client.write('POST / HTTP/1.1\r\n');
//   // client.write('Host: 127.0.0.1\r\n');
//   // client.write('Content-Type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n');
//   // client.write('\r\n');
//   // client.write('field1=aaa&code=bbb');

// //   client.write(`
// // POST / HTTP/1.1\r
// // Host: 127.0.0.1\r
// // Content-Type: application/x-www-form-urlencoded\r
// // Content-Length: 8\r
// // \r
// // name=aaa`);
//   const req = new Request({
//     body: { name: 'mrgu' },
//     headers: {
//       'X-foo2': 'check',
//     }
//   });
//   console.log(req.toString());
//   client.write(req.toString());
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', () => {
//   console.log('disconnected from server');
// });

// client.on('error', (error) => {
//   console.log('server error', error);
//   client.end();
// });

