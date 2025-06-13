import React from "react";
import "./r.css";
import { Link } from "react-router-dom";
const Registry = () => {
  return (
    <div className="registry_container">
      <div className="r_grid">
        <div className="r_sub">
          <h2 className="r_title">Let Us Know You're Coming!</h2>
          <div className="image-wrapper">
            <img
              src="https://www.adornbridal.com/hs-fs/hubfs/wedding%20rsvp.jpg?width=2500&name=wedding%20rsvp.jpg"
              alt="RSVP"
              className="r_img"
            />
          </div>

          <p className="jio">
            We're so excited to celebrate with you! Please take a moment to RSVP
            and let us know if you'll be joining us for our special day.
          </p>

          <button className="rsvp_btn">
            <Link to="/rsvp" style={{ color: "#fff", textDecoration: "none" }}>
              RSVP
            </Link>
          </button>
        </div>
        <div className="r_sub">
          <h2 className="r_title">What to wear</h2>
          <div class="image-wrapper">
            <img
              src="https://ik.imagekit.io/fh2hj1ayv/Website%20dress%20code.jpg?updatedAt=1747553148257"
              alt=""
              className="r_img"
            />
          </div>
          <p className="jio">
            We’ve put together a style guide to help you find inspiration and
            feel confident in what you wear as we celebrate this special day of
            love together.
          </p>
          <button className="rsvp_btn">
            <Link
              to="/dress"
              style={{
                color: "#fff",
                background: "#000",
                textDecoration: "none",
              }}
            >
              Dress Code
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registry;
