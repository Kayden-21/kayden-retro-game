import React, { useEffect } from "react";
import "../../assets/css/main.css";
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { GamePanel } from "../../components/gamePanel/gamePanel";



export const GamePage = () => {
  
  useEffect(() => {
    // Code to be executed when the component is mounted
  }, []);

  //startPos: 40, 160, 280 or 400
  //marriagePicPosition: 60,190,320,450
  //linePositions x: 120, 240, 360  y: 250,300,350,400,450,500,550,600

  return (
    <MainLayout>
      <TopPanel heading="The Bachelor: Kayden Edition" />
      <GamePanel className="" startPosY={160} start= {true} marriagePicPosition={60} speed={1} linePositions={[[400,120],[300,240],[350,360],[600,120],[250,240]]}>
      </GamePanel>
    </MainLayout>
  );
};
