import { useEffect } from "react";
import { DataType } from "../types/types";

interface MenuProps {
  data: DataType;
}

function Menu({ data }: MenuProps) {
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

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ul id="menu">
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
  );
}

export default Menu;
