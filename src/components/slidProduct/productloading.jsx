import React from "react";

export default function Productloading() {
  return (
    <div className="slider-loading">
      <div className="container">
        <div className="top-loading top-slide">
          <h2 className="skeltion"></h2>
          <p className="skeltion"> </p>
        </div>
        <div className="loading-products">
          <div className="product">
            <div className="img skeltion"></div>
            <div className="content skeltion"></div>
          </div>
          <div className="product">
            <div className="img skeltion"></div>
            <div className="content skeltion"></div>
          </div>

          <div className="product">
            <div className="img skeltion"></div>
            <div className="content skeltion"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
