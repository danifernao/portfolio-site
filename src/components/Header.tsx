import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { DataType } from "../types/types";

interface HeaderProps {
  data: DataType;
}

function Header({ data }: HeaderProps) {
  const [header, links, common] = [
    data.header,
    data.links.items.filter((item) => item.icon),
    data.common,
  ];

  const [open, setOpen] = useState<boolean>(false);

  const viewFullImage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(true);
    event.preventDefault();
  };

  return (
    <header id="header">
      {/* Columna del avatar */}
      {header.photo && (
        <div>
          <a
            href="#"
            title={common.zoomIn}
            onClick={viewFullImage}
            className="avatar"
          >
            <img
              src={`./images/${header.photo.pathname}`}
              alt={header.photo.alt}
            />
          </a>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: `./images/${header.photo.pathname}` }]}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
          />
        </div>
      )}

      {/* Columna de la información general */}
      <div className="info-col">
        {header.name && (
          <h1>
            <a href="/">{header.name}</a>
          </h1>
        )}

        {header.profession && <p>{header.profession}</p>}
        {header.address && <p>{header.address}</p>}

        {links.length > 0 && (
          <ul>
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  title={link.title}
                  aria-label={link.title}
                  target="_blank"
                >
                  <FontAwesomeIcon
                    icon={["fab", link.icon] as IconProp}
                    aria-hidden={true}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
