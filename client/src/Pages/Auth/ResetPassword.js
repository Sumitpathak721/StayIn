import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useParams } from 'react-router-dom';


function ResetPassword(){
    // const { UserID } = useParams();
    const UserID = useParams().UserID;
    
    const ValidateUser = async()=>{
        
        let result = await fetch(`/verify/${UserID}`,{method:"get"});
        result = await result.json();
        if(result.status==="Success"){

        }else{
            
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        ValidateUser();
    },[]);

    let Respond={
        width:"50%",
        margin:"auto",
        marginTop:"5%",
        padding:"10px",
        textAlign:"center",
        fontSize:"15px",
        color:"rgb(5, 147, 121)",
        border:"1px solid blue"
    }

    return(
        <div style={Respond}>

            <h1 style={{marginBottom:"7%"}}>Reset Password</h1>
            <p>
                <div>
                    <input type="text" />
                </div>
            </p>
        </div>
    );
}


export default ResetPassword;