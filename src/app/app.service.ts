import { Injectable } from '@angular/core';

import { Locker, LockerConfig } from 'angular2-locker'

@Injectable()
export class AppState {
  _state = {};

  constructor(private locker: Locker) {

  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    var returnVal: any = null;
    const state = this.state;

    if (prop) {
      if (state.hasOwnProperty(prop)) {
        return state[prop];
      } else if (this.locker.has(prop)) {
        // this.set(prop, this.locker.get(prop));
        return this.locker.get(prop);
      }
    } else {
      return state;
    }

    return null;
    // return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    console.log('set appState item: ', prop, ' to ', value);
    if (value) {
      this.locker.set(prop, value);
    } else {
      this.locker.remove(prop);
    }
    return this._state[prop] = value;
  }


  _clone(object: any) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
