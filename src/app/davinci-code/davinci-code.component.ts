import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService} from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { P2PService } from '@services/p2p.service';

interface GameData {
  members: Member[];
  stack: {
    black: Card[];
    white: Card[];
  }
  currentTurn: {
    memberIndex: number;
    newCard: Card;
  };
  history: {
    id: string;
    name: string;
    checkMark: string;
    guess: string|number;
    result: boolean;
  }[];
}

interface Member {
  id: string;
  name: string;
  cards: Card[];
  cardWaitingForConfirm: Card;
}

interface Card {
  color: string;
  mark: string;
  content: string|number;
  opened?: boolean;
}

const MARKS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].reverse();
const CARDS = [...Array(12).keys(), '-'];

@Component({
  selector: 'app-davinci-code',
  templateUrl: './davinci-code.component.html',
  styleUrls: ['./davinci-code.component.scss']
})
export class DavinciCodeComponent implements OnInit {
  // is the current user prepared to start
  isPrepared = false;
  isMyTurn = false;
  initialCards = [];
  gameData: GameData;

  constructor(
    public utils: UtilsService,
    public storage: StorageService,
    private route: ActivatedRoute,
    public p2p: P2PService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.storage.isHost()) {
      // initialise game data
      this.gameData = this.storage.getGameData();
      this.gameData.stack = {
        // black: this.utils.shuffle(CARDS).map((card, i) => {
        black: CARDS.map((card, i) => {
          return {
            color: 'black',
            content: card,
            mark: MARKS[i],
            opened: false
          };
        }),
        white: this.utils.shuffle(CARDS).map((card, i) => {
          return {
            color: 'white',
            content: card,
            mark: MARKS[i + 13],
            opened: false
          };
        })
      };
    }
    this.utils.getEvent('game-data').subscribe(res => {
      // member receive game data from host
      if (!this.storage.isHost()) {
        this.gameData = res;
        return;
      }
      // host received data showing that a member has selected initial cards
      if (this.utils.has(res, 'prepared') && res.prepared === true) {
        this.memberPrepared(res.id, res.cards);
        return;
      }
    });
  }

  /*****************
    Preparation
  *****************/
  // how many initial cards should everyone has
  initCardCount(): number {
    if (!this.storage.getGameData()) {
      this.router.navigate(['room', 'davinci_code']);
      return 4;
    }
    return this.storage.getGameData().members.length === 4 ? 3 : 4;
  }

  // when user select initial card
  selectInitialCard(n): void {
    if (this.initialCards.length === this.initCardCount() && !this.initialCards.includes(n)) {
      return;
    }
    this.initialCards = this.utils.addOrRemove(this.initialCards, n);
  }

  // when user has confirmed on initial cards selection
  prepared(): void {
    if (this.storage.isHost()) {
      this.memberPrepared(this.p2p.getId(), this.initialCards);
    } else {
      // send data to the host
      this.p2p.send({
        id: this.p2p.getId(),
        prepared: true,
        cards: this.initialCards
      });
    }
    this.isPrepared = true;
  }

  // when host received data that a member has selected initial cards
  memberPrepared(id, cards): void {
    // find the member
    const memberIndex = this.gameData.members.findIndex(m => m.id === id);
    const member = this.gameData.members[memberIndex];
    member.cards = [];
    member.cardWaitingForConfirm = null;
    cards.forEach(initCard => {
      const card = initCard < 5 ? this.gameData.stack.black.pop() : this.gameData.stack.white.pop();
      card.opened = false;
      member.cards.push(card);
      if (card.content === '-') {
        member.cardWaitingForConfirm = card;
      }
    });
    // sort the cards
    member.cards.sort((a, b) => {
      // leave the '-' unchanged
      if (a.content === '-' || b.content === '-') {
        return 0;
      }
      if (a.content < b.content) {
        return -1;
      }
      if (a.content > b.content) {
        return 1;
      }
      return a.color === 'black' ? -1 : 1;
    });
    this.gameData.members[memberIndex] = member;
    this.p2p.send(this.gameData);
  }

  me(): Member {
    return this.gameData.members.find(m => m.id === this.p2p.getId());
  }

  // when I reordered the joker card
  reorderCardToIndex(i): void {
    const myIndex = this.gameData.members.findIndex(m => m.id === this.p2p.getId());
    const cards = this.gameData.members[myIndex].cards;
    const jokerCardIndex = cards.findIndex(c => c.mark === this.me().cardWaitingForConfirm.mark);
    if (jokerCardIndex < i) {
      i --;
    }
    cards.splice(i, 0, cards.splice(jokerCardIndex, 1)[0]);
  }

  // when confirmed the position of the joker card
  cardConfirmed() {
    console.log(this.gameData);
  }

  // This is used only for testing
  next() {
    if (!this.gameData.members[1].cards) {
      return this.utils.broadcastEvent('game-data', {id: this.gameData.members[1].id, cards: [1,2,6,7]});
    }
    if (!this.gameData.members[2].cards) {
      return this.utils.broadcastEvent('game-data', {id: this.gameData.members[1].id, cards: [1,2,6,7]});
    }
  }

}
