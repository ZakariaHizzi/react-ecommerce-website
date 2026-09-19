import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStore } from "react-icons/fa";

function HomeHero() {
  const scrollToCategories = () => {
    document
      .getElementById("featured-categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="home-hero">
      <div className="container">
        <div className="home-hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaStore /> Fresh Collection 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Discover Quality Products, <span>Delivered Fast</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Explore handpicked products across laptops, smartphones, fashion and
            more — all in one place, with secure checkout and fast delivery.
          </motion.p>
          <motion.div
            className="home-hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link to="/products" className="btn hero-cta">
              Shop All Products <FaArrowRight />
            </Link>
            <button
              type="button"
              className="btn hero-ghost"
              onClick={scrollToCategories}
            >
              Browse Categories
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;