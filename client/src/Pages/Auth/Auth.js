import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./Auth.css";
import img1 from "../../images/BookMyHostelIcon.png";

function Auth(){
    const [isLogin,setIsLogin] = useState(true);
    return(
        <div id="outerBox">
            <div id="innerBox">
                <div id="AuthDetails">
                    <div className="AuthDetailsText">
                        <h1 style={{padding:"10px"}}>
                            <strong>
                            {(isLogin)?"Hii😊,Friend":"Create Account"}
                            </strong>
                            </h1>
                        <h3>{(isLogin)?"Provide your credential to verify you":"Become a member a our community"}</h3>
                    </div>
                    <img src={img1} alt="BookMyHostel" />
                    <button onClick={()=>{(isLogin)?setIsLogin(false):setIsLogin(true)}}>{(isLogin)?"New Register":"LogIn"}</button>
                </div>
                
                <div id="AuthCredential">
                    {(isLogin)?
                    <>
                    <h1 style={{paddingTop:"20px"}}>SignIn</h1>
                    <form id="Detail">
                        <input type="email" placeholder="Email"/><br/>
                        <input type="password" placeholder="password"/>
                        <Link to="#">forget password?</Link>
                        
                    </form>
                    <button type="submit">SignIn</button></>:<>
                    <h1 style={{paddingTop:"20px"}}>SignUp</h1>
                    <form id="Detail">
                        <input type="name" placeholder="Name"/><br/>
                        <input type="email" placeholder="Email"/><br/>
                        <input type="password" placeholder="password"/>
                        
                    </form>
                    <button type="submit">SignUp</button></>
                    }
                    
                </div>
            </div>
        </div>
    )
}
export default Auth;