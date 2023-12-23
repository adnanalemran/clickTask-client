import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import "./header.css";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const [dbuser, setDbuser] = useState(null);
  console.log(user?.uid);
  useEffect(() => {
    axios
      .get(`https://click-task-server.vercel.app/user/${user?.uid}`)

      .then((res) => {
        setDbuser(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.uid]);

  const displayName = user?.displayName || dbuser?.displayName;
  const displayPhotoURL = dbuser?.photoURL || user?.photoURL;
  console.log(displayName);
  const handleSignOut = async () => {
    try {
      await logOut();
      toast.info("You are just log out ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const menu = (
    <>
      <li className="flex">
        <NavLink to="/" className="flex items-center px-8 py-3 font-semibold  ">
          Home
        </NavLink>
      </li>
      <li className="flex">
        <NavLink
          to="/Dashboard/task"
          className="flex items-center px-8 py-3  font-semibold  "
        >
          My task
        </NavLink>
      </li>{" "}
      <li className="flex">
        <NavLink
          to="/Dashboard/Taskdrop"
          className="flex items-center px-8 py-3  font-semibold  "
        >
          task (Beta)
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-[#8981D7] ">
      <div className="navbar  text-white container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52 bg-[#8981D7]"
            >
              {menu}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold">
            Click Task{" "}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{menu}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <ul className="menu menu-horizontal px-1 flex  items-center justify-center">
                <li tabIndex={0}>
                  <summary>
                    <label
                      tabIndex={0}
                      className="btn btn-ghost  btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img src={displayPhotoURL} alt={displayName} />
                      </div>
                    </label>
                    <p className="hidden md:grid">{displayName}</p>
                  </summary>
                </li>
                <li>
                  <button onClick={handleSignOut}>Log Out</button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/signIn">Login</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
