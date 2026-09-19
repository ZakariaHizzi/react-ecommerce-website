import { useEffect, useState } from "react";
import Pagetransition from "./pagetransition";
import Header from "./header";
import Footer from "../footer";
import { categories } from "../context/contextcategory";
import Productloading from "./slidProduct/productloading";
import HomeHero from "./home/HomeHero";
import FeaturedCategories from "./home/FeaturedCategories";
import BestSellers from "./home/BestSellers";
import WhyUs from "./home/WhyUs";

function Home() {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const categoryResults = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category.slug}?limit=1`,
            );
            const data = await res.json();
            return {
              ...category,
              image: data.products[0]?.images[0],
            };
          }),
        );
        const bestRes = await fetch(
          "https://dummyjson.com/products?limit=8&sortBy=rating&order=desc",
        );
        const bestData = await bestRes.json();
        setFeaturedCategories(categoryResults);
        setBestSellers(bestData.products);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <>
      <Header />
      <Pagetransition>
        <div>
          <HomeHero />
          {loading ? (
            <Productloading />
          ) : (
            <>
              <FeaturedCategories categories={featuredCategories} />
              <BestSellers products={bestSellers} />
            </>
          )}
          <WhyUs />
        </div>
      </Pagetransition>
      <Footer />
    </>
  );
}

export default Home;