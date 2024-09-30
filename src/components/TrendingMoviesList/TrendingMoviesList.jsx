import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/api";
import s from "./TrendingMoviesList.module.css";
import Loader from "../Loader/Loader";

const TrendingMoviesList = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  //   if (trendingMovies.length < 0) return <h2>Is loading...</h2>;
  return (
    <>
      <h2 className={s.title}>Trending Today</h2>
      {isLoading && <Loader />}

      <ul className={s.movieList}>
        {trendingMovies?.map((trendingMovie) => (
          <li
            key={trendingMovie.id}
            id={trendingMovie.id}
            className={s.movieItem}
          >
            <Link to={trendingMovie.id.toString()} state={location}>
              <p>{trendingMovie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrendingMoviesList;
