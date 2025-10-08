import dns from "dns";
import { E as EventEmitter } from "./index-BLFV6BMf.js";
class NetworkProvider extends EventEmitter {
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
export {
  NetworkProvider as default
};
