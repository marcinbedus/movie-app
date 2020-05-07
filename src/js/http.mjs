class HTTP {
  constructor() {
    this.key = '5ebb89ac47d83f0f6feed428da47cf31';
    this.popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en-US&page=`;
    this.nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=en-US&page=`;
    this.topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.key}&language=en-US&page=`;
    this.upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=en-US&page=`;
    this.searchMovie = `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&language=en-US&query=`;
  }

  async get(url, page) {
    const response = await fetch(url + page);
    const resData = await response.json();
    return resData;
  }

  async getDetails(movieID) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${this.key}&language=en-US`);
    const resData = await response.json();

    return resData;
  }
}

export const http = new HTTP();
