import { useAtom } from "jotai";
import { modalAtom, type ModalTemplates, modalTemplates } from "./templates";

export const useModal = () => {
  const [modalState, setModalState] = useAtom(modalAtom);

  const showModal = <T extends keyof ModalTemplates>(
    component: T,
    props?: Parameters<ModalTemplates[T]>[0],
  ) => {
    setModalState({
      state: "open",
      component: modalTemplates[component],
      props,
    });
  };

  const hideModal = () => {
    setModalState({ state: "close" });
  };

  return { modalState, showModal, hideModal };
};
