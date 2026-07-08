import { IoIosMenu, IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../context/contextcategory";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/authcontext";

function Bottumheader() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useContext(authContext);
  const [isCategoryOpen, setisCategoryOpen] = useState(false);

  useEffect(() => {
    setisCategoryOpen(false);
  }, [location]);

  return (
    <div>
      <div className="btm-header">
        <div className="container">
          <nav className="nav">
            <div className="category-nav">
              <div
                className="category-btn"
                onClick={() => {
                  setisCategoryOpen(!isCategoryOpen);
                }}
              >
                <IoIosMenu />
                <p>Browser Category</p>
                <IoMdArrowDropdown />
              </div>
              <div
                className={
                  isCategoryOpen
                    ? "category-nav-list active"
                    : "category-nav-list"
                }
              >
                {categories.map((c) => (
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="sign-regester">
            {isAuthenticated ? (
              <>
                <span className="btm-user-name">
                  <FaUser />
                  <span>{user.user_metadata?.first_name || user.user_metadata?.firstName || user.email?.split("@")[0]}</span>
                </span>
                <button className="btm-logout-btn" onClick={logout} title="Logout">
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btm-auth-link" title="Login">
                  <FaSignInAlt />
                </Link>
                <Link to="/createaccount" className="btm-auth-link" title="Sign Up">
                  <FaUserPlus />
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
