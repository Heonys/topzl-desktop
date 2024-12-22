import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import { RootLayout, MainLayout, HeaderFrame, SideFrame, PlayController } from "@/components";
import MusicDetail from "./components/MusicDetail";

const App = () => {
  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <Outlet />
      </MainLayout>
      <PlayController />
      {createPortal(<MusicDetail />, document.getElementById("detail")!)}
    </RootLayout>
  );
};

export default App;
