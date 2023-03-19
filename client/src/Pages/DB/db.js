import React, { useEffect, useState } from "react";
import "./db.css";
import { FaSearch } from "react-icons/fa";
import img from "../../images/BookMyHostelIcon.png";
import { Link } from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";

const Db = () => {
  const [hosteldata, setHosteldata] = useState([]);
  useEffect(() => {
    getHostelData();
  }, []);

  const getHostelData = async () => {
    let result = await fetch("/api/hostels");
    result = await result.json();
    console.log(result);
    setHosteldata(result);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`/hostels/search/${key}`);
      result = await result.json();

      if (result) {
        setHosteldata(result);
      }
    } else {
      getHostelData();
    }
  };

  return (
    <div className="db-container">
      <section className="db-sidebar-section">
        <img src={img} alt="logo" width="100px" height="100px" />
        <div className="search-icon">
          <input
            type="text"
            placeholder="Search Hostel"
            className="input-Box"
            onChange={searchHandle}
          />
          <label>
            <FaSearch className="icons" />
          </label>
        </div>
        <ScrollableFeed>
          {hosteldata.map((singledata) => (
            <div className="hostel-names">
              <Link>{singledata.hostel_name}</Link>
            </div>
          ))}
        </ScrollableFeed>
      </section>

      <section className="database-section">
        <div className="detail-member-btn">
          <button>Detail</button>
          <button>Member</button>
        </div>
        <div className="db-section1">
          <ScrollableFeed>
            <h3>this is the databse section</h3>
            {/* {hosteldata.map((singledata) => (
              <div>
                <Link>{singledata.name}</Link>
              </div>
            ))} */}
            {<Link>{hosteldata.hostel_name}</Link>}
          </ScrollableFeed>
        </div>
      </section>
    </div>
  );
};

export default Db;
