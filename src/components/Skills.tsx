import type { SkillsType } from "../types/types";

interface SkillsProps {
  data: SkillsType;
}

function Skills({ data }: SkillsProps) {
  return (
    <div id={data.id} className="section skills">
      {data.title && (
        <h2>
          <a href={`#${data.id}`}>{data.title}</a>
        </h2>
      )}
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
