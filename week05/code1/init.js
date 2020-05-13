window.onload = function () {
  const G6 = window.G6;
  const width = document.getElementById("container").scrollWidth;
  const height = document.getElementById("container").scrollHeight || 500;
  const graph = new G6.Graph({
    container: "container",
    width,
    height,
    layout: {
      type: "force",
      preventOverlap: true,
      linkDistance: (d) => {
        if (d.source.id === "context") {
          return 200;
        }
        return 50;
      },
      nodeStrength: (d) => {
        if (d.isLeaf) {
          return -10;
        }
        return -5;
      },
      edgeStrength: (d) => {
        return 0.3;
      },
    },
    defaultNode: {
      color: "#5B8FF9",
      style: {
        lineWidth: 2,
        fill: "#C6E5FF",
      },
    },
    defaultEdge: {
      size: 1,
      color: "#e2e2e2",
    },
  });

  // const data = {
  //   nodes: [
  //     { id: "node0", size: 50 },
  //     { id: "node1", size: 30 },
  //     { id: "node2", size: 30 },
  //     { id: "node3", size: 30 },
  //     { id: "node4", size: 30, isLeaf: true },
  //   ],
  //   edges: [
  //     { source: "node0", target: "node1" },
  //   ],
  // };
  const data = getNodeDatas();
  console.log(data);
  const nodes = data.nodes;
  graph.data({
    nodes,
    edges: data.edges.map(function (edge, i) {
      edge.id = "edge" + i;
      return Object.assign({}, edge);
    }),
  });
  graph.render();

  graph.on("node:dragstart", function (e) {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on("node:drag", function (e) {
    refreshDragedNodePosition(e);
  });
  graph.on("node:dragend", function (e) {
    e.item.get("model").fx = null;
    e.item.get("model").fy = null;
  });

  function refreshDragedNodePosition(e) {
    const model = e.item.get("model");
    model.fx = e.x;
    model.fy = e.y;
  }

  function getNodeDatas() {
    // 函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）MDN
    var set = new Set();
    // realm
    var globalPropretys = [
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "Array",
      "Date",
      "RegExp",
      "Promise",
      "Proxy",
      "Map",
      "WeakMap",
      "Set",
      "WeakSet",
      "Function",
      "Boolean",
      "String",
      "Number",
      "Symbol",
      "Object",
      "Error",
      "EvalError",
      "RangeError",
      "ReferenceError",
      "SyntaxError",
      "TypeError",
      "URIError",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Float32Array",
      "Float64Array",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Uint8Array",
      "Uint16Array",
      "Uint32Array",
      "Uint8ClampedArray",
      "Atomics",
      "JSON",
      "Math",
      "Reflect",
    ];
    const queue = [];
    const nodeDatas = {
      nodes: [{ id: "context", size: 50, label: 'context', }],
      edges: [],
    };
    for (let key of globalPropretys) {  
      nodeDatas.nodes.push({ id: key, size: 35, isLeaf: true, label: key, });
      nodeDatas.edges.push({ source: "context", target: key });
      queue.push({
        path: [key],
        object: this[key],
      });
    }
    while (queue.length) {
      const current = queue.shift();
      if (set.has(current.object)) continue;
      set.add(current.object);
      // console.log(current.path.join("."));
      for (let key of Object.getOwnPropertyNames(current.object)) {
        // if (key === 'dotAll') debugger
        const property = Object.getOwnPropertyDescriptor(current.object, key);
        if (
          property.hasOwnProperty("value") &&
          property.value !== null &&
          typeof property.value === "object" &&
          property.value instanceof Object
        ) {
          if (key === 'prototype') {
            key = current.path.concat([key]).join('.');
            nodeDatas.nodes.push({
              id: key,
              size: 35 - (current.path.length) * 10,
              label: key,
            });
            nodeDatas.edges.push({
              source: current.path[current.path.length - 1],
              target: key,
            });
          } else {
            nodeDatas.nodes.push({
              id: key,
              size: 35 - (current.path.length) * 10,
              label: key,
            });
            nodeDatas.edges.push({
              source: current.path[current.path.length - 1],
              target: key,
            });
          }
          
          queue.push({
            object: key.indexOf('prototype') !== -1 ? current.object['prototype'] : current.object[key],
            path: current.path.concat([key]),
          });
        }
        if (
          property.hasOwnProperty("get") &&
          typeof property.get === "function"
        ) {
          nodeDatas.nodes.push({
            id: key,
            size: 35 - (current.path.length) * 10,
            label: key,
          });
          nodeDatas.edges.push({
            source: current.path[current.path.length - 1],
            target: key,
          });
          queue.push({
            object: property.get,
            path: current.path.concat([key]),
          });
        }
        if (
          property.hasOwnProperty("set") &&
          typeof property.set === "function"
        ) {
          nodeDatas.nodes.push({
            id: key,
            size: 35 - (current.path.length + 1) * 10,
            label: key,
          });
          nodeDatas.edges.push({
            source: current.path[current.path.length - 1],
            target: key,
          });
          queue.push({
            object: property.set,
            path: current.path.concat([key]),
          });
        }
      }
    }
    return nodeDatas;
  }
};
