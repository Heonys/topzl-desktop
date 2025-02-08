import { getDefaultStore } from "jotai";
import { playListAtom } from "src/renderer/src/atom";
import { getIndexedDB } from "./db";

const store = getDefaultStore();

export async function syncWithIndexedDB() {
  const data = await getIndexedDB("playlist");
  store.set(playListAtom, data.value ?? []);
}
