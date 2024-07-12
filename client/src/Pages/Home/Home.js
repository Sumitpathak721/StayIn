import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-main-container">
      <section className="home-gif-container">
        <h1>Our Priority is Yoour Need</h1>
      </section>
      <section className="home-searchicon-container">
        <FaSearch className="searchIcon" />
        <label>
          <i className="placeholder">search hostel here...</i>
          <input type="text" className="searchBox" />
        </label>
      </section>
    </div>
  );
};

export default Home;
