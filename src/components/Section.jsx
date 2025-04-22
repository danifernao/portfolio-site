import Timeline from "./Timeline";

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

export default Section;
