import React from "react";
import { LoginLayout } from "../../components/baseLayout/baseLayout";
import { LoginForm } from "../../components/loginForm/loginForm";

export const LoginPage = () => {
  return (
    <LoginLayout>
      <LoginForm heading="Login" buttonText="Login with Google" />
    </LoginLayout>
  );
};
