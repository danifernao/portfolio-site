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

import {
  faArrowUpRightFromSquare,
  faChevronUp,
  faChevronDown,
  faCircleNotch,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import Contact from "./components/Contact";

library.add(
  faArrowUpRightFromSquare,
  faChevronUp,
  faChevronDown,
  faCircleNotch,
  faGithub,
  faGlobe,
  faLinkedin
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
            {data.blog && <Blog data={data.blog} />}
            <Section data={data.education} />
            <Contact data={data.contact} />
            <Links data={data.links} />
          </div>
        </>
      )}
      <Language handleData={handleData} />
      {data && <ScrollToTop btnText={data.scrollToTop} />}
    </div>
  );
}

export default App;
