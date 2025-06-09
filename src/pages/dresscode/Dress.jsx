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
      question: "Dress Code",
      answer: (
        <>
          <p className="dress-code-intro">Sophisticated, Elegant Attire</p>
        </>
      ),
    },
    {
      question: "For Men",
      answer: (
        <>
          <div className="guideline-section">
            <ul className="kos">
              <li>Tuxedo</li>
              <li>Formal suit</li>
              <li>Dress shirt with tie</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      question: "For Women",
      answer: (
        <>
          <div className="guideline-section">
            <ul className="kos">
              <li>Evening gown</li>
              <li>Refined cocktail dress</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      question: "Color Consideration",
      answer: (
        <>
          <div className="color-section">
            <p>
              Out of respect for the event's theme, please refrain from wearing
              solid red.
            </p>
          </div>
        </>
      ),
    },
    {
      question: "Examples for Inspiration",
      answer: (
        <div className="inspiration-slider">
          <Slider {...sliderSettings}>
            <div className="slide-item">
              <img
                src="https://i.imgur.com/fukH1FR.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>
            <div className="slide-item">
              <img
                src="https://i.imgur.com/6OOQkLl.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
            <div className="slide-item">
              <img
                src="https://i.imgur.com/nCYDv26.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
            <div className="slide-item">
              <img
                src="https://i.imgur.com/W4nqcZU.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
            <div className="slide-item">
              <img
                src="https://i.imgur.com/w5w76TE.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>
            <div className="slide-item">
              <img
                src="https://i.imgur.com/Y4e2Z9X.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
            <div className="slide-item">
              <img
                src="https://i.imgur.com/sZANsBe.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
            <div className="slide-item">
              <img
                src="https://i.imgur.com/BCE5zg7.jpeg"
                alt="Formal black suit with bowtie"
              />
            </div>{" "}
          </Slider>
        </div>
      ),
    },
  ];

  return (
    <div className="faq_container">
      <div className="faq_cover mallika">
        <h2 className="faq_title" style={{ color: "#fff" }}>
          Dress Code: Sophisticated Elegance
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
