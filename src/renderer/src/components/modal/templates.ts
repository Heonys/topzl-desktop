import { atom } from "jotai";
import CreatePlayList from "./CreatePlayList";
import RenamePlaylist from "./RenamePlaylist";
import SelectPlaylist from "./SelectPlaylist";
import ScanLocalMusic from "./ScanLocalMusic";
import PrivacyPolicy from "./PrivacyPolicy";

export const modalTemplates = {
  CreatePlayList,
  RenamePlaylist,
  SelectPlaylist,
  ScanLocalMusic,
  PrivacyPolicy,
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
