export const enableGesture = function (element) {
  let contexts = new Map();

  let MOUSE_SYMBOL = Symbol('mouse');

  if (document.ontouchstart !== null) {
    element.addEventListener('mousedown', (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseup = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        element.removeEventListener('mousemove', mousemove);
        element.removeEventListener('mouseup', mouseup);
      };

      element.addEventListener('mousemove', mousemove);
      element.addEventListener('mouseup', mouseup);
    });
  }

  element.addEventListener('touchstart', (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener('touchmove', (event) => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener('touchend', (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  element.addEventListener('touchcancel', (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  // tap
  // pan - panstart panmove panend
  // press
  // flick

  // 监听  -->  识别  -->  分发

  let start = (point, context) => {
    // console.log('start', point.clientX, point.clientY);
    element.dispatchEvent(new CustomEvent('start'), {
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY,
    });

    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.moves = [];

    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return;

      context.isTap = false;
      context.isPan = false;
      context.isPress = true;

      element.dispatchEvent(new CustomEvent('pressstart'), {});
    }, 500);
  };

  let move = (point, context) => {
    // console.log('move', point.clientX, point.clientY);
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent('presscancel'), {});
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;

      element.dispatchEvent(Object.assign(new CustomEvent('panstart'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
      }));
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves = context.moves.filter(
        (record) => Date.now() - record.t < 300
      );
      element.dispatchEvent(Object.assign(new CustomEvent('pan'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
      }));
    }
  };

  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.startX;
      let dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      
      if (speed > 2.5) {
        console.log('flick');
      }
      element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
      }));
    }

    if (context.isTap) {
      element.dispatchEvent(new CustomEvent('tap'), {});
    }
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent('pressend'), {});
    }

    clearTimeout(context.timeoutHandler);
  };

  let cancel = (point, context) => {
    element.dispatchEvent(new CustomEvent('canceled'), {});
    clearTimeout(context.timeoutHandler);
  };
};
