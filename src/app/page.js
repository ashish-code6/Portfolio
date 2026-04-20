import Aboutus from "./aboutus/page";
import Contact from "./contact/page";
import Education from "./education/page";
import Home from "./home/page";
import Profile from "./profile/page";
import Project from "./project/page";

export default function App() {
  return (
    <>
        <Home/>
        <Aboutus/>
        <Education/>
        <Project/>
        <Profile/>
        <Contact/>
    </>
  );
}
