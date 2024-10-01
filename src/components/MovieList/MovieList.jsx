import { Link } from "react-router-dom";
import s from "./MovieList.module.css";
import Loader from "../Loader/Loader";

const MovieList = ({ movies, isLoading, isError }) => {
  return (
    <div className={s.moviesWrapper}>
      {isLoading && <Loader />}
      {isError && (
        <h2>
          Something went wrong! <br /> Please try again later!
        </h2>
      )}
      <ul className={s.movieList}>
        {movies?.map((movie) => (
          <li key={movie.id} className={s.movieItem}>
            <Link to={`/movies/${movie.id.toString()}`}>
              <p>
                {movie.title} ({movie.release_date.substring(0, 4)})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
