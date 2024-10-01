import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import s from "./MovieReviews.module.css";
import { fetchMovieReviewsById } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsError(false);

        const data = await fetchMovieReviewsById(movieId);
        setReviews(data);
      } catch {
        setIsError(true);
      }
    };

    fetchReviews();
  }, [movieId]);
  if (!reviews) return <Loader />;
  return (
    <div>
      <h3 className={s.reviewTitle}>Movie Reviews</h3>
      {isError && (
        <h2>
          Something went wrong! <br /> Please try again later!
        </h2>
      )}
      {reviews.length != 0 ? (
        <ul className={s.reviewList}>
          {reviews?.map((review) => (
            <li key={review.id} className={s.review}>
              <p className={s.reviewAuthor}>Author: {review.author}</p>
              <p className={s.reviewText}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h3>There are no reviews yet!</h3>
      )}
    </div>
  );
};

export default MovieReviews;
