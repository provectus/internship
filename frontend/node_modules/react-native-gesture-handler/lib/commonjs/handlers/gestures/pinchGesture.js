"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PinchGesture = void 0;

var _gesture = require("./gesture");

class PinchGesture extends _gesture.ContinousBaseGesture {
  constructor() {
    super();
    this.handlerName = 'PinchGestureHandler';
  }

}

exports.PinchGesture = PinchGesture;
//# sourceMappingURL=pinchGesture.js.map