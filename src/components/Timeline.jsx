import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Timeline({ id, items }) {
  const [isHidden, setIsHidden] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);

  const expand = (e) => {
    setIsHidden(false);
    e.preventDefault();
  };

  const toggleLightbox = (e, src = null) => {
    setImageSrc(src ? `./images/${src}` : null);
    if (e) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (fragment === id) {
      setIsHidden(false);
    }
  }, []);

  return (
    <div className={`timeline ${isHidden ? "" : "expanded"}`}>
      {items.map((item, i) => (
        <div
          className={`achievement ${isHidden && i > 1 ? "hidden" : ""}`}
          key={i}
        >
          {item.date && <div className="date">{item.date}</div>}
          {item.title && <h3 className="title">{item.title}</h3>}

          <div className="details">
            {item.description && (
              <div className="description">
                {item.description.split("\n").map((paragraph, j) => (
                  <ReactMarkdown children={paragraph} key={j} />
                ))}
              </div>
            )}

            {item.tags && (
              <ul className="tags">
                {item.tags.map((tag, k) => (
                  <li key={k}>{tag}</li>
                ))}
              </ul>
            )}

            {(item.screenshot || item.links) && (
              <div className="source">
                {item.screenshot && (
                  <div className="screenshot">
                    <a
                      href="#"
                      title="Ampliar imagen"
                      onClick={(e) => toggleLightbox(e, item.screenshot)}
                    >
                      <img
                        src={`./images/${item.screenshot}`}
                        alt="Captura de pantalla del proyecto"
                      />
                    </a>
                  </div>
                )}

                {item.links && (
                  <ul className="links">
                    {item.links.map((link, l) => (
                      <li key={l}>
                        <a href={link.url} target="_blank">
                          {link.text}
                        </a>
                        <FontAwesomeIcon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          aria-hidden={true}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {isHidden && items.length > 2 && (
        <div className="more">
          <a
            href="#"
            aria-expanded={!isHidden}
            aria-controls="projects"
            onClick={expand}
          >
            Ver más proyectos...
          </a>
        </div>
      )}

      <Lightbox
        open={imageSrc}
        close={toggleLightbox}
        slides={[{ src: imageSrc }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}

Timeline.PropTypes = {
  id: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      screnshoot: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          text: PropTypes.string,
        })
      ),
    })
  ),
};

export default Timeline;
