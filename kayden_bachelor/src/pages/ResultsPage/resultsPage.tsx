import React from "react";
import "../../assets/css/main.css";
import {MainLayout} from "../../components/baseLayout/baseLayout";
import {TopPanel} from "../../components/topPanel/topPanel";
import {BodyPanel} from "../../components/bodyPanel/bodyPanel";
import {CONSTANTS} from "../../constants";
import {useLocation} from "react-router-dom";



export const ResultsPage = () => {
  const {state} = useLocation();

  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING}/>
      <BodyPanel className="">
        <h2>YOU GOT REJECTED</h2>
        {state?.score >= 0 &&

          <h3>{`This is your score: ${state.score}`}</h3>
        }
        <a href={'/play'}>Play again</a>

      </BodyPanel>
    </MainLayout>
  );
};
