import React, { Component } from "react";

class WatchedMovieList extends Component {
  render() {
    return (
      <div id="main">
        <div class="inner">
          <h1>Watched Films</h1>
          <ul>
            <li id="movie-details">
              <a href="film_page.html"><h2 id="film-title">Film Title #1</h2>
              <span id="movie-image-button" class="image left"><img src="images/daaka_filmpage_banner.jpg" alt="" /></span></a>
              <h3>Film description:</h3>
              <p>This man was a man but now he`s a vovk  3.14159265358979323846264338327950288419716939937510582097494459 ...</p>
            </li>
            <li id="movie-details">
              <a href="film_page.html"><h2 id="film-title">Film Title #2</h2>
              <span id="movie-image-button" class="image left"><img src="images/daaka_filmpage_banner.jpg" alt="" /></span></a>
              <h3>Film description:</h3>
              <p>This man was a man but now he`s a vovk  3.14159265358979323846264338327950288419716939937510582097494459 ...</p>
            </li>
            <li id="movie-details">
              <a href="film_page.html"><h2 id="film-title">Film Title #3</h2>
              <span id="movie-image-button" class="image left"><img src="images/daaka_filmpage_banner.jpg" alt="" /></span></a>
              <h3>Film description:</h3>
              <p id="film-description">This man was a man but now he`s a vovk  3.14159265358979323846264338327950288419716939937510582097494459 ...</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WatchedMovieList;