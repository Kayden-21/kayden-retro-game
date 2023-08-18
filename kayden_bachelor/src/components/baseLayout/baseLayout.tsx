import "./baseLayout.css";
export type LayoutProps = {
  children?: React.ReactNode;
};

export const LoginLayout = ({ children }: LayoutProps) => {
  return <section className="loginBackground">{children}</section>;
};

export const MainLayout = ({ children }: LayoutProps) => {
  return <section className="mainBackground">{children}</section>;
};
