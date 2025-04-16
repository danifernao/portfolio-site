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
      {data.list && <Timeline id={data.id} list={data.list} />}
    </div>
  );
}

Section.PropTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default Section;
