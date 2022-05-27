import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Join from "./Pages/Join";
import ViewUsers from "./Pages/ViewUsers";

// Utils
import { backendAPI } from "./lib/backend";
import { useEffect, useState } from "react";

function App() {
  const [authenticating, setAuthenticating] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const handleSignout = async (e) => {
    try {
      e.preventDefault();
      await backendAPI.get("/users/signout");
    } catch (error) {
      console.log("error", error);
    } finally {
      setUsername("");
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const _getMe = async () => {
      try {
        const { data } = await backendAPI.get("/users/me");
        setUsername(data.username);
        setAuthenticated(true);
        console.log(data);
      } catch (error) {
        console.log("error: ", error);
        setUsername("");
        setAuthenticated(false);
      } finally {
        setAuthenticating(false);
      }
    };
    _getMe();
  }, []);

  return (
    <div className="App bg-slate-50 min-h-screen w-full">
      <div className="flex justify-between items-center bg-slate-100 w-full">
        <nav className="flex space-x-32 items-center py-3 px-10  bg-slate-100 filter shadow-sm w-full">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-48"
              viewBox="0 0 700.275 136.878"
            >
              <g id="Group_2210" transform="translate(-93.449 -38.762)">
                <g id="logo192" transform="translate(93.449 38.762)">
                  <path
                    id="Rectangle_1078"
                    d="M225,618.027l53.756-29,53.756,29-53.756,28.355Z"
                    transform="translate(-212.638 -589.026)"
                    fill="#fd7382"
                  />
                  <path
                    id="Rectangle_1078-2"
                    d="M207.427,713.453l-.385-58.237,55.794,29.758V746.53Z"
                    transform="translate(-207.041 -609.651)"
                    fill="#4be6c9"
                  />
                  <path
                    id="Rectangle_1078-3"
                    d="M318.092,684.974l55.793-29.758-.386,58.237L318.092,746.53Z"
                    transform="translate(-241.647 -609.651)"
                    fill="#7c49e9"
                  />
                </g>
                <text
                  id="MeshuwebDEV"
                  transform="translate(260.725 144.152)"
                  fill="#060b43"
                  fontSize="69"
                  fontFamily="Poppins-Black, Poppins"
                  fontWeight="800"
                >
                  <tspan x="0" y="0">
                    Meshu
                  </tspan>
                  <tspan
                    y="0"
                    fontFamily="Poppins-Light, Poppins"
                    fontWeight="300"
                  >
                    web
                  </tspan>
                  <tspan y="0">DEV</tspan>
                </text>
                <g
                  id="Group_2204"
                  transform="translate(656.483 73.152)"
                  opacity="0.8"
                >
                  <rect
                    id="Rectangle_1076"
                    width="32.796"
                    height="11.478"
                    transform="translate(0 0)"
                    fill="#4be6c9"
                  />
                  <rect
                    id="Rectangle_1077"
                    width="32.796"
                    height="11.478"
                    transform="translate(50.833 0)"
                    fill="#7c49e9"
                  />
                  <rect
                    id="Rectangle_1078-4"
                    width="32.796"
                    height="11.478"
                    transform="translate(101.666 0)"
                    fill="#fd7382"
                  />
                </g>
              </g>
            </svg>
          </div>
          <ul className="flex uppercase font-semibold space-x-10 pt-1 items-center justify-center text-black">
            <Link to="/">Home</Link>
            <Link to="/view-users">View users</Link>
          </ul>
        </nav>
        {authenticated && (
          <div className="flex justify-center items-center space-x-4 px-10">
            <span className="text-sm font-medium text-violet-700">
              {username}
            </span>
            <button
              onClick={handleSignout}
              className="text-sm rounded-md bg-violet-700 text-white px-2.5 py-1 flex justify-center items-center space-x-4"
            >
              <span className="whitespace-nowrap">Sign-out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="container px-32 pt-24 flex justify-center items-center">
        <Routes>
          <Route
            path="/"
            element={
              <Join
                setUsername={setUsername}
                setAuthenticated={setAuthenticated}
                username={username}
                authenticated={authenticated}
                authenticating={authenticating}
              />
            }
          />
          <Route
            path="/view-users"
            element={<ViewUsers authenticated={authenticated} />}
          />
          <Route
            path="/*"
            element={
              <Join
                setUsername={setUsername}
                setAuthenticated={setAuthenticated}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
