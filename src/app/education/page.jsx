"use client";

import "./education.css";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Education = () => {
  const {
    content: { education },
  } = usePortfolioContent();

  return (
    <div className="container py-5" id="education">
      <h2 className="text-center text-warning mb-5" data-aos="fade-down">
        {education.heading}
      </h2>

      <div className="timeline">
        {education.items.map((item, index) => (
          <div
            className={`timeline-item ${item.side === "right" ? "right" : "left"}`}
            data-aos={item.side === "right" ? "fade-left" : "fade-right"}
            key={`${item.title}-${index}`}
          >
            <div className="card shadow-sm p-4 bg-dark text-white">
              <h5 className="text-warning">{item.title}</h5>
              {item.subtitle ? <p className="mb-1">{item.subtitle}</p> : null}
              {item.detail ? <p className="mb-1">{item.detail}</p> : null}
              <p className="mb-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warning text-decoration-underline"
                >
                  {item.school}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
