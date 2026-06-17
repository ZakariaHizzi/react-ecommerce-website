import { useEffect, useState } from "react";
import Heroslider from "./Heroslider";
import SliderProduct from "./slidProduct/sliderProduct";
import Pagetransition from "./pagetransition";
import { categories } from "../context/contextcategory";
import Productloading from "./slidProduct/productloading";
import Header from "./header";
import Footer from "../footer";

function Home() {
  const [products, setproducts] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              "https://dummyjson.com/products/category/" + category.slug,
            );
            const data = await res.json();
            return { [category.slug]: data.products };
          }),
        );
        const productsdata = Object.assign({}, ...result);
        setproducts(productsdata);
      } catch (error) {
        console.error("error", error);
      } finally {
        setloading(false);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <Header />
      <Pagetransition>
        <div>
          <Heroslider />
          {loading ? (
            <Productloading />
          ) : (
            categories.map((category) => (
              <SliderProduct
                title={category.name}
                description="add bestselling to weekly line up"
                data={products[category.slug]}
              />
            ))
          )}
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}

export default Home;
