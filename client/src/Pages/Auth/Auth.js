import React, { useEffect, useState } from "react";
import "./Auth.css";
import {Link, useNavigate} from "react-router-dom";
import img1 from "../../images/BookMyHostelIcon.png";

function Auth(){
    const [isLogin,setIsLogin] = useState(true);
    const [authbtntext,setauthbtntext] = useState("Create New Account");

    let nav = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")){
            nav('/profile');
        }
    },[])
    return(
        <div id="outerBox">
            <div id="innerBox">
                <div id="AuthDetails">
                    <div className="AuthDetailsText">
                        <h1 style={{padding:"10px"}}>
                            <strong>
                            {(isLogin)?"Hii😊,Friend":"Welcome To Our Community"}
                            </strong>
                            </h1>
                        <h3>{(isLogin)?"Provide your credential to verify you":"Become a member a our community"}</h3>
                    </div>
                    <img src={img1} alt="BookMyHostel" />
                </div>
                
                <div id="AuthCredential">
                    <div>
                    {(isLogin)?
                        <Login/>:<SignUp/>
                    }
                    <div style={{marginTop:"40px"}}>    
                        <Link style={{display:"inline"}} onClick={()=>{if(isLogin){setIsLogin(false);setauthbtntext("back to login")}else{setIsLogin(true);setauthbtntext("Create New Account")}}}>{authbtntext}</Link>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

  

const SignUp = () => {
    const [Name,setName]= useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");


    //Respond styling according to signup inputs
    const [responseBgColor,setresponseBgColor] = useState("");
    const [respondText,setresponseText] = useState("");
    const [responseColor,setresponseColor] = useState("");
    let respond = {
        textAlign:"center",
        padding:"10px",
        width:"90%",
        margin:"auto",
        marginTop:"20px",
        color:responseColor,
        backgroundColor:responseBgColor,
        borderRadius:"20px"
    }

    //displa flag to approach unique userID

    const Register = async(props)=>{
        let result = await fetch('/signup',{
            method:"post",
            body:JSON.stringify({Name,Email,Password}),
            headers:{
                'Content-Type':"application/json"
            }   
        });
        result = await result.json();
        if(result.flag==='done'){
            setresponseColor("green");
            setresponseBgColor("rgb(193 255 193)");
            
            setresponseText("Verification Email Sent to your E-Mail :)");
            setName("");
            setEmail("");
            setPassword("");
        }else if(result.flag==="wrong"){
            setresponseColor("#b70000");
            setresponseBgColor("rgb(255 151 151)");
            setresponseText("Failed to Register!!");
        }else{
            setresponseColor("#767600");
            setresponseBgColor("#ffec41");
            setresponseText("Already registered!!");
        }
    }
    return (
        <>
            <h1 style={{paddingTop:"20px"}}>Create Account</h1>
            <h3 className="Respond" style={respond}>{respondText}</h3>
            <form id="Detail">
                <input type="name" placeholder="Name" value={Name} onChange={(e)=>setName(e.target.value)}/><br/>
                <input type="email" placeholder="Email" value={Email} onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="password" placeholder="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                
            </form>
            <button className="SignInButton" type="submit" onClick={Register}>SignUp</button>
        </>
    )
}

const Login=(props)=>{
    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    
    //flag styling
    const [flagColor,setflagColor] = useState("");
    const [flagBgColor,setflagBgColor] = useState("");
    const [flagText,setflagText] = useState("");
    const flagStyle = {
        width:"80%",
        margin:"auto",
        padding:"10px",
        color:flagColor,
        borderRadius:"10px",
        backgroundColor:flagBgColor
    }
    //login functions
    const SignIn = async()=>{
        let result = await fetch("/login",{
            method:"post",
            
            body:JSON.stringify({Email,Password}),
            headers:{
                "Content-Type":"application/json",
            }
        });
        result = await result.json();
        
        if(result.flag==="verified"){
            
            localStorage.setItem("token",JSON.stringify(result.token));
            setEmail("");
            setPassword("");
            //Reload the page when user just logged In
            window.location.reload();
        }else if(result.flag==="not verified"){
            setflagBgColor("#ffec41");
            setflagColor("#767600");
            setflagText("Your Account is not Verified Yet!!,Please Verify first");
        }else{
            setflagBgColor("rgb(255 151 151)");
            setflagColor("#b70000");
            setflagText("Wrong Crediential"); 
        }
    }


    //Forget Function 
    
    //resetFlag is use to toggle between forget and login component
    const [resetFlag,setresetFlag] = useState(true);

    const forgetPassword = ()=>{
        setresetFlag(!resetFlag);
        setBackToLogin("block");
    }
    //Display of Back to Login btn
    const [BackToLogin,setBackToLogin] = useState("none");

    
    
    return (
        <>
        {resetFlag ? 
        <>
            <h1 style={{paddingTop:"20px"}}>Welcome Back</h1>
            <h3 style={flagStyle}>{flagText}</h3>
            <form id="Detail">
                <input type="email" placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                <input type="password" placeholder="password"value={Password} onChange={(e)=>{setPassword(e.target.value)}}/>
                
                <Link onClick={forgetPassword} >Forgot password?</Link>
            </form>
            <button className="SignInButton" type="submit" onClick={SignIn}>SignIn</button>
            
        </>:
        <ForgetPassword/>
        }
        <Link type="submit" onClick={()=>{setresetFlag(!resetFlag);setBackToLogin("none");}} style={{display:BackToLogin}} className="ResetPasswordBtn">Back to login</Link>
        </>
    )
}

const ForgetPassword =()=>{
  //User Entered Email
  const [Email,setEmail] = useState("");

  //Flag Text state
  const [FlagText,setFlagText] = useState("");

  //Flag Style state
  const [FlagColor,setFlagColor] = useState("");

  //function for sending Email
  const SendEmail = async()=>{
    let result=await fetch('/login/ResetEmail',{
      method:'post',
      body:JSON.stringify({Email}),
      headers:{
        "Content-Type":"application/json"
      }
    });
    result = await result.json();
    console.log(result);
    if(result.respond==="not member"){
      setFlagText("You are not Registered Yet!!");
      setFlagColor("red");
    }else if(result.respond==="incomplete"){
      setFlagText("Enter a Valid Email ID!!");
      setFlagColor("red");
    }else{
      setFlagText("Reset Password Email Sent Succesfully");
      setFlagColor("green");
    }
  }
  
  
  return (
      <>
        <h1 style={{width:"80%",margin:"20px auto"}}>Reset Password</h1> 
        <h2 style={{width:"80%",padding:"10px",color:FlagColor,margin:"auto"}}>{FlagText}</h2>
        <form>
        <input type="text" style={{padding:"5px",width:"80%",height:"30px"}} value={Email} name="Email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email" />
        </form>
        <button className="SignInButton" type="submit" style={{margin:"10px"}} onClick={SendEmail}>Sent E-Mail</button>
        
      </>
  )
}


export default Auth;