import { PropsWithChildren, ReactElement } from "react";

type SwitchProps = {
  switch: any;
  children: ReactElement<CaseProps> | ReactElement<CaseProps>[];
};
export function Switch(props: SwitchProps) {
  const { switch: _switch, children } = props;
  if (Array.isArray(children)) {
    return children.filter((child) => child.props.case === _switch);
  }
  return children.props.case === _switch ? children : null;
}

type CaseProps = { case: any };
export function Case(props: PropsWithChildren<CaseProps>) {
  return props.children;
}
