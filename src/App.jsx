import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./pages /HomePage/HomePage";
import MoviesPage from "./pages /MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages /MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages /NotFoundPage/NotFoundPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
