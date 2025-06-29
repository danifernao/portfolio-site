import type { SectionType } from "../types/types";
import Title from "./SectionTitle";
import Timeline from "./SectionTimeline";

interface SectionProps {
  data: SectionType;
}

function Section({ data }: SectionProps) {
  return (
    <div id={data.id} className="section">
      {data.title && <Title id={data.id} title={data.title} />}
      {data.description && <p>{data.description}</p>}
      {data.list && <Timeline id={data.id} list={data.list} />}
    </div>
  );
}

export default Section;
