var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.open('http://localhost:8000/', function () {
  var body = page.evaluate(function() {
    var toString = function(pad, ele) {
      console.log('test');
      var children = ele.children;
      var childrenStr = '';
      for (var i = 0; i < children.length; i ++) {
        childrenStr += toString("  " + pad, children[i]) + "\n";
      }
      var name = ele.tagName;
      if (ele.nodeType === Node.TEXT_NODE) {
        name = "#text" + JSON.stringify(ele.textContent);
      }
      if (ele.nodeType === Node.ELEMENT_NODE) {
        name = ele.tagName;
      }
      return pad + name + (childrenStr? "\n" + childrenStr : "");
    }
    return toString('', document.body);
  });
  console.log(body);
  phantom.exit();
});
