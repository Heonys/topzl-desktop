import { changeLanguage } from "@shared/i18n/renderer";
import { useEffect } from "react";

export const useShortcutListener = () => {
  useEffect(() => {
    const cleanUpFn = window.shortcut.setupNavigate((url) => {
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
};
