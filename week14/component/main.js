const create = function (Cls, attributes, ...childs) {
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

  for (let child of childs) {
    if (typeof child === 'string' || typeof child === 'number') {
      child = new Text(child);
      o.appendChild(child);
    } else if (typeof child === 'object' && child instanceof Array) {
      child.forEach((item) => {
        o.appendChild(item);
      });
    } else {
      o.appendChild(child);
    }
  }

  return o;
};

class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

class MyComponent {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  render() {
    return (
      <main>
        <header>header</header>
        {this.slot}
        <footer>footer</footer>
      </main>
    );
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
}

class Hello {
  constructor(config) {
    this.children = [];
    this.root = document.createElement('div');
  }

  set class(v) {}

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}
let text = 'text node';

let Tree = function () {
  return <div>tree node</div>;
};

const cpt = (
  <div
    class='cls'
    age={20}
    style='background: pink;width:200px;height: 200px;color: white'
  >
    <MyComponent>
      <div style='background: blue'>
        a<span>span</span>
      </div>
      <div style='background: yellow'>b</div>
      <div style='background: green'>c</div>
      <div style='background: aqua'>d</div>
      {[0, 1, 2].map((item) => {
        return <i>{item}</i>;
      })}
      {text}
      <Tree />
    </MyComponent>
  </div>
);

cpt.mountTo(document.body);

export default cpt;
