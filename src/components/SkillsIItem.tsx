import { useId, useState } from "react";
import { Tooltip } from "react-tooltip";
import { SkillsItemType } from "../types/types";

interface SkillsIconProps {
  item: SkillsItemType;
}

export default function SkillsItem({ item }: SkillsIconProps) {
  const [hovered, setHovered] = useState(false);
  const tooltipId = useId();

  return (
    <li>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        data-tooltip-id={tooltipId}
        data-tooltip-content={item.title}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered(false)}
      >
        <i
          className={`devicon-${item.icon}-plain ${hovered ? "colored" : ""}`}
          aria-label={item.title}
        ></i>
        <Tooltip id={tooltipId} className="light" isOpen={hovered} />
      </a>
    </li>
  );
}
