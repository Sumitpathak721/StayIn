import "./sidebar.css";
import { motion } from "framer-motion";
import img1 from "../images/BookMyHostelIcon.png";
import {
  FaHome,
  FaBars,
  FaBriefcase,
  FaPhoneAlt
} from "react-icons/fa";
import {BsPersonFillAdd} from "react-icons/bs"

import { NavLink } from "react-router-dom";
import { useState } from "react";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    icon: <FaBriefcase />,
  },
  {
    path: "/contactus",
    name: "ContactUs",
    icon: <FaPhoneAlt />,
  },
  {
    path: "/auth",
    name: "Login/SignUp",
    icon: <BsPersonFillAdd />,
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "200px" : "40px" }}
        className="Sidebar"
      >
        <div className="top_section">
          {isOpen && <img src={img1} alt="logo" className="logo" />}

          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {routes.map((route) => (
            <NavLink
              activeClassName="active"
              className="link"
              to={route.path}
              key={route.name}
            >
              <div className="icon">{route.icon}</div>
              {isOpen && <div className="link_text">{route.name}</div>}
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
