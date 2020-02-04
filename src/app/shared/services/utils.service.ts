import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { StorageService } from './storage.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private lodash;
  private language = {
    undefined: '',
    null: '',
    '': '',
    'Davinci Code': '达芬奇密码',
    'Nick Name': '昵称',
    'OK': '确定',
    'Hello': '你好',
    'Create Room': '创建房间',
    'Join Room': '进入房间',
    'My Room Id': '我的房间号',
    'People In My Room': '房间成员',
    'people': '人',
    'Start Game': '开始游戏',
    'Room Number': '房间号',
    'Join': '进入',
  };
  private _eventsSubject = new Subject<{key: string, value: any}>();

  constructor(
    private storage: StorageService
  ) {
    if (_) {
      this.lodash = _;
    } else {
      throw new Error('Lodash is not available');
    }
  }

  /******************
    Lodash functions
  ******************/
  isEmpty(value: any): boolean {
    return this.lodash.isEmpty(value);
  }
  each(collections, callback) {
    return this.lodash.each(collections, callback);
  }
  has(object, path) {
    return this.lodash.has(object, path);
  }
  indexOf(array, value, fromIndex= 0) {
    return this.lodash.indexOf(array, value, fromIndex);
  }
  flattenDeep(array) {
    return this.lodash.flattenDeep(array);
  }

  /******************
    Event functions
  ******************/

  // broadcast the event to whoever subscribed
  broadcastEvent(key: string, value: any) {
    this._eventsSubject.next({ key, value });
  }

  // get Event to subscribe to
  getEvent(key: string): Observable<any> {
    return this._eventsSubject.asObservable()
      .pipe(
        filter(e => e.key === key),
        map(e => e.value)
      );
  }

  /******************
    Other functions
  ******************/

  // given an array and a value, check if this value is in this array, if it is, remove it, if not, add it to the array
  addOrRemove(array: Array<any>, value) {
    if (!array) {
      array = [];
    }
    const position = this.indexOf(array, value);
    if (position > -1) {
      // find the position of this value and remove it
      array.splice(position, 1);
    } else {
      // add it to the value array
      array.push(value);
    }
    return array;
  }

  utcToLocal(time: string, display: string = 'all') {
    if (!time) {
      return '';
    }
    const date = new Date(this.timeStringFormatter(time));
    const formattedTime = new Intl.DateTimeFormat('zh', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);

    switch (display) {
      case 'date':
        return this.dateFormatter(date);

      case 'time':
        return formattedTime;

      default:
      return this.dateFormatter(date) + ' ' + formattedTime;
    }
  }

  dateFormatter(date: Date) {
    const today = new Date();
    let formattedDate = new Intl.DateTimeFormat('zh', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(date);

    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) {
      if (date.getDate() === today.getDate() - 1) {
        formattedDate = '昨天';
      }
      if (date.getDate() === today.getDate()) {
        formattedDate = '今天';
      }
      if (date.getDate() === today.getDate() + 1) {
        formattedDate = '明天';
      }
    }
    return formattedDate;
  }

  /**
   * Format the time string
   * 1. Add 'T' between date and time, for compatibility with Safari
   * 2. Add 'Z' at last to indicate that it is UTC time, browser will automatically convert the time to local time
   *
   * Example time string: '2019-08-06 15:03:00'
   * After formatter: '2019-08-06T15:03:00Z'
   */
  timeStringFormatter(time: string) {
    // add "T" between date and time, so that it works on Safari
    time = time.replace(' ', 'T');
    // add "Z" to indicate that it is UTC time, it will automatically convert to local time
    return time + 'Z';
  }

  /**
   * This is a function to detect the current language configured and return to the correct language
   * @param value The text that needs to transfer language
   */
  lang(value: string) {
    if (!this.storage.getLang() || this.storage.getLang() !== 'zh') {
      return value;
    }
    if (this.isEmpty(this.language[value])) {
      return value;
    }
    return this.language[value];
  }
}
