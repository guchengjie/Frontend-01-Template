const parser = require('./parser.js');

module.exports = function(source, map) {
  console.log('-------loader  start-------');

  const html = parser.parseHTML(source);
  // console.log(html.children[2].children[0].content);
  // console.log(source, this.resourcePath, html);
  // console.log('-------loader  start-------');

  let template = null;
  let script = null;
  for (let node of html.children) {
    if (node.tagName === 'template') {
      template = node.children.filter(e => e.type !== 'text')[0]; // 去掉template标签
    }
    if (node.tagName === 'script') {
      script = node;
    }
  }
  // console.log(template, script);

  let visit = (node, depth) => {
    if (node.type === 'text') return JSON.stringify(node.content);
    let attrs = {};
    for (let attr of node.attributes) {
      attrs[attr.name] = attr.value;
    }
    let children = node.children.map(node => visit(node));
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
  }

  let str = `
import { Text, create, Wrapper } from './createElement.js';
export default class Carousel {
  constructor() {
    this.children = [];
    this.root = document.createElement("div");
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  render() {
    return ${visit(template, 0)}
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
  `;

  return str;
}