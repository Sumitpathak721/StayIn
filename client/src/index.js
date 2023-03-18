// import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.js";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs.js";
import Auth from "./Pages/Auth/Auth.js";
import Sidebar from "./Components/SideBar";
import DataBase from "./Pages/DB/db.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
var auth = localStorage.getItem("user");
auth = JSON.parse(auth);
root.render(
  <div>
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          {auth ? (
            <>
              {auth.Access === "Organization" ? (
                <Route path="/viewHostel" element={<h1>View Hostel</h1>} />
              ) : (
                <>
                  {auth.Access === "Developer" ? (
                    <Route path="/DB" element={<DataBase />} />
                  ) : (
                    <></>
                  )}
                </>
              )}
              <Route path="/profile" element={<h1>Profile</h1>} />
            </>
          ) : (
            <></>
          )}

          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<h1>404 Page not Found</h1>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </div>
);
