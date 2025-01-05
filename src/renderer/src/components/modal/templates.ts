import { atom } from "jotai";
import { TestModal } from "./TestModal";
import { LyricsSearch } from "./LyricsSearch";
import CreatePlayList from "./CreatePlayList";
import RenamePlaylist from "./RenamePlaylist";
import SelectPlaylist from "./SelectPlaylist";

export const modalTemplates = {
  TestModal,
  LyricsSearch,
  CreatePlayList,
  RenamePlaylist,
  SelectPlaylist,
};

export type ModalTemplates = typeof modalTemplates;

type ModalAtomType =
  | {
      state: "close";
    }
  | {
      state: "open";
      component: (...args: any[]) => JSX.Element;
      props?: Record<string, any>;
    };

export const modalAtom = atom<ModalAtomType>({ state: "close" });
