const create = function(Cls, attributes, ...childs) {
  const o = new Cls({ timer: Date.now() });
  for (let key in attributes) {
    // o[key] = attributes[key];
    o.setAttribute(key, attributes[key]);
  }

  for (let child of childs) {
    o.appendChild(child);
  }

  return o;
}

class Hello {
  constructor(config) {
    this.children = [];
    this.root = document.createElement('div');
  }

  set class(v) {
    console.log('Parent:Class', v);
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    console.log(name, value);
    this.root.setAttribute(name, value);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (let child of this.children) {
      if (typeof child === 'string') {
        
      }
      child.mountTo(this.root);
    }
  }
};

const cpt = <Hello class="cls" age={20} style="background: red;width:100px;height: 100px">
  <Hello>a</Hello>
  <Hello>b</Hello>
  <Hello>c</Hello>
  <Hello>d</Hello>
</Hello>;
console.log(cpt);
cpt.mountTo(document.body);

export default cpt;