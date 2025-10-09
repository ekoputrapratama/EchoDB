"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-D0qWv6Zh.cjs");
class NetworkProvider extends index.EventEmitter {
  constructor() {
    super();
    this.connected = navigator.onLine;
    if (!index.isInWorker()) {
      window.addEventListener("online", () => {
        this.connected = true;
        this.emit("online");
      });
      window.addEventListener("offline", () => {
        this.connected = false;
        this.emit("offline");
      });
    }
  }
}
exports.default = NetworkProvider;
