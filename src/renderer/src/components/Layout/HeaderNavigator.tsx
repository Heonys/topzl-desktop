import { useNavigate } from "react-router-dom";
import { IconButton } from "@/common";

export const HeaderNavigator = () => {
  const navigate = useNavigate();

  return (
    <div className="region-none flex gap-1 rounded-xl bg-black/10 p-1 px-2">
      <IconButton
        iconName="navigate-prev"
        title="previous"
        size={25}
        onClick={() => {
          navigate(-1);
        }}
      />
      <IconButton
        iconName="navigate-next"
        title="next"
        size={25}
        onClick={() => {
          navigate(1);
        }}
      />
    </div>
  );
};
