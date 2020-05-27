const getStyle = function(element) {
  if (Object.keys(element.computedStyle).length < 1) return;
  if (!element.style) element.style = {};

  for (let prop in element.computedStyle) {
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/^[0-9\.]/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }

  return element.style;
}

module.exports = (element) => {
  if (!element.computedStyle) return;

  const elementStyle = getStyle(element);
  if (!elementStyle || elementStyle.display !== 'flex') return;
  let items = element.children.filter((item) => item.type === 'element');

  items.sort((a, b) => {
    return( a.order || 0) - (b.order || 0);
  });

  const style = elementStyle;
  ['width', 'height'].forEach((size) => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });

  // 添加flex默认配置
  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }

  // 初始化10个flag变量
  let mainSize, mainStart, mainEnd, mainSign, mainBase,
      crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexWrap === 'wrap-reverse') {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;

    crossSign = -1;
    crossBase = style.height;
  } else {
    crossSign = +1;
    crossBase = 0;
  }

  // 当flex容器没设置width时，取子节点宽度集合
  let isAutoMainSize = false;
  if (!style[mainSize]) {
    style[mainSize] = 0;
    for (let i = 0, len = items.length; i < len; i += 1) {
      const item = items[i];
      const itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null && itemStyle[mainSize] !== (void 0)) {
        style[mainSize] += style.width;
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  const flexLines = [flexLine];

  let mainSpace = style[mainSize];
  let crossSpace = 0;

  // 生成main axis的相关数据
  for (let i = 0, len = items.length; i < len; i += 1) {
    const item = items[i];
    const itemStyle = getStyle(item);

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) { // 当前flex item元素自适应
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(itemStyle[crossSize], crossSpace);
      }
      flexLine.push(item);
    } else {
      if (style[mainSize] < itemStyle[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(itemStyle[crossSize], crossSpace);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  // 设置最后一行
  flexLine.mainSpace = mainSpace;

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  // main axis  nowrap 情况
  if (mainSpace < 0) {
    const scale = style[mainSize] / (style[mainSize] - mainSpace);
    let currentBase = mainBase;
   
    for (let i = 0, len = items.length; i < len; i += 1) {
      const item = items[i];
      const itemStyle = getStyle(item);

      if (item.flex) itemStyle[mainSize] = 0;

      itemStyle[mainSize] *= scale;

      itemStyle[mainStart] = currentBase;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentBase = itemStyle[mainEnd];
    }
  } else { // 多行情况
    flexLines.forEach((items) => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0; // 计算所有子元素的flex值集合
      for (let i = 0, len = items.length; i < len; i += 1) {
        const item = items[i];
        const itemStyle = getStyle(item);

        if (itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) { // 子元素有flex的情况
        let currentBase = mainBase;
        for (let i = 0, len = items.length; i < len; i += 1) {
          const item = items[i];
          const itemStyle = getStyle(item);
          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex; // 求出每行的每个flex item比例的宽度
          }
          itemStyle[mainStart] = currentBase;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentBase = itemStyle[mainEnd];
        }
      } else { // 子元素没有flex的情况
        let currentBase = mainBase;
        let step = 0;
        if (style.justifyContent === 'flex-start') {
          currentBase = mainBase;
          step = 0;
        }
        if (style.justifyContent === 'flex-end') {
          currentBase = mainSpace * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === 'center') {
          currentBase = mainSpace / 2 * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === 'space-between') {
          currentBase = mainBase;
          step = mainSpace / (items.length - 1) * mainSign;
        }
        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentBase = mainBase + step / 2;
        }

        for (let i = 0, len = items.length; i < len; i += 1) {
          const item = items[i];
          const itemStyle = getStyle(item);
    
          itemStyle[mainStart] = currentBase;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentBase = itemStyle[mainEnd] + step;
        }
      }
    });
  }

  // crossxais
  if (!style[crossSize]) {
    crossSpace = 0;
    style[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i += 1) {
      style[crossSize] = style[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i += 1) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  // let lineSize = style[crossSize] / flexLines.length;
  let step = 0;

  if (style.alignContent === 'flex-start') {
    step = 0;
    crossBase += 0;
  }
  if (style.alignContent === 'flex-end') {
    step = 0;
    crossBase += crossSign * crossSpace;
  }
  if (style.alignContent === 'center') {
    step = 0;
    crossBase += crossSign * crossSpace / 2;
  }
  if (style.alignContent === 'space-between') {
    step = crossSpace / (flexLines.length - 1);
    crossBase += 0;
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / flexLines.length;
    crossBase += crossSign * step / 2;
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach((items) => {
    let lineCrossSize = style.alignContent === 'stretch' ?
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;

    for (let i = 0, len = items.length; i < len; i += 1) {
      let item = items[i];
      let itemStyle = getStyle(item);
      let align = itemStyle.alignSelf || style.alignItems;

      if (itemStyle[crossSize] === null || itemStyle[crossSize] === undefined) {
        itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0;
      }

      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * (itemStyle[crossSize] !== null && itemStyle[crossSize] !== undefined) ?
        itemStyle[crossSize] : lineCrossSize;

        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
}