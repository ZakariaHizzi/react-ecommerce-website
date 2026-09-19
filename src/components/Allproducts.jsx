import React, { useEffect, useState } from "react";
import Products from "./slidProduct/products";
import { categories } from "../context/contextcategory";
import { useSearchParams } from "react-router-dom";
import "./slidProduct/product.css";
import Pagetransition from "./pagetransition";
import Productloading from "./slidProduct/productloading";
import Footer from "../footer";
import Header from "./header";

function Allproducts() {
  const [products, setproducts] = useState();
  const [loading, setloading] = useState(true);
  const [selectedCategory, setselectedCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim().toLowerCase();

  useEffect(() => {
    setloading(true);
    const url =
      selectedCategory === "all"
        ? "https://dummyjson.com/products?limit=100"
        : `https://dummyjson.com/products/category/${selectedCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setproducts(data.products);
        setloading(false);
      });
  }, [selectedCategory]);

  if (loading) return <Productloading />;

  const filteredProducts = searchQuery
    ? products?.filter((product) =>
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(searchQuery),
      )
    : products;

  const pageTitle = searchQuery
    ? `Search results for "${searchQuery}"`
    : selectedCategory === "all"
      ? "All Products"
      : selectedCategory;

  return (
    <>
      <Header />
      <Pagetransition>
        <div
          className="all-products-page slider-product"
          style={{
            marginTop: "80px",
          }}
        >
          <div className="container">
            <div className="top-slide category">
              <h2>{pageTitle}</h2>
              {searchQuery ? (
                <p>
                  {filteredProducts?.length || 0} products found
                </p>
              ) : (
                <p>Browse by category</p>
              )}
            </div>
            <div className="products-filter">
              <button
                className={`filter-btn ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => setselectedCategory("all")}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  className={`filter-btn ${
                    selectedCategory === c.slug ? "active" : ""
                  }`}
                  onClick={() => setselectedCategory(c.slug)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            {filteredProducts?.length === 0 ? (
              <div className="products-not-found">
                <h3>No products found</h3>
                <p>Try a different keyword or browse all products.</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts?.map((item) => (
                  <Products key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}

export default Allproducts;