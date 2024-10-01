import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchMovies, setSearchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");

  const initialValues = {
    query: "",
  };
  const handleSubmit = (values) => {
    console.log(values.query);
    setQuery(values.query);
    // handleChangeQuery(values.query);
  };
  // const query = searchParams.get("query") ?? "";
  // const handleChangeQuery = (newQuery) => {
  //   if (!newQuery) {
  //     return setSearchParams({});
  //   }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMoviesByQuery(query);
        setSearchMovies(data);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  //   searchParams.set("query", newQuery);
  //   setSearchParams(searchParams);
  // };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
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
