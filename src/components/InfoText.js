import React, { Component } from "react";

class InfoText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		};
	}

	componentDidMount() {
		const token = localStorage.getItem('jwt');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${token}`
            }
        }
		fetch("http://yyr3ll.pythonanywhere.com/api/v1/account/users/me/", options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState(() => {
					return {
						data,
						loaded: true
					};
				});
			});
	}

	render() {
		return (
			<div>
				<p>Username: {this.state.data.username} </p>
				<p>Email: {this.state.data.email} </p>
			</div>
		);
	}
}

export default InfoText;
