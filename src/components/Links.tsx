import type { LinksType } from "../types/types";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LinksProps {
  data: LinksType;
}

function Links({ data }: LinksProps) {
  const formatUrl = (param: string) => {
    const url = new URL(param);
    return `${url.hostname}${url.pathname.replace(/\/$/, "")}`;
  };

  return (
    <div id={data.id} className="section links">
      {data.title && (
        <h2>
          <a href={`#${data.id}`}>{data.title}</a>
        </h2>
      )}
      {data.items && (
        <dl>
          {data.items.map((link, i) => (
            <Fragment key={i}>
              <dt>{link.text}</dt>
              <dd>
                <a href={link.url} target="_blank">
                  {formatUrl(link.url)}
                </a>
                <FontAwesomeIcon
                  icon="arrow-up-right-from-square"
                  aria-hidden={true}
                />
              </dd>
            </Fragment>
          ))}
        </dl>
      )}
    </div>
  );
}

export default Links;
