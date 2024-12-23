import useShortcutListener from "@/hooks/useShortcutListener";
import { Fragment, PropsWithChildren } from "react";

export function AfterRenderSetup({ children }: PropsWithChildren) {
  useShortcutListener();
  return <Fragment>{children}</Fragment>;
}
