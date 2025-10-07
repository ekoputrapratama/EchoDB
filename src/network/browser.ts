import { isInWorker } from '../utils/util';

import { EventEmitter } from 'eventemitter3';

export default class NetworkProvider extends EventEmitter {
  connected: boolean = navigator.onLine;
  constructor() {
    super();
    if (!isInWorker()) {
      window.addEventListener('online', () => {
        this.connected = true;
        this.emit('online');
      });
      window.addEventListener('offline', () => {
        this.connected = false;
        this.emit('offline');
      });
    }
  }
}
