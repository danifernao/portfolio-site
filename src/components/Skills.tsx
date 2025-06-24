import type { SkillsType } from "../types/types";
import Title from "./SectionTitle";

interface SkillsProps {
  data: SkillsType;
}

function Skills({ data }: SkillsProps) {
  return (
    <div id={data.id} className="section skills">
      {data.title && <Title id={data.id} title={data.title} />}
      {data.items && (
        <ul>
          {data.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Skills;
