import type { DataType, SectionKey } from "../types/types";
import Timeline from "./SectionTimeline";
import Title from "./SectionTitle";

interface SectionProps {
  type: SectionKey;
  data: DataType;
}

function Section({ type, data }: SectionProps) {
  const section = data[type];

  if (!section.isVisible) {
    return null;
  }

  return (
    <section id={section.id} className="section">
      {section.title && <Title id={section.id} title={section.title} />}
      {section.description && <p>{section.description}</p>}
      {section.list && (
        <Timeline id={section.id} list={section.list} common={data.common} />
      )}
    </section>
  );
}

export default Section;
