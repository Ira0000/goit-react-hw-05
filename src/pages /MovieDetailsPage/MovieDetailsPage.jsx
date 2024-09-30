import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  // console.log(movieId);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
        // console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  if (!movie) return <Loader />;
  const movieReleaseYear = movie.release_date.substring(0, 4);
  const movieScore = Math.round(movie.vote_average * 10);
  return (
    <div className={s.pageWrapper}>
      <button type="button" className={s.returnBtn}>
        Go Back
      </button>
      {isLoading && <Loader />}
      <div className={s.movieDetailsWrapper}>
        <div className={s.infoWrapper}>
          <div className={s.imgWrapper}>
            <img
              className={s.moviePoster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className={s.movieDetails}>
            <h2 className={s.movieTitle}>
              {movie.title} ({movieReleaseYear})
            </h2>
            <p className={s.userScore}>User score: {movieScore}%</p>
            <p>Overview: {movie.overview} </p>
            <ul className={s.genresList}>
              Genres:
              {movie.genres?.map((genre) => (
                <li key={genre.id} className={s.genreItemName}>
                  {genre.name}
                </li>
              ))}
            </ul>
            <div className={s.additionalInfoLinks}>
              <h3>Additional info</h3>
              <div className={s.links}>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
