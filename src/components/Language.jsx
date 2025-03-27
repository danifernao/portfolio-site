import langEn from "../assets/lang/en.json";
import langEs from "../assets/lang/es.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useId, useRef, useState } from "react";

function Language({ handleData }) {
  const [currLang, setCurrLang] = useState("es");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const langElemRef = useRef();
  const menuElemId = useId();

  const langs = {
    es: {
      name: "Español",
      select: "Cambiar de idioma",
    },
    en: {
      name: "English",
      select: "Change language",
    },
  };

  const selectLang = (event, lang) => {
    changeLang(lang);
    event.preventDefault();
  };

  const changeLang = (lang) => {
    let data = null;

    switch (lang) {
      case "en":
        data = langEn;
        break;
      default:
        data = langEs;
        break;
    }

    handleData(data);
    setCurrLang(lang);
    localStorage.setItem("lang", lang);

    document.documentElement.lang = lang;
    document.title = data.header.name;
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const toggleMenu = (event) => {
    setIsMenuVisible((v) => (v ? false : true));
    event.stopPropagation();
  };

  useEffect(() => {
    const locale = new Intl.Locale(navigator.language);
    const savedLang = localStorage.getItem("lang");
    const urlParams = new URL(location.href).searchParams;

    const language =
      urlParams.has("lang") && urlParams.get("lang") in langs
        ? urlParams.get("lang")
        : savedLang
        ? savedLang
        : locale.language in langs
        ? locale.language
        : currLang;

    changeLang(language);

    document.addEventListener("click", hideMenu);

    return () => {
      document.removeEventListener("click", hideMenu);
    };
  }, []);

  return (
    <div
      className={`language ${isMenuVisible ? "menu-visible" : ""}`}
      ref={langElemRef}
    >
      <div>
        <button
          aria-controls={menuElemId}
          title={langs[currLang].select}
          aria-expanded={isMenuVisible}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon="fa-solid fa-globe" aria-hidden={true} />
          <span className="name">{langs[currLang].name}</span>
        </button>
        <ul id={menuElemId}>
          {Object.keys(langs).map((key, i) => (
            <li key={i}>
              <a
                href="#"
                className={key === currLang ? "active" : ""}
                onClick={(event) => selectLang(event, key)}
              >
                {langs[key].name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Language;
