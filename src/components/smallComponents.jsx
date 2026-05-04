import { Outlet, useParams, useNavigate, useLocation, useSearchParams, useOutletContext } from "react-router";

/* 4 concepts:
1. Outlet for nested routes
2. UseParams for dynamic route segments
3. Splats (Wildcard routes/ *)
4. Protected routes
5. useNavigate for navigation programmatically
6. useLocation for getting current location
7. useSearchParams for query parameters
8. Outlet property in layout routes
*/
const Home = () => <h1>Home Page</h1>;
const About = () => {
  const outletContext = useOutletContext();
  return (
    <>
      <h1>About Page</h1>
      <h3>Outlet Context value: {outletContext.somePropHere}</h3>
    </>
  );
};

const AuthLayout = () => (
  <>
    <h2>Auth Area</h2>
    <Outlet />
  </>
);

const Login = () => <h1>Login Page</h1>;
const Register = () => <h1>Register Page</h1>;

const ConcertsHome = () => (
  <>
    <h1>Concerts Home Page</h1>;
    <Outlet />
  </>
);
const City = () => {
  const { city } = useParams(); // destructuring the params object. Alternatively, could do const params = useParams(); then params.city
  return (
    <>
      <h1>City Specific Concerts Page for {city}</h1>
    </>
  );
};
const Trending = () => <h1>Trending Concerts Page</h1>;

const Categories = () => {
  const { lang } = useParams();
  return (
    <>
      <h1>
        Categories Page {lang ? `(Language: ${lang})` : "(Default Language)"}
      </h1>
    </>
  );
};

const NotFound = () => {
  const params = useParams();
// SPLATS. params["*"] will contain the remaining URL after files/
const filePath = params["*"];
  return (
    <>
      <h1>404 - Page Not Found for route: {filePath}</h1>
    </>
  );
};  
const ProtectedRoute = ({ children }) => {
  // dummy authentication check
  const { user } = {user:null}; //{user: {username: "testuser"}}; //useAuth(); // however you store authentication
  const navigate = useNavigate();

  if (!user) {
    // replace the current entry in the browser’s history instead of adding a new one.
    navigate("/login", { replace: true });  
  }

  return children;
}

const LocationDisplay = () => {
  // useLocation hook to get current location object and useQueryParams to parse query parameters
  const location = useLocation();
  const [queryParams] = useSearchParams();

  return (
    <>
      <h2>Current Location:</h2>
      <pre>{JSON.stringify(location, null, 2)}</pre> 
      {/* // null and 2 are for pretty-printing */}
      <h2>Query Parameters:</h2>
      <pre>{JSON.stringify(Object.fromEntries(queryParams), null, 2)}</pre>
      <h3>Getting a single query parameter: {queryParams.get("q")}</h3>
    </>
  );
};

export {
  Home,
  About,
  AuthLayout,
  Login,
  Register,
  ConcertsHome,
  City,
  Trending,
  NotFound,
  Categories,
  ProtectedRoute, 
  LocationDisplay,
};
