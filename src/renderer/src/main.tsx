import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import bootstrap from "./bootstrap";
import router from "@/routes";
import "./global.css";

bootstrap().then(() => {
  createRoot(document.getElementById("app")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
