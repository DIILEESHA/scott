import "./l.css";

const Location = () => {
  return (
    <div className="header_container ui">
      <div className="header_grid two">
        <div className="exact_date kk">
          <h2 className="date maha">location</h2>
        </div>
        <div className="header_sub ty">
          <p className="header_p">Saturday, AUGUST 23, 2025</p>
        </div>
        <div className="header_sub jur">
          <div class="image-wrappers">
            <img
              src="https://cranehollowfarm.com/wp-content/uploads/fall-scene.jpg"
              alt=""
              className="r_img nanaa"
            />
          </div>

          {/* <button className="rsvp_btn"></button> */}
        </div>
        <div className="header_sub ty">
          <p className="header_p">
           Crane Hollow Farm
            <br />
           11443 Crane Hollow Rd, 
            <br />
           Longmont, CO 80503
          </p>
        </div>
      </div>

      <div className="naughty plyan  ">
        <div className="naughty_sub">
           <p className="header_p bos">Saturday, AUGUST 23, 2025</p>

        </div>
        <div className="naughty_sub">
          <p className="header_p boss">
          Crane Hollow Farm
            <br />
           11443 Crane Hollow Rd, 
            <br />
           Longmont, CO 80503
          </p>
        </div>
      </div>
    </div>
  );
};

export default Location;
