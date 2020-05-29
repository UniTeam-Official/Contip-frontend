import React, { Component } from "react";
import SendButton from "./SendButton";
import TextInputField from "./TextInputField";

class SuggestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            rating: '',
            link: '',

            movieInputList: [
                {
                    type: "text",
                    name: "movie",
                    id: "footer-movie",
                    value: this.movie,
                    onChange: this.handleInputChange,
                    placeholder: "Movie We Have To Check Out!",
                },
            ],

            ratingInputList: [
                {
                    type: "text",
                    name: "rating",
                    id: "footer-rating",
                    value: this.rating,
                    onChange: this.handleInputChange,
                    placeholder: "How Much Will We Like It/10?",
                },
            ],

            linkInputList: [
                {
                    type: "text",
                    name: "link",
                    id: "footer-link",
                    value: this.link,
                    onChange: this.handleInputChange,
                    placeholder: "Imdb Link",
                },
            ],
        };
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSuggestSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <section>
                <h2>You Think We Don't Know That One Unique, Artistic, Extraordinary Movie?<br />Recommend It To Us!</h2>
                <form method="post" action="#">
                    <div className="fields">
                        <div className="field half">
                            <TextInputField textInputList={ this.state.movieInputList } />
                        </div>
                        <div className="field half">
                            <TextInputField textInputList={ this.state.ratingInputList } />
                        </div>
                        <div className="field">
                            <TextInputField textInputList={ this.state.linkInputList } />
                        </div>
                    </div>
                    <ul className="actions">
                        <li><SendButton buttonName="Submit" onSubmit={ this.handleSuggestSubmit } toastMessage="Film submitted successfully" /></li>
                    </ul>
                </form>
            </section>
        );
    }
}

export default SuggestForm;
