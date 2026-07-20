import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useId, useState } from "react";
import ReactMarkdown from "react-markdown";
import "yet-another-react-lightbox/styles.css";
import type { TimelineType } from "../types/types";
import Screenshot from "./SectionTimelineScreenshot";

interface TimelineProps {
  id: string;
  list: TimelineType;
  common: Record<string, string>;
}

function Timeline({ id, list, common }: TimelineProps) {
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
  }, [id]);

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
            <div className="date-wrapper">
              <time className="date" dateTime={item.date}>
                {item.date.split("-").map((part, j) => (
                  <span key={j}>{part}</span>
                ))}
              </time>
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

            {(item.screenshot || item.links) && (
              <div className="source">
                {item.screenshot && (
                  <Screenshot
                    pathname={item.screenshot.pathname}
                    alt={item.screenshot.alt}
                    title={common.zoomIn}
                    className={item.screenshot.className}
                  />
                )}
                <div className="info">
                  {item.links && (
                    <ul className="links">
                      {item.links.map((link, l) => (
                        <li key={l}>
                          <a href={link.url} target="_blank">
                            {link.type === "demo" && common.demo}
                            {link.type === "source" && common.sourceCode}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.tags && (
                    <ul className="tags">
                      {item.tags.map((tag, k) => (
                        <li key={k}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {isHidden && list.items.length > 2 && (
        <div className="more">
          <FontAwesomeIcon icon="chevron-down" aria-hidden={true} />
          <button onClick={expand} aria-controls={timelineId}>
            {common.more}
          </button>
        </div>
      )}
    </div>
  );
}

export default Timeline;
