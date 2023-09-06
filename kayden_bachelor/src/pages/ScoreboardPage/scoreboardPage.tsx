import "../../assets/css/main.css";
import "../../components/scoreBoard/scoreBoard.css"
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";
import { CONSTANTS } from "../../constants";
import { Scoreboard } from "../../components/scoreBoard/scoreBoard";
import { useLocation } from "react-router-dom";

export const ScoreboardPage = () => {

  const location = useLocation();
  const { username, currentScore } = location.state || {};

  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING} />
      <BodyPanel className="">
        <Scoreboard username={username} currentScore={currentScore} />
      </BodyPanel>
    </MainLayout>
  );
};
