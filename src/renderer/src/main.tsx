import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AfterRenderSetup } from "@/components";
import bootstrap from "./bootstrap";
import router from "@/routes";
import "./global.css";

bootstrap().then(() => {
  createRoot(document.getElementById("app")!).render(
    <AfterRenderSetup>
      <RouterProvider router={router} />
    </AfterRenderSetup>,
  );
});
