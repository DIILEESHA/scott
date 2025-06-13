import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./sc.css";

const scheduleItems = [
  { time: "05:00–5:30 PM", event: "Arrival" },
  { time: "05:00–6:00 PM", event: "Appetizers" },
  { time: "Around 6:00 PM", event: "Ceremony (as led by pastor)" },
  { time: "After Ceremony", event: "Move chairs to tables" },
  { time: "6:45–7:15 PM", event: "Candle Lighting + Mingle & Appetizers" },
  { time: "7:15–7:45 PM", event: "Dinner" },
  { time: "7:45 PM", event: "Cake Cutting & Speeches" },
  { time: "8:00 PM", event: "Dancing" },
  { time: "9:30 PM", event: "Closing Time" },
];

const Schedule = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="master">
      <div className="schedule_container">
        <div className="dolly">
          <h2 className="sc_title">Here's a sneak peek of</h2>
          <h1 className="sc">our special day's schedule</h1>
            <div className="swiper_nav">
              <button ref={prevRef} className="swiper-button prev-btn">
                <FaChevronLeft />
              </button>
              <button ref={nextRef} className="swiper-button next-btn">
                <FaChevronRight />
              </button>
            </div>
          <div className="dcx">

            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Navigation, Pagination, Autoplay]}
            >
              {scheduleItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="sc_sub">
                    <h2 className="sc_time">{item.time}</h2>
                    <p className="event">{item.event}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
