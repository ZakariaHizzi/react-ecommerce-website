import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

function FeaturedCategories({ categories }) {
  return (
    <section className="featured-categories section" id="featured-categories">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Categories</h2>
          <p>Shop by category and find exactly what you need.</p>
        </motion.div>
        <div className="categories-grid">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              className="category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <Link to={`/category/${c.slug}`} className="category-card-link">
                <div className="category-card-img">
                  {c.image ? (
                    <img src={c.image} alt={c.name} loading="lazy" />
                  ) : null}
                </div>
                <div className="category-card-info">
                  <h3>{c.name}</h3>
                  <span className="category-card-view">
                    View category <FaArrowRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;