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
            Twelve years ago, fate brought us together and began a journey
            neither of us could have predicted. Through seasons of joy and
            moments of trial, our connection only grew stronger. Even in the
            times we drifted apart, our hearts held tight to something
            sacred—something unbreakable. We were, and are, each other’s home.
          </p>
          <p>
            I’ll never forget the night in Thermopolis—of all places—when
            laughter filled the air, and under a starlit sky, I fell into the
            water only to be caught by you. It was silly, unexpected, and
            perfect. That moment whispered forever, and every “I love you” since
            has only deepened that truth.
          </p>
        </>
      ),
    },
    "first-date": {
      title: "The First Date",
      content: (
        <>
          <p>
            Our story didn’t follow a typical script. Instead of one magical
            date, we built our love through years of shared laughter, quiet
            conversations, and thousands of small, perfect moments. We grew up
            together—learning, evolving, forgiving, and choosing each other
            again and again.
          </p>
          <p>
            There wasn’t just one “first date.” There were countless
            beginnings—each one showing me that no one could ever understand me
            the way you do. And through it all, you’ve remained the calm to my
            chaos, the smile in my day, and the steady presence who grounds me.
          </p>
        </>
      ),
    },
    proposal: {
      title: "The Proposal",
      content: (
        <>
          <p>
            With you, love is a river—steady, strong, and full of grace. It
            carries us forward, heals wounds, dissolves fear, and makes space
            for something new. Something holy. Through everything, you have seen
            me—even when I struggled to see myself.
          </p>
          <p>
            Scott, you are the love of my life. The peanut butter to my joke.
            The calm to my chaos. My best friend and the one I will love and
            honor all the days of my life. I vow to walk beside you through
            every season, to let love lead us when we falter, and to choose you
            again and again. With a promise written deep in my
            soul—unconditionally, and for all time.
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
              <div className="timeline-body">
                <p>
                  Twelve years ago, fate brought us together and began a journey
                  neither of us could have predicted. Through seasons of joy and
                  moments of trial, our connection only grew stronger. Even in
                  the times we drifted apart...
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
                backgroundImage: `url('https://i.imgur.com/AHnoxFX.jpeg')`,
              }}
            ></div>
            <div className="timeline-text">
              <h2 className="timeline-title">The First Date</h2>
              <div className="timeline-body">
                <p>
                  Our story didn’t follow a typical script. Instead of one
                  magical date, we built our love through years of shared
                  laughter, quiet conversations, and thousands of small, perfect
                  moments...
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
                backgroundImage: `url('https://i.imgur.com/0nl2l1M.jpeg')`,
              }}
            ></div>
            <div className="timeline-text">
              <h2 className="timeline-title">The Proposal</h2>
              <div className="timeline-body">
                <p>
                  With you, love is a river—steady, strong, and full of grace.
                  It carries us forward, heals wounds, dissolves fear, and makes
                  space for something new. Something holy...
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
