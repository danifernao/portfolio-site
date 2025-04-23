import type { HeaderType } from "../types/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface HeaderProps {
  data: HeaderType;
}

function Header({ data }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);

  const viewFullImage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(true);
    event.preventDefault();
  };

  return (
    <div id="header">
      {data.photo && (
        <div>
          <a
            href="#"
            title={data.photo.title}
            onClick={viewFullImage}
            className="avatar"
          >
            <img src={`./images/${data.photo.pathname}`} alt={data.photo.alt} />
          </a>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: `./images/${data.photo.pathname}` }]}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
          />
        </div>
      )}
      <div>
        {data.name && (
          <h1>
            <a href="/">{data.name}</a>
          </h1>
        )}
        {data.profession && <p>{data.profession}</p>}
        {data.address && <p>{data.address}</p>}
      </div>
    </div>
  );
}

export default Header;
