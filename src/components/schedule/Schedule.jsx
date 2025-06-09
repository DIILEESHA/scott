import React from "react";
import "./sc.css";
const Schedule = () => {
  return (
    <div className="master">
      <div className="schedule_container">
        <div className="dolly">
          <h2 className="sc_title">Here's a sneak peek of</h2>

          <h1 className="sc">our special day's schedule</h1>

          <div className="sc_grid">
            <div className="sc_sub">
              <h2 className="sc_time">03.30 PM</h2>
              <h2 className="event">Ceremony</h2>
            </div>
            <div className="sc_sub">
              <h2 className="sc_time">05:30 PM</h2>
              <h2 className="event">cocktail Hour</h2>
            </div>

            <div className="sc_sub">
              <h2 className="sc_time">07:00 PM</h2>
              <h2 className="event">dinner</h2>
            </div>

            <div className="sc_sub">
              <h2 className="sc_time">09:00 PM</h2>
              <h2 className="event">Party Time / Dancing</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
