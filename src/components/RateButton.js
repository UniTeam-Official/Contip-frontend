import React, { Component } from "react";
import SendButton from "./SendButton";

class RateButton extends Component {
	handleClick = event => {
		if (isNaN(this.props.movie_rating)) {
			alert(`Rating must be a number!`);
			event.preventDefault();
		}
		else if (+this.props.movie_rating > 100 || +this.props.movie_rating < 0) {
			alert(`Rating must be between 0 and 100!`);
			event.preventDefault();
		}
		else {
			event.preventDefault();
			// Create movie rating
			const access_token = localStorage.getItem('jwt access');
			let options = {
				method: "POST",
				body: JSON.stringify({film: this.props.film_id, value: this.props.movie_rating}),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `JWT ${access_token}`
				}
			}
			fetch('http://yyr3ll.pythonanywhere.com/api/v1/app/rating/create/', options)
				.then(res => {
					console.log(res);
					if (res.status != 201){
						alert("Something went wrong");
					}
					else {
						alert("Success!");
					}
					return res.json();
				});
		}
	}

	render() {
		return (
			<li>
				<SendButton buttonName="Rate" onSubmit={ this.handleClick } toastMessage="Rating submitted!" />
			</li>
		);
	}
}

export default RateButton;
