// import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Images from "./Images";
import { Route, Routes, Link, useLocation } from "react-router-dom";
function App() {
  let location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <nav>
        <h2 className="title">Image Gallery App</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/images">Images</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/images" element={<Images />} />
      </Routes>
    </div>
  );
}

export default App;
