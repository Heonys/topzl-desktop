import { Outlet } from "react-router-dom";
import { RootLayout, MainLayout, HeaderFrame, SideFrame } from "@/components";

const App = () => {
  return (
    <RootLayout>
      <HeaderFrame />
      <MainLayout>
        <SideFrame />
        <Outlet />
      </MainLayout>
    </RootLayout>
  );
};

export default App;
