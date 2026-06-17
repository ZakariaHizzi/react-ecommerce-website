import { useContext, useState } from "react";
import { cartContext } from "../../context/contextcategory";
import { MdDelete } from "react-icons/md";
import "./product.css";
import Pagetransition from "../pagetransition";
import Footer from "../../footer";
import Header from "../header";
import Taostmessage from "../taostmessage";
export default function Cart() {
  const { cartItem, increaseQuantity, decreaseQuantity, deleteitem } =
    useContext(cartContext);
  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    setright("0px");
  };
  const vide = "";
  const hundleCloseMessage = () => {
    setright("-250px");
    setemail(vide);
    setFname(vide);
    setLname(vide);
    setphone(vide);
    setcountry(vide);
    setaddress(vide);
    cartItem.length = 0;
  };
  const [right, setright] = useState("-250px");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState("");
  function changeWritingFName(e) {
    setFname(e.target.value);
  }
  function changeWritingLName(e) {
    setLname(e.target.value);
  }
  function changeWritingemail(e) {
    setemail(e.target.value);
  }
  function changeWritingphone(e) {
    setphone(e.target.value);
  }

  function changeWritingcountry(e) {
    setcountry(e.target.value);
  }
  function changeWritingaddress(e) {
    setaddress(e.target.value);
  }
  return (
    <>
      <Header />
      <Pagetransition>
        <div className="chekout">
          <form className="shipping-information" onSubmit={onSubmit}>
            <div className="information">
              <h1>Shipping Information</h1>
              <div className="name">
                <h6>First name</h6>
                <h6>Last name</h6>
                <input
                  type="text"
                  name="First Name"
                  placeholder="Your Name"
                  value={Fname}
                  onChange={changeWritingFName}
                  required
                />
                <input
                  type="text"
                  name="Last Name"
                  placeholder="Your Name"
                  value={Lname}
                  onChange={changeWritingLName}
                  required
                />
              </div>
              <div className="email">
                <h6>Email</h6>
                <input
                  type="text"
                  name="Email"
                  placeholder="Your email"
                  value={email}
                  onChange={changeWritingemail}
                  required
                />
              </div>
              <div className="number">
                <h6>Phone Number</h6>
                <input
                  type="number"
                  name="Phone"
                  placeholder="Your phone"
                  value={phone}
                  onChange={changeWritingphone}
                />
              </div>
              <div className="country">
                <h6>Country</h6>
                <input
                  type="text"
                  name="Country"
                  placeholder="Your country"
                  value={country}
                  onChange={changeWritingcountry}
                />
              </div>
              <div className="street-address">
                <h6>Street Address</h6>
                <input
                  type="text"
                  name="Adrress"
                  placeholder="your address"
                  value={address}
                  onChange={changeWritingaddress}
                  required
                />
                {/* <input
                  style={{ display: "none" }}
                  type="text"
                  name="Products"
                  id=""
                  value={
                    cartItem.length === 0
                      ? ""
                      : cartItem.map(
                          (item, index) =>
                            `Product${index + 1} : ${item.title} Price : ${item.price} quantity : ${item.quantity}`,
                        )
                  }
                />
                <input
                  type="text"
                  name="Total"
                  value={`$${total}`}
                  style={{ display: "none" }}
                /> */}
              </div>
            </div>
            <div className="ordersummary">
              <h1>Order Summary</h1>
              <div className="items">
                {cartItem.length === 0 ? (
                  <p> Your cart is empty</p>
                ) : (
                  cartItem.map((item, index) => (
                    <div className="item-cart" key={index}>
                      <div className="image-name">
                        <img src={item.images[0]} alt="" />
                        <div className="content">
                          <h1>{item.title}</h1>
                          <p className="price-item">
                            ${item.price * item.quantity}
                          </p>
                          <div className="quantity-control">
                            <span
                              onClick={() => {
                                decreaseQuantity(item.id);
                              }}
                            >
                              -
                            </span>
                            <span className="quantity">{item.quantity}</span>
                            <span
                              onClick={() => {
                                increaseQuantity(item.id);
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="delete-item"
                        onClick={() => {
                          deleteitem(item.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="bottom-summary">
                <div className="shop-table">
                  <p>total:</p>
                  <span className="total-checkout">${total}</span>
                </div>
                <div className="bottom-div">
                  <input type="submit" value={"Place order"} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Pagetransition>
      <Taostmessage closeMenu={hundleCloseMessage} right={right} />
      <Footer />
    </>
  );
}
