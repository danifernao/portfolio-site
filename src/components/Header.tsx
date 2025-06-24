import type { HeaderType, LinksItemType } from "../types/types";
import HeaderLinks from "./HeaderLinks";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface HeaderProps {
  dataHeader: HeaderType;
  dataLinks: LinksItemType[];
}

function Header({ dataHeader, dataLinks }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);

  const viewFullImage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(true);
    event.preventDefault();
  };

  return (
    <div id="header">
      {dataHeader.photo && (
        <div>
          <a
            href="#"
            title={dataHeader.photo.title}
            onClick={viewFullImage}
            className="avatar"
          >
            <img
              src={`./images/${dataHeader.photo.pathname}`}
              alt={dataHeader.photo.alt}
            />
          </a>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: `./images/${dataHeader.photo.pathname}` }]}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
          />
        </div>
      )}
      <div>
        {dataHeader.name && (
          <h1>
            <a href="/">{dataHeader.name}</a>
          </h1>
        )}
        {dataHeader.profession && <p>{dataHeader.profession}</p>}
        {dataHeader.address && <p>{dataHeader.address}</p>}
        {dataLinks.length > 0 && <HeaderLinks links={dataLinks} />}
      </div>
    </div>
  );
}

export default Header;
