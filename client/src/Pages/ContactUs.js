import React, { useMemo } from "react";
import "./ContactUs.css";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import emailjs from "emailjs-com";
// import { toast, ToastContainer } from 'react-toastify';
export default function ContactUs() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGsO9llhKmOimTMIzoKvRcQb2ERbMvh9I",
  });

  if (!isLoaded) return <div className="map-alt">Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  // const [to_name, setTo_name] = useState("");
  // const [from_name, setFrom_name] = useState("");
  // const [message, setMessage] = useState("");
  // const [phone, setPhone] = useState("");
  // const submitInfo = async () => {
  //   console.log(to_name + from_name + message + phone);

  //   const emailContent = {
  //     to_name: "sujeet sharma",
  //     from_name: from_name,
  //     message: message,
  //     phone: phone,
  //   };

  //   const result = await emailjs.send(
  //     "service_cwppc19",
  //     "template_vuho8df",
  //     emailContent,
  //     "qyqTvA1JgKgYNrJID"
  //   );
  //   if (result) {
  //     console.log(result);
  //     // toast("Email sent successfully")
  //   } else {
  //     console.log("error has occured");
  //     // toast("something wents wrong")
  //   }
  // };
  return (
    <div>
      <div className="contact-info">
        <h1 className="contact-info-h1">Contact Us</h1>
        <div>
          <div className="contact-info-div">
            <div className="contact-icon">
              <FaHome />
            </div>

            <h1 className="contact-details">
              2C/1, Knowledge Park-III, Greater Noida
            </h1>
            <div className="icon contact-icon">
              <MdMessage />
            </div>

            <h1 className="contact-details"> director@niet.co.in</h1>
            <div className="icon contact-icon">
              <FaPhoneAlt />
            </div>

            <h1 className="contact-details"> 9599446607</h1>
          </div>
        </div>
      </div>

      <section className="contactForm-map">
        <div className="contactus-form">
          <h1>Contact Us</h1>
          <input
            className="upload-signupBox"
            type="text"
            name="name"
            placeholder="Enter name"
          />
          {/* onChange={(event) => setTo_name(event.target.value)} */}
          <input
            className="upload-signupBox"
            type="email"
            name="user_email"
            placeholder="Enter email"
          />
          {/* onChange={(event) => setFrom_name(event.target.value)} */}
          <input
            className="upload-signupBox"
            type="text"
            name="phone"
            placeholder="Enter phone number"
          />
          {/* onChange={(event) => setPhone(event.target.value)} */}
          <textarea
            cols="20"
            rows="5"
            className="upload-signupBox"
            type="message"
            placeholder="Write from here..."
          />
          {/* onChange={(event) => setMessage(event.target.value)} */}
          <button className="btn3" type="button">
            Submit
          </button>
          {/* onClick={submitInfo} */}
          {/* <ToastContainer/> */}
        </div>
        <div>
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
          >
            <Marker position={center} />
          </GoogleMap>
        </div>
      </section>
      <section className="footer-section">
        <div>
          <div className="footer">
            <h1>This is footer</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
