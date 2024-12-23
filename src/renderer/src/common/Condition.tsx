import { ReactNode } from "react";

type Props = {
  condition: any;
  children: ReactNode;
  falsy?: ReactNode;
};

const Condition = ({ children, condition, falsy = null }: Props) => {
  return <>{condition ? children : falsy}</>;
};

export default Condition;
