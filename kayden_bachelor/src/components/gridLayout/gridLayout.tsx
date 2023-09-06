import "./gridLayout.css";
import {useNavigate} from "react-router-dom";

export type GridLayoutProps = {
  leftChildren?: React.ReactNode;
  rightChildrenText1?: string;
  rightChildrenText2?: string;
  rightChildrenText3?: string;
};

export const GridLayout = ({
  leftChildren,
  rightChildrenText1,
  rightChildrenText2,
  rightChildrenText3
}: GridLayoutProps) => {
  const navigate = useNavigate();
  return (
    <section className="grid-layout">
      <section className="left-column">{leftChildren}</section>
      <section className="right-column">
        <section className="buttonPlay" onClick={()=>{navigate("/play",{state: {
          newGame: true
          }})}}>{rightChildrenText1}</section>
        <section className="buttonLeaderboard" onClick={() => {navigate("/scoreboard")}}>{rightChildrenText2}</section>
        <section className="buttonLeaderboard" onClick={() => {navigate("/play",{state:{newGame: false}})}}>{rightChildrenText3}</section>
      </section>
    </section>
  );
};
