import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Importing Oauth
import Oauth from "./Oauth.js";

// Importing routes
import Home from './Pages/Home/Home.js';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs.js';
import Auth from './Pages/Auth/Auth.js';
import Verify from './Pages/Auth/verify.js';
import Sidebar from './Components/SideBar';
import DataBase from './Pages/DB/Db';
import ResetPassword from './Pages/Auth/ResetPassword.js';


function MainRoutes(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        
        <Route path="/verify/:UserID/ResetPassword" element={<ResetPassword />} />
        <Route path="/verify/:UserID" element={<Verify />} />
        <Route path="/*" element={<AppRoutes/>}/>
        {/* wnat to add </App> routes */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}
function AppRoutes() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      Oauth(token)
        Oauth(token)
        .then((result) => {
          setUserInfo(result);
        })
        .catch((error) => {
          // Handle error if needed
          console.log(error);
        });
    }
  
  }, []);

  return (
    <div>
      
        
        <Sidebar>
          <Routes>
            {/* <Route path="/verify/:UserID/ResetPassword" element={<ResetPassword />} /> */}
            {/* <Route path="/verify/:UserID" element={<Verify />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            {userInfo && (
              <>
                {userInfo.Access === 'Organization' ? (
                  <Route path="/viewHostel" element={<h1>View Hostel</h1>} />
                ) : (
                  <>
                    {userInfo.Access === 'Developer' ? (
                      <Route path="/DB" element={<DataBase />} />
                    ) : (
                      <></>
                    )}
                  </>
                )}
                <Route path="/profile" element={<h1>Profile</h1>} />
              </>
            )}
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<h1>404 page not found</h1>}/>
          </Routes>
        </Sidebar>
      
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainRoutes/>);