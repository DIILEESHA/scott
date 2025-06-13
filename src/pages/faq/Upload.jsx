import React from "react";

const Upload = () => {
  return (
    <div className="delta">
      <img className="zz" src="https://i.imgur.com/muxsn9I.png" alt="" />

      <h2 className="faq_title">Upload Your Memories in a Snap</h2>
      <p className="faq_subtext">
        Celebrate the special moments with us by sharing your photos! Simply
        scan the QR code below to upload pictures directly from your phone. Your
        contributions will help us create a memorable gallery of cherished
        memories. Let’s make this event unforgettable together!
      </p>

         <p className="faq_subtext">
        You can use the QR code or the button below to upload your snaps!
      </p>
      <button className="xs">
        {" "}
        <a
          href="https://www.dropbox.com/request/uXOI9OlOaKz0aYKJ4D8v"
          target="_blank"
          rel="noopener noreferrer"
          className="upload_button"
        >
          Upload Files via Dropbox
        </a>
      </button>
    </div>
  );
};

export default Upload;
