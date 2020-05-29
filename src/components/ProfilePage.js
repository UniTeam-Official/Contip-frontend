import React from "react";
import Header from "./Header";
import ProfileForm from "./ProfileForm";
import Footer from "./Footer";


const ProfilePage = ({ history }) => {
    return (
        <div id="wrapper">
            <Header />
            <ProfileForm  history={ history }/>
            <Footer />
        </div>
    );
}

export default ProfilePage;
