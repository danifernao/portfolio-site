import type { DataType } from "./types/types";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Links from "./components/Links";
import Section from "./components/Section";
import Language from "./components/Language";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

library.add(faArrowUpRightFromSquare, faGlobe);

function App() {
  const [data, setData] = useState<DataType | null>(null);
  const [isDataSet, setIsDataSet] = useState<boolean>(false);

  const handleData = (langData: DataType) => {
    setData(langData);
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
          <Header data={data.header} />
          <div id="content">
            <Section data={data.about} />
            <Skills data={data.skills} />
            <Section data={data.projects} />
            {data.blog && <Blog data={data.blog} />}
            <Section data={data.education} />
            <Links data={data.links} />
          </div>
        </>
      )}
      <Language handleData={handleData} />
    </div>
  );
}

export default App;
