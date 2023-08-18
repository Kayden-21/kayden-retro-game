import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage/loginPage";
import { DashboardPage } from "./DashboardPage/dashboardPage";

export const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};
