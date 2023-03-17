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
import {HiUserGroup} from "react-icons/hi";
import {CgProfile,CgLogOut} from "react-icons/cg";
import {BiCoinStack} from "react-icons/bi";

import { NavLink ,Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";


const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [PvtSection,setPvtSection] = useState([]);
  
  useEffect(()=>{
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    if(user && user.Email!=null && user.UniqueID!=null){
      
      if(user.Access==="Organization"){
        setPvtSection([
          {
            path:"/viewHostel",
            name:"Hostlers",
            icon:<HiUserGroup/>
          },
          {
            path:"/profile",
            name:"Profile",
            icon:<CgProfile/>
          }
        ])
      }else if(user.Access==="Developer"){
        setPvtSection([
          {
            path:"/DB",
            name:"DB",
            icon:<BiCoinStack/>
          },
          {
            path:"/profile",
            name:"Profile",
            icon:<CgProfile/>
          }
        ])
      }else if(user.Access==="User"){
        setPvtSection([
          {
            path:"/profile",
            name:"Profile",
            icon:<CgProfile/>
          }
        ])
      }
    }else{
      setPvtSection([{
        path: "/auth",
        name: "Login/SignUp",
        icon: <BsPersonFillAdd />,
      }])
    }
  },[localStorage.getItem("user")])
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
    },...PvtSection
  ];
  
  const toggle = () => setIsOpen(!isOpen);
  const nav = useNavigate();
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
          {(localStorage.getItem('user'))?
          <Link 
            activeClassName="active"
            className="link" onClick={()=>{localStorage.clear();}}
            to="/auth"
          >
              <div className="icon"><CgLogOut/></div>
              {isOpen && <div className="link_text">LogOut</div>}

          </Link>:<></>
          }
        </section>
      </motion.div>
      <main style={{width:"100%",height:"100%"}}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
