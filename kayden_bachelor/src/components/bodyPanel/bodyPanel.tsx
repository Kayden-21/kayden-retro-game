import "./bodyPanel.css";

export type BodyPanelProps = {
  className?: string;
  children?: React.ReactNode;
};

export const BodyPanel = ({ className, children }: BodyPanelProps) => {
  return (
    <section className={className ? className : "bodyPanel"}>
      {children}
    </section>
  );
};
