"use client";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const iconMap = {
  Facebook: FaFacebook,
  GitHub: FaGithub,
  Instagram: FaInstagram,
  LeetCode: SiLeetcode,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
};

const Profile = () => {
  const {
    content: { profile },
  } = usePortfolioContent();

  return (
    <section id="profile" className="py-5 text-white">
      <div className="container text-center">
        <h2 className="text-warning mb-4">{profile.heading}</h2>
        <div className="d-flex flex-wrap justify-content-center gap-4 fs-2">
          {profile.links.map((item, index) => {
            const Icon = iconMap[item.platform] ?? FaLinkedin;

            return (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: item.color || "#f4b400" }}
                key={`${item.platform}-${index}`}
                aria-label={item.platform}
                title={item.platform}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Profile;
