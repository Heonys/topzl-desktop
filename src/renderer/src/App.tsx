import { createPortal } from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";
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

import "rc-slider/assets/index.css";
import { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.common.onNavigateTo((route) => {
      navigate(route);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        limit={5}
        pauseOnFocusLoss={false}
        hideProgressBar
        autoClose={2500}
        newestOnTop
        position="top-center"
      ></ToastContainer>
    </RootLayout>
  );
};

export default App;
