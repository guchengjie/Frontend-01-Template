import { enableGesture } from './gesture';

export const create = function (Cls, attributes, ...children) {
  // 处理ReactElement\custumReactElement\dom
  let o;
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({ timer: Date.now() });
  }

  for (let key in attributes) {
    o.setAttribute(key, attributes[key]);
  }

  let visit = function (children) {
    for (let child of children) {
      if (typeof child === 'string' || typeof child === 'number') {
        child = new Text(child);
        o.appendChild(child);
      } else if (typeof child === 'object' && child instanceof Array) {
        visit(child);
      } else {
        o.appendChild(child);
      }
    }
  };

  visit(children);

  return o;
};

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  get style() {
    return this.root.style;
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);

    if (name.match(/^on([\s\S]+)$/)) {
      const eventkey = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase());
      this.addEventListener(eventkey, value);
    }

    if (name === 'enableGesture') {
      enableGesture(this.root);
    }
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}
