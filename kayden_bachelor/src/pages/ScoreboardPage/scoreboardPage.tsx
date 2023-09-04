import React from "react";
import "../../assets/css/main.css";
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";
import {CONSTANTS} from "../../constants";

export const ScoreboardPage = () => {
  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING} />
      <BodyPanel className="">
        {/* add the scoreboard thingy here*/}
        {/* ...can also pass in your own classname for the panel to make the panel bigger or whatever you want */}
      </BodyPanel>
    </MainLayout>
  );
};
