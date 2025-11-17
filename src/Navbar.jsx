import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { loadCartData } from "./service/allApi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[value,setValue] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
  };

  useEffect(() => {
    const data = localStorage.getItem('cartValue')
  setValue(data)
  console.log(data)
}, [])

  return (
    <div className="navbar">
      <div className="nav-brand">
        <MdOutlineShoppingCart />
        <span>QuickKart</span>
      </div>

      <div
        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
          <CiHome />
          <span>
            <Link to={"/"} style={{ textDecoration: "none", color: "wheat" }}>
              Home
            </Link>
          </span>
        </li>
        <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
          <FaRegUser />
          <span>
            <Link
              to={"/admin"}
              style={{ textDecoration: "none", color: "wheat" }}
            >
              Admin Panel
            </Link>
          </span>
        </li>
        <li className="nav-item" onClick={() => setIsMenuOpen(false)}>
          <CiShoppingCart />
          <span>
            <Link
              to={"/cart"}
              style={{ textDecoration: "none", color: "wheat" }}
            >
              <Badge badgeContent={value} color="warning">
              Cart
              </Badge>
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
