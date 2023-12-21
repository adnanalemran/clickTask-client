import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
function validatePassword(password) {
  if (
    password.length < 6 ||
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/.test(password)
  ) {
    return "Password must be at least 6 characters long, contain at least one uppercase letter, and have at least one special character.";
  }

  return "";
}
const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Sign up success",
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult) {
      setPasswordError(passwordValidationResult);
      return;
    }

    const form = e.target;
    const displayName = form.displayName.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    console.log(displayName);

    createUser(email, password)
      .then((result) => {
        result.user.displayName = displayName;
        result.user.photoURL = photoURL;
        const uId = result.user.uid;

        const user = {
          uid: uId,
          email,
          photoURL,
          displayName,
          password,
        };

        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            showSuccessAlert();
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            console.log(error);
            showErrorAlert(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          showErrorAlert("This Email already Registered");
        } else {
          showErrorAlert(error.message);
        }
      });
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
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
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-400">Your name</label>
              <input
                type="text"
                name="displayName"
                id="name"
                placeholder="name"
                className="w-full  border px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-400">Your Photo Url</label>
              <input
                type="text"
                name="photoURL"
                placeholder="Photo Url"
                className="w-full border  px-4 py-3 rounded-md dark:border-gray-700 dark.bg-gray-900 dark:text-gray-100 focus:dark-border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                id="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded-md dark:border-gray-700 dark.bg-gray-900 dark:text-gray-100 focus:dark-border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block dark:text-gray-400">Password</label>
              <input
                value={password}
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 border py-3 rounded-md dark.border-gray-700 dark.bg-gray-900 dark.text-gray-100 focus:dark-border-violet-400"
                required
              />
              {passwordError && (
                <p className="text-yellow-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button className="block w-full p-3 text-center rounded-xl dark.text-gray-900 dark.bg-violet-400 btn btn-primary">
              Sign Up
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
