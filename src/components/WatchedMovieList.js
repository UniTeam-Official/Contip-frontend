import React, { Component } from "react";

import Movie from "./Movie";

class WatchedMovieList extends Component {
  render() {
    return (
      <div id="main">
        <div class="inner">
          <h1>Watched Movies</h1>
          <ul>
            <li>
              <Movie link="/" title="First Movie" year="1991" desc="This man was a man but now hes a vovk. 3.14159265..." image="https://i.ytimg.com/vi/848q7WLmwbk/maxresdefault.jpg" />
            </li>
            <li>
              <Movie link="/" title="Second Movie" year="2005" desc="Did you ever head the tragedy of Darth Plagueis the Wise? I thought not. It's not a story the Jedi would tell you. 3.14159265..." image="https://cdn.mos.cms.futurecdn.net/LSnvRUxYe64Lg7qrMzCGQd.jpg" />
            </li>
            <li>
              <Movie link="/" title="Third Movie" year="1850" desc="This is the description of the third movie. It describes what the movie is about in a lot of unnecessary detail. 3.14159265..." image="https://tul.imgix.net/content/article/april-movies.jpg?auto=format,compress&w=1200&h=630&fit=crop" />
            </li>
            <li>
              <Movie link="/" title="Fourth Movie" year="2020" desc="This man was a man but now hes a vovk. 3.14159265..." image="https://regalcdn.azureedge.net/BadBoysforLife/HO00009996/TV_SmallPosterImage/20191125-090126975.jpg" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WatchedMovieList;