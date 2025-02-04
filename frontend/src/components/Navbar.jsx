import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="h-14 bg-purple-950 flex justify-between items-center px-4 relative">

      <div className="flex items-center gap-4">
        {userData && (
          <button
            className="text-white text-2xl focus:outline-none "
            onClick={toggleMenu}
          >
            ☰
          </button>
        )}
        <h1 className="text-xl font-bold text-white">TOUR PACKAGE CALCULATOR</h1>
      </div>

      
    <div className="flex gap-6 items-center">
        {userData ? (
          <div className="dropdown dropdown-end hidden md:flex">
            <Link
              to="/profile"
              tabIndex={0}
              role="button"
              className="btn btn-white btn-circle avatar-placeholder"
            >
              <div className="text-purple-950 font-bold w-10 h-10 flex items-center justify-center rounded-full bg-white">
                <span className="text-xl">
                  {userData.userData.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <Link
            className="text-white hover:border-b-4 hover:border-white hover:transition-transform py-4"
            to="/login"
          >
            Signin
          </Link>
        )}
      </div>

      {menuOpen && userData && (
        <div
          data-aos="fade-right"
          className="absolute top-14 left-0 w-full bg-purple-950 flex flex-col items-start p-4 z-50 shadow-md "
          onClick={() => setMenuOpen(false)}
        >
          <Link
            className="text-white hover:border-b-2 hover:border-white hover:transition-transform py-2 w-full"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-white hover:border-b-2 hover:border-white hover:transition-transform py-2 w-full"
            to="/agent"
          >
            Agents
          </Link>
          <Link
            className="text-white hover:border-b-2 hover:border-white hover:transition-transform py-2 w-full"
            to="/service"
          >
            Services
          </Link>
          <Link
            className="text-white hover:border-b-2 hover:border-white hover:transition-transform py-2 w-full"
            to="/"
          >
            Agents
          </Link>
          <Link
            className="text-white hover:border-b-2 md:hidden hover:border-white hover:transition-transform py-2 w-full"
            to="/profile"
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

