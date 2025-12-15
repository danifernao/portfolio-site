import type { DataType, LinksType, LinksItemType } from "./types/types";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Links from "./components/Links";
import Section from "./components/Section";
import Language from "./components/Language";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { library } from "@fortawesome/fontawesome-svg-core";
import "devicon/devicon.min.css";

import {
  faArrowUpRightFromSquare,
  faBars,
  faChevronUp,
  faChevronDown,
  faCircleNotch,
  faGlobe,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faHackerrank,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
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
  faHackerrank,
  faLinkedin,
  faXmark
);

function App() {
  const [data, setData] = useState<DataType | null>(null);
  const [isDataSet, setIsDataSet] = useState<boolean>(false);

  const handleData = (langData: DataType) => {
    setData(langData);
  };

  const getHeaderLinks = (links: LinksType): LinksItemType[] => {
    return links && links.items ? links.items.filter((item) => item.icon) : [];
  };

  useEffect(() => {
    if (data && !isDataSet) {
      setIsDataSet(true);
      if (location.hash.length > 1) {
        const elem = document.querySelector(location.hash);
        if (elem) {
          elem.scrollIntoView();
        }
      }
    }
  }, [data]);

  return (
    <div id="wrapper">
      {data && (
        <>
          <Header
            dataHeader={data.header}
            dataLinks={getHeaderLinks(data.links)}
          />
          <div id="content">
            <Section data={data.about} />
            <Skills data={data.skills} />
            <Section data={data.projects} />
            <Section data={data.education} />
            <Contact data={data.contact} />
            <Links data={data.links} />
            {import.meta.env.VITE_EXPERIMENTAL_MODE === "true" && data.blog && (
              <Blog data={data.blog} />
            )}
          </div>
          <div id="sidebar">
            <Menu data={data} />
          </div>
        </>
      )}
      <Language handleData={handleData} />
      {data && <ScrollToTop btnText={data.common.scrollToTop} />}
    </div>
  );
}

export default App;
