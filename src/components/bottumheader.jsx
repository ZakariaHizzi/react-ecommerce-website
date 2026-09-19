import { Link, useLocation } from "react-router-dom";
import { cartContext } from "../context/contextcategory";
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaBoxOpen,
  FaSignInAlt,
  FaUserPlus,
  FaShoppingCart,
} from "react-icons/fa";
import { useContext } from "react";
import { authContext } from "../context/authcontext";
import Searchbar from "./searchbar";

function Bottumheader() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(authContext);
  const { cartItem } = useContext(cartContext);

  return (
    <div>
      <div className="btm-header">
        <div className="container">
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/products"
              className={`nav-link ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              <FaBoxOpen /> All Products
            </Link>
          </nav>
          <Searchbar />
          <div className="sign-regester">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="btm-auth-link cart-link"
                  title="Cart"
                >
                  <FaShoppingCart />
                  <span className="count">{cartItem.length}</span>
                </Link>
                <span className="btm-user-name">
                  <FaUser />
                  <span>
                    {user.user_metadata?.first_name ||
                      user.user_metadata?.firstName ||
                      user.email?.split("@")[0]}
                  </span>
                </span>
                <button
                  className="btm-logout-btn"
                  onClick={logout}
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btm-auth-link" title="Login">
                  <FaSignInAlt /> Login
                </Link>
                <Link
                  to="/createaccount"
                  className="btm-auth-link"
                  title="Sign Up"
                >
                  <FaUserPlus /> Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bottumheader;
