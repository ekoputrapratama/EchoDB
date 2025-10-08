import { E as EventEmitter, i as isInWorker } from "./index-BLFV6BMf.js";
class NetworkProvider extends EventEmitter {
  constructor() {
    super();
    this.connected = navigator.onLine;
    if (!isInWorker()) {
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
export {
  NetworkProvider as default
};
