import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ModalComponent } from "@/components/modal/ModalComponent";
import {
  RootLayout,
  MainLayout,
  HeaderFrame,
  SideFrame,
  PlayController,
  MusicDetail,
  Collapsible,
  ContentsLayout,
  ContextMenuContainer,
} from "@/components";

import usePostRender from "./hooks/usePostRender";
import "rc-slider/assets/index.css";

const App = () => {
  usePostRender();

  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <ContentsLayout>
          <Outlet />
        </ContentsLayout>
      </MainLayout>
      <ModalComponent />
      <ContextMenuContainer />
      <Collapsible />
      <PlayController />
      {createPortal(<MusicDetail />, document.getElementById("detail")!)}
      <ToastContainer
        draggable={false}
        closeOnClick={false}
        limit={1}
        pauseOnFocusLoss={false}
        hideProgressBar
        autoClose={2000}
        newestOnTop
        position="top-center"
      ></ToastContainer>
    </RootLayout>
  );
};

export default App;
