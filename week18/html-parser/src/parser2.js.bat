// import layout from './layout.js';
// import css from 'css';

const EOF = Symbol('EOF'); //EOF: end of file
let currentToken = null; // 全局tag变量
let currentAttribute = null; // 全局属性
let currentTextNode = null; // 文本节点
let stack = null;
const rules = []; // 存储css解析规则

const addCSSRules = function(code) {
  const ast = css.parse(code);
  // console.log(JSON.stringify(ast, null, 4));
  rules.push(...ast.stylesheet.rules);
}

const match = function(element, selector) {
  if (!element.attributes || !selector) return false;

  if (selector.charAt(0) === '#') {
    const attr = element.attributes.filter((attr) => attr.name === 'id')[0];
    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) === '.') {
    const attr = element.attributes.filter((attr) => attr.name === 'class')[0];
    if (attr && attr.value === selector.replace('.', '')) {
      return true;
    }
  } else if (element.tagName === selector) {
    return true;
  }
  return false;
}

const specificity = function(selectors) {
  const sf = [0, 0, 0, 0];
  const selectorParts = selectors.split(' ');
  for (let selector of selectorParts) {
    if (selector.charAt(0) === '#') {
      sf[1] += 1;
    } else if (selector.charAt(0) === '.') {
      sf[2] += 1;
    } else {
      sf[3] += 1;
    }
  };
  return sf;
}

const compare = function(oldSp, sp) {
  if (oldSp[0] - sp[0]) {
    return oldSp[0] - sp[0];
  }
  if (oldSp[1] - sp[1]) {
    return oldSp[1] - sp[1];
  }
  if (oldSp[2] - sp[2]) {
    return oldSp[2] - sp[2];
  }
  return oldSp[3] - sp[3];
}

const computeCSS = function(element) {
  if (!element.computedStyle) {
    element.computedStyle = {};
  }
  const elements = stack.slice().reverse();

  for (let rule of rules) {
    const selectorParts = rule.selectors[0].split(' ').reverse();
    if (!match(element, selectorParts[0])) continue;
    let isMatch = false;
    let y = 1;
    for (let i = 0, len = elements.length; i < len; i += 1) {
      if (match(elements[i], selectorParts[y])) {
        y++;
      }
    }

    if (y >= selectorParts.length) isMatch = true;

    if (isMatch) {
      const sp = specificity(rule.selectors[0]);
      const computedStyle = element.computedStyle;
      for (let declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {};
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].specificity = sp;
          computedStyle[declaration.property].value = declaration.value;
        } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
}

const emit = function(token) {
  const top = stack[stack.length - 1];

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      attributes: [], 
      children: [],
    }
    if (!token) return;
    for (key in token) {
      if (key !== 'type' && key !== 'tagName' && key !== 'isSelfClosing') {
        element.attributes.push({
          name: key,
          value: token[key],
        })
      }
    }
    element.tagName = token.tagName;
    top.children.push(element);
    element.parent = top;

    computeCSS(element); // 获取style和link下载的样式

    if (!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === 'endTag') {
    if (token.tagName !== top.tagName) {
      console.log('element start and end Tag no matches!');
    } else {
      if (token.tagName === 'style') {
        // addCSSRules(top.children[0].content);
      }
      // layout(top);
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

const selfClosingStartTag = function(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if(c === EOF) {
    return data(EOF);
  } else {
    beforeAttributeName(c);
  }
}

const beforeAttributeName = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName; // 如果还有空格还是返回属性的处理状态
  } else if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else {
    currentAttribute = {
      name: '',
      val: '',
    }
    return attributeName(c);
  }
}

const afterQuotedAttributeValue = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.val;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    return data(EOF);
  } else {
    currentAttribute.val += c.toLowerCase();
    return beforeAttributeName(c);
  }
}

const doubleQuotedAttributeValue = function(c) {
  if (c === '\"') {
    currentToken[currentAttribute.name] = currentAttribute.val;
    return afterQuotedAttributeValue;
  } else if (c === '&') {
    return doubleQuotedAttributeValue;
  } else if (c === EOF) {
    return data(EOF);
  } else {
    currentAttribute.val += c.toLowerCase();
    return doubleQuotedAttributeValue;
  }
}

const singleQuotedAttributeValue = function(c) {
  if (c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.val;
    return afterQuotedAttributeValue;
  } else if (c === '&') {
    return singleQuotedAttributeValue;
  } else if (c === EOF) {
    return data(EOF);
  } else {
    currentAttribute.val += c.toLowerCase();
    return singleQuotedAttributeValue;
  }
}

const unquotedAttributeValue = function(c) { // 无引号状态
  if (c.match(/^[\n\t\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.val;
    emit(currentToken);
    return beforeAttributeName;
  } else if (c === '&') {
    currentToken[currentAttribute.name] = currentAttribute.val;
    return unquotedAttributeValue;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.val;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {

  } else if (c === '\'' || c === '\"' || c === '<' || c === '=' || c === '\`') {

  } else if (c === EOF) {
    return data(EOF);
  } else {
    currentAttribute.val += c.toLowerCase();
    return unquotedAttributeValue;
  }
}

const beforeAttributeValue = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
  } else if (c === '\"') {
    return doubleQuotedAttributeValue;
  } else if (c === '\'') {
    return singleQuotedAttributeValue;
  } else if (c === '>') {
    return data;
  } else {
    return unquotedAttributeValue(c);
  }
}

const afterAttributeName = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
    // emit(currentToken);
    return data;
  } else if (c === EOF) {
    return data(EOF);
  } else {
    return attributeName(c);
  }
}

const attributeName = function(c) {
  if (c.match(/^[\n\t\f ]$/) || c === EOF || c === '>') {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {

  } else if (c === '\"' || c === "\'" || c === '<') {

  } else {
    currentAttribute.name += c.toLowerCase();
    return attributeName;
  }
}

const endTagOpen = function(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    }
    return tagName(c);
  } else if (c === '>') {
    return data;
  } else if (c === EOF) {
    return data(EOF);
  } else {

  }
}

const tagName = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName; // 切换到属性的状态处理函数
  } else if (c === '/') {
    return selfClosingStartTag; // 关闭单标签
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName;
  } else if(c === '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

const tagOpen = function(c) {
  if (c === '/') {
    return endTagOpen; // 切换到闭合标签
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c); // // 切换到tag的状态处理函数
  } else if (c === EOF) {
    return data(EOF);
  } else {
    return data(c);
  }
}

const data = function(c) {
  if (c === '<') {
    return tagOpen; // tag 开始标签
  } else if (c === EOF) {
    emit({ type: 'EOF'});
    return;
  } else {
    emit({ type: 'text', content: c });
    return data; // 重置状态
  }
}

module.exports.parseHtml = function parseHtml (html) {
  let state = data;
  stack = [{ type: 'document', children:[] }];
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
  return stack[0];
}