import React from "react";
import LoginHeader from "../auth/LoginHeader";
import LoginForm from "../auth/LoginForm";


const LoginPage = ({ history }) => {
    return (
        <div id="wrapper">
            <LoginHeader />
            <LoginForm history={ history }/>
        </div>
    );
}

export default LoginPage;
