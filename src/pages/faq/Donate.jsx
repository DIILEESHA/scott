import React from "react";

const Donate = () => {
  return (
    <div className="delta">
      <img className="zz" src="https://i.imgur.com/0uUPXXD.png" alt="" />

      <h2 className="faq_title">Your Love, Your Gift</h2>
      <p className="faq_subtext">
        We’re so grateful for your presence in our lives. Instead of a gift registry,
        we invite you to consider making a donation to our church community that has
        played a meaningful role in our journey.
      </p>

      <p className="faq_subtext">
        If you'd like to give, please visit the link below. Your generosity is deeply appreciated!
      </p>
 <p className="faq_subtext">
        You can use the QR code or the button below to donate to Vineyard Longmont.
      </p>
      <button className="xs">
        <a
          href="https://www.vineyardlongmont.org"
          target="_blank"
          rel="noopener noreferrer"
          className="upload_button"
        >
          Donate to Vineyard Longmont
        </a>
      </button>
    </div>
  );
};

export default Donate;
