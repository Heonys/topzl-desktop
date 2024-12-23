import { createHashRouter } from "react-router-dom";
import { TestPage, SearchPage, SettingPage } from "@/pages";
import App from "@/App";

const options = {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
};

const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <TestPage /> },
        { path: "search/:query", element: <SearchPage /> },
        { path: "setting", element: <SettingPage /> },
      ],
    },
  ],
  options,
);

/* 필요시 PATH 파일 추가 */

export default router;
