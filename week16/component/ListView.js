import { Text, create, Wrapper } from './createElement';
import css from './carousel.css';

console.log(css);
// const style = document.createElement('style');
// style.innerHTML = css[0][1];
// document.documentElement.appendChild(style);

export class ListView {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }

  render() {
    let data = this.getAttribute('data');

    return <div class="list-view" style="width: 300px;min-height: 300px">
        {data.map(this.children[0])}
      </div>;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}