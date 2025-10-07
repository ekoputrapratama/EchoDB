import dns from 'dns';

import { EventEmitter } from 'eventemitter3';

export default class NetworkProvider extends EventEmitter {
  connected: boolean = navigator.onLine;
  constructor() {
    super();
    this.connected = false;
    dns.resolve('www.google.com', function (err) {
      if (err) {
        this.connected = false;
        this.emit('offline');
      } else {
        this.connected = true;
        this.emit('online');
      }
    });
    setInterval(function () {
      dns.resolve('www.google.com', function (err) {
        if (err) {
          this.connected = false;
          this.emit('offline');
        } else {
          this.connected = true;
          this.emit('online');
        }
      });
    }, 1000);
  }
}
