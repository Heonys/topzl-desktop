import { Outlet } from "react-router-dom";
import { RootLayout, MainLayout, HeaderFrame, SideFrame, PlayController } from "@/components";

const App = () => {
  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <Outlet />
      </MainLayout>
      <PlayController />
    </RootLayout>
  );
};

export default App;
