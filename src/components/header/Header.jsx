import React from "react";
import "./header.css";
const Header = () => {
  return (
    <div className="header_container">
      <div className="header_grid">
        <div className="exact_date">
          <h2 className="date">23 · 08 · 2025</h2>
        </div>
        <div className="header_sub ty">
          <img
            alt=""
            className="header_img nasiya"
            src="https://i.imgur.com/W7wnSJ4.jpeg "
          />
        </div>
        <div className="header_sub jur">
          <img
            src="https://i.imgur.com/Rfi4SI0.jpeg"
            alt=""
            className="header_img pasiya"
          />

          <p className="header_p hg">
            CELEBRATING A LOVE STORY YEARS IN THE MAKING—WHERE EVERY CHAPTER LED
            US HERE, AND FOREVER BEGINS NOW.
          </p>
        </div>
        <div className="header_sub ty">
          <img
            src="https://i.imgur.com/ayfVgSu.jpeg"
            alt=""
            className="header_img nasiya"
          />
        </div>
      </div>

      <div className="naughty">
        <div className="naughty_sub">
          <img
            src="https://i.imgur.com/9odwY2h.jpeg"
            alt=""
            className="naughty_img"
          />
        </div>
        <div className="naughty_sub">
          <img
            src="https://i.imgur.com/AXpgvPB.jpeg"
            alt=""
            className="naughty_img"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
