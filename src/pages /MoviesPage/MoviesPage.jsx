import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialValues = {
    query: "",
  };
  const handleSubmit = (values) => {
    handleChangeQuery(values.query);
  };

  const query = searchParams.get("query") ?? "";
  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        if (!query) return;
        const data = await fetchMoviesByQuery(query);
        setSearchMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.searchForm}>
          <Field name="query" className={s.searchField} />
          <hr className={s.line} />
          <button type="submit" className={s.searchBtn}>
            <FaMagnifyingGlass className={s.searchIcon} />
          </button>
        </Form>
      </Formik>

      <MovieList
        movies={searchMovies}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default MoviesPage;
