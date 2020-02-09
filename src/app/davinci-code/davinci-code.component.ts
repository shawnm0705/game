import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService} from '@services/utils.service';
import { StorageService } from '@services/storage.service';
import { P2PService } from '@services/p2p.service';

interface GameData {
  members: Member[];
  deck: {
    black: Card[];
    white: Card[];
  }
  currentTurn: {
    memberIndex: number;
    newCard: Card;
    waitingForConfirmation: boolean;
  };
  history: {
    name: string;
    cardMark: string;
    guessAs?: string|number;
    result?: boolean;
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

@Component({
  selector: 'app-davinci-code',
  templateUrl: './davinci-code.component.html',
  styleUrls: ['./davinci-code.component.scss']
})
export class DavinciCodeComponent implements OnInit {
  CARDS = [...Array(12).keys(), '-'];
  // is the current user prepared to start
  isPrepared = false;
  initialCards = [];
  gameData: GameData;
  selectedCardFromDeckIndex: number = null;
  selectedCardFromDeckConfirming: boolean;
  guessCardMark: string;
  guessAs: number | string;
  guessConfirming: boolean;

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
      this.gameData.deck = {
        black: this.utils.shuffle(this.CARDS).map((card, i) => {
          return {
            color: 'black',
            content: card,
            mark: MARKS[i],
            opened: false
          };
        }),
        white: this.utils.shuffle(this.CARDS).map((card, i) => {
          return {
            color: 'white',
            content: card,
            mark: MARKS[i + 13],
            opened: false
          };
        })
      };
      this.gameData.history = [];
      this.gameData.currentTurn = {
        memberIndex: null,
        newCard: null,
        waitingForConfirmation: false
      };
    }
    this.utils.getEvent('game-data').subscribe(res => {
      // member receive game data from host
      if (!this.storage.isHost()) {
        this.gameData = res;
        return;
      }

      // host received data showing that a member has selected initial cards
      if (this.utils.has(res, 'prepared') && res.prepared) {
        return this.memberPrepared(res.id, res.cards);
      }

      // host received data showing that a member has confirmed on the position of joker card
      if (this.utils.has(res, 'cardConfirmed') && res.cardConfirmed) {
        const memberIndex = this.gameData.members.findIndex(m => m.id === res.id);
        this.gameData.members[memberIndex].cards = res.cards;
        this.nextTurn();
        return this.p2p.send(this.gameData);
      }

      // host received data showing that a member has selected a card from deck
      if (this.utils.has(res, 'selectCardFromDeck')) {
        // member can only select a card from deck on his turn
        if (this.gameData.members[this.gameData.currentTurn.memberIndex].id !== res.id) {
          return;
        }
        return this.getNewCardFromDeck(res.selectCardFromDeck);
      }
    });
  }

  /************************
    Preparation
  ************************/
  // how many initial cards should everyone has
  initCardCount(): number {
    if (this.utils.isEmpty(this.storage.getGameData())) {
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

  /**
   * (HOST ONLY)
   * when host received data that a member has selected initial cards
   * @param id    Member's id
   * @param cards Card array in numbers (1 - 4 means black, 5 - 8 means white)
   */
  memberPrepared(id: string, cards: number[]): void {
    // find the member
    const memberIndex = this.gameData.members.findIndex(m => m.id === id);
    const member = this.gameData.members[memberIndex];
    member.cards = [];
    member.cardWaitingForConfirm = null;
    cards.forEach(initCard => {
      let card = initCard < 5 ? this.gameData.deck.black.pop() : this.gameData.deck.white.pop();
      // don't allow having two joker cards as initial card
      if (member.cards.find(c => c.content === '-') && card.content === '-') {
        const tmpCard = JSON.parse(JSON.stringify(card));
        if (initCard < 5) {
          card = this.gameData.deck.black.pop();
          this.gameData.deck.black.push(tmpCard);
        } else {
          card = this.gameData.deck.white.pop();
          this.gameData.deck.white.push(tmpCard);
        }
      }
      card.opened = false;
      member.cards.push(card);
      if (card.content === '-') {
        member.cardWaitingForConfirm = card;
      }
    });
    // sort the cards
    member.cards.sort(this.sortCards);
    this.gameData.members[memberIndex] = member;
    this.nextTurn();
    this.p2p.send(this.gameData);
  }

  /**
   * (HOST ONLY)
   * Sort the cards in order of number.
   * Black is smaller than white if number is the same.
   * Leave the Joker unchanged
   */
  sortCards(a, b): number {
    // leave the Joker unchanged
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
  }

  me(): Member {
    return this.gameData.members.find(m => m.id === this.p2p.getId());
  }

  /**
   * when user reordered the Joker card
   * @param i Reorder the Joker card to this index position
   */
  reorderCardToIndex(i: number): void {
    const myIndex = this.gameData.members.findIndex(m => m.id === this.p2p.getId());
    const cards = this.gameData.members[myIndex].cards;
    const jokerCardIndex = cards.findIndex(c => c.mark === this.me().cardWaitingForConfirm.mark);
    if (jokerCardIndex < i) {
      i --;
    }
    cards.splice(i, 0, cards.splice(jokerCardIndex, 1)[0]);
  }

  /**
   * when user confirmed the position of the joker card
   */
  cardConfirmed(): void {
    const myIndex = this.gameData.members.findIndex(m => m.id === this.p2p.getId());
    this.gameData.members[myIndex].cardWaitingForConfirm = null;
    if (this.storage.isHost()) {
      this.nextTurn();
      return this.p2p.send(this.gameData);
    }
    return this.p2p.send({
      id: this.p2p.getId(),
      cardConfirmed: true,
      cards: this.gameData.members[myIndex].cards
    });
  }

  /**
   * (HOST ONLY)
   * Check if it is ready to proceed to the next turn.
   * If it is, find the member to do the next turn
   */
  nextTurn(): void {
    // not ready for the next turn if not all members are prepared and confirmed on cards
    if (this.gameData.members.find(m => !this.utils.has(m, 'cards') || m.cardWaitingForConfirm)) {
      return;
    }
    if (this.gameData.currentTurn.memberIndex === null || this.gameData.currentTurn.memberIndex === this.gameData.members.length - 1) {
      this.gameData.currentTurn = {
        memberIndex: 0,
        newCard: null,
        waitingForConfirmation: false
      };
    } else {
      this.gameData.currentTurn.memberIndex ++;
      this.gameData.currentTurn.newCard = null;
    }
    this.p2p.send(this.gameData);
  }

  isMyTurn(): boolean {
    if (!this.utils.has(this.gameData, 'currentTurn') || this.gameData.currentTurn.memberIndex === null) {
      return false;
    }
    return this.gameData.members[this.gameData.currentTurn.memberIndex].id === this.p2p.getId();
  }

  instruction(): string {
    if (this.me().cardWaitingForConfirm)  {
      return this.utils.lang('Please adjust the position of "-" card');
    }
    if (this.isSelectingCardFromDeck()) {
      return this.utils.lang('Please choose a card from the card deck');
    }
    if (this.isGuessingCard()) {
      return this.utils.lang('Please choose a card from other people and guess');
    }
    return '';
  }

  /************************
    Select Card from Deck
  ************************/
  /**
   * You need to select a card from the card deck now
   */
  isSelectingCardFromDeck(): boolean {
    return this.isMyTurn() && !this.gameData.currentTurn.newCard
  }

  /**
   * When user select a card from the deck
   * @param i Card index
   */
  selectCardFromDeck(i: number): void {
    // don't need to do anything if it's not the proper time to do so
    if (!this.isSelectingCardFromDeck()) {
      return;
    }
    this.selectedCardFromDeckIndex = i;
    this.selectedCardFromDeckConfirming = false;
  }

  /**
   * When user confirmed the card from deck
   */
  cardFromDeckConfirmed(): void {
    this.selectedCardFromDeckConfirming = true;
    const color = this.selectedCardFromDeckIndex < this.gameData.deck.black.length ? 'black' : 'white';
    this.selectedCardFromDeckIndex = null;
    if (this.storage.isHost()) {
      return this.getNewCardFromDeck(color);
    }
    this.p2p.send({
      id: this.p2p.getId(),
      selectCardFromDeck: color
    });
  }

  /**
   * (HOST ONLY)
   * Get a new card from the deck
   * @param color The color of the new card
   */
  getNewCardFromDeck(color: string): void {
    this.gameData.currentTurn.newCard = color === 'black' ? this.gameData.deck.black.pop() : this.gameData.deck.white.pop();
    if (!this.gameData.history) {
      this.gameData.history = [];
    }
    this.gameData.history.push({
      name: this.gameData.members[this.gameData.currentTurn.memberIndex].name,
      cardMark: this.gameData.currentTurn.newCard.mark
    });
    this.p2p.send(this.gameData);
  }

  /************************
    Guess Card from Others
  ************************/
  /**
   * You need to select a card from another member and guess
   */
  isGuessingCard(): boolean {
    return this.isMyTurn() && !!this.gameData.currentTurn.newCard && !this.gameData.currentTurn.waitingForConfirmation;
  }

  /**
   * User is guessing a card of this member
   * @param  member The member object
   */
  isGuessingCardOfMember(member: Member): boolean {
    return this.isGuessingCard() && !!member.cards.find(c => c.mark === this.guessCardMark);
  }

  /**
   * When user select a card from other people for guessing
   * @param card The card object
   */
  selectCardForGuessing(card: Card): void {
    if (!this.isGuessingCard() || card.opened || this.guessConfirming) {
      return;
    }
    this.guessCardMark = card.mark;
  }

  /**
   * When user confirmed on the guessing of card
   */
  guessConfirmed() {
    if (!this.guessCardMark || !this.guessAs) {
      return;
    }
    this.guessConfirming = true;
    // -- to be continued
    console.log(this.guessCardMark, this.guessAs);
    if (this.storage.isHost()) {

    } else {
      this.p2p.send({
        id: this.p2p.getId(),
        guessCardMark: this.guessCardMark,
        guessAs: this.guessAs
      });
    }
  }



  // This is used only for testing
  next() {
    let data;
    if (!this.utils.has(this.gameData.members[1], 'cards')) {
      data = {id: this.gameData.members[1].id, cards: [1,2,6,7], prepared: true};
      return this.utils.broadcastEvent('game-data', data);
    }
    if (!this.utils.has(this.gameData.members[2], 'cards')) {
      data = {id: this.gameData.members[2].id, cards: [1,2,6,7], prepared: true};
      return this.utils.broadcastEvent('game-data', data);
    }
  }

}
