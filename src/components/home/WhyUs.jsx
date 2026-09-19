import { motion } from "motion/react";
import { FaTruck, FaCreditCard, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: FaTruck,
    title: "Fast Shipping",
    text: "Free delivery on orders over $50, right to your door.",
  },
  {
    icon: FaCreditCard,
    title: "Secure Payment",
    text: "Multiple secure payment options with full protection.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    text: "Our friendly support team is here for you anytime.",
  },
];

function WhyUs() {
  return (
    <section className="why-us section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Shop With Us</h2>
          <p>A seamless experience from checkout to your doorstep.</p>
        </motion.div>
        <div className="why-us-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className="why-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <span className="why-icon">
                  <Icon />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;