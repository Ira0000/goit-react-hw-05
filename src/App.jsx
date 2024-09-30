import Header from "./components/Header/Header";
import HomePage from "./pages /HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import MoviesPage from "./pages /MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages /MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages /NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
