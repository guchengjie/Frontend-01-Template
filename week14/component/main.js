const create = function (Cls, attributes, ...children) {
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

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  get style() {
    return this.root.style;
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

class Carousel {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  render() {
    let children = this.data.map((url) => {
      let element = <img src={url} />;
      element.addEventListener('dragstart', (e) => e.preventDefault());
      return element;
    });
    let root = (
      <div class='carousel'>
        {children}
      </div>
    )


    let position = 0;

    let nextPic = (time) => {
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];

      current.style.transition = 'ease 0s'; // 两张图片无缝切换的设置
      next.style.transition = 'ease 0s';

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

      setTimeout(() => {
        current.style.transition = ''; // 清除上述步骤的transition切换设置
        next.style.transition = '';

        current.style.transform = `translateX(${-100 - 100 * position}%)`;
        next.style.transform = `translateX(${-100 * nextPosition}%)`;

        position = nextPosition;
      }, 16);

      setTimeout(nextPic, 2000);
    };

    setTimeout(nextPic, 2000);
    root.addEventListener('mousedown', (event) => {
      const startX = event.clientX;
      const startY = event.clientY;

      let lastPosition = (position - 1 + this.data.length) % this.data.length;
      let nextPosition = (position + 1) % this.data.length;

      let last = children[lastPosition];
      let current = children[position];
      let next = children[nextPosition];

      last.style.transition = 'ease 0s';
      current.style.transition = 'ease 0s';
      next.style.transition = 'ease 0s';

      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
      current.style.transform = `translateX(${-500 * position}px)`;
      next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

      const move = (e) => {
        last.style.transform = `translateX(${
          e.clientX - startX - 500 - 500 * lastPosition
        }px)`;
        current.style.transform = `translateX(${
          e.clientX - startX - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          e.clientX - startX + 500 - 500 * nextPosition
        }px)`;
      };
      const up = (e) => {
        let offset = 0;
        if (e.clientX - startX > 250) {
          offset = 1;
        } else if (e.clientX - startX < -250) {
          offset = -1;
        }

        last.style.transition = '';
        current.style.transition = '';
        next.style.transition = '';

        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;
        current.style.transform = `translateX(${
          offset * 500 - 500 * position
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;

        position = (position - offset + this.data.length) % this.data.length;

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });

    return root;
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
}

let text = 'text node';

let Tree = function () {
  return <div>tree node</div>;
};

const data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
];

const cpt = (
  <Carousel data={data}>
    {/* <div style='background: blue'>
      a<span>span</span>
    </div>
    <div style='background: yellow'>b</div>
    <div style='background: green'>c</div>
    <div style='background: aqua'>d</div>
    {[0, 1, 2].map((item) => {
      return <i>{item}</i>;
    })}
    {text}
    <Tree /> */}
  </Carousel>
);

cpt.mountTo(document.body);

export default cpt;
