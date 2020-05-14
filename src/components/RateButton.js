import React, { Component } from "react";
import SendButton from "./SendButton";

import host from '../config';


class RateButton extends Component {
    handleClick = async (event, addToast) => {
        if (isNaN(this.props.movie_rating)) {
            event.preventDefault();
            addToast("Rating must be a number!", { appearance: 'error', autoDismiss: true, });
        }
        else if (+this.props.movie_rating > 100 || +this.props.movie_rating < 0) {
            event.preventDefault();
            addToast("Rating must be between 0 and 100!", { appearance: 'error', autoDismiss: true, });
        }
        else {
            event.preventDefault();
            // Create movie rating
            const access_token = localStorage.getItem('jwt access');
            let options = {
                method: "POST",
                body: JSON.stringify({ film: this.props.film_id, value: this.props.movie_rating }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`
                }
            }




            const response = await fetch(`${host}api/v1/app/rating/create/`, options);

            console.log(response);

            if (response.status == 400 && response.url == `${host}api/v1/app/rating/create/`) {

                options.method = "PUT";
                const rating_id = await fetch(`${host}api/v1/app/rating/find_by_film/${this.props.film_id}/`, options);
                const put_response = await fetch(`${host}api/v1/app/rating/detail/${rating_id}`, options);
                console.log(put_response);

                if (put_response.status != 201) {
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                addToast("Rated successfully!", { appearance: 'success', autoDismiss: true, });

            }
            else if (response.status != 201) {
                addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
            }
            else {
                addToast("Rated successfully!", { appearance: 'success', autoDismiss: true, });
            }



            // fetch(`${host}api/v1/app/rating/create/`, options)
            //     .then(res => {
            //         console.log(res);
            //         if (res.status != 201) {
            //             addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
            //         }
            //         else {
            //             addToast("Rated successfully!", { appearance: 'success', autoDismiss: true, });
            //         }
            //         return res.json();
            //     });
        }
    }

    render() {
        return (
            <li>
                <SendButton buttonName="Rate" onSubmit={this.handleClick} className={this.props.className} />
            </li>
        );
    }
}

export default RateButton;
