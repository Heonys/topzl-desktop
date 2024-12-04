import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import bootstrap from "./bootstrap";
import App from "./App";
import "./global.css";

bootstrap().then(() => {
  createRoot(document.getElementById("app")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
