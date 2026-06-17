/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../../footer";
import "./product.css";
import { TiShoppingCart } from "react-icons/ti";
import { FaStar, FaRegHeart, FaShare } from "react-icons/fa";
import { cartContext } from "../../context/contextcategory";
import toast from "react-hot-toast";
import Pagetransition from "../pagetransition";
import Productdetailsloading from "./productdetailsloading";

function ProductsDetails() {
  const { addItem, cartItem } = useContext(cartContext);
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/" + id);
        const data = await res.json();
        setproduct(data);
        setloading(false);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchProduct();
  }, [id]);
  const navigate = useNavigate();
  var isincart = "";
  if (product) {
    isincart = cartItem.some((i) => i.id === product.id);
  }
  const hundelAddItem = (item) => {
    addItem(item);
    toast.success(
      <div className="toast-wapper">
        <img src={item.images[0]} alt="" />
        <div className="toast-content">
          <strong>{item.title}</strong>
          added to cart
        </div>
        <button className="btn" onClick={() => navigate("/home/cart")}>
          View in cart
        </button>
      </div>,
      { duration: 2000 },
    );
  };
  if (loading) return <Productdetailsloading />;
  return (
    <>
      <Header />
      <Pagetransition>
        <div>
          <div className="item-details">
            <div className="container">
              <div className="images-item">
                <div className="big-img">
                  <img id="big-img" src={product.images[0]} alt="" />
                </div>
                <div className="sm-images">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => {
                        document.getElementById("big-img").src = img;
                      }}
                    ></img>
                  ))}
                </div>
              </div>

              <div className="detailes-item">
                <div className="name">
                  <h1>{product.title}</h1>
                </div>
                <div className="stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="price">${product.price}</p>
                <h5>
                  Availability : <span>{product.availabilityStatus}</span>
                </h5>
                <h5>
                  Brand : <span>{product.brand}</span>
                </h5>
                <p className="description"> {product.description}</p>
                <button
                  className={` btn ${isincart ? "incart" : ""}`}
                  onClick={() => {
                    hundelAddItem(product);
                  }}
                >
                  {isincart ? "in cart" : "add to card"} <TiShoppingCart />
                </button>
                <div className="icons">
                  <span>
                    <FaRegHeart />
                  </span>
                  <span>
                    <FaShare />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}

export default ProductsDetails;
