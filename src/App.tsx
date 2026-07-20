import { library } from "@fortawesome/fontawesome-svg-core";
import "devicon/devicon.min.css";
import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Header from "./components/Header";
import Language from "./components/Language";
import Links from "./components/Links";
import ScrollToTop from "./components/ScrollToTop";
import Section from "./components/Section";
import Skills from "./components/Skills";
import type { DataType } from "./types/types";

import {
  faArrowUpRightFromSquare,
  faBars,
  faChevronDown,
  faChevronUp,
  faCircleNotch,
  faGlobe,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Contact from "./components/Contact";
import Menu from "./components/Menu";

library.add(
  faArrowUpRightFromSquare,
  faBars,
  faChevronUp,
  faChevronDown,
  faCircleNotch,
  faGithub,
  faGlobe,
  faLinkedin,
  faXmark,
);

function App() {
  const [data, setData] = useState<DataType | null>(null);

  const handleData = (langData: DataType) => {
    setData(langData);
  };

  useEffect(() => {
    if (!data) return;

    if (location.hash.length > 1) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView();
      }
    }
  }, [data]);

  return (
    <div id="wrapper">
      {data && (
        <>
          <Header data={data} />
          <main id="content">
            <Section type="about" data={data} />
            <Skills data={data.skills} />
            <Section type="projects" data={data} />
            {data.blog && <Blog data={data} />}
            <Section type="education" data={data} />
            <Contact data={data.contact} />
            <Links data={data.links} />
          </main>
          <aside id="sidebar">
            <Menu data={data} />
          </aside>
        </>
      )}
      <Language handleData={handleData} />
      {data && <ScrollToTop btnText={data.common.scrollToTop} />}
    </div>
  );
}

export default App;
