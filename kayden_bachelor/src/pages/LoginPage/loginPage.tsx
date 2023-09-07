import React, { useEffect } from 'react';
import { LoginLayout } from "../../components/baseLayout/baseLayout";
import { useNavigate } from 'react-router-dom';
import { initializeGoogleAuth, signInWithGoogle } from '../../utilities/GoogleAuth';
import "./loginPage.css";

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initializeGoogleAuth('148921217594-sc71tpp56j6ci623c2e11hagglavalb3.apps.googleusercontent.com');
  }, []);

  const handleLoginClick = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google authentication failed', error);
    }
  };

  return (
    <LoginLayout>
      <button className={"loginButton"} onClick={handleLoginClick}>Login with Google</button>
    </LoginLayout>
  );
};
