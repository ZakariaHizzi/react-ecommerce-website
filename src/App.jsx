import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductsDetails from "./components/slidProduct/productsDetails";
import { useEffect, useState } from "react";
import { cartContext } from "./context/contextcategory";
import Cart from "./components/slidProduct/cart";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "motion/react";
import Categorypage from "./components/categorypage";
import Footer from "./footer";
import CreateAccount from "./components/createAcount";

function App() {
  const [cartItem, setcartItem] = useState(() => {
    const saveCart = localStorage.getItem("cartItem");
    return saveCart ? JSON.parse(saveCart) : [];
  });
  // increaseQuantity
  const increaseQuantity = (id) => {
    setcartItem((pervItem) =>
      pervItem.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  //  decreaseQuantity
  const decreaseQuantity = (id) => {
    setcartItem((pervItem) =>
      pervItem.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };
  // delete item
  const deleteitem = (id) => {
    setcartItem((pervItem) => pervItem.filter((item) => item.id !== id));
  };
  const addItem = (item) => {
    setcartItem((pervItem) => [...pervItem, { ...item, quantity: 1 }]);
  };
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);
  return (
    <div className="App">
      <cartContext.Provider
        value={{
          cartItem,
          addItem,
          increaseQuantity,
          decreaseQuantity,
          deleteitem,
        }}
      >
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#e9E9E98",
              borderRadius: "5px",
              padding: "10px",
            },
          }}
        />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/cart" element={<Cart />} />
            <Route path="/home/products/:id" element={<ProductsDetails />} />
            <Route
              path="/homecategory/:category/products/:id"
              element={<ProductsDetails />}
            />
            <Route path="/home/category/:category" element={<Categorypage />} />
            <Route path="/home" element={<Header />} />
            <Route path="/home" element={<Footer />} />
            <Route path="/createaccount" element={<CreateAccount />} />
          </Routes>
        </AnimatePresence>
      </cartContext.Provider>
    </div>
  );
}

export default App;
