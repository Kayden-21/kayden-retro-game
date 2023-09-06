import React from "react";
import "../../assets/css/main.css";
import "../../components/scoreBoard/scoreBoard.css"
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";
import {CONSTANTS} from "../../constants";
import { Scoreboard } from "../../components/scoreBoard/scoreBoard";
import { Link } from "react-router-dom";

export const ScoreboardPage = () => {
  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING} />
      <BodyPanel className="">
        <Link to="/dashboard" className="button-container"> {/* Use the Link component */}
          <button>Dashboard</button>
        </Link>
        <Scoreboard username="Gabriel" currentScore={ 20 } />
      </BodyPanel>
    </MainLayout>
  );
};
