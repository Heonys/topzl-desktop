import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguageFont = () => {
  const { i18n } = useTranslation();
  const [fontClass, setFontClass] = useState("font-sans");

  useEffect(() => {
    const selectedFont = i18n.language === "ko-KR" ? "font-sans" : "font-misans";
    setFontClass(selectedFont);
  }, [i18n.language]);

  return { fontClass };
};
