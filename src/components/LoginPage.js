import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";


const LoginPage = ({ history }) => {
    return (
        <div id="wrapper">
            <LoginHeader />
            <LoginForm history={ history }/>
        </div>
    );
}

export default LoginPage;
