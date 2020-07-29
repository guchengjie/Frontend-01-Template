import { Text, create, Wrapper } from './createElement';
import { Timeline, Animation } from './animation';
import { enableGesture } from './gesture';
import { linear, ease } from './cubicBezier';

export class Carousel {
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
    let position = 0;
    let timeline = new Timeline();
    this.timeline = timeline;
    timeline.start();

    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
      let nextPosition = (currentPosition + 1) % this.data.length;
  
      let offset = 0;

      const handlerStart = () => {
        console.log('----start----');
        this.timeline.pause();
        window.clearTimeout(this.stopPlay);

        let current = children[currentPosition];

        // start 开始计算偏移量
        let currentTransformVal = Number(current.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
        offset = currentTransformVal + 500 * currentPosition;
      }

      const handlerPan = (event) => {
        console.log('----pan----');
        let last = children[lastPosition];
        let current = children[currentPosition];
        let next = children[nextPosition];

        let currentTransformVal =  -500 * currentPosition + offset;
        let lastTransformVal = -500 - 500 * lastPosition  + offset;
        let nextTransformVal = 500 - 500 * nextPosition + offset;

        let dx = event.clientX - event.startX;

        current.style.transform = `translateX(${currentTransformVal + dx}px)`;
        last.style.transform = `translateX(${lastTransformVal + dx}px)`;
        next.style.transform = `translateX(${nextTransformVal + dx}px)`;
      }

      const handlerPanend = (e) => {
        let offset = 0;
        if (e.clientX - e.startX > 250) {
          offset = 1;
        } else if (e.clientX - e.startX < -250) {
          offset = -1;
        }

        let last = children[lastPosition];
        let current = children[currentPosition];
        let next = children[nextPosition];

        last.style.transform = `translateX(${
          offset * 500 - 500 - 500 * lastPosition
        }px)`;
        current.style.transform = `translateX(${
          offset * 500 - 500 * currentPosition
        }px)`;
        next.style.transform = `translateX(${
          offset * 500 + 500 - 500 * nextPosition
        }px)`;
      }

      let element = <img onStart={handlerStart} onPan={handlerPan} onPanend={handlerPanend} enableGesture={true} src={url} />;
      element.style.transform = 'translateX(0px)';
      element.addEventListener('dragstart', (e) => e.preventDefault());
      return element;
    });
    let root = (
      <div class='carousel'>
        {children}
      </div>
    )

    let nextPic = (time) => {
      let nextPosition = (position + 1) % this.data.length;
      let current = children[position];
      let next = children[nextPosition];
      const currentA = new Animation({
        object: current.style,
        property: 'transform', 
        template: v => `translateX(${5 * v}px)`,
        start: -100 * position, 
        end: -100 - 100 * position,
        duration: 500,
        delay: 0,
        timingFunction: ease,
      });
      const currentN = new Animation({
        object: next.style,
        property: 'transform', 
        template: v => `translateX(${5 * v}px)`,
        start: 100 - 100 * nextPosition, 
        end: -100 * nextPosition,
        duration: 500,
        delay: 0,
        timingFunction: ease,
      });
      timeline.add(currentA);
      timeline.add(currentN);
      
      position = nextPosition;

      this.stopPlay = setTimeout(nextPic, 2000);
    };

    this.stopPlay = setTimeout(nextPic, 2000);
    // root.addEventListener('mousedown', (event) => {
    //   const startX = event.clientX;
    //   const startY = event.clientY;

    //   let lastPosition = (position - 1 + this.data.length) % this.data.length;
    //   let nextPosition = (position + 1) % this.data.length;

    //   let last = children[lastPosition];
    //   let current = children[position];
    //   let next = children[nextPosition];

    //   last.style.transition = 'ease 0s';
    //   current.style.transition = 'ease 0s';
    //   next.style.transition = 'ease 0s';

    //   last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
    //   current.style.transform = `translateX(${-500 * position}px)`;
    //   next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;

    //   const move = (e) => {
    //     last.style.transform = `translateX(${
    //       e.clientX - startX - 500 - 500 * lastPosition
    //     }px)`;
    //     current.style.transform = `translateX(${
    //       e.clientX - startX - 500 * position
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       e.clientX - startX + 500 - 500 * nextPosition
    //     }px)`;
    //   };
    //   const up = (e) => {
    //     let offset = 0;
    //     if (e.clientX - startX > 250) {
    //       offset = 1;
    //     } else if (e.clientX - startX < -250) {
    //       offset = -1;
    //     }

    //     last.style.transition = '';
    //     current.style.transition = '';
    //     next.style.transition = '';

    //     last.style.transform = `translateX(${
    //       offset * 500 - 500 - 500 * lastPosition
    //     }px)`;
    //     current.style.transform = `translateX(${
    //       offset * 500 - 500 * position
    //     }px)`;
    //     next.style.transform = `translateX(${
    //       offset * 500 + 500 - 500 * nextPosition
    //     }px)`;

    //     position = (position - offset + this.data.length) % this.data.length;

    //     document.removeEventListener('mousemove', move);
    //     document.removeEventListener('mouseup', up);
    //   };
    //   document.addEventListener('mousemove', move);
    //   document.addEventListener('mouseup', up);
    // });

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