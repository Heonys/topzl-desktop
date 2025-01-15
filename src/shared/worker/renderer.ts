import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export function setupWatcher() {
  window.worker.setupWatcher();
}
