import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ModalComponent } from "@/components/Modal/ModalComponent";
import {
  RootLayout,
  MainLayout,
  HeaderFrame,
  SideFrame,
  PlayController,
  MusicDetail,
  Collapsible,
  ContentsLayout,
} from "@/components";

import "rc-slider/assets/index.css";

const App = () => {
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
      <Collapsible />
      <PlayController />
      {createPortal(<MusicDetail />, document.getElementById("detail")!)}
      <ToastContainer
        draggable={false}
        closeOnClick={false}
        limit={5}
        pauseOnFocusLoss={false}
        hideProgressBar
        autoClose={1500}
        newestOnTop
        position="top-center"
      ></ToastContainer>
    </RootLayout>
  );
};

export default App;
