import { atom } from "jotai";
import TestModal from "./TestModal";

export const modalTemplates = {
  TestModal,
};

export type ModalTemplates = typeof modalTemplates;

type ModalAtomType =
  | {
      state: "close";
    }
  | {
      state: "open";
      component: () => JSX.Element;
      props?: Record<string, any>;
    };

export const modalAtom = atom<ModalAtomType>({ state: "close" });
