import type { LinksType } from "../types/types";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./SectionTitle";

interface LinksProps {
  data: LinksType;
}

function Links({ data }: LinksProps) {
  const formatUrl = (param: string) => {
    const url = new URL(param);
    return `${url.hostname}${url.pathname.replace(/\/$/, "")}`;
  };

  return (
    <section id={data.id} className="section links">
      {data.title && <Title id={data.id} title={data.title} />}
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
    </section>
  );
}

export default Links;
