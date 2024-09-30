import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/api";
import s from "./MovieList.module.css";
import Loader from "../Loader/Loader";

const MovieList = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
        // console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className={s.trendingMoviesWrapper}>
      <h2 className={s.title}>Trending Today</h2>
      {isLoading && <Loader />}

      <ul className={s.movieList}>
        {trendingMovies?.map((trendingMovie) => (
          <li
            key={trendingMovie.id}
            // id={trendingMovie.id}
            className={s.movieItem}
          >
            <Link to={`/movies/${trendingMovie.id.toString()}`}>
              <p>{trendingMovie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
