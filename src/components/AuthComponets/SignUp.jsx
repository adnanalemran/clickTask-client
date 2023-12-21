import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
          backgroundSize: "cover",
        }}
        className="py-8  min-h-screen"
      >
        <div className=" bg-[#8981D7] w-full  mx-auto max-w-md p-8 py-16 space-y-3 rounded-xl border my-5  ">
          <h1 className="text-2xl font-bold text-center pb-2  text-white">
            Sign Up
          </h1>
          <form
            className="space-y-6 "
            // onSubmit={handleLogin}
          >
            <div className="space-y-1 text-sm">
              <label className="block  text-white">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block  text-white ">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
              />
            </div>
            <button className="block w-full p-3 text-center rounded-xl dark:text-gray-900 dark:bg-violet-400 btn btn-primary">
              Sign in
            </button>
          </form>

          <p className="text-sm text-center sm:px-6 dark:text-gray-400">
            You have an account?
            <Link
              rel="noopener noreferrer"
              to="/signIn"
              className="underline px-2 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
