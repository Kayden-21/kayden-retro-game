import React, {useEffect} from "react";
import "../../assets/css/main.css";
import kayden from "../../assets/images/kayden.png";
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";
import { GridLayout } from "../../components/gridLayout/gridLayout";
import {CONSTANTS} from "../../constants";

export const DashboardPage = () => {

  useEffect(() => {
    console.log('DASHBOARD RUNS ONCE')
  }, []);
  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING} />
      <BodyPanel>
        <GridLayout
          leftChildren={<img src={kayden} alt="Kayden" />}
          rightChildrenText1="Play (with rizz)"
          rightChildrenText2="Scoreboard"
        />
      </BodyPanel>
    </MainLayout>
  );
};
