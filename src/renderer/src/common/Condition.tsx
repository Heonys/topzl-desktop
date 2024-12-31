import { ReactNode } from "react";

type Props = {
  condition: any;
  children: ReactNode;
  fallback?: ReactNode;
};

export const Condition = ({ children, condition, fallback = null }: Props) => {
  return <>{condition ? children : fallback}</>;
};
