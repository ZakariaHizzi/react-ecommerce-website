import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Products from "./slidProduct/products";
import { categories } from "../context/contextcategory";
import "./slidProduct/product.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Pagetransition from "./pagetransition";
import Productloading from "./slidProduct/productloading";
import Footer from "../footer";
import Header from "./header";
function Categorypage() {
  const { category } = useParams();

  const [categoryPoducts, setcategoryProducts] = useState();
  const [title, settitle] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setcategoryProducts(data.products);
        setloading(false);
      });
  }, [category]);

  useEffect(() => {
    categories.filter((i) => {
      if (i.slug === category) {
        settitle(i.name);
      }
    });
  }, [category]);
  if (loading) return <Productloading />;

  return (
    <>
      <Header />
      <Pagetransition>
        <div
          className="slider-product "
          style={{
            marginTop: "150px",
          }}
        >
          <div className="container">
            <div className="top-slide category">
              <h2>{title}</h2>
              <p> add bestselling to weekly line up </p>
            </div>
            <Swiper
              slidesPerView={4}
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                },
                500: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {categoryPoducts.map((item) => (
                <SwiperSlide>
                  <Link to={`/${category}/products/${item.id}`}>
                    <Products item={item} category={category} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}

export default Categorypage;
