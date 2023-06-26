import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useParams } from 'react-router-dom';


function Verify(){
    // const { UserID } = useParams();
    const UserID = useParams().UserID;

    const [Heading,setHeading]= useState("Loading...");
    const [Text,setText] = useState("Loading...");
    const [Color,setColor]= useState("black");
    
    const ValidateUser = async()=>{
        
        let result = await fetch(`/verify/${UserID}`,{method:"get"});
        result = await result.json();
        if(result.status==="Success"){
            setHeading("Email Verified");
            setText("Your email was verified. You Can continue using this application");
            setColor("green");
        }else{
            setHeading("Email Verification Failed");
            setText("User associated with this id not exists!!");
            setColor("red");
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        ValidateUser();
    },[]);

    let Respond={
        width:"50%",
        margin:"auto",
        padding:"15px",
        textAlign:"center",
        fontSize:"25px",
        color:"black"
    }

    return(
        <div style={Respond}>
            <h1 style={{color:Color}}>{Heading}</h1>
            <p>{Text}</p>
        </div>
    );
}


export default Verify