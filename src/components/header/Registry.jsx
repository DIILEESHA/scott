import React from "react";
import "./r.css";
import { Link } from "react-router-dom";
const Registry = () => {
  return (
    <div className="registry_container">
      <div className="r_grid">
        <div className="r_sub">
          <h2 className="r_title">Support the bride and groom</h2>
          <div class="image-wrapper">
            <img
              src="https://ik.imagekit.io/fh2hj1ayv/website%20registry.jpg?updatedAt=1747553143737"
              alt=""
              className="r_img"
            />
          </div>

          <p className="jio">
            While your presence at our wedding is the greatest gift, if you wish
            to share in our joy through a gift, please visit our registry.
          </p>
          <button className="rsvp_btn">
            <Link
              to="/gifts"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              registry
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
