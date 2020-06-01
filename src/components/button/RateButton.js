import React from "react";
import SendButton from "./SendButton";

import host from '../../configs/hostConfig';


const RateButton = ({ className, film_rating, film_id }) => {

    const handleClick = async (event, addToast) => {
        if (isNaN(film_rating)) {
            event.preventDefault();
            addToast("Rating must be a number!", { appearance: 'error', autoDismiss: true, });
        }
        else if (+film_rating > 100 || +film_rating < 0) {
            event.preventDefault();
            addToast("Rating must be between 0 and 100!", { appearance: 'error', autoDismiss: true, });
        }
        else {
            event.preventDefault();
            // Create film rating
            const access_token = localStorage.getItem('jwt access');
            let options = {
                method: "POST",
                body: JSON.stringify({ film: film_id, value: film_rating }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${ access_token }`
                }
            }
    
            let get_id_options = {};
    
            const response = await fetch(`${ host }api/v1/app/rating/create/`, options);
    
            if (response.status === 400 && response.url === `${ host }api/v1/app/rating/create/`) {
    
    
                // Creating options for getting id of rating
                Object.assign(get_id_options, options);
                get_id_options.method = "GET";
                delete get_id_options["body"];
    
    
                // Fetching rating id
                const rating_id_response = await fetch(`${ host }api/v1/app/rating/get_id/${ film_id }/`, get_id_options);
                const rating_obj = await rating_id_response.json();
    
    
                // Updating rating
                options.method = "PUT";
                const put_response = await fetch(`${ host }api/v1/app/rating/detail/${ rating_obj }/`, options);
    
    
                if (put_response.status !== 200) {
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                addToast("Rated successfully!", { appearance: 'success', autoDismiss: true, });
    
            }
            else if (response.status !== 201) {
                addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
            }
            else {
                addToast("Rated successfully!", { appearance: 'success', autoDismiss: true, });
            }
    
        }
    }

    return (
        <li>
            <SendButton buttonName="Rate" onSubmit={ handleClick } className={ className } />
        </li>
    );
}

export default RateButton;
