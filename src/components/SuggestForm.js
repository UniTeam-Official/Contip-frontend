import React, { Component } from "react";
import SendButton from "./SendButton";
import TextInputField from "./TextInputField";

class SuggestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            rating: '',
            link: ''
        };
    }

    handleMovieChange = event => {
        this.setState({
            movie: event.target.value
        })
    }
    handleRatingChange = event => {
        this.setState({
            rating: event.target.value
        })
    }
    handleLinkChange = event => {
        this.setState({
            link: event.target.value
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
                            <TextInputField name="footer_movie" id="footer_movie" onChange={this.handleMovieChange} value={this.state.movie} placeholder="Movie We Have To Check Out!" />
                        </div>
                        <div className="field half">
                            <TextInputField name="footer_rating" id="footer_rating" onChange={this.handleRatingChange} value={this.state.rating} placeholder="How Much Will We Like It/10?" />
                        </div>
                        <div className="field">
                            <TextInputField name="footer_link" id="footer_link" onChange={this.handleLinkChange} value={this.state.link} placeholder="Imdb Link" />
                        </div>
                    </div>
                    <ul className="actions">
                        <li><SendButton buttonName="Submit" onSubmit={this.handleSuggestSubmit} toastMessage="Film submitted successfully" /></li>
                    </ul>
                </form>
            </section>
        );
    }
}

export default SuggestForm;
