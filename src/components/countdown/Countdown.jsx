import { useState, useEffect } from "react";
import "./c.css";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date("2025-08-23T00:00:00");
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days: days.toString().padStart(3, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="master mind">
      <div className="schedule_container pala">
        <div className="dolly">
          <div className="tcx">
            <h2 className="sc_title">Let the countdown begin</h2>
          </div>

          <div className="sc_grid">
            <div className="sc_sub">
              <h2 className="sc_time ball">{timeLeft.days}</h2>
              <h2 className="event">Days</h2>
            </div>
            <div className="sc_sub">
              <h2 className="sc_time ball">{timeLeft.hours}</h2>
              <h2 className="event">Hours</h2>
            </div>
            <div className="sc_sub">
              <h2 className="sc_time ball">{timeLeft.minutes}</h2>
              <h2 className="event">Minutes</h2>
            </div>
            <div className="sc_sub">
              <h2 className="sc_time ball">{timeLeft.seconds}</h2>
              <h2 className="event">Seconds</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;