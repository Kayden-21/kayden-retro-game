import React from "react";
import "../../assets/css/main.css";
import { MainLayout } from "../../components/baseLayout/baseLayout";
import { TopPanel } from "../../components/topPanel/topPanel";
import { BodyPanel } from "../../components/bodyPanel/bodyPanel";

export const ResultsPage = () => {
  return (
    <MainLayout>
      <TopPanel heading="The Bachelor: Kayden Edition" />
      <BodyPanel className="">
        {/* add the results thingy here (can use the gridlayout component to add in what you want on the page) */}
        {/* ...can also pass in your own classname for the panel to make the panel bigger or whatever you want */}
      </BodyPanel>
    </MainLayout>
  );
};
