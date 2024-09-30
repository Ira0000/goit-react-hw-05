import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

const MovieDetailsPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  return <div>MovieDetailsPage</div>;
};

export default MovieDetailsPage;
