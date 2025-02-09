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
  SearchViewPage,
  GuidelinePage,
  BestPopularPage,
  PipmodePage,
} from "@/pages";
import App from "@/App";

const router = createHashRouter(
  [
    { path: "/pipmode", element: <PipmodePage /> },
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
        { path: "playlist/toplist", element: <BestPopularPage /> },
        { path: "playlist/:title", element: <PlaylistWithTitlePage /> },
        { path: "library", element: <LibraryPage /> },
        { path: "setting", element: <SettingPage /> },
        { path: "download", element: <DownloadPage /> },
        { path: "guideline", element: <GuidelinePage /> },
        { path: "searchView/album/:id", element: <SearchViewPage mediaType="album" /> },
        { path: "searchView/artist/:id", element: <SearchViewPage mediaType="artist" /> },
        { path: "searchView/playlist/:id", element: <SearchViewPage mediaType="playlist" /> },
      ],
    },
  ],
);

export default router;
