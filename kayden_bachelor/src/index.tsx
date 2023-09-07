import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { PageRouter } from "./pages/pageRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <PageRouter />
);
