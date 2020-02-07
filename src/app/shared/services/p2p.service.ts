import { Injectable } from '@angular/core';
import { UtilsService} from '@services/utils.service';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class P2PService {
  private peer;
  private connections = [];

  constructor(
    private utils: UtilsService
  ) {}

  // initialise the peer connection. Broadcast game data once received
  init(): void {
    // reset connections
    this.connections = [];
    if (this.peer) {
      return;
    }
    this.peer = new Peer();
    this.peer.on('connection', conn => conn.on('data', data => this.utils.broadcastEvent('game-data', data)));
  }

  // get the peer id of the current user
  getId() {
    return 'abc'; // ------------------ for development only
    return this.peer.id;
  }

  // connect to the peer id - host will be connected with multiple peers
  connect(id: string): void {
    this.connections.push(this.peer.connect(id));
  }

  // send data to all connected peers
  send(data: any, firstTime = false): void {
    this.connections.forEach(connection => {
      if (firstTime) {
        connection.on('open', () => connection.send(data));
      } else {
        connection.send(data);
      }
    });
  }
}