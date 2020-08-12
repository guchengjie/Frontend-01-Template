import { parseHTML } from '../src/parser';
import assert from 'assert';

it('parse a single element', () => {
  const doc = parseHTML("<div></div>");
  const div = doc.children[0];
  assert.equal(div.tagName, 'div');
  assert.equal(div.children.length, 0);
  assert.equal(div.type, 'element');
  assert.equal(div.attributes.length, 0);
});

it('parse a single element with text content', () => {
  const doc = parseHTML("<div>hello world</div>");
  const div = doc.children[0];
  assert.equal(div.children[0].type, 'text');
  assert.equal(div.children[0].content, 'hello world');
});

it('tag mismatch', () => {
  try {
    const doc = parseHTML("<div></divv>");
  } catch (error) {
    assert.equal(error.message, "Tag start end doesn't match!");
  }
});

it('text with <', () => {
  const doc = parseHTML("<div>a < b</div>");
  const div = doc.children[0];
  assert.equal(div.children[0].type, 'text');
  assert.equal(div.children[0].content, 'a < b');
});

it('with property', () => {
  const doc = parseHTML("<DIV id=a class='cls' data=\"add\" ></DIV>");
  const div = doc.children[0];
  assert.equal(div.attributes[0].value, 'a');
  assert.equal(div.attributes[0].name, 'id');
  assert.equal(div.attributes[1].value, 'cls');
  assert.equal(div.attributes[1].name, 'class');
  assert.equal(div.attributes[2].value, 'add');
  assert.equal(div.attributes[2].name, 'data');
});

it('self closing start tag', () => {
  const doc = parseHTML("<img />");
  const div = doc.children[0];
  assert.equal(div.attributes[0].value, true);
  assert.equal(div.attributes[0].name, 'isSelfClosing');
});

it('with double quoted property', () => {
  const doc = parseHTML("<DIV id=a class='cls' data=\"add\"></DIV>");
  const div = doc.children[0];
  assert.equal(div.attributes[0].value, 'a');
  assert.equal(div.attributes[0].name, 'id');
  assert.equal(div.attributes[1].value, 'cls');
  assert.equal(div.attributes[1].name, 'class');
  assert.equal(div.attributes[2].value, 'add');
  assert.equal(div.attributes[2].name, 'data');
});

it('with property 2', () => {
  const doc = parseHTML("<div  id=a class=' cls' data=\"add\"/>");
  const div = doc.children[0];
  assert.equal(div.attributes[0].value, 'a');
  assert.equal(div.attributes[0].name, 'id');
  assert.equal(div.attributes[1].value, ' cls');
  assert.equal(div.attributes[1].name, 'class');
  assert.equal(div.attributes[2].value, 'add');
  assert.equal(div.attributes[2].name, 'data');
});

it('attribute with no value', () => {
  const doc = parseHTML("<div id class/>");
  const div = doc.children[0];
});

it('attribute with no value', () => {
  const doc = parseHTML("<div class />");
  const div = doc.children[0];
});

it('script', () => {
  const content = `<div>asdf</div>
  <span>asfsdff</span>
  </script
  </scrip
  </scri
  </scr
  </sc
  </s
  </
  <
  <script
  `;
  const doc = parseHTML(`<script>${content}</script>`);
  const div = doc.children[0].children[0];
  assert.equal(div.content, content);
});