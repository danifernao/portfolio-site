import type { SectionType } from "../types/types";
import Timeline from "./SectionTimeline";
import Title from "./SectionTitle";

interface SectionProps {
  data: SectionType;
}

function Section({ data }: SectionProps) {
  if (!data.isVisible) {
    return null;
  }

  return (
    <section id={data.id} className="section">
      {data.title && <Title id={data.id} title={data.title} />}
      {data.description && <p>{data.description}</p>}
      {data.list && <Timeline id={data.id} list={data.list} />}
    </section>
  );
}

export default Section;
