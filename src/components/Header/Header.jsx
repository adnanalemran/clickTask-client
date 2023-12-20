import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css"
const Header = () => {
  const menu = (
    <>
      <li className="flex">
        <NavLink
          to="/"
          className="flex items-center px-8 py-3 mb-1 font-semibold  "
        >
          Home
        </NavLink>
      </li>
      <li className="flex">
        <NavLink
          to="/All-Contest"
          className="flex items-center px-8 py-3 mb-1 font-semibold  "
        >
          About
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-[#8981D7]">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
           {menu}
            </ul>
          </div>
          <a className="text-2xl font-bold">Click Task </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
          {menu}
          </ul>
        </div>
        <div className="navbar-end">user inffo</div>
      </div>
    </div>
  );
};

export default Header;
