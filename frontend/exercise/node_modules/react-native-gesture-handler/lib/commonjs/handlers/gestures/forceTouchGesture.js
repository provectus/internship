"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForceTouchGesture = void 0;

var _gesture = require("./gesture");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ForceTouchGesture extends _gesture.ContinousBaseGesture {
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

exports.ForceTouchGesture = ForceTouchGesture;
//# sourceMappingURL=forceTouchGesture.js.map