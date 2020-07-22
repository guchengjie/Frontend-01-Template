/*
  let animation = new Animation(object, property, start, end, duration, delay, timingFunction);

  let timeline = new Timeline();
  timeline.add(animation);

  timeline.start();
  timeline.pause();
  timeline.resume();
  timeline.stop();

*/


export class Timeline {
  constructor() {
    this.animations = [];
    this.requestID = null;
    this.state = 'inited';
  }

  tick = () => {
    let t = Date.now() - this.startTime;
    const animations = this.animations.filter(i => !i.finished);
    for (let animation of animations) {
      let { object, property, duration, timingFunction, template, delay, addTime } = animation;
      
      let progression = timingFunction((t - delay - addTime) / duration); // 0 - 1之间, 计算过程状态

      if (t > duration + delay + addTime) {
        progression = 1;
        animation = true;
      }

      let value = animation.valueFormProgression(progression);
      
      object[property] = template(value);
    }

    if (animations.length) {
      this.requestID = requestAnimationFrame(this.tick);
    }
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requestID) cancelAnimationFrame(this.requestID);
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime; // 加上暂停的时间
    this.tick();
  }

  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;
    if (this.state === 'playing') animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
    else animation.addTime = addTime !== void 0 ? addTime : 0;
  }

  start() {
    if (this.state !== 'inited') return;
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state !== 'playing') return;
    this.animations.forEach(i => i.finished = true);
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }
}

export class Animation {
  constructor(config) {
    this.object = config.object;
    this.property = config.property;
    this.start = config.start;
    this.end = config.end;
    this.duration = config.duration;
    this.delay = config.delay || 0;
    this.template = config.template;
    this.timingFunction = config.timingFunction;
  }

  valueFormProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(config) {
    this.object = config.object;
    this.property = config.property;
    this.start = config.start;
    this.end = config.end;
    this.duration = config.duration;
    this.delay = config.delay || 0;
    this.template = config.template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    this.timingFunction = config.timingFunction;
  }

  valueFormProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    }
  }
}