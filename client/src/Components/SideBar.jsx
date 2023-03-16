import "./sidebar.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from "./BMHlogo1.jpg";
import {
  FaHome,
  FaBars,
  FaPhotoVideo,
  FaEye,
  FaBriefcase,
  FaPhoneAlt,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
// import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";

import { BsCartCheck } from "react-icons/bs";
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
  // {
  //   path: "/galary",
  //   name: "Galary",
  //   icon: <FaPhotoVideo />,
  // },

  // {
  //   path: "/ourfacility",
  //   name: "OurFacility",
  //   icon: <BsCartCheck />,
  // },
  // {
  //   path: "/virtualtour",
  //   name: "VirtualTour",
  //   icon: <FaEye />,
  // },
  {
    path: "/contactus",
    name: "ContactUs",
    icon: <FaPhoneAlt />,
  },
  {
    path: "/login",
    name: "Login",
    icon: <FaLockOpen />,
  },
  {
    path: "/signup",
    name: "SignUp",
    icon: <FaLock />,
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const auth = localStorage.getItem("user4");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/SignUp");
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "223px" : "40px" }}
        className="Sidebar"
      >
        <div className="top_section">
          {isOpen && <img src={img1} alt="logo" className="logo" />}
          {/* {isOpen && <h1 className="website-name">BookMyHostel.com</h1>} */}

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
              <div className="link_text">{route.name}</div>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
