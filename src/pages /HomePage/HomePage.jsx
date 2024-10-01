import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../services/api";

const HomePage = () => {
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
    <div>
      <h2 className={s.title}>Trending Today</h2>
      <MovieList
        movies={trendingMovies}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default HomePage;
