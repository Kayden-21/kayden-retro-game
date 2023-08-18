import "./bodyPanel.css";

export type BodyPanelProps = {
  children?: React.ReactNode;
};

export const BodyPanel = ({ children }: BodyPanelProps) => {
  return <section className="bodyPanel">{children}</section>;
};
