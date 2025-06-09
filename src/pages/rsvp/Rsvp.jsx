import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import "./rsvp.css";

const Rsvp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    attendance: "",
    guestCount: "1",
    plusOneName: "",
    mealPreference: "",
    dietaryRestrictions: "",
    message: "",
    submittedAt: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "rsvps"), formData);
      alert("Thank you for your RSVP!");
      setFormData({
        fullName: "",
        attendance: "",
        guestCount: "1",
        plusOneName: "",
        mealPreference: "",
        dietaryRestrictions: "",
        message: "",
        submittedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rsvp">
      <div className="rep">
        <div className="rsvp_img"></div>
      </div>
      <div className="details_rsvps">
        <div className="rsvpier">
          <h2 className="rsvp_ttle">RSVP</h2>

          <p className="rsvp_p">
            We are so excited to celebrate our special day with you! Kindly RSVP BY July 1st 2025.
          </p>

          <div className="form_area">
            <form onSubmit={handleSubmit} className="rsvp_form">
              <div className="rsvp_inputer_section">
                <label htmlFor="fullName" className="rsvp_label">
                  Guest Name(s)
                </label>
                <input
                  type="text"
                  className="rsvp_input"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="rsvp_inputer_section">
                <label className="rsvp_label">Will you be attending?</label>
                <div className="attendance_options">
                  <label className="option_label">
                    <input
                      type="radio"
                      name="attendance"
                      value="accept"
                      checked={formData.attendance === "accept"}
                      onChange={handleChange}
                      required
                    />
                    <span className="option_text">Yes, joyfully accepting</span>
                  </label>
                  <label className="option_label">
                    <input
                      type="radio"
                      name="attendance"
                      value="decline"
                      checked={formData.attendance === "decline"}
                      onChange={handleChange}
                    />
                    <span className="option_text">No, regretfully declining</span>
                  </label>
                </div>
              </div>

              {formData.attendance === "accept" && (
                <>
                  <div className="rsvp_inputer_section">
                    <label className="rsvp_label">Number of Guests Attending</label>
                    <div className="attendance_options">
                      <label className="option_label">
                        <input
                          type="radio"
                          name="guestCount"
                          value="1"
                          checked={formData.guestCount === "1"}
                          onChange={handleChange}
                        />
                        <span className="option_text">Just me</span>
                      </label>
                      <label className="option_label">
                        <input
                          type="radio"
                          name="guestCount"
                          value="2"
                          checked={formData.guestCount === "2"}
                          onChange={handleChange}
                        />
                        <span className="option_text">Plus One</span>
                      </label>
                    </div>
                    {formData.guestCount === "2" && (
                      <input
                        type="text"
                        className="rsvp_input"
                        name="plusOneName"
                        value={formData.plusOneName}
                        onChange={handleChange}
                        placeholder="Plus one's name"
                        required
                      />
                    )}
                  </div>

                  <div className="rsvp_inputer_section">
                    <label className="rsvp_label">Meal Preference</label>
                    <div className="attendance_options">
                      <label className="option_label">
                        <input
                          type="radio"
                          name="mealPreference"
                          value="chicken"
                          checked={formData.mealPreference === "chicken"}
                          onChange={handleChange}
                          required={formData.attendance === "accept"}
                        />
                        <span className="option_text">Chicken</span>
                      </label>
                      <label className="option_label">
                        <input
                          type="radio"
                          name="mealPreference"
                          value="lamb"
                          checked={formData.mealPreference === "lamb"}
                          onChange={handleChange}
                        />
                        <span className="option_text">Lamb</span>
                      </label>
                      <label className="option_label">
                        <input
                          type="radio"
                          name="mealPreference"
                          value="fish"
                          checked={formData.mealPreference === "fish"}
                          onChange={handleChange}
                        />
                        <span className="option_text">Fish</span>
                      </label>
                      <label className="option_label">
                        <input
                          type="radio"
                          name="mealPreference"
                          value="vegetarian"
                          checked={formData.mealPreference === "vegetarian"}
                          onChange={handleChange}
                        />
                        <span className="option_text">Vegetarian</span>
                      </label>
                    </div>
                  </div>

                  <div className="rsvp_inputer_section">
                    <label htmlFor="dietaryRestrictions" className="rsvp_label">
                      Do you have any dietary restrictions or allergies?
                    </label>
                    <input
                      type="text"
                      className="rsvp_input"
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      placeholder="Please specify"
                    />
                  </div>
                </>
              )}

              <div className="rsvp_inputer_section">
                <label htmlFor="message" className="rsvp_label">
                  Would you like to leave a special message for the bride and groom?
                </label>
                <textarea
                  name="message"
                  className="rsvp_textarea"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>

              <div className="submit_section">
                <button
                  type="submit"
                  className="submit_button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send RSVP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rsvp;