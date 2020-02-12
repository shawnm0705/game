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
    guessCorrectly: boolean;
    waitingForResponse: boolean;
    gameEnds: boolean;
  };
  history: History[];
}

interface History {
  name: string;
  cardMark: string;
  guessAs?: string|number;
  result?: boolean;
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
  guessAs: number | string = null;
  notification: {
    newTurn: boolean;
    history: History;
  };

  constructor(
    public utils: UtilsService,
    public storage: StorageService,
    private route: ActivatedRoute,
    public p2p: P2PService,
    private router: Router
  ) { }

  ngOnInit() {
      // initialise game data
    this.gameData = this.storage.getGameData();
    this.gameInit();
    this.utils.getEvent('game-data').subscribe(res => {
      // member receive game data from host
      if (!this.storage.isHost()) {
        let delay = false;
        if (this.utils.has(this.gameData, 'history') && this.gameData.history.length < res.history.length) {
          this.pushNotification(res.history[this.gameData.history.length]);
          delay = true;
        }
        if (this.isMyTurn()) {
          if (delay) {
            setTimeout(() => this.pushNotification(null, true), 1000);
          } else {
            this.pushNotification(null, true);
          }
        }
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
        this.gameData.members[memberIndex].cardWaitingForConfirm = null;
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

      // host received data showing that a member has guessed a card
      if (this.utils.has(res, 'guessCardMark')) {
        // member can only guess card on his turn
        if (this.gameData.members[this.gameData.currentTurn.memberIndex].id !== res.id) {
          return;
        }
        return this.checkGuessResult(res.guessCardMark, res.guessAs);
      }

      if (this.utils.has(res, 'skipTurn') && res.skipTurn) {
        // member can only skip turn on his turn
        if (this.gameData.members[this.gameData.currentTurn.memberIndex].id !== res.id) {
          return;
        }
        return this.memberSkipTurn();
      }
    });
  }

  /**
   * Initial values when game start
   */
  gameInit() {
    this.gameData.members.forEach((m, i) => {
      this.gameData.members[i].cards = [];
      this.gameData.members[i].cardWaitingForConfirm = null;
    });
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
      waitingForConfirmation: false,
      guessCorrectly: null,
      waitingForResponse: false,
      gameEnds: false
    };
  }

  restart() {
    this.gameInit();
    this.p2p.send(this.gameData);
  }

  pushNotification(notification: History, newTurn = false) {
    // don't need to show notification on my turn
    if (!newTurn && this.isMyTurn()) {
      return;
    }
    this.notification = {
      newTurn: newTurn,
      history: notification
    };
    setTimeout(
      () => {
        this.notification = null;
      },
      3000
    );
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
    // Move the Joker card to left
    if (a.content === '-') {
      return -1;
    }
    if (b.content === '-') {
      return 1;
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
    if (this.gameData.members.find(m => !m.cards.length || m.cardWaitingForConfirm)) {
      return;
    }
    do {
      if (this.gameData.currentTurn.memberIndex === null || this.gameData.currentTurn.memberIndex === this.gameData.members.length - 1) {
        this.gameData.currentTurn.memberIndex = 0;
      } else {
        this.gameData.currentTurn.memberIndex ++;
      }
      // skip member whose cards are all opened
    } while (!this.gameData.members[this.gameData.currentTurn.memberIndex].cards.find(c => !c.opened));
    if (this.isMyTurn()) {
      this.pushNotification(null, true);
    }
    this.newTurnInit();
    this.p2p.send(this.gameData);
  }

  newTurnInit() {
    this.gameData.currentTurn.newCard = null;
    this.gameData.currentTurn.waitingForConfirmation = false;
    this.gameData.currentTurn.guessCorrectly = null;
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
    if (this.isGuessingCard() && !this.gameData.currentTurn.gameEnds) {
      let msg = this.utils.lang('Please choose a card from other people and guess');
      if (this.gameData.currentTurn.guessCorrectly) {
        msg += ', ' + this.utils.lang('or skip this turn');
      }
      return msg;
    }
    if (this.isWaitingForResponse()) {
      return this.utils.lang('Please wait for the response of the system');
    }
    return '';
  }

  /**
   * The following functions determine whether a placeholder card should be placed before the current card in the loop.
   * The placeholder card is used when user need to confirm on the position of a card
   *
   * e.g.
   * 1. When user need to put the Joker in hand, he need to confirm on the position of the Joker. So the cards looks like: ("#" is the placeholder)
   *     # 1 # 3 - 5 # 7 #    or
   *     # 1 - 3 # 5 # 7 #    or
   *     - 1 # 3 # 5 # 7 #
   *
   * 2. When user need to put card 5 in hand, he need to confirm the position only if there's a Joker next to card 5. So the cards looks like: ("#" is the placeholder)
   *     1 3 # - 5 7    or
   *     1 3 5 - # 7
   *
   * @param member The member object in the loop
   * @param cardIndex The card index in the loop
   */
  showPlaceholderBeforeCard(member: Member, cardIndex: number): boolean {
    // show placeholder only in "my card" area
    if (member.id !== this.p2p.getId()) {
      return false;
    }
    // show placeholder only when I have card waiting for confirmation
    if (!this.me().cardWaitingForConfirm) {
      return false;
    }
    // don't need to show placeholder if the current card is the card that needs confirmation
    if (member.cards[cardIndex].mark === this.me().cardWaitingForConfirm.mark) {
      return false;
    }
    // don't need to show placeholder if the card that needs confirmation is just on the left of the current card
    // e.g.  the card needs confirmation is '-', the current card is '3'
    //       # 1 - 3 # 5 # 7 #
    if (cardIndex !== 0 && member.cards[cardIndex - 1].mark === this.me().cardWaitingForConfirm.mark) {
      return false;
    }
    // if the card that needs confirmation is the Joker, show placeholder everywhere
    if (this.me().cardWaitingForConfirm.content === '-') {
      return true;
    }
    // if the card that needs confirmation is not the Joker, show placeholder if the current card is Joker, and the next card is the card needs confirmation
    // e.g.  the card needs confirmation is '5', the current card is '-'
    //       1 3 # - 5 7
    if (member.cards[cardIndex].content === '-' &&
        cardIndex < member.cards.length - 1 &&
        member.cards[cardIndex + 1].mark === this.me().cardWaitingForConfirm.mark
      ) {
      return true;
    }
    // if the card that needs confirmation is not the Joker, show placeholder if the previous card is Joker, and the card before this Joker is the card needs confirmation
    // e.g.  the card needs confirmation is '3', the current card is '5'
    //       1 3 - # 5 7
    if (cardIndex > 1 &&
        member.cards[cardIndex - 1].content === '-' &&
        member.cards[cardIndex - 2].mark === this.me().cardWaitingForConfirm.mark
      ) {
      return true;
    }
    return false;
  }

  /**
   * Show placeholder card at the last (outside of the loop)
   * @param member member object
   */
  showPlaceholderAtLast(member: Member): boolean {
    // show placeholder only in "my card" area
    if (member.id !== this.p2p.getId()) {
      return false;
    }
    // show placeholder only when I have card waiting for confirmation
    if (!this.me().cardWaitingForConfirm) {
      return false;
    }
    // if the card that needs confirmation is the Joker
    // show placeholder at last only if the last card is not the Joker
    if (this.me().cardWaitingForConfirm.content === '-') {
      if (this.me().cardWaitingForConfirm.mark !== member.cards[member.cards.length - 1].mark) {
        return true;
      }
      return false;
    }
    // if the card that needs confirmation is not the Joker,
    // show placeholder at last only if the last card is Joker, and the previous card is the card needs confirmation
    // e.g.  the card needs confirmation is '5', the last card is '-'
    //       1 3 5 - #
    if (member.cards[member.cards.length - 1].content === '-' &&
        member.cards[member.cards.length - 2].mark === this.me().cardWaitingForConfirm.mark
      ) {
      return true;
    }
    return false;
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
    const history = {
      name: this.gameData.members[this.gameData.currentTurn.memberIndex].name,
      cardMark: this.gameData.currentTurn.newCard.mark
    };
    this.pushNotification(history);
    this.gameData.history.push(history);
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
   * If current user is waiting for response from host
   */
  isWaitingForResponse(): boolean {
    return this.isMyTurn() && this.gameData.currentTurn.waitingForResponse;
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
    if (!this.isGuessingCard() || card.opened || this.isWaitingForResponse()) {
      return;
    }
    this.guessCardMark = card.mark;
  }

  /**
   * When user confirmed on the guessing of card
   */
  guessConfirmed(): void {
    if (!this.isGuessingCard() || this.isWaitingForResponse() || !this.guessCardMark || this.guessAs === null) {
      return;
    }
    this.gameData.currentTurn.waitingForResponse = true;
    if (this.storage.isHost()) {
      this.checkGuessResult(this.guessCardMark, this.guessAs);
    } else {
      this.p2p.send({
        id: this.p2p.getId(),
        guessCardMark: this.guessCardMark,
        guessAs: this.guessAs
      });
    }
    this.guessCardMark = null;
    this.guessAs = null;
  }

  /**
   * (HOST ONLY)
   * Check the result of a guess
   * @param guessCardMark The mark of card being guessed
   * @param guessAs       Guess the card as
   */
  checkGuessResult(guessCardMark: string, guessAs: string | number): void {
    const cardResult = this.findCardByMark(guessCardMark);
    if (!cardResult) {
      return;
    }
    const history = {
      name: this.gameData.members[this.gameData.currentTurn.memberIndex].name,
      cardMark: guessCardMark,
      guessAs: guessAs,
      result: cardResult.card.content === guessAs
    };
    this.pushNotification(history);
    this.gameData.history.push(history);
    this.gameData.currentTurn.waitingForResponse = false;
    if (cardResult.card.content === guessAs) {
      // guess correctly
      this.gameData.members[cardResult.memberIndex].cards[cardResult.cardIndex].opened = true;
      this.gameData.currentTurn.guessCorrectly = true;
      // check if game ends
      let gameEnds = true;
      this.gameData.members.forEach((m, i) => {
        if (i !== this.gameData.currentTurn.memberIndex && m.cards.find(c => !c.opened)) {
          gameEnds = false;
        }
      });
      this.gameData.currentTurn.gameEnds = gameEnds;
      this.p2p.send(this.gameData);
    } else {
      // guess wrong
      this.gameData.currentTurn.guessCorrectly = false;
      this.gameData.currentTurn.newCard.opened = true;
      this.putNewCardToHand();
      this.nextTurn();
    }
  }

  /**
   * Find a card of member with the given mark
   * @param mark The mark of the card
   */
  findCardByMark(mark: string): { memberIndex: number; cardIndex: number; card: Card; } {
    for (let i = 0; i < this.gameData.members.length; i++) {
      const member = this.gameData.members[i];
      const cardIndex = member.cards.findIndex(c => c.mark === mark);
      if (cardIndex > -1) {
        return {
          memberIndex: i,
          cardIndex: cardIndex,
          card: member.cards[cardIndex]
        };
      }
    }
    return null;
  }

  /**
   * User skip this turn and pass to the next turn
   */
  skipTurn(): void {
    if (this.storage.isHost()) {
      this.memberSkipTurn();
    } else {
      this.p2p.send({
        id: this.p2p.getId(),
        skipTurn: true
      });
    }
  }

  /**
   * (HOST ONLY)
   * Put the new card to member's hand and go to the next turn
   */
  memberSkipTurn(): void {
    const result = this.insertNewCard(this.gameData.members[this.gameData.currentTurn.memberIndex].cards, this.gameData.currentTurn.newCard);
    this.gameData.members[this.gameData.currentTurn.memberIndex].cards = result.cards;
    if (!result.orderFixed) {
      // need to wait for new card's position
      this.gameData.members[this.gameData.currentTurn.memberIndex].cardWaitingForConfirm = this.gameData.currentTurn.newCard;
      this.p2p.send(this.gameData);
    } else {
      this.nextTurn();
    }
  }

  /**
   * Insert the new card into the card array
   * If the new card is next to the Joker(or it is the Joker), need to confirm the position of the new card
   * @param cards   Card array
   * @param newCard New card object
   */
  insertNewCard(cards: Card[], newCard: Card): { cards: Card[]; orderFixed: boolean; } {
    // order is not fixed if the new card is Joker
    if (newCard.content === '-') {
      cards.push(newCard);
      return {
        cards: cards,
        orderFixed: false
      };
    }
    let orderFixed = true;
    let cardInserted = false;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].content === '-') {
        continue;
      }
      // insert the new card if it sits in between
      if (newCard.content < cards[i].content || (newCard.content === cards[i].content && newCard.color === 'black')) {
        cards.splice(i, 0, newCard);
        cardInserted = true;
        if (i !== 0 && cards[i - 1].content === '-') {
          orderFixed = false;
        }
        break;
      }
    }
    // push the new card if it is the largest
    if (!cardInserted) {
      if (cards[cards.length - 1].content === '-') {
        orderFixed = false;
      }
      cards.push(newCard);
    }
    return {
      cards: cards,
      orderFixed: orderFixed
    };
  }

  /**
   * Put the new card to the member's hand
   */
  putNewCardToHand(): void {
    const cards = this.gameData.members[this.gameData.currentTurn.memberIndex].cards;
    // push the new card to member's hand
    cards.push(this.gameData.currentTurn.newCard);
    // sort the member's cards
    this.gameData.members[this.gameData.currentTurn.memberIndex].cards = cards.sort(this.sortCards);
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
