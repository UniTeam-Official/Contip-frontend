import React from "react";


const WelcomeText = ({ username }) => {
    return (
        <div>
            <h2>Welcome, { username }!</h2>
        </div>
    );
}

export default WelcomeText;
