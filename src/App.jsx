import Header from "./components/Header";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Links from "./components/Links";
import Section from "./components/Section";
import Loading from "./components/Loading";
import Language from "./components/Language";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

library.add(faArrowUpRightFromSquare, faGlobe);

function App() {
  const [data, setData] = useState(null);
  const handleData = (langData) => {
    setData(langData);
  };
  return (
    <div id="wrapper">
      {data ? (
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
      ) : (
        <Loading />
      )}
      <Language handleData={handleData} />
    </div>
  );
}

export default App;
