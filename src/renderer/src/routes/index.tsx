import { createHashRouter } from "react-router-dom";
import { TestPage, SearchPage, SettingPage } from "@/pages";
import App from "@/App";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TestPage /> },
      { path: "search/:query", element: <SearchPage /> },
      { path: "setting", element: <SettingPage /> },
    ],
  },
]);

/* 필요시 PATH 파일 추가 */

export default router;
