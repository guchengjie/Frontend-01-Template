const parser = require('./parser');
const aa = parser.parseHTML('<div>hello world</div>');
console.log(aa.children[0]);