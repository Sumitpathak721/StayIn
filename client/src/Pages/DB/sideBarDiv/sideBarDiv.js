import React from "react";


function sideBarDiv(props){
    console.log(props);
    return(
        <div>
            <div>
                {props.hostel.Name},{props.hostel.Address}
            </div>
        </div>
    )
}

export default sideBarDiv;