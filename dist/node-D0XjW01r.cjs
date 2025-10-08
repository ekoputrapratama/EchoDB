"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const dns = require("dns");
const index = require("./index-CLUaXSTe.cjs");
class NetworkProvider extends index.EventEmitter {
  constructor() {
    super();
    this.connected = navigator.onLine;
    this.connected = false;
    dns.resolve("www.google.com", function(err) {
      if (err) {
        this.connected = false;
        this.emit("offline");
      } else {
        this.connected = true;
        this.emit("online");
      }
    });
    setInterval(function() {
      dns.resolve("www.google.com", function(err) {
        if (err) {
          this.connected = false;
          this.emit("offline");
        } else {
          this.connected = true;
          this.emit("online");
        }
      });
    }, 1e3);
  }
}
exports.default = NetworkProvider;
