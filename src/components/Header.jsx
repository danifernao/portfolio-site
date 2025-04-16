import { useState } from "react";
import PropTypes from "prop-types";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Header({ data }) {
  const [open, setOpen] = useState(false);

  const viewFullImage = (e) => {
    setOpen(true);
    e.preventDefault();
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
            <img src={`./images/${data.photo.pathname}`} aly={data.photo.alt} />
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

Header.PropTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    profession: PropTypes.string,
    address: PropTypes.string,
    photo: PropTypes.shape({
      title: PropTypes.string,
      pathname: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
};

export default Header;
