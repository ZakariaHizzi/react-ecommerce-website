import React, { useContext } from "react";
import {
  FaStar,
  FaCartArrowDown,
  FaRegHeart,
  FaShare,
  FaCheck,
} from "react-icons/fa";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../context/contextcategory";
import { authContext } from "../../context/authcontext";
import toast from "react-hot-toast";

function Products({ item, categoty }) {
  const navigate = useNavigate();
  const { cartItem, addItem } = useContext(cartContext);
  const { isAuthenticated } = useContext(authContext);

  const isincart = cartItem.some((i) => i.id === item.id);
  const hundelAddItem = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addItem(item);
    toast.success(
      <div className="toast-wapper">
        <img src={item.images[0]} alt="" />
        <div className="toast-content">
          <strong>{item.title}</strong>
          added to cart
        </div>{" "}
        <button className="btn" onClick={() => navigate("/cart")}>
          View in cart
        </button>
      </div>,
      { duration: 2000 },
    );
  };
  return (
    <div className={`product ${isincart ? "incart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        {isincart ? (
          <span className="status">
            <FaCheck /> in cart
          </span>
        ) : (
          <></>
        )}
        <div className="img-product">
          <img src={item.images[0]} alt="" />
        </div>
        <p className="name-product">{item.description}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p className="price">{item.price}$</p>
      </Link>
      <div className="icons">
        <span
          onClick={() => {
            hundelAddItem(item);
          }}
          className="btncart"
        >
          <FaCartArrowDown />
        </span>
        <span>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default Products;
