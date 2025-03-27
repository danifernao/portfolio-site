import { Fragment } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Links({ data }) {
  const formatUrl = (param) => {
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
                  icon="fa-solid fa-arrow-up-right-from-square"
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

Links.PropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
};

export default Links;
