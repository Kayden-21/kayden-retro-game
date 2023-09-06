import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/main.css";
import kayden from "../../assets/images/kayden.png";
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";
import { GridLayout } from "../../components/gridLayout/gridLayout";
import {CONSTANTS} from "../../constants";

export const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING} />
      <BodyPanel>
        <GridLayout
          leftChildren={<img src={kayden} alt="Kayden" />}
          rightChildrenText1="Play (with rizz)"
          rightChildrenText2="Scoreboard"
          rightChildrenText3="Continue"
        />
      </BodyPanel>
    </MainLayout>
  );
};
