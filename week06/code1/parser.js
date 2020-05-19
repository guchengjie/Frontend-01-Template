const EOF = Symbol('EOF'); //EOF: end of file
let currentToken = null; // 全局tag变量
let currentAttribute = null; // 全局属性

const emit = function(token) {
  // if (token.type !== 'text') 
  console.log(token);
}

const selfClosingStartTag = function(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    return data;
  } else if(c === EOF) {
    return data(EOF);
  } else {
    // beforeAttributeName(c);
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

const afterAttributeValue = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  }  else if (c === '>') {
    return data;
  }  else if (c === EOF) {
    return data(EOF);
  } else {
    return beforeAttributeName(c);
  }
}

const doubleQuotedAttributeValue = function(c) {
  if (c === '\"') {
    return afterAttributeValue;
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
    return afterAttributeValue;
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
    return beforeAttributeName;
  } else if (c === '&') {
    return unquotedAttributeValue;
  } else if (c === '>') {
    return data;
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
    return unquotedAttributeValue;
  }
}

const afterAttributeName = function(c) {
  if (c.match(/^[\n\t\f ]$/)) {
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
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
  } else {
    return;
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

module.exports.parseHtml = function(html) {
  let state = data;
  for (let c of html) {
    console.log(state);
    state = state(c);
  }
  state = state(EOF);
}