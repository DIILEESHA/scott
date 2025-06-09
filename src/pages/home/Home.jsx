import React from "react";
import Header from "../../components/header/Header";
import Schedule from "../../components/schedule/Schedule";
import Countdown from "../../components/countdown/Countdown";
import Registry from "../../components/header/Registry";

const Home = () => {
  return (
    <div>
      <Header />
      <Schedule />
      <Location />
      <Countdown />
      <Registry />
    </div>
  );
};

export default Home;
