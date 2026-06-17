import { IoIosMenu, IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../context/contextcategory";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

function Bottumheader() {
  const location = useLocation();
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
                  <Link to={`/home/category/${c.slug}`}>{c.name}</Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="sign-regester">
            <Link to="/">
              <FaSignInAlt />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bottumheader;
