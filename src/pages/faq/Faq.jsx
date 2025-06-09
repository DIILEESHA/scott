import React, { useState } from "react";
import "./faq.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Modal, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import drinkmenu from "../../assets/bar.jpg";
import { Link } from "react-router-dom";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = drinkmenu;
    link.download = "wedding-drink-menu.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "When is the wedding?",
          answer: "Saturday, July 19th, 2025, at 3:30 PM AST.",
        },
        {
          question: "Where will the ceremony and reception take place?",
          answer:
            "Hyatt Regency Trinidad, #1 Wrightson Road, Port of Spain, Trinidad and Tobago.",
        },
        {
          question: "What is the dress code?",
          answer: (
            <>
              <p>Elegant Attire.</p>
              <p>Men: Tuxedo, formal suit, or dress shirt.</p>
              <p>Women: Evening gown or refined cocktail dress.</p>
            </>
          ),
        },
        {
          question: "What time should I arrive?",
          answer:
            "Please arrive by 3:15 PM to ensure you are seated before the ceremony begins.",
        },
        {
          question: "Is parking provided?",
          answer:
            "Yes, parking is available at Hyatt's car park. Additional information will be provided closer to the date or on the day of the wedding.",
        },
      ],
    },
    {
      category: "Ceremony & Reception Details",
      questions: [
        {
          question: "Is the ceremony indoors or outdoors?",
          answer:
            "The ceremony will be held outdoors at the Waterfront Pergolas at Hyatt, so please dress appropriately for the weather. The reception will follow at Jade, Ruby, and Sapphire Room at Hyatt.",
        },
        {
          question: "Are kids welcome?",
          answer:
            "Unfortunately, this is an adults-only event unless prior approval has been granted.",
        },
        {
          question: "Will there be food?",
          answer:
            "Absolutely! There will be a cocktail hour with three hors d'oeuvres, followed by dinner.",
        },
        {
          question: "Is there a vegetarian option?",
          answer:
            "Yes! A fish option will be available, or guests may enjoy a vegetarian meal with accompaniments and salads.",
        },
        {
          question: "Will there be an open bar?",
          answer:
            "Yes! A variety of drinks will be served, including Baileys, wines, beers, and non-alcoholic beverages.",
        },
      ],
    },
    {
      category: "Gifts & Registry",
      questions: [
        {
          question: "Where are you registered?",
          answer: (
            <>
              We are currently not registered with any specific store. However,
              you can follow this link to our online gift registry:{" "}
              <a
                href="https://www.tyreeseandhaile.com/gifts"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gift Registry
              </a>
              .
            </>
          ),
        },
        {
          question: "Can we give a monetary gift instead?",
          answer:
            "Your presence is our greatest gift! However, if you'd like to contribute, we welcome monetary gifts via cash in an envelope on the day or after. Feel free to contact us at +1 (868) 390-3269 or +1 (246) 247-8979 for details about special gifts.",
        },
      ],
    },
    {
      category: "Photos & Social Media",
      questions: [
        {
          question: "Can we take photos during the ceremony?",
          answer:
            "We'd love for you to be fully present in the moment. However, you're welcome to take photos, but please minimize flash use and avoid obstructing our photographers.",
        },
        {
          question: "Is there a wedding hashtag?",
          answer:
            "Yes! Please tag your photos with #TyreeseAndHaile2025. Connect with us on Instagram: @tyreese011 & @haileprescod",
        },
      ],
    },
    {
      category: "Other Questions",
      questions: [
        {
          question: "I have dietary restrictions. What should I do?",
          answer:
            "Please note any dietary restrictions on your RSVP card or contact us directly so we can accommodate your needs.",
        },
        {
          question: "What should I do if I can't attend?",
          answer:
            "We'll miss you! Please RSVP with regrets so we know not to expect you.",
        },
      ],
    },
  ];

  return (
    <div className="faq_container">
      <div className="faq_cover">
        <h2 className="faq_title">Frequently Asked Questions</h2>
      </div>
      <div className="faq_card_section">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq_category">
            <h3 className="faq_category_title">{category.category}</h3>
            {category.questions.map((faq, index) => (
              <div className="faq_sub_card" key={`${catIndex}-${index}`}>
                <div
                  className="faq_top"
                  onClick={() => toggleAccordion(`${catIndex}-${index}`)}
                >
                  <div className="faq_top_t">
                    <h2 className="faq_qs">{faq.question}</h2>
                  </div>
                  <div className="faq_top_t">
                    {activeIndex === `${catIndex}-${index}` ? (
                      <FaMinus />
                    ) : (
                      <FaPlus />
                    )}
                  </div>
                </div>

                <div className="line"></div>
                {activeIndex === `${catIndex}-${index}` && (
                  <div className="faq_ans">
                    <div className="faq_ans_p">{faq.answer}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Drink Menu Modal */}
      <Modal
        title="Wedding Drink Menu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="download"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Download Menu
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={drinkmenu}
            alt="Drink Menu"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p style={{ marginTop: "20px" }}>
            Our curated selection of beverages for your enjoyment!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Faq;
