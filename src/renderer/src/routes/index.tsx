import { createHashRouter } from "react-router-dom";
import {
  TestPage,
  SearchPage,
  SettingPage,
  LocalPage,
  PlaylistPage,
  ChartPage,
  LibraryPage,
  PlaylistWithTitlePage,
  FavoritePage,
} from "@/pages";
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
        { path: "chart", element: <ChartPage /> },
        { path: "search/:query?", element: <SearchPage /> },
        { path: "local", element: <LocalPage /> },
        { path: "playlist", element: <PlaylistPage /> },
        { path: "playlist/current", element: <PlaylistPage /> },
        { path: "playlist/favorite", element: <FavoritePage /> },
        { path: "playlist/:title", element: <PlaylistWithTitlePage /> },
        { path: "library", element: <LibraryPage /> },
        { path: "setting", element: <SettingPage /> },
      ],
    },
  ],
  options,
);

export default router;
