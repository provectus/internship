"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotationGesture = void 0;

var _gesture = require("./gesture");

class RotationGesture extends _gesture.ContinousBaseGesture {
  constructor() {
    super();
    this.handlerName = 'RotationGestureHandler';
  }

}

exports.RotationGesture = RotationGesture;
//# sourceMappingURL=rotationGesture.js.map