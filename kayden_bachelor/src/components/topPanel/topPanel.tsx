import "./topPanel.css";

export type TopPanelProps = {
  heading: string;
};

export const TopPanel = ({ heading }: TopPanelProps) => {
  return (
    <section className="topPanel">
      <h1>{heading}</h1>
    </section>
  );
};
