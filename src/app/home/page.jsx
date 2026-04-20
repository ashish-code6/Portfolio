"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./home.css";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Home = () => {
  const {
    content: { home },
  } = usePortfolioContent();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="background-img">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-6 col-sm-12" data-aos="fade-left">
            <h1 className="display-4 fw-bold text-warning">{home.greeting}</h1>
            <h2 className="h4 text-white mb-4">{home.role}</h2>
            <p className="lead mb-3 home-text">{home.summary}</p>
            <p className="mb-4 home-text">{home.description}</p>
            <a href={home.resumeUrl} download className="btn btn-warning fw-semibold px-4 py-2">
              {home.resumeLabel}
            </a>
          </div>

          <div className="col-xl-6 col-md col-sm-12" data-aos="fade-down">
            <div className="profile-img d-flex justify-content-end">
              <img src={home.profileImage} alt="profile" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
