import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { ModalComponent } from "@/components/modal/ModalComponent";
import {
  RootLayout,
  MainLayout,
  HeaderFrame,
  SideFrame,
  PlayController,
  MusicDetail,
  CollapsiblePanel,
} from "@/components";

import "rc-slider/assets/index.css";

const App = () => {
  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <Outlet />
      </MainLayout>
      <ModalComponent />
      <CollapsiblePanel />
      <PlayController />
      {createPortal(<MusicDetail />, document.getElementById("detail")!)}
    </RootLayout>
  );
};

export default App;
