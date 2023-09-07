import React from "react";
import "../../assets/css/main.css";
import "../../components/loginForm/loginForm.css";
import "./resultsPage.css";
import KaydenRejected from "../../assets/images/KaydenRejected.png";
import {MainLayout} from "../../components/baseLayout/baseLayout";
import {TopPanel} from "../../components/topPanel/topPanel";
import {BodyPanel} from "../../components/bodyPanel/bodyPanel";
import {CONSTANTS} from "../../constants";
import {useLocation, useNavigate} from "react-router-dom";
import { getData } from "../../utilities/db";


export const ResultsPage = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING}/>
      <img className={"kaydenImage"} src={KaydenRejected} alt={"This is Kayden rejecting you."}/>

      <BodyPanel className="">
        <section className={"results"}>
          {state?.score >= 0 &&

            <h2 className={"resultsHeading"}>{`You got rejected, with a Rizz score of: ${state.score}`}</h2>
          }
          <article className={"userInteraction"}>
            <button className={"playAgain"} onClick={() => {
              navigate("/play", {state: {newGame: true}})
            }}>Play again?
            </button>
            <button className={"scoreBoard"} onClick={async () => {
              navigate("/scoreboard", {
                state: {
                  // ToDo: Use username from Google OAuth profile
                  username:  await getData("username"),
                  currentScore: 0
                }
              })
            }}>Scoreboard
            </button>
          </article>
        </section>
      </BodyPanel>
    </MainLayout>
  );
};
