class UI {
  constructor() {
    this.moviesList = document.querySelector('.movies__list');
    this.banner = document.querySelector('.banner');
    this.headerCategories = document.querySelector('.header-categories');
    this.buttonsCategoies = document.querySelectorAll(
      '.header-categories__button',
    );
    this.searchField = document.querySelector('.header__input');
    this.movieDetails = document.querySelector('.movieDetails');
    this.movieDetailsHeader = document.querySelector('.movieDetails__header');
  }

  setBanner(data) {
    const firstMovie = data.results[0];
    this.banner.style.backgroundImage = `url('http://image.tmdb.org/t/p/original/${firstMovie.backdrop_path}')`;
    this.banner.innerHTML = `
    <div class="banner__box">
      <h2 class="banner__title">${firstMovie.title}</h2>
      <p class="banner__description">${firstMovie.overview}</p>
    </div>
    `;
  }

  displayMovies(data) {
    data.results.forEach((item) => {
      this.moviesList.innerHTML += `
            <li class="movies__item" id=${item.id}>
                <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="movie"
                class="movies__img">
                <div class="movies__button-box">
                  <a id="moreAboutMovie" data-target="aboutMovie"  href="#" class="movies__button movies__button--link">More...</a>
                  <button class="movies__button">Watch list</button>
                </div>
            </li>
           `;
    });
  }

  cleanMovies() {
    this.moviesList.innerHTML = '';
  }

  cleanSearchField() {
    this.searchField.value = '';
  }

  markActiveButton(e) {
    [...this.buttonsCategoies].forEach((btn) => {
      if (
        btn.classList.contains('header-categories__button--active')
        !== e.target.className
      ) {
        btn.classList.remove('header-categories__button--active');
      }
    });

    e.target.classList.add('header-categories__button--active');
  }

  scrollToMovies() {
    this.headerCategories.scrollIntoView();
  }

  displayInfoAboutMovie(data) {
    console.log(data)
    //console.log(data.runtime);
    const timeConvert = (time) => {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
    };

    timeConvert(data.runtime);
    this.movieDetailsHeader.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300/${data.poster_path}" alt="movie">
    <div class="movieDetails__content">
        <div class="movieDetails__description">
            <h2 class="movieDetails__title">${data.title}</h2>
            <p class="movieDetails__slogan">${data.tagline}.</p>
            <button class="movieDetails__button">Add to my watchlist</button>
            <p class="movieDetails__aboutMovie">${data.overview}</p>
            <span class="movieDetails__rating">${data.vote_average}</span>
            <ul class="movieDetails__list">
                <li class="movieDetails__item"></li>
                <li class="movieDetails__item"></li>
            </ul>
        </div>
        <div class="movieDetails__info">
            <p class="movieDetails__realese-date">Release date: ${data.release_date}</p>
            <p class="movieDetails__duration">Duration: 1h 56m</p>
            <p class="movieDetails__budget">Budget: 0</p>
        </div>
    </div>`;
  }

  cleanInfoAboutMovie() {
    this.movieDetailsHeader.innerHTML = '';
  }
}

export const ui = new UI();
