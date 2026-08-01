import type { SkillsType } from "../types/types";
import Title from "./SectionTitle";
import SkillsItem from "./SkillsIItem";

interface SkillsProps {
  data: SkillsType;
}

function Skills({ data }: SkillsProps) {
  if (!data.isVisible) {
    return null;
  }

  return (
    <section id={data.id} className="section skills">
      {data.title && <Title id={data.id} title={data.title} />}
      {data.items && (
        <ul>
          {[...data.items]
            .sort((a, b) => a.order - b.order)
            .map((item, i) => (
              <SkillsItem key={i} item={item} />
            ))}
        </ul>
      )}
    </section>
  );
}

export default Skills;
