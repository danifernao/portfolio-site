import data from "./assets/data.json";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Links from "./components/Links";
import Section from "./components/Section";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUpRightFromSquare);

function App() {
  return (
    <div id="wrapper">
      <Header data={data.header} />
      <div id="content">
        <Section data={data.about} />
        <Skills data={data.skills} />
        <Section data={data.projects} />
        <Section data={data.education} />
        <Links data={data.links} />
      </div>
    </div>
  );
}

export default App;
