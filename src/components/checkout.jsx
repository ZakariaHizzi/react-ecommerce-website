import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/contextcategory";
import { authContext } from "../context/authcontext";
import {
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaLock,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import "./slidProduct/product.css";
import Pagetransition from "./pagetransition";
import Footer from "../footer";
import Header from "./header";

export default function Checkout() {
  const { cartItem, clearCart } = useContext(cartContext);
  const { user } = useContext(authContext);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [placed, setPlaced] = useState(false);

  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <>
        <Header />
        <Pagetransition>
          <div className="checkout-page">
            <div className="checkout-success">
              <FaCheckCircle />
              <h1>Order Placed Successfully!</h1>
              <p>
                Thank you for your purchase. A confirmation email has been sent
                to your inbox.
              </p>
              <Link to="/products" className="btn checkout-success-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </Pagetransition>
        <Footer />
      </>
    );
  }

  if (cartItem.length === 0) {
    return (
      <>
        <Header />
        <Pagetransition>
          <div className="checkout-page">
            <div className="checkout-success">
              <FaCheckCircle />
              <h1>Your cart is empty</h1>
              <p>Add some products before heading to checkout.</p>
              <Link to="/products" className="btn checkout-success-btn">
                Browse Products
              </Link>
            </div>
          </div>
        </Pagetransition>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Pagetransition>
        <div className="checkout-page">
          <div className="container">
            <div className="checkout-title">
              <h1>Checkout</h1>
              <p>Complete your purchase with secure payment</p>
            </div>

            <form className="checkout-layout" onSubmit={handlePlaceOrder}>
              <div className="checkout-forms">
                <section className="checkout-section">
                  <div className="checkout-section-title">
                    <FaUser />
                    <h2>Shipping Information</h2>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        defaultValue={
                          user?.user_metadata?.first_name ??
                          user?.user_metadata?.firstName ??
                          ""
                        }
                        required
                      />
                    </div>
                    <div className="checkout-field">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        defaultValue={user?.user_metadata?.last_name ?? ""}
                        required
                      />
                    </div>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field">
                      <label>Email</label>
                      <div className="checkout-input-icon">
                        <FaEnvelope />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          defaultValue={user?.email ?? ""}
                          required
                        />
                      </div>
                    </div>
                    <div className="checkout-field">
                      <label>Phone</label>
                      <div className="checkout-input-icon">
                        <FaPhoneAlt />
                        <input
                          type="tel"
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkout-field">
                    <label>Address</label>
                    <div className="checkout-input-icon">
                      <FaMapMarkerAlt />
                      <input
                        type="text"
                        placeholder="Street address"
                        required
                      />
                    </div>
                  </div>
                  <div className="checkout-row">
                    <div className="checkout-field">
                      <label>City</label>
                      <input type="text" placeholder="City" required />
                    </div>
                    <div className="checkout-field">
                      <label>State / Province</label>
                      <input type="text" placeholder="State" required />
                    </div>
                    <div className="checkout-field">
                      <label>Zip Code</label>
                      <input type="text" placeholder="00000" required />
                    </div>
                  </div>
                </section>

                <section className="checkout-section">
                  <div className="checkout-section-title">
                    <FaCreditCard />
                    <h2>Payment Information</h2>
                  </div>

                  <div className="payment-methods">
                    <button
                      type="button"
                      className={`payment-method ${
                        paymentMethod === "card" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <FaCreditCard /> Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      className={`payment-method ${
                        paymentMethod === "paypal" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <FaCcPaypal /> PayPal
                    </button>
                    <button
                      type="button"
                      className={`payment-method ${
                        paymentMethod === "cod" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <FaMapMarkerAlt /> Cash on Delivery
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="card-details">
                      <div className="accepted-cards">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                        <FaApplePay />
                      </div>
                      <div className="checkout-field">
                        <label>Name on Card</label>
                        <input
                          type="text"
                          placeholder="Full name as on card"
                          required
                        />
                      </div>
                      <div className="checkout-field">
                        <label>Card Number</label>
                        <div className="checkout-input-icon">
                          <FaCreditCard />
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCardNumber(e.target.value))
                            }
                            maxLength="19"
                            required
                          />
                        </div>
                      </div>
                      <div className="checkout-row">
                        <div className="checkout-field">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) =>
                              setExpiry(formatExpiry(e.target.value))
                            }
                            maxLength="5"
                            required
                          />
                        </div>
                        <div className="checkout-field">
                          <label>CVV</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) =>
                              setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                            }
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>
                      <p className="secure-note">
                        <FaLock /> Your payment information is encrypted and
                        securely processed.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <p className="paypal-note">
                      You will be redirected to PayPal after placing your order
                      to complete the payment securely.
                    </p>
                  )}

                  {paymentMethod === "cod" && (
                    <p className="paypal-note">
                      Pay cash when your order is delivered to your door. Please
                      have the exact amount ready.
                    </p>
                  )}
                </section>
              </div>

              <aside className="checkout-summary">
                <div className="checkout-section-title">
                  <h2>Order Summary</h2>
                </div>
                <div className="checkout-summary-items">
                  {cartItem.map((item, index) => (
                    <div className="checkout-summary-item" key={index}>
                      <img src={item.images[0]} alt="" />
                      <div className="checkout-summary-info">
                        <p className="checkout-summary-name">{item.title}</p>
                        <span>
                          {item.quantity} x ${item.price}
                        </span>
                      </div>
                      <p className="checkout-summary-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary-totals">
                  <div className="checkout-total-row">
                    <span>Subtotal</span>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="checkout-total-row">
                    <span>Shipping</span>
                    <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                  </div>
                  <div className="checkout-total-row">
                    <span>Tax (8%)</span>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="checkout-total-row checkout-grand-total">
                    <span>Total</span>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                <button type="submit" className="checkout-place-order">
                  <FaLock /> Place Order
                </button>
                <Link to="/cart" className="back-to-cart">
                  Back to Cart
                </Link>
              </aside>
            </form>
          </div>
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}