function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { ContinousBaseGesture } from './gesture';
export class ForceTouchGesture extends ContinousBaseGesture {
  constructor() {
    super();

    _defineProperty(this, "config", {});

    this.handlerName = 'ForceTouchGestureHandler';
  }

  minForce(force) {
    this.config.minForce = force;
    return this;
  }

  maxForce(force) {
    this.config.maxForce = force;
    return this;
  }

  feedbackOnActivation(value) {
    this.config.feedbackOnActivation = value;
    return this;
  }

}
//# sourceMappingURL=forceTouchGesture.js.map