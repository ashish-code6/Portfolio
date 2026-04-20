"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Contact = () => {
  const {
    content: { contact },
  } = usePortfolioContent();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: contact.accessKey,
        ...formData,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message. Please try again.");
    }
  };

  const inputStyle = {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "inset 5px 5px 15px #0a0a0a, inset -5px -5px 15px #1a1a1a",
  };

  return (
    <section id="contact" className="py-5" style={{ backgroundColor: "#000", color: "#fff" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-warning" data-aos="fade-down">
            {contact.heading}
          </h2>
          <p className="lead text-light" data-aos="fade-up" data-aos-delay="200">
            {contact.subheading}
          </p>
        </div>

        <div
          className="card p-4 border-0 rounded-4 mx-auto"
          style={{
            maxWidth: "700px",
            background: "linear-gradient(145deg, #1a1a1a, #0d0d0d)",
            color: "#fff",
            transform: "rotateX(1deg) rotateY(2deg)",
            boxShadow: "10px 10px 30px #111, -10px -10px 30px #222",
          }}
          data-aos="zoom-in"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-semibold text-light">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-semibold text-light">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label fw-semibold text-light">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                className="form-control"
                placeholder="Type your message..."
                required
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-warning px-5 py-2 fw-bold shadow">
                {contact.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
