import Timeline from "./Timeline";
import PropTypes from "prop-types";

function Section({ data }) {
  return (
    <div id={data.id} className="section">
      {data.title && (
        <h2>
          <a href={`#${data.id}`}>{data.title}</a>
        </h2>
      )}
      {data.description && <p>{data.description}</p>}
      {data.items && <Timeline id={data.id} items={data.items} />}
    </div>
  );
}

Section.PropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Section;
