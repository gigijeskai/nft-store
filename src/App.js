import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./screen/home-screen";
import Paginated from "./screen/paginated-screen";
import Checkout from "./screen/checkout-screen";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/photo/:page" element={<Paginated />} />
      </Routes>
    </Router>
  );
}

export default App;