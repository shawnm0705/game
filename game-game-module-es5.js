function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["game-game-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code-card/davinci-code-card.component.html":
  /*!***********************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code-card/davinci-code-card.component.html ***!
    \***********************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDavinciCodeDavinciCodeCardDavinciCodeCardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"text-center\">\n  <div *ngIf=\"!placeholder\" class=\"card mb-1\" [ngClass]=\"{'selected': selected, 'black': color === 'black'}\">{{ content }}</div>\n  <div *ngIf=\"placeholder\" class=\"card mb-1 placeholder\" [ngClass]=\"{'selected': selected}\">{{ content }}</div>\n  <p>{{ mark }}<ng-container *ngIf=\"opened\"><fa-icon icon=\"eye\" class=\"text-info ml-1\"></fa-icon></ng-container></p>\n</div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code.component.html":
  /*!************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code.component.html ***!
    \************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDavinciCodeDavinciCodeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div *ngIf=\"!isPrepared\" class=\"text-center\">\n  <h2 class=\"mt-3 mb-5\">{{ utils.lang('Pick') }} {{ initCardCount() }} {{ utils.lang('cards') }}</h2>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div *ngFor=\"let n of [1,2,3,4]\" class=\"col-3\">\n        <app-davinci-code-card\n          color=\"black\"\n          [selected]=\"initialCards.includes(n)\"\n          (click)=\"selectInitialCard(n)\"\n          ></app-davinci-code-card>\n      </div>\n    </div>\n    <div class=\"row my-5\">\n      <div *ngFor=\"let n of [5,6,7,8]\" class=\"col-3\">\n        <app-davinci-code-card\n          color=\"white\"\n          [selected]=\"initialCards.includes(n)\"\n          (click)=\"selectInitialCard(n)\"\n          ></app-davinci-code-card>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-12\">\n        <button class=\"btn btn-primary\" [disabled]=\"initialCards.length !== initCardCount()\" (click)=\"prepared()\">{{ utils.lang('OK') }}</button>\n      </div>\n    </div>\n  </div>\n</div>\n<ng-container *ngIf=\"isPrepared\">\n  <div class=\"text-center\">\n    <h2 class=\"mt-3\">\n      <ng-container *ngIf=\"isMyTurn()\">\n        <ng-container *ngIf=\"!gameData.currentTurn.gameEnds\">{{ utils.lang('My Turn') }}!</ng-container>\n        <ng-container *ngIf=\"gameData.currentTurn.gameEnds\">{{ utils.lang('I Win') }}!</ng-container>\n      </ng-container>\n      <ng-container *ngIf=\"!isMyTurn()\">\n        <ng-container *ngIf=\"!gameData.currentTurn.gameEnds\">{{ utils.lang('Waiting For Others') }} <fa-icon icon=\"cog\" spin=\"true\"></fa-icon></ng-container>\n        <ng-container *ngIf=\"gameData.currentTurn.gameEnds\">{{ utils.lang('Game Over') }}!</ng-container></ng-container>\n    </h2>\n    <p *ngIf=\"instruction()\" class=\"text-primary\">* {{ instruction() }}</p>\n  </div>\n\n  <div *ngFor=\"let member of gameData.members\" class=\"px-3 pb-2\">\n    <div class=\"container card p-2\">\n\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <fa-icon icon=\"user-alt\" class=\"text-info mr-2\"></fa-icon>\n          <span *ngIf=\"member.id !== p2p.getId()\">{{ member.name }}</span>\n          <ng-container *ngIf=\"member.id === p2p.getId()\">\n            <span>{{ utils.lang('My Cards') }}</span>\n            <app-davinci-code-card\n              *ngIf=\"isGuessingCard()\"\n              [color]=\"gameData.currentTurn.newCard.color\"\n              [mark]=\"gameData.currentTurn.newCard.mark\"\n              [content]=\"gameData.currentTurn.newCard.content\"\n              ></app-davinci-code-card>\n            <button *ngIf=\"gameData.currentTurn.guessCorrectly &&\n              isMyTurn() &&\n              !gameData.currentTurn.gameEnds &&\n              !me().cardWaitingForConfirm\" class=\"btn btn-primary btn-sm\" (click)=\"skipTurn()\">{{ utils.lang('Pass this turn') }}</button>\n          </ng-container>\n        </div>\n      </div>\n\n      <div *ngIf=\"member.cards && (member.id === p2p.getId() || !member.cardWaitingForConfirm)\" class=\"row row-cards mt-2 px-2\">\n        <ng-container *ngFor=\"let card of member.cards; let i = index\">\n          <div *ngIf=\"showPlaceholderBeforeCard(member, i)\" class=\"col-2\">\n            <app-davinci-code-card placeholder=true (click)=\"reorderCardToIndex(i)\"></app-davinci-code-card>\n          </div>\n          <div class=\"col-2\">\n            <app-davinci-code-card\n              [color]=\"card.color\"\n              [mark]=\"card.mark\"\n              [content]=\"member.id === p2p.getId() || card.opened ? card.content : ''\"\n              [opened]=\"card.opened\"\n              (click)=\"member.id !== p2p.getId() ? selectCardForGuessing(card) : null\"\n              [selected]=\"guessCardMark === card.mark\"\n              ></app-davinci-code-card>\n          </div>\n        </ng-container>\n        <div *ngIf=\"showPlaceholderAtLast(member)\" class=\"col-2\">\n          <app-davinci-code-card placeholder=true (click)=\"reorderCardToIndex(member.cards.length)\"></app-davinci-code-card>\n        </div>\n      </div>\n\n      <ng-container *ngIf=\"isGuessingCardOfMember(member)\">\n        <div class=\"row row-cards px-2\">\n          <div *ngFor=\"let content of CARDS\" class=\"col-2\">\n            <app-davinci-code-card\n              placeholder=true\n              [content]=\"content\"\n              (click)=\"!isWaitingForResponse() ? guessAs = content : null\"\n              [selected]=\"guessAs === content\"\n              ></app-davinci-code-card>\n          </div>\n        </div>\n        <div class=\"row text-center\">\n          <div class=\"col-12\">\n            <button class=\"btn btn-primary\" [disabled]=\"[undefined, null].includes(guessAs) || isWaitingForResponse()\" (click)=\"guessConfirmed()\">{{ utils.lang('OK') }}</button>\n          </div>\n        </div>\n      </ng-container>\n\n      <div *ngIf=\"member.id === p2p.getId() && member.cardWaitingForConfirm\" class=\"row text-center\">\n        <div class=\"col-12\">\n          <button class=\"btn btn-primary\" (click)=\"cardConfirmed()\">{{ utils.lang('OK') }}</button>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"px-3 pb-2\">\n    <div class=\"container card p-2\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n          <fa-icon icon=\"th-large\" class=\"text-info mr-2\"></fa-icon>\n          {{ utils.lang('Card Deck') }}\n        </div>\n      </div>\n      <div class=\"row row-cards my-3 px-2\">\n        <div *ngFor=\"let card of gameData.deck.black; let i = index\" class=\"col-2\">\n          <app-davinci-code-card\n            [color]=\"card.color\"\n            [selected]=\"selectedCardFromDeckIndex === i\"\n            (click)=\"selectCardFromDeck(i)\"\n            ></app-davinci-code-card>\n        </div>\n        <div *ngFor=\"let card of gameData.deck.white; let i = index\" class=\"col-2\">\n          <app-davinci-code-card\n            [color]=\"card.color\"\n            [selected]=\"selectedCardFromDeckIndex === i + gameData.deck.black.length\"\n            (click)=\"selectCardFromDeck(i + gameData.deck.black.length)\"\n            ></app-davinci-code-card>\n        </div>\n      </div>\n      <div *ngIf=\"isSelectingCardFromDeck()\" class=\"row text-center\">\n        <div class=\"col-12\">\n          <button class=\"btn btn-primary\" [disabled]=\"selectedCardFromDeckIndex === null || selectedCardFromDeckConfirming\" (click)=\"cardFromDeckConfirmed()\">{{ utils.lang('OK') }}</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"p-3\">\n    <div class=\"card p-2\">\n      <b>{{ utils.lang('History') }}</b>\n      <p *ngFor=\"let record of gameData.history; let i = index\">\n        <ng-container *ngIf=\"record.guessAs === undefined\">\n          <hr>\n          {{ record.name }} {{ utils.lang('get card') }}\n          <span class=\"text-info\">{{ record.cardMark }}</span>\n        </ng-container>\n        <ng-container *ngIf=\"record.guessAs !== undefined\">\n          {{ record.name }} {{ utils.lang('guess card') }}\n          <span class=\"text-info\">{{ record.cardMark }}</span>\n          {{ utils.lang('as') }}\n          <span class=\"text-info\">{{ record.guessAs }}</span>\n          <fa-icon *ngIf=\"record.result\" icon=\"check\" class=\"text-success ml-2\"></fa-icon>\n          <fa-icon *ngIf=\"!record.result\" icon=\"times\" class=\"text-danger ml-2\"></fa-icon>\n        </ng-container>\n      </p>\n    </div>\n  </div>\n\n</ng-container>\n<div class=\"text-center mt-4\">\n  <button class=\"btn btn-primary\" (click)=\"next()\">下一步</button>\n</div>\n\n\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/room/room.component.html":
  /*!********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/room/room.component.html ***!
    \********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppRoomRoomComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div class=\"m-3\">\n  <button class=\"border-0 bg-transparent text-primary\" (click)=\"back()\"><fa-icon icon=\"arrow-left\"></fa-icon></button>\n  <h2 class=\"text-center\">{{ utils.lang(games[game].name) }}</h2>\n</div>\n\n<div class=\"container text-center mt-3\">\n\n  <ng-container *ngIf=\"!storage.get('name')\">\n    <label>{{ utils.lang('Nick Name') }}:</label>\n    <input type=\"text\" [(ngModel)]=\"name\" class=\"mx-2\">\n    <button class=\"btn btn-primary btn-sm\" (click)=\"saveName()\">{{ utils.lang('OK') }}</button>\n  </ng-container>\n\n  <ng-container *ngIf=\"storage.get('name')\">\n    <div class=\"row\">\n      <div class=\"col-12 mb-3\">\n        {{ utils.lang('Hello') }}<button class=\"btn btn-link\" (click)=\"storage.remove('name')\">{{ storage.get('name') }}</button>\n      </div>\n      <div class=\"col-6 text-right\">\n        <button class=\"btn btn-lg\" [ngClass]=\"{'btn-outline-primary': !storage.isHost(), 'btn-primary': storage.isHost()}\" (click)=\"storage.isHost(true)\">{{ utils.lang('Create Room') }}</button>\n      </div>\n      <div class=\"col-6 text-left\">\n        <button class=\"btn btn-lg\" [ngClass]=\"{'btn-outline-primary': storage.isHost(), 'btn-primary': !storage.isHost()}\" (click)=\"storage.isHost(false)\">{{ utils.lang('Join Room') }}</button>\n      </div>\n    </div>\n\n    <div *ngIf=\"storage.isHost()\" class=\"row mt-3\">\n      <div class=\"col-12 text-left\">\n        <p>{{ utils.lang('My Room Id') }}: <span class=\"text-info\">{{ p2p.getId() }}</span></p>\n        <p>{{ utils.lang('People In The Room') }}: ({{ games[game].min }} - {{ games[game].max }} {{ utils.lang('people') }})</p>\n        <ul class=\"list-group mt-2\">\n          <li *ngFor=\"let member of roomMembers\" class=\"list-group-item\"><fa-icon icon=\"user-alt\" class=\"text-info mr-2\"></fa-icon>{{ member }}</li>\n        </ul>\n      </div>\n      <div class=\"col-12 text-center mt-2\">\n        <button class=\"btn btn-success\" [disabled]=\"roomMembers.length < games[game].min || roomMembers.length > games[game].max\" (click)=\"start()\">{{ utils.lang('Start Game') }}</button>\n      </div>\n    </div>\n\n    <div *ngIf=\"!storage.isHost()\" class=\"row mt-3\">\n      <div *ngIf=\"roomMembers.length <= 1\" class=\"col-12\">\n        <label>{{ utils.lang('Room Number') }}:</label>\n        <input type=\"text\" [(ngModel)]=\"roomId\" class=\"mx-2\" style=\"width: 150px\">\n        <button class=\"btn btn-success btn-sm\" [disabled]=\"joiningRoom\" (click)=\"join()\">{{ utils.lang('Join') }}</button>\n      </div>\n      <div *ngIf=\"roomMembers.length > 1\" class=\"col-12 text-left\">\n        <p>{{ utils.lang('People In The Room') }}: ({{ games[game].min }} - {{ games[game].max }} {{ utils.lang('people') }})</p>\n        <ul class=\"list-group mt-2\">\n          <li *ngFor=\"let member of roomMembers\" class=\"list-group-item\"><fa-icon icon=\"user-alt\" class=\"text-info mr-2\"></fa-icon>{{ member }}</li>\n        </ul>\n      </div>\n    </div>\n\n  </ng-container>\n\n</div>\n";
    /***/
  },

  /***/
  "./src/app/davinci-code/davinci-code-card/davinci-code-card.component.scss":
  /*!*********************************************************************************!*\
    !*** ./src/app/davinci-code/davinci-code-card/davinci-code-card.component.scss ***!
    \*********************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDavinciCodeDavinciCodeCardDavinciCodeCardComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".card {\n  width: 40px;\n  height: 50px;\n  font-size: 25px;\n  margin: auto;\n  border-width: 3px;\n  color: black;\n  background: white;\n}\n\n.placeholder {\n  border: 2px dashed var(--orange);\n}\n\n.black {\n  color: white;\n  background: black;\n}\n\n.selected {\n  -webkit-transform: scale(1.3);\n          transform: scale(1.3);\n}\n\np {\n  margin-bottom: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGF3bi9XZWJzaXRlcy9nYW1lL3NyYy9hcHAvZGF2aW5jaS1jb2RlL2RhdmluY2ktY29kZS1jYXJkL2RhdmluY2ktY29kZS1jYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9kYXZpbmNpLWNvZGUvZGF2aW5jaS1jb2RlLWNhcmQvZGF2aW5jaS1jb2RlLWNhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QUNDRjs7QURDQTtFQUNFLGdDQUFBO0FDRUY7O0FEQUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUNHRjs7QUREQTtFQUNFLDZCQUFBO1VBQUEscUJBQUE7QUNJRjs7QURGQTtFQUNFLGdCQUFBO0FDS0YiLCJmaWxlIjoic3JjL2FwcC9kYXZpbmNpLWNvZGUvZGF2aW5jaS1jb2RlLWNhcmQvZGF2aW5jaS1jb2RlLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZCB7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMjVweDtcbiAgbWFyZ2luOiBhdXRvO1xuICBib3JkZXItd2lkdGg6IDNweDtcbiAgY29sb3I6IGJsYWNrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cbi5wbGFjZWhvbGRlciB7XG4gIGJvcmRlcjogMnB4IGRhc2hlZCB2YXIoLS1vcmFuZ2UpO1xufVxuLmJsYWNrIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbn1cbi5zZWxlY3RlZCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcbn1cbnAge1xuICBtYXJnaW4tYm90dG9tOiAwO1xufSIsIi5jYXJkIHtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBtYXJnaW46IGF1dG87XG4gIGJvcmRlci13aWR0aDogM3B4O1xuICBjb2xvcjogYmxhY2s7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4ucGxhY2Vob2xkZXIge1xuICBib3JkZXI6IDJweCBkYXNoZWQgdmFyKC0tb3JhbmdlKTtcbn1cblxuLmJsYWNrIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiBibGFjaztcbn1cblxuLnNlbGVjdGVkIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xufVxuXG5wIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/davinci-code/davinci-code-card/davinci-code-card.component.ts":
  /*!*******************************************************************************!*\
    !*** ./src/app/davinci-code/davinci-code-card/davinci-code-card.component.ts ***!
    \*******************************************************************************/

  /*! exports provided: DavinciCodeCardComponent */

  /***/
  function srcAppDavinciCodeDavinciCodeCardDavinciCodeCardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DavinciCodeCardComponent", function () {
      return DavinciCodeCardComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var DavinciCodeCardComponent = function DavinciCodeCardComponent() {
      _classCallCheck(this, DavinciCodeCardComponent);

      this.color = 'white';
    };

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "color", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "content", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "mark", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "selected", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "opened", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()], DavinciCodeCardComponent.prototype, "placeholder", void 0);
    DavinciCodeCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-davinci-code-card',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./davinci-code-card.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code-card/davinci-code-card.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./davinci-code-card.component.scss */
      "./src/app/davinci-code/davinci-code-card/davinci-code-card.component.scss")).default]
    })], DavinciCodeCardComponent);
    /***/
  },

  /***/
  "./src/app/davinci-code/davinci-code.component.scss":
  /*!**********************************************************!*\
    !*** ./src/app/davinci-code/davinci-code.component.scss ***!
    \**********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDavinciCodeDavinciCodeComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".row-cards .col-2 {\n  padding: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zaGF3bi9XZWJzaXRlcy9nYW1lL3NyYy9hcHAvZGF2aW5jaS1jb2RlL2RhdmluY2ktY29kZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvZGF2aW5jaS1jb2RlL2RhdmluY2ktY29kZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDRTtFQUNFLFlBQUE7QUNBSiIsImZpbGUiOiJzcmMvYXBwL2RhdmluY2ktY29kZS9kYXZpbmNpLWNvZGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucm93LWNhcmRzIHtcbiAgLmNvbC0yIHtcbiAgICBwYWRkaW5nOiA1cHg7XG4gIH1cbn0iLCIucm93LWNhcmRzIC5jb2wtMiB7XG4gIHBhZGRpbmc6IDVweDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/davinci-code/davinci-code.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/davinci-code/davinci-code.component.ts ***!
    \********************************************************/

  /*! exports provided: DavinciCodeComponent */

  /***/
  function srcAppDavinciCodeDavinciCodeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DavinciCodeComponent", function () {
      return DavinciCodeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @services/utils.service */
    "./src/app/shared/services/utils.service.ts");
    /* harmony import */


    var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @services/storage.service */
    "./src/app/shared/services/storage.service.ts");
    /* harmony import */


    var _services_p2p_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @services/p2p.service */
    "./src/app/shared/services/p2p.service.ts");

    var MARKS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].reverse();

    var DavinciCodeComponent =
    /*#__PURE__*/
    function () {
      function DavinciCodeComponent(utils, storage, route, p2p, router) {
        _classCallCheck(this, DavinciCodeComponent);

        this.utils = utils;
        this.storage = storage;
        this.route = route;
        this.p2p = p2p;
        this.router = router;
        this.CARDS = [].concat(_toConsumableArray(Array(12).keys()), ['-']); // is the current user prepared to start

        this.isPrepared = false;
        this.initialCards = [];
        this.selectedCardFromDeckIndex = null;
        this.guessAs = null;
      }

      _createClass(DavinciCodeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          if (this.storage.isHost()) {
            // initialise game data
            this.gameData = this.storage.getGameData();
            this.gameData.deck = {
              // black: this.utils.shuffle(this.CARDS).map((card, i) => {
              black: this.CARDS.map(function (card, i) {
                return {
                  color: 'black',
                  content: card,
                  mark: MARKS[i],
                  opened: false
                };
              }),
              white: this.utils.shuffle(this.CARDS).map(function (card, i) {
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

          this.utils.getEvent('game-data').subscribe(function (res) {
            // member receive game data from host
            if (!_this.storage.isHost()) {
              _this.gameData = res;
              return;
            } // host received data showing that a member has selected initial cards


            if (_this.utils.has(res, 'prepared') && res.prepared) {
              return _this.memberPrepared(res.id, res.cards);
            } // host received data showing that a member has confirmed on the position of joker card


            if (_this.utils.has(res, 'cardConfirmed') && res.cardConfirmed) {
              var memberIndex = _this.gameData.members.findIndex(function (m) {
                return m.id === res.id;
              });

              _this.gameData.members[memberIndex].cards = res.cards;

              _this.nextTurn();

              return _this.p2p.send(_this.gameData);
            } // host received data showing that a member has selected a card from deck


            if (_this.utils.has(res, 'selectCardFromDeck')) {
              // member can only select a card from deck on his turn
              if (_this.gameData.members[_this.gameData.currentTurn.memberIndex].id !== res.id) {
                return;
              }

              return _this.getNewCardFromDeck(res.selectCardFromDeck);
            } // host received data showing that a member has guessed a card


            if (_this.utils.has(res, 'guessCardMark')) {
              // member can only guess card on his turn
              if (_this.gameData.members[_this.gameData.currentTurn.memberIndex].id !== res.id) {
                return;
              }

              return _this.checkGuessResult(res.guessCardMark, res.guessAs);
            }

            if (_this.utils.has(res, 'skipTurn') && res.skipTurn) {
              // member can only skip turn on his turn
              if (_this.gameData.members[_this.gameData.currentTurn.memberIndex].id !== res.id) {
                return;
              }

              return _this.memberSkipTurn();
            }
          });
        }
        /************************
          Preparation
        ************************/
        // how many initial cards should everyone has

      }, {
        key: "initCardCount",
        value: function initCardCount() {
          if (this.utils.isEmpty(this.storage.getGameData())) {
            this.router.navigate(['room', 'davinci_code']);
            return 4;
          }

          return this.storage.getGameData().members.length === 4 ? 3 : 4;
        } // when user select initial card

      }, {
        key: "selectInitialCard",
        value: function selectInitialCard(n) {
          if (this.initialCards.length === this.initCardCount() && !this.initialCards.includes(n)) {
            return;
          }

          this.initialCards = this.utils.addOrRemove(this.initialCards, n);
        } // when user has confirmed on initial cards selection

      }, {
        key: "prepared",
        value: function prepared() {
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

      }, {
        key: "memberPrepared",
        value: function memberPrepared(id, cards) {
          var _this2 = this;

          // find the member
          var memberIndex = this.gameData.members.findIndex(function (m) {
            return m.id === id;
          });
          var member = this.gameData.members[memberIndex];
          member.cards = [];
          member.cardWaitingForConfirm = null;
          cards.forEach(function (initCard) {
            var card = initCard < 5 ? _this2.gameData.deck.black.pop() : _this2.gameData.deck.white.pop(); // don't allow having two joker cards as initial card

            if (member.cards.find(function (c) {
              return c.content === '-';
            }) && card.content === '-') {
              var tmpCard = JSON.parse(JSON.stringify(card));

              if (initCard < 5) {
                card = _this2.gameData.deck.black.pop();

                _this2.gameData.deck.black.push(tmpCard);
              } else {
                card = _this2.gameData.deck.white.pop();

                _this2.gameData.deck.white.push(tmpCard);
              }
            }

            card.opened = false;
            member.cards.push(card);

            if (card.content === '-') {
              member.cardWaitingForConfirm = card;
            }
          }); // sort the cards

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

      }, {
        key: "sortCards",
        value: function sortCards(a, b) {
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
      }, {
        key: "me",
        value: function me() {
          var _this3 = this;

          return this.gameData.members.find(function (m) {
            return m.id === _this3.p2p.getId();
          });
        }
        /**
         * when user reordered the Joker card
         * @param i Reorder the Joker card to this index position
         */

      }, {
        key: "reorderCardToIndex",
        value: function reorderCardToIndex(i) {
          var _this4 = this;

          var myIndex = this.gameData.members.findIndex(function (m) {
            return m.id === _this4.p2p.getId();
          });
          var cards = this.gameData.members[myIndex].cards;
          var jokerCardIndex = cards.findIndex(function (c) {
            return c.mark === _this4.me().cardWaitingForConfirm.mark;
          });

          if (jokerCardIndex < i) {
            i--;
          }

          cards.splice(i, 0, cards.splice(jokerCardIndex, 1)[0]);
        }
        /**
         * when user confirmed the position of the joker card
         */

      }, {
        key: "cardConfirmed",
        value: function cardConfirmed() {
          var _this5 = this;

          var myIndex = this.gameData.members.findIndex(function (m) {
            return m.id === _this5.p2p.getId();
          });
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

      }, {
        key: "nextTurn",
        value: function nextTurn() {
          var _this6 = this;

          // not ready for the next turn if not all members are prepared and confirmed on cards
          if (this.gameData.members.find(function (m) {
            return !_this6.utils.has(m, 'cards') || m.cardWaitingForConfirm;
          })) {
            return;
          }

          do {
            if (this.gameData.currentTurn.memberIndex === null || this.gameData.currentTurn.memberIndex === this.gameData.members.length - 1) {
              this.gameData.currentTurn.memberIndex = 0;
            } else {
              this.gameData.currentTurn.memberIndex++;
            } // skip member whose cards are all opened

          } while (!this.gameData.members[this.gameData.currentTurn.memberIndex].cards.find(function (c) {
            return !c.opened;
          }));

          this.newTurnInit();
          this.p2p.send(this.gameData);
        }
      }, {
        key: "newTurnInit",
        value: function newTurnInit() {
          this.gameData.currentTurn.newCard = null;
          this.gameData.currentTurn.waitingForConfirmation = false;
          this.gameData.currentTurn.guessCorrectly = null;
        }
      }, {
        key: "isMyTurn",
        value: function isMyTurn() {
          if (!this.utils.has(this.gameData, 'currentTurn') || this.gameData.currentTurn.memberIndex === null) {
            return false;
          }

          return this.gameData.members[this.gameData.currentTurn.memberIndex].id === this.p2p.getId();
        }
      }, {
        key: "instruction",
        value: function instruction() {
          if (this.me().cardWaitingForConfirm) {
            return this.utils.lang('Please adjust the position of "-" card');
          }

          if (this.isSelectingCardFromDeck()) {
            return this.utils.lang('Please choose a card from the card deck');
          }

          if (this.isGuessingCard() && !this.gameData.currentTurn.gameEnds) {
            var msg = this.utils.lang('Please choose a card from other people and guess');

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

      }, {
        key: "showPlaceholderBeforeCard",
        value: function showPlaceholderBeforeCard(member, cardIndex) {
          // show placeholder only in "my card" area
          if (member.id !== this.p2p.getId()) {
            return false;
          } // show placeholder only when I have card waiting for confirmation


          if (!this.me().cardWaitingForConfirm) {
            return false;
          } // don't need to show placeholder if the current card is the card that needs confirmation


          if (member.cards[cardIndex].mark === this.me().cardWaitingForConfirm.mark) {
            return false;
          } // don't need to show placeholder if the card that needs confirmation is just on the left of the current card
          // e.g.  the card needs confirmation is '-', the current card is '3'
          //       # 1 - 3 # 5 # 7 #


          if (cardIndex !== 0 && member.cards[cardIndex - 1].mark === this.me().cardWaitingForConfirm.mark) {
            return false;
          } // if the card that needs confirmation is the Joker, show placeholder everywhere


          if (this.me().cardWaitingForConfirm.content === '-') {
            return true;
          } // if the card that needs confirmation is not the Joker, show placeholder if the current card is Joker, and the next card is the card needs confirmation
          // e.g.  the card needs confirmation is '5', the current card is '-'
          //       1 3 # - 5 7


          if (member.cards[cardIndex].content === '-' && cardIndex < member.cards.length - 1 && member.cards[cardIndex + 1].mark === this.me().cardWaitingForConfirm.mark) {
            return true;
          } // if the card that needs confirmation is not the Joker, show placeholder if the previous card is Joker, and the card before this Joker is the card needs confirmation
          // e.g.  the card needs confirmation is '3', the current card is '5'
          //       1 3 - # 5 7


          if (cardIndex > 1 && member.cards[cardIndex - 1].content === '-' && member.cards[cardIndex - 2].mark === this.me().cardWaitingForConfirm.mark) {
            return true;
          }

          return false;
        }
        /**
         * Show placeholder card at the last (outside of the loop)
         * @param member member object
         */

      }, {
        key: "showPlaceholderAtLast",
        value: function showPlaceholderAtLast(member) {
          // show placeholder only in "my card" area
          if (member.id !== this.p2p.getId()) {
            return false;
          } // show placeholder only when I have card waiting for confirmation


          if (!this.me().cardWaitingForConfirm) {
            return false;
          } // if the card that needs confirmation is the Joker
          // show placeholder at last only if the last card is not the Joker


          if (this.me().cardWaitingForConfirm.content === '-') {
            if (this.me().cardWaitingForConfirm.mark !== member.cards[member.cards.length - 1].mark) {
              return true;
            }

            return false;
          } // if the card that needs confirmation is not the Joker,
          // show placeholder at last only if the last card is Joker, and the previous card is the card needs confirmation
          // e.g.  the card needs confirmation is '5', the last card is '-'
          //       1 3 5 - #


          if (member.cards[member.cards.length - 1].content === '-' && member.cards[member.cards.length - 2].mark === this.me().cardWaitingForConfirm.mark) {
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

      }, {
        key: "isSelectingCardFromDeck",
        value: function isSelectingCardFromDeck() {
          return this.isMyTurn() && !this.gameData.currentTurn.newCard;
        }
        /**
         * When user select a card from the deck
         * @param i Card index
         */

      }, {
        key: "selectCardFromDeck",
        value: function selectCardFromDeck(i) {
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

      }, {
        key: "cardFromDeckConfirmed",
        value: function cardFromDeckConfirmed() {
          this.selectedCardFromDeckConfirming = true;
          var color = this.selectedCardFromDeckIndex < this.gameData.deck.black.length ? 'black' : 'white';
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

      }, {
        key: "getNewCardFromDeck",
        value: function getNewCardFromDeck(color) {
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

      }, {
        key: "isGuessingCard",
        value: function isGuessingCard() {
          return this.isMyTurn() && !!this.gameData.currentTurn.newCard && !this.gameData.currentTurn.waitingForConfirmation;
        }
        /**
         * If current user is waiting for response from host
         */

      }, {
        key: "isWaitingForResponse",
        value: function isWaitingForResponse() {
          return this.isMyTurn() && this.gameData.currentTurn.waitingForResponse;
        }
        /**
         * User is guessing a card of this member
         * @param  member The member object
         */

      }, {
        key: "isGuessingCardOfMember",
        value: function isGuessingCardOfMember(member) {
          var _this7 = this;

          return this.isGuessingCard() && !!member.cards.find(function (c) {
            return c.mark === _this7.guessCardMark;
          });
        }
        /**
         * When user select a card from other people for guessing
         * @param card The card object
         */

      }, {
        key: "selectCardForGuessing",
        value: function selectCardForGuessing(card) {
          if (!this.isGuessingCard() || card.opened || this.isWaitingForResponse()) {
            return;
          }

          this.guessCardMark = card.mark;
          console.log(this.gameData);
        }
        /**
         * When user confirmed on the guessing of card
         */

      }, {
        key: "guessConfirmed",
        value: function guessConfirmed() {
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

      }, {
        key: "checkGuessResult",
        value: function checkGuessResult(guessCardMark, guessAs) {
          var _this8 = this;

          var cardResult = this.findCardByMark(guessCardMark);
          console.log(cardResult);

          if (!cardResult) {
            return;
          }

          this.gameData.history.push({
            name: this.gameData.members[this.gameData.currentTurn.memberIndex].name,
            cardMark: guessCardMark,
            guessAs: guessAs,
            result: cardResult.card.content === guessAs
          });
          this.gameData.currentTurn.waitingForResponse = false;

          if (cardResult.card.content === guessAs) {
            // guess correctly
            this.gameData.members[cardResult.memberIndex].cards[cardResult.cardIndex].opened = true;
            this.gameData.currentTurn.guessCorrectly = true; // check if game ends

            var gameEnds = true;
            this.gameData.members.forEach(function (m, i) {
              if (i !== _this8.gameData.currentTurn.memberIndex && m.cards.find(function (c) {
                return !c.opened;
              })) {
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

      }, {
        key: "findCardByMark",
        value: function findCardByMark(mark) {
          for (var i = 0; i < this.gameData.members.length; i++) {
            var member = this.gameData.members[i];
            var cardIndex = member.cards.findIndex(function (c) {
              return c.mark === mark;
            });

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

      }, {
        key: "skipTurn",
        value: function skipTurn() {
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

      }, {
        key: "memberSkipTurn",
        value: function memberSkipTurn() {
          var result = this.insertNewCard(this.gameData.members[this.gameData.currentTurn.memberIndex].cards, this.gameData.currentTurn.newCard);
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

      }, {
        key: "insertNewCard",
        value: function insertNewCard(cards, newCard) {
          // order is not fixed if the new card is Joker
          if (newCard.content === '-') {
            cards.push(newCard);
            return {
              cards: cards,
              orderFixed: false
            };
          }

          var orderFixed = true;
          var cardInserted = false;

          for (var i = 0; i < cards.length; i++) {
            if (cards[i].content === '-') {
              continue;
            } // insert the new card if it sits in between


            if (newCard.content < cards[i].content || newCard.content === cards[i].content && newCard.color === 'black') {
              cards.splice(i, 0, newCard);
              cardInserted = true;

              if (i !== 0 && cards[i - 1].content === '-') {
                orderFixed = false;
              }

              break;
            }
          } // push the new card if it is the largest


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

      }, {
        key: "putNewCardToHand",
        value: function putNewCardToHand() {
          var cards = this.gameData.members[this.gameData.currentTurn.memberIndex].cards; // push the new card to member's hand

          cards.push(this.gameData.currentTurn.newCard); // sort the member's cards

          this.gameData.members[this.gameData.currentTurn.memberIndex].cards = cards.sort(this.sortCards);
        } // This is used only for testing

      }, {
        key: "next",
        value: function next() {
          var data;

          if (!this.utils.has(this.gameData.members[1], 'cards')) {
            data = {
              id: this.gameData.members[1].id,
              cards: [1, 2, 6, 7],
              prepared: true
            };
            return this.utils.broadcastEvent('game-data', data);
          }

          if (!this.utils.has(this.gameData.members[2], 'cards')) {
            data = {
              id: this.gameData.members[2].id,
              cards: [1, 2, 6, 7],
              prepared: true
            };
            return this.utils.broadcastEvent('game-data', data);
          }
        }
      }]);

      return DavinciCodeComponent;
    }();

    DavinciCodeComponent.ctorParameters = function () {
      return [{
        type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"]
      }, {
        type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _services_p2p_service__WEBPACK_IMPORTED_MODULE_5__["P2PService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    DavinciCodeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-davinci-code',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./davinci-code.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/davinci-code/davinci-code.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./davinci-code.component.scss */
      "./src/app/davinci-code/davinci-code.component.scss")).default]
    })], DavinciCodeComponent);
    /***/
  },

  /***/
  "./src/app/game/game-routing.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/game/game-routing.module.ts ***!
    \*********************************************/

  /*! exports provided: GameRoutingModule */

  /***/
  function srcAppGameGameRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GameRoutingModule", function () {
      return GameRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _davinci_code_davinci_code_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../davinci-code/davinci-code.component */
    "./src/app/davinci-code/davinci-code.component.ts");
    /* harmony import */


    var _room_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../room/room.component */
    "./src/app/room/room.component.ts");

    var routes = [{
      path: 'room/:game',
      component: _room_room_component__WEBPACK_IMPORTED_MODULE_4__["RoomComponent"]
    }, {
      path: 'davinci_code',
      component: _davinci_code_davinci_code_component__WEBPACK_IMPORTED_MODULE_3__["DavinciCodeComponent"]
    }, {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    }];

    var GameRoutingModule = function GameRoutingModule() {
      _classCallCheck(this, GameRoutingModule);
    };

    GameRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], GameRoutingModule);
    /***/
  },

  /***/
  "./src/app/game/game.module.ts":
  /*!*************************************!*\
    !*** ./src/app/game/game.module.ts ***!
    \*************************************/

  /*! exports provided: GameModule */

  /***/
  function srcAppGameGameModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GameModule", function () {
      return GameModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var _game_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./game-routing.module */
    "./src/app/game/game-routing.module.ts");
    /* harmony import */


    var _davinci_code_davinci_code_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../davinci-code/davinci-code.component */
    "./src/app/davinci-code/davinci-code.component.ts");
    /* harmony import */


    var _davinci_code_davinci_code_card_davinci_code_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../davinci-code/davinci-code-card/davinci-code-card.component */
    "./src/app/davinci-code/davinci-code-card/davinci-code-card.component.ts");
    /* harmony import */


    var _room_room_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ../room/room.component */
    "./src/app/room/room.component.ts");

    var GameModule = function GameModule() {
      _classCallCheck(this, GameModule);
    };

    GameModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_davinci_code_davinci_code_component__WEBPACK_IMPORTED_MODULE_4__["DavinciCodeComponent"], _davinci_code_davinci_code_card_davinci_code_card_component__WEBPACK_IMPORTED_MODULE_5__["DavinciCodeCardComponent"], _room_room_component__WEBPACK_IMPORTED_MODULE_6__["RoomComponent"]],
      imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"], _game_routing_module__WEBPACK_IMPORTED_MODULE_3__["GameRoutingModule"]]
    })], GameModule);
    /***/
  },

  /***/
  "./src/app/room/room.component.scss":
  /*!******************************************!*\
    !*** ./src/app/room/room.component.scss ***!
    \******************************************/

  /*! exports provided: default */

  /***/
  function srcAppRoomRoomComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jvb20vcm9vbS5jb21wb25lbnQuc2NzcyJ9 */";
    /***/
  },

  /***/
  "./src/app/room/room.component.ts":
  /*!****************************************!*\
    !*** ./src/app/room/room.component.ts ***!
    \****************************************/

  /*! exports provided: RoomComponent */

  /***/
  function srcAppRoomRoomComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RoomComponent", function () {
      return RoomComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @services/utils.service */
    "./src/app/shared/services/utils.service.ts");
    /* harmony import */


    var _services_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @services/storage.service */
    "./src/app/shared/services/storage.service.ts");
    /* harmony import */


    var _services_p2p_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @services/p2p.service */
    "./src/app/shared/services/p2p.service.ts");

    var RoomComponent =
    /*#__PURE__*/
    function () {
      function RoomComponent(utils, storage, route, p2p, router) {
        _classCallCheck(this, RoomComponent);

        this.utils = utils;
        this.storage = storage;
        this.route = route;
        this.p2p = p2p;
        this.router = router; // how many people needed in a game

        this.games = {
          davinci_code: {
            name: 'Davinci Code',
            min: 2,
            max: 4
          }
        }; // room members list

        this.roomMembers = [];
      }

      _createClass(RoomComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this9 = this;

          this.game = this.route.snapshot.paramMap.get('game');
          this.p2p.init();
          this.storage.setGameData({});

          if (this.storage.get('name')) {
            this.roomMembers = [this.storage.get('name')];
          }

          this.utils.getEvent('game-data').subscribe(function (res) {
            // host user receive the data that a new user has joined this room
            if (_this9.utils.has(res, 'newUser') && res.newUser && _this9.storage.isHost()) {
              _this9.roomMembers.push(res.name);

              var gameData = _this9.storage.getGameData(); // initialise the host info if not set yet


              if (!_this9.utils.has(gameData, 'members')) {
                gameData.members = [{
                  id: _this9.p2p.getId(),
                  name: _this9.storage.get('name')
                }];
              } // add this new user to members


              gameData.members.push({
                id: res.id,
                name: res.name
              }); // save game data in local storage

              _this9.storage.setGameData(gameData); // connect to this new peer


              _this9.p2p.connect(res.id); // send the info to the new user


              _this9.p2p.send(gameData, true); // broadcast the latest info to all users


              _this9.p2p.send(gameData);
            } // room member user receive the data to update members


            if (_this9.utils.has(res, 'members')) {
              _this9.roomMembers = res.members.map(function (member) {
                return member.name;
              }); // save game data in local storage (only need to know how many members are in the room)

              _this9.storage.setGameData({
                members: res.members
              });
            } // room member user receive the data to start the game


            if (_this9.utils.has(res, 'startGame') && res.startGame) {
              _this9.router.navigate([res.game]);
            }
          });
        }
      }, {
        key: "saveName",
        value: function saveName() {
          if (!this.name) {
            return;
          }

          this.storage.set('name', this.name);
          this.roomMembers = [this.name];
        }
      }, {
        key: "back",
        value: function back() {
          this.router.navigate(['']);
        }
        /**
         * Only for people who are not host
         * Join a room with room id
         */

      }, {
        key: "join",
        value: function join() {
          if (!this.roomId) {
            return;
          }

          this.p2p.connect(this.roomId);
          this.p2p.send({
            newUser: true,
            id: this.p2p.getId(),
            name: this.storage.get('name')
          }, true);
          this.joiningRoom = true;
        }
        /**
         * Only for host people
         * Start the game
         */

      }, {
        key: "start",
        value: function start() {
          // tell room member to start the game
          this.p2p.send({
            startGame: true,
            game: this.game
          }); // go the game route

          this.router.navigate([this.game]);
        }
      }]);

      return RoomComponent;
    }();

    RoomComponent.ctorParameters = function () {
      return [{
        type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"]
      }, {
        type: _services_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _services_p2p_service__WEBPACK_IMPORTED_MODULE_5__["P2PService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
      }];
    };

    RoomComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-room',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./room.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/room/room.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./room.component.scss */
      "./src/app/room/room.component.scss")).default]
    })], RoomComponent);
    /***/
  }
}]);
//# sourceMappingURL=game-game-module-es5.js.map