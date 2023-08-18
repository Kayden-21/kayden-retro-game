import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { PageRouter } from "./pageRouter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageRouter />
  </React.StrictMode>
);
