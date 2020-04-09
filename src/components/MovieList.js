import React, { Component } from "react";

class MovieList extends Component {
  render() {
    return (
        <section class="tiles">
          <article class="style1">
            <span class="image">
              <img src="images/pic01.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
          <article class="style2">
            <span class="image">
              <img src="images/pic02.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
          <article class="style3">
            <span class="image">
              <img src="images/pic03.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
          <article class="style4">
            <span class="image">
              <img src="images/pic04.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
          <article class="style5">
            <span class="image">
              <img src="images/pic05.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
          <article class="style6">
            <span class="image">
              <img src="images/pic06.jpg" alt="" />
            </span>
            <a href="film_page.html">
              <h2>*Movie Title*</h2>
              <div class="content">
                <p>*Genre*<br />*Year*</p>
              </div>
            </a>
          </article>
        </section>
    );
  }
}

export default MovieList;