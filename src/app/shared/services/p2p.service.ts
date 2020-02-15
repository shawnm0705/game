import { Injectable } from '@angular/core';
import { UtilsService} from '@services/utils.service';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class P2PService {
  private peer;
  private connections = [];
  private streams: {
    id: string;
    stream: any;
  }[] = [];

  constructor(
    private utils: UtilsService
  ) {}

  // initialise the peer connection. Broadcast game data once received
  init(): void {
    if (this.peer) {
      this.peer.destroy();
    }
    // reset connections
    this.connections = [];
    let id = '';
    Array(4).fill(1).forEach(n => {
      id += Math.floor((Math.random() * 9) + 1);
    });
    this.peer = new Peer(id);
    this.peer.on('connection', conn => conn.on('data', data => this.utils.broadcastEvent('game-data', data)));
    this.peer.on('call', call => {
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(stream => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', remoteStream => {
          if (this.streams.find(s => s.id === this.getId())) {
            return;
          }
          this.streams.push({
            id: this.getId(),
            stream: remoteStream
          });
        });
      })
      .catch(err => {
        console.error('Failed to get local stream', err);
      });
    });
  }

  // get the peer id of the current user
  getId() {
    return this.peer.id;
  }

  getStream(id) {
    const streamObject = this.streams.find(s => id === s.id);
    if (!streamObject) {
      return null;
    }
    return streamObject.stream;
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

  call(id: string) {
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then(stream => {
        const call = this.peer.call(id, stream);
        call.on('stream', stream => {
          if (this.streams.find(s => s.id === id)) {
            return;
          }
          this.streams.push({
            id: id,
            stream: stream
          });
        });
      })
      .catch(err => {
        console.error('Failed to get local stream', err);
      });
  }
}