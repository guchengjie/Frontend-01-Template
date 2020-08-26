import { Text, create, Wrapper } from './createElement';

export class Panel {
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
    return <div class="panel">
      <h1 style="">{this.title}</h1>
      <div style="width: 300px;min-height: 300px">
        {this.children}
      </div>
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}