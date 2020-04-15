import React, { Component } from "react";
import Checkbox from "./Checkbox";

class SignUpPage extends Component{
    render(){
        return(
            <div id="wrapper">
                <div id="main">
                    <div class="inner">
                        <h1>Register</h1>
                        <section>
                            <form method="post" action="#">
                                <div class="row gtr-uniform">
                                    <div class="col-6 col-12-xsmall">
                                        <input type="text" name="username" id="username" placeholder="Username" />
                                        <input type="email" name="demo-email" id="demo-email" placeholder="Email" />
                                        <input type="text" name="birth-date" id="birth-date" placeholder="Date of Birth(DD-MM-YYYY)" />
                                        <input type="password" name="demo-password" id="demo-password" placeholder="Password" />
                                        <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Your Password" />
                                        <br />
                                    <h3>Choose Your Favorite Genres</h3>
                                    <form method="post" action="#">
                                        <div class="row gtr-uniform">
                                            <div class="col-6 col-12-small">
                                                <Checkbox name="genre_name" text="genre.name" checked="false" />
                                                <br></br>
                                                <br></br>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12">
                                        <ul class="actions">
                                            <li><input type="submit" id="send_button" value="Submit" class="primary" /></li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}


export default SignUpPage;
