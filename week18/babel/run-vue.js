const compliler = require('@vue/compiler-sfc');

const output = compliler.compileTemplate({ filename: 'example.vue', source: '<div>Hello world!</div>' });

console.log(output);