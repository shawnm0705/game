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
  roomId: string;
  joiningRoom: boolean;
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
    this.storage.setGameData({});
    if (this.storage.get('name')) {
      this.roomMembers = [this.storage.get('name')];
    }
    this.utils.getEvent('game-data').subscribe(res => {
      // host user receive the data that a new user has joined this room
      if (this.utils.has(res, 'newUser') && res.newUser && this.storage.isHost()) {
        this.roomMembers.push(res.name);
        const gameData = this.storage.getGameData();
        // initialise the host info if not set yet
        if (!this.utils.has(gameData, 'members')) {
          gameData.members = [{
            id: this.p2p.getId(),
            name: this.storage.get('name')
          }];
        }
        // add this new user to members
        gameData.members.push({
          id: res.id,
          name: res.name
        });
        // save game data in local storage
        this.storage.setGameData(gameData);
        // connect to this new peer
        this.p2p.connect(res.id);
        // broadcast the latest info to all users
        this.p2p.send(gameData);
      }

      // room member user receive the data to update members
      if (this.utils.has(res, 'members')) {
        this.roomMembers = res.members.map(member => member.name);
      }
    });
  }

  saveName() {
    if (!this.name) {
      return;
    }
    this.storage.set('name', this.name);
    this.roomMembers = [this.name];
  }

  back() {
    this.router.navigate(['']);
  }

  /**
   * Only for people who are not host
   * Join a room with room id
   */
  join() {
    if (!this.roomId) {
      return;
    }
    this.p2p.connect(this.roomId);
    this.p2p.send({
      newUser: true,
      id: this.p2p.getId(),
      name: this.storage.get('name')
    });
    this.joiningRoom = true;
  }

  /**
   * Only for host people
   * Start the game
   */
  start() {

  }

}
