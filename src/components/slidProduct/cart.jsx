import { useContext } from "react";
import { cartContext } from "../../context/contextcategory";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaShoppingCart,
  FaLock,
  FaArrowLeft,
} from "react-icons/fa";
import "./product.css";
import Pagetransition from "../pagetransition";
import Footer from "../../footer";
import Header from "../header";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItem, increaseQuantity, decreaseQuantity, deleteitem } =
    useContext(cartContext);
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <Pagetransition>
        <div className="cart-page">
          <div className="container">
            <div className="cart-title">
              <FaShoppingCart />
              <h1>Your Cart</h1>
            </div>

            {cartItem.length === 0 ? (
              <div className="cart-empty">
                <FaShoppingCart />
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart and come back here.</p>
                <Link to="/products" className="btn cart-empty-btn">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="cart-layout">
                <section className="cart-items">
                  <div className="cart-section-title">
                    <h2>
                      Shopping Items ({cartItem.length})
                    </h2>
                  </div>
                  {cartItem.map((item, index) => (
                    <div className="cart-item" key={index}>
                      <Link to={`/products/${item.id}`} className="cart-item-link">
                        <img src={item.images[0]} alt={item.title} />
                      </Link>
                      <div className="cart-item-info">
                        <Link to={`/products/${item.id}`}>
                          <h3>{item.title}</h3>
                        </Link>
                        <span className="cart-item-category">
                          {item.category}
                        </span>
                        <p className="cart-item-price">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="cart-item-right">
                        <div className="cart-quantity-control">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span className="cart-quantity">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <p className="cart-item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          className="cart-item-delete"
                          onClick={() => deleteitem(item.id)}
                          aria-label="Remove item"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </section>

                <aside className="cart-summary">
                  <div className="cart-section-title">
                    <h2>Order Summary</h2>
                  </div>
                  <div className="cart-summary-totals">
                    <div className="cart-total-row">
                      <span>Subtotal</span>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="cart-total-row">
                      <span>Shipping</span>
                      <p>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </p>
                    </div>
                    <div className="cart-total-row">
                      <span>Tax (8%)</span>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="cart-free-shipping">
                    {shipping === 0
                      ? "You earned free shipping!"
                      : `Free shipping on orders over $100`}
                  </p>
                  <div className="cart-grand-total">
                    <span>Total</span>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <button
                    className="cart-checkout-btn"
                    onClick={() => navigate("/checkout")}
                  >
                    <FaLock /> Proceed to Checkout
                  </button>
                  <Link to="/products" className="cart-continue">
                    <FaArrowLeft /> Continue Shopping
                  </Link>
                </aside>
              </div>
            )}
          </div>
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}