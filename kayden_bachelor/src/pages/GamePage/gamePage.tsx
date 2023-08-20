import React, { useState} from "react";
import "../../assets/css/main.css";
import "./gamePage.css";
import {MainLayout} from "../../components/baseLayout/baseLayout";
import {TopPanel} from "../../components/topPanel/topPanel";
import {GamePanel} from "../../components/gamePanel/gamePanel";
import {CONSTANTS} from "../../constants";
import KAYDEN_FACE from '../../assets/images/kaydenFace.png';
import MARRIAGE from "../../assets/images/marriage.png";
import {GameHandler} from "../../utilities/gameHandler";


export const GamePage = () => {

  const [startGame, setStartGame] = useState<Boolean>(false);
  let gameHandler: GameHandler = new GameHandler();

  return (
    <MainLayout>
      <TopPanel heading={CONSTANTS.MAIN_HEADING}/>
      {!startGame ?
        <section className={'tutorial-section'}>
          <h2>Help Kayden</h2>
          <h3>This is Kayden and his wedding</h3>
          <section className={'image-holder'}>
            <img alt={'face of sauve and sophisticated kayden'} src={KAYDEN_FACE}/>
            <img alt={'picture of two people getting married'} src={MARRIAGE}/>
          </section>
          <p>Lead him to his wedding</p>
          <button className={'ready-button'} onClick={async () => {
            await gameHandler.initializeGame(true);
            console.log(gameHandler.state.startPosition);
            setStartGame(true);
          }}>Ready?
          </button>

        </section>
        :
        <GamePanel className="" startPosY={gameHandler.state.startPosition} start={true} marriagePicPosition={gameHandler.state.marriageImagePosition}
                   speed={gameHandler.state.level}
                   linePositions={gameHandler.state.linePositions}>
        </GamePanel>
      }
    </MainLayout>
  );
};
