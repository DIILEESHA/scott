import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./dress.css";

const DressCode = () => {
  const [activeIndex, setActiveIndex] = useState("");

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const dressCodeSections = [
    {
      question: "Our Dress Code Philosophy",
      answer: (
        <>
          <p className="dress-code-intro">
            We want you to feel completely yourself and fully at ease on our
            special day. There’s no formal dress code for guests—whether you’re
            drawn to something laid-back, vibrant, or a bit dressy, we welcome
            it all.
          </p>
        </>
      ),
    },
    {
      question: "What We’ll Be Wearing",
      answer: (
        <>
          <p>
            Our wedding party will be in formal wedding attire, so you'll see
            tuxes, gowns, and everything in between. But don’t let that guide
            your outfit—wear what feels right for you.
          </p>
        </>
      ),
    },
    {
      question: "Dancing in the Grass",
      answer: (
        <>
          <p>
            We’ll be celebrating outdoors, dancing on grass under the stars—so
            feel free to kick off your heels, bring your comfiest flats, or even
            go barefoot. This is a night for laughter and joy, not sore feet!
          </p>
        </>
      ),
    },
    {
      question: "A Note from the Couple",
      answer: (
        <>
          <p>
            The most important thing to us is having you there—comfortable,
            smiling, and ready to celebrate. No fashion pressure. Come as you
            are and let’s make it a night to remember.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="faq_container">
      <div className="faq_cover mallika">
        <h2 className="faq_title" style={{ color: "#fff" }}>
            What to Wear & How to Feel

        </h2>
      </div>

      <div className="faq_card_section">
        {dressCodeSections.map((section, index) => (
          <div className="faq_sub_card" key={index}>
            <div className="faq_top" onClick={() => toggleAccordion(index)}>
              <div className="faq_top_t">
                <h2 className="faq_qs">{section.question}</h2>
              </div>
              <div className="faq_top_t">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </div>
            </div>

            <div className="line"></div>
            {activeIndex === index && (
              <div className="faq_ans">
                <div className="faq_ans_p">{section.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DressCode;
