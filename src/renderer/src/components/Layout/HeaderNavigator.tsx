import { useNavigate } from "react-router-dom";
import { IconButton } from "@/common";

export const HeaderNavigator = () => {
  const navigate = useNavigate();

  return (
    <div className="region-none flex gap-1 rounded-xl bg-white p-1 px-2">
      <IconButton
        iconName="previous"
        title="previous"
        size={25}
        onClick={() => {
          navigate(-1);
        }}
      />
      <IconButton
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
