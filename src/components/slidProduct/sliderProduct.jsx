import Products from "./products";
import "./product.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import Pagetransition from "../pagetransition";

function SliderProduct({ title, description, data }) {
  return (
    <Pagetransition>
      <div className="slider-product">
        <div className="container">
          <div className="top-slide">
            <h2>{title}</h2>
            <p>{description} </p>
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
            {data.map((item) => (
              <SwiperSlide>
                <Products item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Pagetransition>
  );
}

export default SliderProduct;
