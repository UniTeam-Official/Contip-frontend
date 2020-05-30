import React from "react";
import Header from "../layout/header/Header";
import ProfileForm from "./ProfileForm";
import Footer from "../layout/footer/Footer";


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
