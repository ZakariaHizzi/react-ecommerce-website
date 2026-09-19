import { Link, useLocation } from "react-router-dom";
import logo from "../img/icon.png";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
} from "react-icons/fa";
import { useContext } from "react";
import { cartContext } from "../context/contextcategory";
import { authContext } from "../context/authcontext";

function Topheader() {
  const { cartItem } = useContext(cartContext);
  const { isAuthenticated } = useContext(authContext);

  return (
    <div className="top-header">
      <div className="container">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div className="header-icons">
          {!isAuthenticated ? (
            <>
              <div className="icon">
                <Link to="/login" title="Login">
                  <FaSignInAlt />
                </Link>
              </div>
              <div className="icon">
                <Link to="/createaccount" title="Sign Up">
                  <FaUserPlus />
                </Link>
              </div>
            </>
          ) : (
            <div className="icon">
              <Link to="/cart">
                <FaShoppingCart />
                <span className="count">{cartItem.length}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topheader;
