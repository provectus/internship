"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManualGesture = void 0;

var _gesture = require("./gesture");

class ManualGesture extends _gesture.ContinousBaseGesture {
  constructor() {
    super();
    this.handlerName = 'ManualGestureHandler';
  }

}

exports.ManualGesture = ManualGesture;
//# sourceMappingURL=manualGesture.js.map