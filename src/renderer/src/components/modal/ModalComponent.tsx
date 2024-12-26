import { useAtomValue } from "jotai";
import { modalAtom } from "./templates";
import { useMemo } from "react";

export function ModalComponent() {
  const modalState = useAtomValue(modalAtom);

  const component = useMemo(() => {
    if (modalState.state === "open") {
      const Component = modalState.component;
      return <Component {...(modalState.props ?? {})} />;
    }

    return null;
  }, [modalState]);

  return component;
}
