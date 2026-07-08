import { Link, useLocation } from "react-router-dom";
import logo from "../img/icon.png";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoIosMenu, IoMdCloseCircleOutline } from "react-icons/io";
import { useContext, useState } from "react";
import { cartContext } from "../context/contextcategory";
function Topheader() {
  const { cartItem } = useContext(cartContext);
  const [left, setleft] = useState("-500px");
  const navliks = [
    { title: "Home", link: "/home" },
    { title: "About", link: "/About" },
    { title: "accessories", link: "/accessories" },
    { title: "Blog", link: "/Blog" },
    { title: "contact", link: "/contact" },
  ];

  const location = useLocation();

  return (
    <div className="top-header">
      <div className="container">
        <div
          className="menu"
          onClick={() => {
            setleft("0px");
          }}
        >
          <IoIosMenu />
        </div>

        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div
          className="nav-links"
          style={{
            left: `${left}`,
          }}
        >
          <div
            className="close-menu"
            onClick={() => {
              setleft("-500px");
            }}
          >
            <IoMdCloseCircleOutline />
          </div>

          {navliks.map((c) => (
            <li className={location.pathname === c.link ? "active" : ""}>
              <Link to={"/"}>{c.title}</Link>
            </li>
          ))}
        </div>
        <div className="header-icons">
          <div className="icon">
            <FaRegHeart />
            <span className="count">0</span>
          </div>

          <div className="icon">
            <Link to="/cart">
              <FaShoppingCart />
              <span className="count">{cartItem.length}</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Topheader;
