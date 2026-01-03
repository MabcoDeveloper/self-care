import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, setmenuOpened }) => {
  const navLinks = [
    { path: "/", title: "Home" },
    { path: "/collection", title: "Collection" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
  ];
  return (
    <nav className={`${containerStyles}`}>
      {navLinks.map((link) => (
        <NavLink
          onClick={() => setmenuOpened(false)}
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive ? "active-link" : ""
            } p-2.5 px-4  rounded-full capitalize text-sm font-semibold`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
