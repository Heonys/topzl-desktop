import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import {
  RootLayout,
  MainLayout,
  HeaderFrame,
  SideFrame,
  PlayController,
  MusicDetail,
} from "@/components";

import "rc-slider/assets/index.css";
import CollapsiblePanel from "./components/Layout/CollapsiblePanel";

const App = () => {
  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <Outlet />
      </MainLayout>
      <CollapsiblePanel />
      <PlayController />
      {createPortal(<MusicDetail />, document.getElementById("detail")!)}
    </RootLayout>
  );
};

export default App;
