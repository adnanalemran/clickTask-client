import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  
  const { signIn } = useContext(AuthContext);
  const showErrorAlert = (error) => {
    Swal.fire({
      icon: "error",
      title: "login unsuccessful ",
      text: "Email or password is incorrect.",
    });
  };

  const { googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
      })

      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "login unsuccessful",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signIn(email, password)
      .then((result) => {
        console.log(result);
        navigate(location?.state ? location.state : "/");
      })

      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-login-credentials") {
          showErrorAlert("Email or password is incorrect.");
        } else {
          showErrorAlert(error.message);
        }
      });
  };

  return (
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
          Sign In
        </h1>
        <form className="space-y-6 " onSubmit={handleLogin}>
          <div className="space-y-1 text-sm">
            <label className="block  text-white">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-md   "
            />
          </div>
          <div className="space-y-1 text-sm">
              <label className="block text-white ">Password</label>
              <div className="relative">
                <input
               
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 border py-3 rounded-md  focus:dark-border-violet-400"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
               
            </div>
          <button className="block w-full p-3 text-center rounded-xl   btn ">
            Sign in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1   bg-gray-300"></div>
          <p className="px-3 text-sm text-white ">
            Login with social accounts
          </p>
          <div className="flex-1   bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleGoogleSignIn}
            aria-label="Log in with Google"
            className="  w-full    btn  gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p className=""> sign in with google</p>
          </button>
        </div>
        <p className="text-sm text-center sm:px-6 text-white  ">
          Don"t have an account?
          <Link
            rel="noopener noreferrer"
            to="/signUp"
            className="underline px-2 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
