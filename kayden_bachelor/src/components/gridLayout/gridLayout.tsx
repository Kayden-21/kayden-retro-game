import "./gridLayout.css";

export type GridLayoutProps = {
  leftChildren?: React.ReactNode;
  rightChildrenText1?: string;
  rightChildrenText2?: string;
};

export const GridLayout = ({
  leftChildren,
  rightChildrenText1,
  rightChildrenText2,
}: GridLayoutProps) => {
  return (
    <section className="grid-layout">
      <section className="left-column">{leftChildren}</section>
      <section className="right-column">
        <section className="buttonPlay">{rightChildrenText1}</section>
        <section className="buttonLeaderboard">{rightChildrenText2}</section>
      </section>
    </section>
  );
};
