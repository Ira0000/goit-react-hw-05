import axios from "axios";

const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/day";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzc0NDAyMjNlNGMzYzNiMTBkZDJlN2IzNGExYjJhZCIsIm5iZiI6MTcyNzYzMTU5OC45OTA1NTIsInN1YiI6IjY2Zjk4NWNhMjcxMjAwNDkyZWNjNWY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gVun2KU4JEOdueGjH3Up9_SWCXyu6M8a25gG6fFXR_M",
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(trendingMoviesUrl, options);
  return data.results;
};

export const fetchMovieById = async (movieId) => {
  const movieByIdUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const { data } = await axios.get(movieByIdUrl, options);
  return data;
};
