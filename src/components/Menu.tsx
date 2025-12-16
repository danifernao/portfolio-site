import { useEffect, useRef, useState } from "react";
import { DataType } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MenuProps {
  data: DataType;
}

function Menu({ data }: MenuProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isValidItem = (
    obj: unknown
  ): obj is { showInMenu: boolean; id: string; title: string } => {
    if (
      typeof obj === "object" &&
      obj !== null &&
      "showInMenu" in obj &&
      obj.showInMenu === true &&
      "id" in obj &&
      "title" in obj
    ) {
      return true;
    }
    return false;
  };

  const scrollInto = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    history.pushState(null, "", `#${id}`);

    setIsMenuVisible(false);

    event.preventDefault();
  };

  const toggleMenu = () => {
    setIsMenuVisible((v) => (v ? false : true));
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      !buttonRef.current?.contains(target)
    ) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const links = document.querySelectorAll("#menu a");

    const onScroll = () => {
      const viewportHeight = window.innerHeight;
      let activeSections = [];

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top < viewportHeight && rect.bottom > 0) {
          activeSections.push(section.id);
        }
      }

      if (!activeSections.length) return;

      links.forEach((link) => {
        const id = link.getAttribute("href")?.substring(1);

        if (!id) return;

        link.classList.toggle("active", activeSections.includes(id));
      });
    };

    const handleScroll = () => {
      onScroll();
      buttonRef.current?.classList.toggle("at-top", window.scrollY === 0);
    };

    onScroll();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [data]);

  return (
    <div id="menu" className={`${isMenuVisible ? "visible" : ""}`}>
      <button
        onClick={toggleMenu}
        ref={buttonRef}
        className="open at-top"
        title={data.common.openMenu}
        aria-label={data.common.openMenu}
        aria-controls="menu-panel"
        aria-expanded={isMenuVisible}
      >
        <FontAwesomeIcon icon="bars" aria-hidden={true} />
      </button>
      <div id="menu-panel" ref={menuRef} aria-hidden={!isMenuVisible}>
        <button
          onClick={() => setIsMenuVisible(false)}
          className="close"
          title={data.common.closeMenu}
          aria-label={data.common.closeMenu}
        >
          <FontAwesomeIcon icon="xmark" aria-hidden={true} />
        </button>
        <nav>
          <ul>
            {Object.entries(data).map(
              ([key, value]) =>
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
        </nav>
      </div>
    </div>
  );
}

export default Menu;
