import { Injectable } from "@angular/core";
import PieSocket from 'piesocket-js';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private piesocket;
  private piesub;
  //wss://s3572.lon1.piesocket.com/v3/1?api_key=kIK2MkhFCY9Ckd5kcpHFjYZz2akuT1XTlRGMockw&notify_self=0
  constructor() {
    this.piesocket = new PieSocket({
      clusterId: 's3572.lon1',
      apiKey: 'kIK2MkhFCY9Ckd5kcpHFjYZz2akuT1XTlRGMockw'
    });
    this.piesub = this.piesocket.subscribe('99-1');
  }

  listen() {
    this.piesub.then(channel => {

      //Channel connection is established
      channel.listen('*', function (event, data, meta) {
        console.log(`${event} received: `, data, meta);
      });

      channel.on('close', function (event) {
        console.log("PieSocket disconnected!");
      });
    });
  }

  send() {
    this.piesub.then(channel => {

      //Channel connection is established
      channel.publish('events', 'some data');
    });
  }
}