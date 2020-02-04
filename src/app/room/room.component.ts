import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService} from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { P2PService } from '@services/p2p.service';
import { faArrowLeft, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  // current game
  game: string;
  // how many people needed in a game
  games = {
    davinci_code: {
      name: 'Davinci Code',
      min: 2,
      max: 4
    }
  };
  name: string;
  // room members list
  roomMembers: string[] = [];
  // the room number to join
  roomNumber: string;
  faArrowLeft = faArrowLeft;
  faUserAlt = faUserAlt;

  constructor(
    public utils: UtilsService,
    public storage: StorageService,
    private route: ActivatedRoute,
    public p2p: P2PService,
    private router: Router
  ) { }

  ngOnInit() {
    this.game = this.route.snapshot.paramMap.get('game');
    this.p2p.init();
  }

  saveName() {
    if (!this.name) {
      return;
    }
    this.storage.set('name', this.name);
  }

  back() {
    this.router.navigate(['']);
  }

  join() {

  }

  start() {

  }

}
