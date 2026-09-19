import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../index.css";

export default function Searchbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${term}&limit=6`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.products || []);
          setOpen(true);
        })
        .catch(() => {
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSeeAll = () => {
    setOpen(false);
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  const handleResultClick = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="header-search" ref={wrapperRef}>
      <div className={`header-search-bar ${open ? "active" : ""}`}>
        <FaSearch className="header-search-icon" />
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setOpen(true)}
        />
        {loading && <span className="header-search-loading">...</span>}
      </div>

      {open && (
        <div className="header-search-results">
          {results.length === 0 && !loading ? (
            <p className="header-search-empty">
              No products found for "{query}"
            </p>
          ) : (
            <>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="header-search-result"
                  onClick={handleResultClick}
                >
                  <img src={product.images[0]} alt={product.title} />
                  <div>
                    <strong>{product.title}</strong>
                    <span>${product.price}</span>
                  </div>
                </Link>
              ))}
              {results.length > 0 && (
                <button
                  type="button"
                  className="header-search-see-all"
                  onClick={handleSeeAll}
                >
                  See all results for "{query.trim()}"
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}