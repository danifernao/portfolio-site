import { useId, useState } from "react";
import { SkillsItemType } from "../types/types";
import { Tooltip } from "react-tooltip";

interface SkillsIconProps {
  item: SkillsItemType;
}

export default function SkillsItem({ item }: SkillsIconProps) {
  const [hovered, setHovered] = useState(false);
  const tooltipId = useId();

  return (
    <li>
      <a
        href="#"
        data-tooltip-id={tooltipId}
        data-tooltip-content={item.title}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => e.preventDefault()}
      >
        <i
          className={`devicon-${item.icon}-plain ${hovered ? "colored" : ""}`}
          aria-label={item.title}
        ></i>
        <Tooltip id={tooltipId} className="light" />
      </a>
    </li>
  );
}
