import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changeLanguage } from "@shared/i18n/renderer";

const usePostRender = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.common.onNavigateTo((route) => {
      navigate(route);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cleanUpFn = window.shortcut.onGlobal((url) => {
      // 함수로 분리
      switch (url) {
        case "TRANSLATE_KO": {
          changeLanguage("ko");
          break;
        }
        case "TRANSLATE_EN": {
          changeLanguage("en");
          break;
        }
      }
    });
    return cleanUpFn;
  }, []);

  return null;
};

export default usePostRender;
