import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePostRender = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.common.onNavigateTo((route) => {
      navigate(route);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default usePostRender;
