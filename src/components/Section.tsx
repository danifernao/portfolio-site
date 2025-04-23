import type { SectionType } from "../types/types";
import Timeline from "./Timeline";

interface SectionProps {
  data: SectionType;
}

function Section({ data }: SectionProps) {
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
