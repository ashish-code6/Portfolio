"use client";

import "./project.css";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Project = () => {
  const {
    content: { projects },
  } = usePortfolioContent();

  return (
    <section id="project">
      <div className="container py-5" id="projects">
        <h2 className="text-center text-warning mb-5" data-aos="fade-down">
          {projects.heading}
        </h2>

        <div className="row g-4">
          {projects.items.map((project, index) => (
            <div
              className="col-md-6"
              key={`${project.name}-${index}`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-img-wrapper"
              >
                <img src={project.image} alt={project.name} className="img-fluid rounded" />
                <div className="project-overlay">
                  <h5 className="text-warning mb-2">{project.name}</h5>
                  <p className="mb-1">{project.description}</p>
                  <p className="mb-1">
                    <strong>Frontend:</strong> {project.frontend.join(", ")}
                  </p>
                  <p>
                    <strong>Backend:</strong> {project.backend.join(", ")}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        <h3 className="text-warning mt-5" data-aos="fade-up">
          {projects.upcomingHeading}
        </h3>
        <ul className="list-group list-group-flush mt-3">
          {projects.upcoming.map((item, idx) => (
            <li
              className="list-group-item bg-dark text-white"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              key={`${item.name}-${idx}`}
            >
              <strong>{item.name}</strong> - <span className="home-text">{item.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Project;
