import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) { }

  get(key: string) {
    if (this.storage.getItem(key)) {
      return JSON.parse(this.storage.getItem(key) || null);
    }
    return null;
  }

  set(key: string, value: any) {
    return this.storage.setItem(key, JSON.stringify(value));
  }

  append(key: string, value: any) {
    let actual = this.get(key);
    if (!actual) {
      actual = {};
    }
    return this.set(key, Object.assign(actual, value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  /******************
    Language setting
  ******************/
  getLang() {
    return this.get('lang') || 'en';
  }

  setLang(lang) {
    this.set('lang', lang);
  }

  toggleLang() {
    if (this.getLang() === 'en') {
      return this.setLang('zh');
    }
    return this.setLang('en');
  }

  isHost(isHost?: boolean) {
    if (isHost === undefined) {
      return this.get('isHost') || false;
    }
    this.set('isHost', isHost);
  }

  /******************
    Game Data
  ******************/
  getGameData() {
    return this.get('gameData');
  }

  setGameData(data: any) {
    this.set('gameData', data);
  }

}
