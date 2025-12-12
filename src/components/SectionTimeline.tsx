import type { TimelineType } from "../types/types";
import Screenshot from "./SectionTimelineScreenshot";
import { useEffect, useId, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "yet-another-react-lightbox/styles.css";

interface TimelineProps {
  id: string;
  list: TimelineType;
}

function Timeline({ id, list }: TimelineProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const timelineId = useId();

  const expand = () => {
    setIsHidden(false);
  };

  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    if (fragment === id) {
      setIsHidden(false);
    }
  }, []);

  return (
    <div
      id={timelineId}
      className={`timeline ${isHidden ? "" : "expanded"}`}
      aria-live="polite"
    >
      {list.items.map((item, i) => (
        <div
          className={`achievement ${isHidden && i > 1 ? "hidden" : ""}`}
          key={i}
        >
          {item.date && (
            <div className="date">
              {typeof item.date === "object"
                ? item.date.map((d, i) => <span key={i}>{d}</span>)
                : item.date}
            </div>
          )}

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
                  <Screenshot
                    pathname={item.screenshot.pathname}
                    alt={item.screenshot.alt}
                    title={item.screenshot.title}
                  />
                )}

                {item.links && (
                  <ul className="links">
                    {item.links.map((link, l) => (
                      <li key={l}>
                        <a href={link.url} target="_blank">
                          {link.text}
                        </a>
                        <FontAwesomeIcon
                          icon="arrow-up-right-from-square"
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

      {isHidden && list.items.length > 2 && (
        <div className="more">
          <FontAwesomeIcon icon="chevron-down" aria-hidden={true} />
          <button onClick={expand} aria-controls={timelineId}>
            {list.more}
          </button>
        </div>
      )}
    </div>
  );
}

export default Timeline;
