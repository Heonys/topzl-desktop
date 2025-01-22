import { createHashRouter, Navigate } from "react-router-dom";
import {
  SearchPage,
  SettingPage,
  LocalPage,
  PlaylistPage,
  DownloadPage,
  LibraryPage,
  PlaylistWithTitlePage,
  FavoritePage,
  MainPage,
  DiscoverPage,
  SearchViewPage,
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
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <MainPage /> },
        { path: "search/:query?", element: <SearchPage /> },
        { path: "local", element: <LocalPage /> },
        { path: "playlist", element: <PlaylistPage /> },
        { path: "playlist/current", element: <PlaylistPage /> },
        { path: "playlist/favorite", element: <FavoritePage /> },
        { path: "playlist/:title", element: <PlaylistWithTitlePage /> },
        { path: "library", element: <LibraryPage /> },
        { path: "setting", element: <SettingPage /> },
        { path: "download", element: <DownloadPage /> },
        { path: "discover", element: <DiscoverPage /> },
        { path: "searchView/album/:id", element: <SearchViewPage mediaType="album" /> },
        { path: "searchView/artist/:id", element: <SearchViewPage mediaType="artist" /> },
        { path: "searchView/playlist/:id", element: <SearchViewPage mediaType="playlist" /> },
      ],
    },
  ],
  options,
);

export default router;
