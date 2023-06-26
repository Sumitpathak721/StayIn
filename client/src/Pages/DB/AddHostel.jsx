/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect} from 'react';

import "./AddHostel.css";
import axios from "axios"

function AddHostel() {
  const [Name,setName] = useState("");
  const [UniqueID,setUniqueID] = useState("");
  const [UniqueIDFlag,setUniqueIDFlag] = useState("");
  const [password,setPassword] = useState("");
  const [showhideText,setshowhideText] = useState("show");
  const [TogglePassword,setTogglePassword] = useState("password");
  const [country,setCountry] = useState("");
  const [state,setState] = useState("");
  const [email,setEmail] = useState("");
  const [helplineNo,sethelpLineNo] = useState("");
  // const [district,setDistrict] = useState("");
  const [city,setCity] = useState("");
  const [pinCode,setPinCode] = useState("");
  const [OtherlocationDetail,setOtherlocationDetail] = useState("");
  const [Description,setDescription] = useState("");
  const [availableFor,setAvailableFor] = useState("All");
  const [showCommunityDiv,setShowCommunityDiv] = useState(false);
  const [EmailSuffix,setEmailSuffix] = useState("");
  const [CommunityName,setCommunityName] = useState("");
  const [openfor,setOpenFor] = useState("");
  const [type,setType] = useState("");
  const [images,setImages] = useState([]);
  const [videos,setVideos] = useState([]);
  const [accessibleEmails, setAccessibleEmails] = useState([]);
  const [accessibleEmail, setAccessibleEmail] = useState('');


  useEffect(()=>{
    if(availableFor==="Specific Community"){
      setShowCommunityDiv(true)
    }else{
      setShowCommunityDiv(false);
    }

  },[availableFor])

  //handling uniqueID onSubmit
  const handleUniqueID = ()=>{
    const regex1 = new RegExp('/^[a-zA-Z0-9]+_/');
    let response =  '/^[a-zA-Z0-9]+_/'.test(UniqueID);
    console.log(response);
    return response;

  }

  //handling accessible building owner email

  const handleInputKeyPress = (event) => {
    if (event.key === ' ' && accessibleEmail.trim() !== '') {
      setAccessibleEmails([...accessibleEmails, accessibleEmail.trim()]);
      setAccessibleEmail('');
    }
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...accessibleEmails];
    updatedInputs.splice(index, 1);
    setAccessibleEmails(updatedInputs);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && accessibleEmail === '') {
      setAccessibleEmails((prevInputs) => prevInputs.slice(0, prevInputs.length - 1));
    }
  };
  //for video play and pause
  
  

  // console.log(images);
  
  const submitForm = async(e)=>{
    e.preventDefault();
    if(handleUniqueID()){
      // reset unique id flag
      setUniqueIDFlag("");
      let formData = new FormData();
      for(let i=0;i<images.length;i++){
        formData.append(`images`,images[i]);
      }
      for(let i=0;i<videos.length;i++){
        formData.append(`videos`,videos[i]);
      }
      formData.append("name",Name);
      formData.append("type",type);
      formData.append("uniqueID",UniqueID);
      formData.append("password",password);
      formData.append("helplineNo",helplineNo);
      formData.append("email",email)
      formData.append("description",Description)

      let location = JSON.stringify({
        country,
        state,
        city,
        pinCode,
        other:OtherlocationDetail
      });
      formData.append("location",location);
      formData.append("genderSegregation",openfor);
      formData.append("availableFor",availableFor);
      formData.append("emailSuffix",EmailSuffix);
      formData.append("communityName",CommunityName);
      formData.append("accessibleMember",accessibleEmails);
      const headers= {
        'Content-Type': 'multipart/form-data',
        "authorization":JSON.stringify(localStorage.getItem("token"))
      }
      let response = await axios.post('/building/addBuilding',formData,{headers});
      // response = await response.data;
      // console.log(response);
      console.log(JSON.stringify(response.data));
    }else{
      setUniqueIDFlag("*Invalid UniqueID");
    }
  }
  return(
    <form className='main_form_box' onSubmit={submitForm} encType='multipart/form-data'>
      
      <div style={{display:"flex"}}>
        <label htmlFor="Name" >Building Name:
          <input type="text" className='text_input' name='Name' onChange={(e)=>{setName(e.target.value)}} autoFocus required/><br/>
        </label>
        <label htmlFor="Name" style={{marginLeft:"auto"}}>Type:
          <select type="text" className='text_input' name='Name' onChange={(e)=>{setType(e.target.value)}} required>
          {/* <option value="">Select Type</option> */}
            <option value="">Select apartment type</option>
            <option value="Hostel">Hostel</option>
            <option value="PG">PG</option>
            <option value="Hotel">Hotel</option>

          </select>
        </label>
      </div>
      <div style={{display:"flex"}}>
        <div>
          <label htmlFor="">UniqueID:</label>
          <div style={{"color":"red"}}>{UniqueIDFlag}</div>
          <input type="text" name="email" className='text_input' onChange={(e)=>setUniqueID(e.target.value)} required/>
          <div className="input_note">
            *Only use UpperCase,LowerCase,Number and underscore("_")
          </div>
        </div>
          
        
        <form style={{marginLeft:"auto"}} onClick={(e)=>{e.preventDefault();}}>
        
        <label htmlFor="Password">Password:</label>
        <input type={TogglePassword} name="Password" className='text_input' onChange={(e)=>setPassword(e.target.value)} required/>
        <button style={{"color":"#051fdd",backgroundColor:"#e3e3e3",padding:"5px",border:"0px",borderBottom:"1px solid black"}} onClick={()=>{if(TogglePassword==="password"){setTogglePassword("text");setshowhideText("hide")}else{setTogglePassword("password");setshowhideText("show")}}}>{showhideText}</button>
        </form>
      </div>
      <div style={{display:"flex"}}>
        <div>
          <label htmlFor="email">Official Email:</label>
          <input type="email" name="email" className='text_input' onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div style={{marginLeft:"auto"}}>
        <label htmlFor="helplineNo">Helpline No.:</label>
        <input type="number" name="helplineNo" className='text_input' onChange={(e)=>sethelpLineNo(e.target.value)} required/>
        </div>
      </div>
      
      <div className='input_box'>
      <label htmlFor="Description" >Description:
      <textarea name="Description" style={{fontSize:"15px",width:"100%",resize:"none",border:"1px solid black"}}  className='text_input' onChange={(e)=>{setDescription(e.target.value)}} ></textarea>
      </label>
      </div>
      {/* <label htmlFor="Name">Name:</label> */}
      <fieldset className="location">
        <legend>Location</legend>
        <div style={{display:"flex"}}>
        <div style={{marginRight:"auto"}}>
          <label htmlFor="Country">
            Country:
            <input type="text" className='text_input' name='Country' onChange={(e)=>{setCountry(e.target.value)}} required /><br/>
          </label>
          
          <label htmlFor="State">State:
            <input type="text" className='text_input' name='State' onChange={(e)=>{setState(e.target.value)}} required /><br/>
          </label>
          
          <label htmlFor="OtherlocationDetail">Other location Detail:
            <input type="text" className='text_input' name='OtherlocationDetail' onChange = {(e)=>{setOtherlocationDetail(e.target.value)}} required /><br/>
          </label>
          
        </div>
        <div style={{marginLeft:"auto"}}>
          <label htmlFor="City">City:
          <input type="text" className='text_input' name='City' onChange = {(e)=>{setCity(e.target.value)}} required /><br/>
          </label>
          
          <label htmlFor="PinCode">PinCode:
            <input type="number" className='text_input' name='PinCode' onChange = {(e)=>{setPinCode(e.target.value)}} required /><br/>
          </label>
        </div>
        </div>
      </fieldset>
      <div style={{display:"flex"}}>
      <div className='input_box'>
        <label htmlFor="Available for" >Available for:
          <select name="Available for" className="text_input" onChange={(e)=>{setAvailableFor(e.target.value)}}>
            <option value="All" >All</option>
            <option value="Specific Community">Specific Community</option>
          </select>
        </label>
      </div>
      <div className='input_box' style={{marginLeft:"auto"}}>
        <label htmlFor="Open for">Specific for:
          <select name="Open for" className="text_input" onChange={(e)=>{setOpenFor(e.target.value)}} required>
            <option value="">Select</option>
            <option value="All" >All</option>
            <option value="Girls">Girls</option>
            <option value="Boys">Boys</option>
          </select>
        </label>
        
      </div>
      </div>
      {
        (showCommunityDiv)?
        <div>
            <div className="input_box">
              <label htmlFor="email_suffix">Specific Email Suffix:</label>
              <input type="text" className="text_input" name="email_suffix" placeholder='@gmail.com' onChange={(e)=>{setEmailSuffix(e.target.value)}}/>
            </div>
            <div  className='input_box'>
            <label htmlFor="Company Name">TieUp Company/College Name:</label>
            <input type="text" className="text_input" for="Company Name" onChange={(e)=>{setCommunityName(e.target.value)}}/>
            </div>
        </div>:<div></div>
      }
      <div style={{display:"flex",margin:"5px auto"}}>
      <div className='input_box'>
        <label htmlFor="images">Upload {type} photos:
        <input name="images" onChange={(e)=>{setImages(Array.from(e.target.files));console.log(images);}} id="images" type="file" accept='image/*' multiple />
        
          <div style={{display:"flex",overflowX:"scroll",width:"500px",justifyContent:"center"}}>
            
          {images.map((image, index) => (
            <img
              
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              style={{height:"200px",width:"auto",margin:"auto 5px"}}
            />
          ))}
          </div>
        </label>
      </div>
      <div className='input_box' style={{marginLeft:"auto"}}>
        <label htmlFor="videos">Upload {type} videos:
        <input name="videos" onChange={(e)=>{setVideos(Array.from(e.target.files));}} id="videos" type="file" accept='video/*' multiple />
        <div style={{display:"flex",overflowX:"scroll",width:"500px",justifyContent:"center",padding:"5px 20px"}}>
          {videos.map((video)=>(
            
            <>
            <video width="auto" height="200" style={{margin:"10px"}} controls>
              <source src={URL.createObjectURL(video)} type={video.type} />
              Your browser does not support the video tag.
            </video>
            </>
          ))

          }
    </div>
        </label>
      </div>
      </div>
      
      <label htmlFor="accessibleto">Enter Email of member to whom you want the building accessibility(Must have account in StayIn):</label><br/>
      <div className="array_input">
        {accessibleEmails.map((item, index) => (
          <div key={index} className="array_input-div">
            <span>{item}</span>
            <button
              className="remove-button"
              onClick={() => handleRemoveInput(index)}
            >
              &#10006;
            </button>
          </div>
        ))}
        <input
          type="email"
          value={accessibleEmail}
          onChange={(event) => {setAccessibleEmail(event.target.value);}}
          onKeyPress={handleInputKeyPress}
          onKeyDown={handleKeyDown}
          style={{width:"100%",marginTop:"5px"}}
        />
      
    </div>
    <button type="submit" className='submit_btn'>Submit</button>
    
    </form>
    
  );
}

export default AddHostel;
