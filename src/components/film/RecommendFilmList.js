import React, { Component } from "react";
import RecommendFilmSummary from "../film/RecommendFilmSummary";

import host from '../../configs/hostConfig';

class RecommendFilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendFilms: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    async componentDidMount() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }

        const response = await fetch(`${ host }api/v1/app/film/recommend/`, options);
        console.log(response);

        if (response.status > 400) {
            //<Redirect to="/login" />
            this.props.history.push("/login/");
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }

        const recommendFilms = await response.json();
        console.log(recommendFilms);

        this.setState(() => {
            return {
                recommendFilms,
                loaded: true
            };
        });
    }

    render() {
        let films = <p><strong>Loading your recommendations... Hang on...</strong></p>;
        if (this.state.loaded && typeof(this.state.recommendFilms) != 'undefined' && this.state.recommendFilms.length > 0){
            films = this.state.recommendFilms.map(film => {
                return (
                    <RecommendFilmSummary href={`/film/${ film.id }`} title={ film.title } key={ film.title } tmdb={ film.tmdb } image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre={film.genre.map(genre => {return(genre.name + '  ')})} />
                );
            })
            return (
                <section className="tiles">
                    { films }
                </section>
            );
        }
        return (
            <header>
                <br /><br /><br />
                { films }
            </header>
        );
    }
}

export default RecommendFilmList;
