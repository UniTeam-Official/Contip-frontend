import React from "react";


const InfoText = ({ username, email }) => {
    return (
        <div>
            <p>Username: { username } </p>
            <p>Email: { email } </p>
        </div>
    );
}

export default InfoText;
