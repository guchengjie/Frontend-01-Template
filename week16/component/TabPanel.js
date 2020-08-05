import { Text, create, Wrapper } from './createElement';

export class TabPanel {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  select(i) {
    for (let view of this.childViews) {
      view.style.display = 'none';
    }
    this.childViews[i].style.display = '';

    for (let view of this.titleViews) {
      view.classList = 'selected';
    }
    this.childViews[i].classList = '';
      // this.titleView.innerText = this.childViews[i].title;
  }

  render() {
    this.childViews = this.children.map((child) => <div style="width:300px; min-height: 300px">{child}</div>);
    this.titleViews = this.children.map((child, i) => <span onClick={() => { this.select(i) }} style="width:300px; min-height: 300px">{child.getAttribute('title') || ''}</span>);

    setTimeout(() => {
      this.select(0);
    }, 16);
    return <div class="tab-panel" style="border: solid 1px lightgreen;width: 300px">
      <h1 style="background: lightgreen;width: 300px;margin: 0">{this.titleViews}</h1>
      <div style="width: 300px;min-height: 300px">
        {this.childViews}
      </div>
    </div>
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}