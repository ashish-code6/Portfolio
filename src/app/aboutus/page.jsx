"use client";

import "./aboutus.css";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Aboutus = () => {
  const {
    content: { about },
  } = usePortfolioContent();

  return (
    <div className="container">
      <section className="about-section py-5 text-white" id="about">
        <div className="row g-5 align-items-start">
          <div className="col-lg-6" data-aos="fade-right">
            <h2 className="mb-4 text-warning">{about.heading}</h2>
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 20)}-${index}`}
                className={index < 2 ? "fs-5 mb-3" : "fs-6 home-text"}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="col-lg-6" data-aos="fade-left">
            <h3 className="text-warning mb-4">{about.highlightsHeading}</h3>
            {about.highlights.map((item, index) => (
              <div className="mb-3" key={`${item.title}-${index}`}>
                <h5 className="text-white">{item.title}</h5>
                <p className="fs-6 home-text mb-0">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section py-5 text-white" id="skills">
        <h3 className="text-center text-warning mb-4">{about.skillsHeading}</h3>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {about.skills.map((skill, index) => (
            <span
              key={index}
              className="badge bg-warning text-dark px-3 py-2 fs-6 rounded-pill"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
