import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import SearchScreen from "./components/SearchScreen";
import MainAllProducts from "./components/primedec/MainAllProducts";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import PlintusNatyazhnye from "./components/primedec/PlintusNatyazhnye";
import Plintus from "./components/primedec/Plintus";
import Moldings from "./components/primedec/Moldings";
import Rozetki from "./components/primedec/Rozetki";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      return savedCart;
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router basename="/stroy-decor">
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/main" element={<MainAllProducts />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/plintusnatyazhnye" element={<PlintusNatyazhnye />} />
          <Route path="/plintus" element={<Plintus />} />
          <Route path="/molding" element={<Moldings />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/rozetki" element={<Rozetki />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
