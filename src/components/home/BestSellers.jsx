import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Products from "../slidProduct/products";
import { FaArrowRight } from "react-icons/fa";

function BestSellers({ products }) {
  return (
    <section className="best-sellers section">
      <div className="container">
        <motion.div
          className="section-header best-sellers-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2>Best Sellers</h2>
            <p>Top-rated products picked just for you.</p>
          </div>
          <Link to="/products" className="btn view-all-btn">
            View All <FaArrowRight />
          </Link>
        </motion.div>
        <div className="best-sellers-grid">
          {products.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <Products item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;