import "./loginForm.css";
import logo from "../../assets/images/heart.png";
import { signInWithGoogle, signOutFromGoogle } from '../../utilities/GoogleAuth';

export type LoginFormProps = {
  heading: string;
  buttonText: string;
};

export const LoginForm = ({ heading, buttonText }: LoginFormProps) => {
  return (
    <>
      <form className="loginForm">
        <img alt="heart" src={logo} />
        <h1>{heading}</h1>
        <button type="submit" onClick={signInWithGoogle}>{buttonText}</button>
      </form>
    </>
  );
};
