import { useParams } from "react-router-dom";
import { fetchMovieCastById } from "../../services/api";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isError, setIsError] = useState(false);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsError(false);
        const data = await fetchMovieCastById(movieId);
        setCast(data);
      } catch {
        setIsError(true);
      }
    };

    fetchCast();
  }, [movieId]);
  if (!cast) return <Loader />;
  return (
    <div>
      <h3 className={s.castTitle}>Movie Cast</h3>
      {isError && (
        <h2>
          Something went wrong! <br /> Please try again later!
        </h2>
      )}
      <ul className={s.castList}>
        {cast.slice(0, 5)?.map((member) => (
          <li key={member.id} className={s.castMember}>
            <img
              className={s.memberImg}
              width={60}
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                  : defaultImg
              }
              alt={member.name}
            />
            <p className={s.memberName}>{member.name}</p>
            <p className={s.characterName}>Character: {member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
