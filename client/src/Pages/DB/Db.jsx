import React, { useState } from 'react'
import {Link} from "react-router-dom";
import "./Db.css";

import AddHostel from "./AddHostel";

function Db() {
  const [ShowAddHostelForm,setShowAddHostelForm] = useState(false);
  return (
    <div id="MAIN_DIV">
      <nav>
        <div className="navbar-left">
          <Link onClick={()=>{setShowAddHostelForm(!ShowAddHostelForm);}}>Add member</Link>
        </div>
        <div className="navbar-right">
          <form>
            <input type="text" placeholder="Search"/>
            <button type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div id="Form_Box">
        {
          (ShowAddHostelForm)?<AddHostel/>:<div></div>
        }
        
      </div>
    </div>
  )
}

export default Db