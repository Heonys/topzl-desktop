/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import EventEmitter from "eventemitter3";
import { useEffect } from "react";
import type { EventPayloadMap } from "./type";
import type { ShortcutKeys } from "@shared/config/type";

class EventWrapper<EventTypes> {
  private ee: EventEmitter;
  constructor() {
    this.ee = new EventEmitter();
  }

  on<T extends EventTypes, K extends keyof T & (string | symbol)>(
    eventName: K,
    callback: (payload: T[K]) => void,
  ) {
    this.ee.on(eventName, callback);
  }
  once<T extends EventTypes, K extends keyof T & (string | symbol)>(
    eventName: K,
    callBack: (payload: T[K]) => void,
  ) {
    this.ee.once(eventName, callBack);
  }

  emit<T extends EventTypes, K extends keyof T & (string | symbol)>(eventName: K, payload?: T[K]) {
    this.ee.emit(eventName, payload);
  }

  off<T extends EventTypes, K extends keyof T & (string | symbol)>(
    eventName: K,
    callBack: (payload: T[K]) => void,
  ) {
    this.ee.off(eventName, callBack);
  }

  use<T extends EventTypes, K extends keyof T & (string | symbol)>(
    eventName: K,
    callBack: (payload: T[K]) => void,
  ) {
    useEffect(() => {
      this.ee.on(eventName, callBack);
      return () => {
        this.ee.off(eventName, callBack);
      };
    }, []);
  }
}

const playerEventEmitter = new EventWrapper<EventPayloadMap>();
const localEventEmitter = new EventWrapper<Record<ShortcutKeys, void>>();

export { playerEventEmitter, localEventEmitter };
