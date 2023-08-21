import React, { useEffect } from 'react';
import { LoginLayout } from "../../components/baseLayout/baseLayout";
import { LoginForm } from "../../components/loginForm/loginForm";
import { initializeGoogleAuth } from '../../utilities/GoogleAuth';

export const LoginPage = () => {
  useEffect(() => {
    initializeGoogleAuth('148921217594-sc71tpp56j6ci623c2e11hagglavalb3.apps.googleusercontent.com');
  }, []);
  return (
    <LoginLayout>
      <LoginForm heading="Login" buttonText="Login with Google" />
    </LoginLayout>
  );
};
