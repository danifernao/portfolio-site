import { Fragment } from "react";
import type { LinksType } from "../types/types";
import Title from "./SectionTitle";

interface LinksProps {
  data: LinksType;
}

function Links({ data }: LinksProps) {
  if (!data.isVisible) {
    return null;
  }

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
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {formatUrl(link.url)}
                </a>
              </dd>
            </Fragment>
          ))}
        </dl>
      )}
    </section>
  );
}

export default Links;
