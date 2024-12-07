import { useNavigate } from "react-router-dom";
import { HeaderIconButton } from "./HeaderIconButton";

export const HeaderNavigator = () => {
  const navigate = useNavigate();

  return (
    <div className="region-none flex gap-1 rounded-xl bg-white p-1 px-2 ">
      <HeaderIconButton
        iconName="previous"
        title="previous"
        size={25}
        onClick={() => {
          navigate(-1);
        }}
      />
      <HeaderIconButton
        iconName="next"
        title="next"
        size={25}
        onClick={() => {
          navigate(1);
        }}
      />
    </div>
  );
};
