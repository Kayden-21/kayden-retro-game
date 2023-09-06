import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage/loginPage";
import { DashboardPage } from "./DashboardPage/dashboardPage";
import { ScoreboardPage } from "./ScoreboardPage/scoreboardPage";
import { GamePage } from "./GamePage/gamePage";
import {ResultsPage} from "./ResultsPage/resultsPage";

export const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/play" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};
