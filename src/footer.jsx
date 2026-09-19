import React from "react";
import { Link } from "react-router-dom";
import logo from "../src/img/icon.png";
import { categories } from "./context/contextcategory";
import {
  FaHeadset,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h3>Stay in the loop</h3>
            <p>Subscribe for new arrivals and exclusive offers.</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" required />
            <button className="btn newsletter-btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <p className="brand-desc">
              Your one-stop shop for quality products with fast delivery, secure
              payment and 24/7 support.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Youtube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <div className="footer-links">
              {categories.map((c) => (
                <Link key={c.slug} to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Customer Service</h4>
            <div className="footer-links">
              <Link to="/products">All Products</Link>
              <Link to="/cart">Your Cart</Link>
              <a href="#">F.A.Q.'s</a>
              <a href="#">Order Tracking</a>
              <a href="#">Help Center</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Information</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <a href="#">Delivery Information</a>
              <a href="#">Payment & Shipping</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 MyShop. All rights reserved.</p>
          <div className="footer-payments">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaApplePay />
          </div>
        </div>
      </div>
    </footer>
  );
}
