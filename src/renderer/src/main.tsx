import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import bootstrap from "./bootstrap";
import router from "@/routes";
import "./global.css";

bootstrap().then(() => {
  createRoot(document.getElementById("app")!).render(
    <RouterProvider router={router} future={{ v7_startTransition: true }} />,
  );
});
