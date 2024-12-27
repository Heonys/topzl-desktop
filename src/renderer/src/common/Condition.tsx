import { ReactNode } from "react";

type Props = {
  condition: any;
  children: ReactNode;
  fallback?: ReactNode;
};

const Condition = ({ children, condition, fallback = null }: Props) => {
  return <>{condition ? children : fallback}</>;
};

export default Condition;
