import { http } from "./http.mjs";
import { ui } from "./ui.mjs";

class AppCtrl {
  constructor() {
    this.movieListState = http.popularMovies;
    this.actualMovieListID = 1;
    this.pages = document.querySelectorAll('.page');
    this.popularBtn = document.querySelector('#popular-btn');
    this.playingNowBtn = document.querySelector('#playingNow-btn');
    this.topRatedBtn = document.querySelector('#topRated-btn');
    this.upcomingBtn = document.querySelector('#upcoming-btn');
    this.input = document.querySelector('.header__form');
    this.headerLink = document.querySelector('.header__button');
  }

  init() {
    console.log(this.headerLink)
    this.headerLink.addEventListener('click', (e) => {
      scroll(0, window.innerHeight)
    })
    this.getMovies(http.popularMovies, 1);
    this.changeBanner();
    this.pages.forEach((pg) => {
      pg.addEventListener('show', this.pageShown);
    });

    history.replaceState({}, 'Home', '#home');
    window.addEventListener('popstate', this.poppin);
    this.input.addEventListener('keyup', (e) => {
      scroll(0, window.innerHeight);
      this.searchForMovie(e);
    });
  }

  nav(ev) {
    ev.preventDefault();
    const currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.page--active').classList.remove('page--active');
    document.getElementById(currentPage).classList.add('page--active');
    history.pushState({}, currentPage, `#${currentPage}`);
    console.log(currentPage);
  }

  poppin() {
    let hash = location.hash.replace('#', '');
    console.log(hash);
    document.querySelector('.page--active').classList.remove('page--active');
    document.getElementById(hash).classList.add('page--active');
    ui.cleanInfoAboutMovie();
  }

  async changeBanner() {
    const data = await http.get(http.popularMovies, 1);
    ui.setBanner(data);
  }

  async searchForMovie(e) {
    if (e.target.value !== '') {
      const text = e.target.value;
      ui.cleanMovies();
      this.getMovies(`${http.searchMovie}${text}&page=1`);
    } else {
      ui.cleanMovies();
      this.getMovies(this.movieListState);
    }
  }

  async getInfoAboutMovie(id) {
    const data = await http.getDetails(id);
    ui.displayInfoAboutMovie(data);

  }

  async getMovies(url, page) {
    const data = await http.get(url, page);
    ui.displayMovies(data);
    document.querySelectorAll('.movies__button--link').forEach((link) => {
      link.addEventListener('click', (e) => {
        this.nav(e);
        this.getInfoAboutMovie(e.target.parentElement.parentElement.id);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppCtrl();
  app.init();
});
