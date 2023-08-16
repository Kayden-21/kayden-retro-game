import React from "react";
import {LoginHeading} from "./Login.styles";

export const Login: React.FC = () => {
    return (
        <>
            <LoginHeading>This is the login page</LoginHeading>
            <a href={'/game'}>PRESS HERE</a>
        </>
    );
}
