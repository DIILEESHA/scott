import React, { useState } from "react";
import "./ourstory.css";

const OurStory = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalId) => {
    setActiveModal(modalId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  const storyContent = {
    "how-we-met": {
      title: "How We Met",
      content: (
        <>
          <p>
            🌿Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            autem expedita ducimus libero sapiente numquam consequatur qui.
            Quibusdam animi illo nihil! Aliquam cum adipisci porro maxime
            perspiciatis mollitia, ipsum minus.
          </p>
        </>
      ),
    },
    "first-date": {
      title: "The First Date",
      content: (
        <>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
            delectus doloremque quo sit! Labore dicta aliquam deserunt veritatis
            culpa in quibusdam ex nulla minus amet, enim animi sint voluptate
            quo quasi quia, consequatur nisi natus eaque facere, nostrum error
            a!
          </p>
        </>
      ),
    },
    proposal: {
      title: "The Proposal",
      content: (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil illo
            quod autem! Ad quam, odit esse officiis quae illo modi vel ratione
            ipsum vero iusto delectus ea facilis quod rerum. Eveniet magni iure,
            nobis doloremque nihil magnam at voluptatum sit aut, pariatur eum
            dignissimos cupiditate, commodi repellat. Reprehenderit, aliquam
            repellendus!
          </p>
        </>
      ),
    },
  };

  return (
    <div className="story-container">
      <div className="faq_cover dalsi">
        <h2 className="faq_title">Our Love Story</h2>
      </div>
      {/* Timeline Section */}
      <div className="story-timeline">
        {/* Timeline Item 1 - How We Met */}
        <div className="timeline-item">
          <div className="timeline-content animate-left">
            <div
              className="timeline-image"
              style={{
                backgroundImage: `url('https://i.imgur.com/ayfVgSu.jpeg')`,
              }}
            ></div>
            <div className="timeline-text">
              <h2 className="timeline-title">How We Met</h2>
              <div className="timeline-date">May 2022</div>
              <div className="timeline-body">
                <p>
                  🌿 Lorem  aperiam, dolorem expedita veritatis
                  adipisci repudiandae nisi amet mollitia eligendi quae tenetur
                  non? Cupiditate pariatur impedit, ullam rem voluptatum
                  possimus saepe laborum!..
                </p>
                <button
                  className="read-more"
                  onClick={() => openModal("how-we-met")}
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
          <div className="timeline-dot nasi"></div>
        </div>

        {/* Timeline Item 2 - First Date */}
        <div className="timeline-item">
          <div className="timeline-content animate-right">
            <div
              className="timeline-image"
              style={{
                         backgroundImage: `url('https://i.imgur.com/ayfVgSu.jpeg')`,

              }}
            ></div>
            <div className="timeline-text">
              <h2 className="timeline-title">The First Date</h2>
              <div className="timeline-date">July 5, 2024</div>
              <div className="timeline-body">
               <p>
                  🌿 Lorem  aperiam, dolorem expedita veritatis
                  adipisci repudiandae nisi amet mollitia eligendi quae tenetur
                  non? Cupiditate pariatur impedit, ullam rem voluptatum
                  possimus saepe laborum!..
                </p>
                <button
                  className="read-more"
                  onClick={() => openModal("first-date")}
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
          <div className="timeline-dot pasi"></div>
        </div>

        {/* Timeline Item 3 - Proposal */}
        <div className="timeline-item">
          <div className="timeline-content animate-left">
            <div
              className="timeline-image nalagiri"
              style={{
                   backgroundImage: `url('https://i.imgur.com/ayfVgSu.jpeg')`,

              }}
            ></div>
            <div className="timeline-text">
              <h2 className="timeline-title">The Proposal</h2>
              <div className="timeline-date">December 31, 2024</div>
              <div className="timeline-body">
                <p>
                  🌿 Lorem  aperiam, dolorem expedita veritatis
                  adipisci repudiandae nisi amet mollitia eligendi quae tenetur
                  non? Cupiditate pariatur impedit, ullam rem voluptatum
                  possimus saepe laborum!..
                </p>
                <button
                  className="read-more"
                  onClick={() => openModal("proposal")}
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
          <div className="timeline-dot nasi"></div>
        </div>
      </div>

      {/* Full Story Modal */}
      {activeModal && (
        <div className="story-modal active">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h2>{storyContent[activeModal].title}</h2>
            <div className="modal-body">
              {storyContent[activeModal].content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurStory;
