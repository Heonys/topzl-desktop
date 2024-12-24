import { Fragment, PropsWithChildren } from "react";
import { useShortcutListener } from "@/hooks";

export function AfterRenderSetup({ children }: PropsWithChildren) {
  useShortcutListener();
  return <Fragment>{children}</Fragment>;
}
