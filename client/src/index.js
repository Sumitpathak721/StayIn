// import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Galary from "./Pages/Galary";
import OurFacility from "./Pages/OurFacility";
import VirtualTour from "./Pages/VirtualTour";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Sidebar from "./Components/SideBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/galary" element={<Galary />} />
          <Route path="/ourfacility" element={<OurFacility />} />
          <Route path="/virtualtour" element={<VirtualTour />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </div>
);
