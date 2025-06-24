import type { DataType } from "../types/types";
import contentEn from "../locales/en.json";
import contentEs from "../locales/es.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useId, useRef, useState } from "react";

interface LanguageProps {
  handleData: (langData: DataType) => void;
}

function Language({ handleData }: LanguageProps) {
  const [currLang, setCurrLang] = useState("es");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const langElemRef = useRef<HTMLDivElement>(null);
  const menuElemId = useId();

  const langs: Record<string, Record<string, string>> = {
    es: {
      name: "Español",
      select: "Cambiar de idioma",
    },
    en: {
      name: "English",
      select: "Change language",
    },
  };

  const selectLang = (lang: string) => {
    changeLang(lang);
  };

  const changeLang = (lang: string) => {
    let data = null;

    switch (lang) {
      case "en":
        data = contentEn;
        break;
      default:
        data = contentEs;
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

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuVisible((v) => (v ? false : true));
    event.stopPropagation();
  };

  useEffect(() => {
    const locale = new Intl.Locale(navigator.language);
    const savedLang = localStorage.getItem("lang");
    const langParam = new URL(location.href).searchParams.get("lang");

    const language =
      langParam && langParam in langs
        ? langParam
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
          className="select"
          title={langs[currLang].select}
          aria-label={langs[currLang].select}
          aria-controls={menuElemId}
          aria-expanded={isMenuVisible}
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon="globe" aria-hidden={true} />
          <span className="name">{currLang}</span>
        </button>
        <ul id={menuElemId} role="listbox">
          {Object.keys(langs).map((key, i) => (
            <li
              className={key === currLang ? "active" : ""}
              role="option"
              aria-selected={key === currLang}
              key={i}
            >
              <button onClick={() => selectLang(key)}>{langs[key].name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Language;
