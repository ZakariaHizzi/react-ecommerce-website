import React from "react";
import logo from "../src/img/icon.png";
import { FaHeadset } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div class="big_row">
            <img src={logo} alt="" />
            <div class="hotline">
              <FaHeadset />
              <div class="text">
                <h5>Hotline Free 24/24:</h5>
                <h6>(+100) 123 456 7890</h6>
              </div>
            </div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit
              consectetur.
            </p>
          </div>
          <div class="row">
            <h4>FAQs & Help</h4>
            <div class="links">
              <a href="">F.A.Q.'s</a>
              <a href="">Ordering Tracking Contacts</a>
              <a href="">Events</a>
              <a href="">Help Center</a>
            </div>
          </div>
          <div class="row">
            <h4>Shipping & Delivery</h4>
            <div class="links">
              <a href="">Delivery Information</a>
              <a href=""> Discount</a>
              <a href="">Payment & Shipping</a>
              <a href="">Estimated Delivery</a>
              <a href=""> Time Shipping Guide</a>
            </div>
          </div>
          <div class="row">
            <h4>Information</h4>
            <div class="links">
              <a href="">Popular</a>
              <a href="">Our Services</a>
              <a href=""> Your Account</a>
              <a href=""> Privacy Policy</a>
              <a href="">Terms & Condition</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
