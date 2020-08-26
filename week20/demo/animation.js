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
    this.animations = new Set;
    this.finishedAnimation = new Set;
    this.addTimes = new Map;
    this.requestID = null;
    this.state = 'inited';
    this.tick = this.tick.bind(this);
  }

  tick() {
    let t = Date.now() - this.startTime;
    for (let animation of this.animations) {
      let { object, property, duration, timingFunction, template, delay } = animation;
      let addTime = this.addTimes.get(animation);
      if (t < delay + addTime) continue; // 时间未到

      let progression = timingFunction((t - delay - addTime) / duration); // 0 - 1之间, 计算过程状态

      if (t > duration + delay + addTime) { // 解决时间结束位置不一致的问题
        progression = 1;
        this.animations.delete(animation);
        this.finishedAnimation.add(animation);
      }
      let value = animation.valueFormProgression(progression);

      object[property] = template(value);
    }
    if (this.animations.size) {
      this.requestID = requestAnimationFrame(this.tick);
    } else {
      this.requestID = null;
    }
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requestID !== null) { 
      cancelAnimationFrame(this.requestID);
      this.requestID = null;
    }
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime; // 加上暂停的时间
    this.tick();
  }

  add(animation, addTime) {
    this.animations.add(animation);
    if (this.state === 'playing' && this.requestID === null) this.tick();
    if (this.state === 'playing') this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime);
    else this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
  }

  start() {
    if (this.state !== 'inited') return;
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }

  restart() {
    if (this.state === 'playing') this.pause();
    for (let animation of this.finishedAnimation) {
      this.animations.add(animation);
    }
    this.finishedAnimation = new Set;
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  reset() {
    if (this.state === 'playing') this.pause();
    this.animations = new Set;
    this.requestID = null;
    this.state = 'inited';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.addTime = new Map;
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