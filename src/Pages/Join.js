import React, { useState } from "react";

// Utils
import { backendAPI } from "../lib/backend";

const Join = ({
  setUsername,
  setAuthenticated,
  authenticated,
  username,
  authenticating,
}) => {
  const [type, setType] = useState("signin");
  const [data, setData] = useState({
    username: "",
    password: "",
    "confirm-password": "",
  });
  const [errors, setErrors] = useState([]);

  const handleSignup = async () => {
    try {
      const response = await backendAPI.post("/users/signup", data);
      setUsername(response.data.username);
      setAuthenticated(true);
    } catch (error) {
      setErrors([error.response.data.errors]);
      console.log("error", error);
    }
  };

  const handleSignin = async () => {
    try {
      delete data["confirm-password"];
      const response = await backendAPI.post("/users/signin", data);
      setUsername(response.data.username);
      setAuthenticated(true);
    } catch (error) {
      setErrors([error.response.data.errors]);
      console.log("error", error);
    }
  };

  if (authenticating) return `Checking authentication... ⌛`;
  if (authenticated) return `Welcome ${username}! ✨`;

  return (
    <div className="bg-slate-100 shadow-sm">
      {type === "signin" && (
        <Signin
          setType={setType}
          data={data}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
          handleSignin={handleSignin}
        />
      )}
      {type === "signup" && (
        <Signup
          setType={setType}
          data={data}
          setData={setData}
          errors={errors}
          setErrors={setErrors}
          handleSignup={handleSignup}
        />
      )}
    </div>
  );
};

export default Join;

const Signup = ({
  setType,
  data,
  setData,
  errors,
  setErrors,
  handleSignup,
}) => {
  return (
    <div className="py-8 px-24 flex flex-col space-y-10 justify-center relative">
      <h1 className="text-3xl font-bold uppercase self-center">Sign-up</h1>

      <form className="flex flex-col space-y-5 justify-center items-start">
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="username" className="text-sm leading-none">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="rounded-md p-1"
            value={data.username}
            onChange={(e) =>
              setData({
                [e.target.name]: e.target.value,
                "confirm-password": data["confirm-password"],
                password: data.password,
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="password" className="text-sm leading-none">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="rounded-md p-1"
            value={data.password}
            onChange={(e) =>
              setData({
                username: data.username,
                "confirm-password": data["confirm-password"],
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="confirm-password" className="text-sm leading-none">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required
            className="rounded-md p-1"
            value={data["confirm-password"]}
            onChange={(e) => {
              setData({
                username: data.username,
                password: data.password,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="rounded-md self-end bg-violet-900 shadow-sm py-0.5 px-3.5 text-white"
        >
          Sign up
        </button>
        {errors &&
          errors.map((e, i) => (
            <span className="text-xs text-red-600 font-light max-w-xs" key={i}>
              {e}
            </span>
          ))}
      </form>
      <span className="absolute -bottom-5 right-1 transform text-xs  whitespace-nowrap">
        Already have an account?{" "}
        <span
          className="font-medium text-violet-800 hover:underline hover:cursor-pointer"
          onClick={() => setType("signin")}
        >
          Sign-in here
        </span>
      </span>
    </div>
  );
};

const Signin = ({
  setType,
  data,
  setData,
  errors,
  setErrors,
  handleSignin,
}) => {
  return (
    <div className="py-8 px-24 flex flex-col space-y-10 justify-center relative">
      <h1 className="text-3xl font-bold uppercase self-center">Sign-in</h1>

      <form className="flex flex-col space-y-5 justify-center items-start">
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="username" className="text-sm leading-none">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            required
            className="rounded-md p-1"
            value={data.username}
            onChange={(e) =>
              setData({
                [e.target.name]: e.target.value,
                "confirm-password": data["confirm-password"],
                password: data.password,
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label htmlFor="password" className="text-sm leading-none">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="rounded-md p-1"
            value={data.password}
            onChange={(e) =>
              setData({
                username: data.username,
                "confirm-password": data["confirm-password"],
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignin();
          }}
          className="rounded-md self-end bg-violet-900 shadow-sm py-0.5 px-3.5 text-white"
        >
          Sign in
        </button>
        {errors &&
          errors.map((e, i) => (
            <span className="text-xs text-red-600 font-light max-w-xs" key={i}>
              {e}
            </span>
          ))}
      </form>
      <span className="absolute -bottom-5 right-1 transform text-xs whitespace-nowrap">
        Don't have an account?{" "}
        <span
          className="font-medium text-violet-800 hover:underline hover:cursor-pointer"
          onClick={() => setType("signup")}
        >
          Sign-up here
        </span>
      </span>
    </div>
  );
};
