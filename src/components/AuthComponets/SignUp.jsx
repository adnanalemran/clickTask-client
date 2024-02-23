import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { updateProfile } from "firebase/auth";

function validatePassword(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const uId = "";

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

  const apiKey = "9f08f7ece0aaed8c925a5019a754f3e5";
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordValidationResult = validatePassword(password);

    if (passwordValidationResult) {
      setPasswordError(passwordValidationResult);
      return;
    }

    const form = e.target;
    const displayName = form.displayName.value;
    const photoURL = form.photoURL.files[0];

    const imageFile = new FormData(); // Create FormData object for file upload
    imageFile.append("image", photoURL);

    try {
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      createUser(email, password)
        .then((result) => {
          const currentUser = result.user;
          result.user.displayName = displayName;
          result.user.photoURL = res.data?.data?.display_url;

          updateProfile(currentUser, {
            displayName: displayName,
            photoURL: res.data?.data?.display_url,
          })
            .then(() => {
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
                  setLoading(false);
                  navigate(location?.state ? location.state : "/");
                })
                .catch((error) => {
                  console.log(error);
                  setLoading(false);
                  showErrorAlert(error.message);
                });
            })
            .catch((error) => {
              console.log(error);
              if (error.code === "auth/email-already-in-use") {
                setLoading(false);
                showErrorAlert("This Email already Registered");
              } else {
                setLoading(false);
                showErrorAlert(error.message);
              }
            });
        })
        .catch((error) => {
          setLoading(false);
          showErrorAlert(error.message);
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
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
        className="py-8  min-h-screen   "
      >
        <div className=" bg-[#8981D7] w-full  mx-auto max-w-md p-8 py-16 space-y-3 rounded-xl border my-5  ">
          <h1 className="text-2xl font-bold text-center pb-2 ">Sign Up</h1>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label className="block ">Your name</label>
              <input
                type="text"
                name="displayName"
                id="name"
                placeholder="name"
                className="w-full  border px-4 py-3 rounded-md    "
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block ">Your Photo Url</label>
              <input
                type="file"
                name="photoURL"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block  ">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                id="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded-md  "
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block  ">Password</label>
              <div className="relative">
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 border py-3 rounded-md dark.border-gray-700 dark.bg-gray-900 dark.text-gray-100 focus:dark-border-violet-400"
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
              {passwordError && (
                <p className="text-yellow-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <button    disabled={loading} className="block w-full p-3 text-center rounded-xl dark.text-gray-900 dark.bg-violet-400 btn btn-primary">
            {loading ? "processing your application" : "Sign up"}

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
