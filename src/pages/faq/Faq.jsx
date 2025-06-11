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
      category: "About the Couple",
      questions: [
        {
          question: "Why are you getting married?",
          answer:
            "Scott is the love of my life. After twelve years together, our love has grown deeper through every joy and challenge. We are each other's home and best partners in life.",
        },
        {
          question: "What is the meaning behind your wedding?",
          answer:
            "We are getting married under God to unite and move forward in a new chapter of our life—to celebrate with those who have supported us throughout this journey.",
        },
      ],
    },
    {
      category: "Wedding Day Info",
      questions: [
        {
          question: "What is your goal for the wedding day?",
          answer:
            "To truly enjoy the day with minimal responsibilities. We’ve arranged support through the venue and planning team to allow us and our loved ones to simply celebrate.",
        },
        {
          question: "What is most important to you on the wedding day?",
          answer:
            "To feel beautiful, embrace the joy of the day, and be surrounded by the people who have walked this path with us. We want our wedding party to enjoy the celebration stress-free.",
        },
        {
          question: "How will you ensure the day is happy and stress-free?",
          answer:
            "By understanding we can't control everything. We'll plan with love, prepare for changes, and communicate openly with our family and friends who are helping.",
        },
      ],
    },
    {
      category: "Ceremony & Reception",
      questions: [
        {
          question: "What kind of food will be served?",
          answer:
            "All meals will be gluten-free and dairy-free. There will be no shellfish of any kind. We encourage everyone to relax and have a good time!",
        },
        {
          question: "Will alcohol be served?",
          answer:
            "Alcohol will not be provided, but it is not prohibited. Guests are welcome to celebrate responsibly in a way that feels right for them.",
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
