import { useEffect, useRef, useState } from "react";
import { DataType } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MenuProps {
  data: DataType;
}

function Menu({ data }: MenuProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isValidItem = (obj: unknown): obj is { id: string; title: string } => {
    if (
      typeof obj === "object" &&
      obj !== null &&
      "id" in obj &&
      "title" in obj
    ) {
      return true;
    }
    return false;
  };

  const scrollInto = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    e.preventDefault();
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuVisible((v) => (v ? false : true));
    event.stopPropagation();
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const links = document.querySelectorAll("#menu a");

    const onScroll = () => {
      let activeSection = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top >= 0 || rect.bottom > 0) {
          activeSection = section;
          break;
        }
      }

      if (!activeSection) return;

      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${activeSection.id}`
        );
      });
    };

    window.addEventListener("scroll", () => {
      onScroll();
      buttonRef.current?.classList.toggle("at-top", window.scrollY === 0);
    });

    onScroll();

    document.addEventListener("click", hideMenu);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", hideMenu);
    };
  }, []);

  return (
    <div id="menu" className={`${isMenuVisible ? "visible" : ""}`}>
      <button
        onClick={toggleMenu}
        ref={buttonRef}
        className="open at-top"
        title={data.common.openMenu}
        aria-label={data.common.openMenu}
        aria-controls="main-menu"
        aria-expanded={isMenuVisible}
      >
        <FontAwesomeIcon icon="bars" aria-hidden={true} />
      </button>
      <div id="main-menu" className="main">
        <button
          className="close"
          title={data.common.closeMenu}
          aria-label={data.common.closeMenu}
          aria-controls="main-menu"
          aria-expanded={isMenuVisible}
        >
          <FontAwesomeIcon icon="xmark" aria-hidden={true} />
        </button>
        <ul>
          {Object.entries(data).map(
            ([key, value]) =>
              key !== "hidden" &&
              isValidItem(value) && (
                <li key={key}>
                  <a
                    href={`#${value["id"]}`}
                    onClick={(e) => scrollInto(e, value["id"])}
                  >
                    {value["title"]}
                  </a>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
