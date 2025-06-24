import type { LinksItemType } from "../types/types";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LinksProps {
  links: LinksItemType[];
}

function HeaderLinks({ links }: LinksProps) {
  return (
    <ul>
      {links.map((link, i) => (
        <li key={i}>
          <a
            href={link.url}
            title={link.title}
            aria-label={link.title}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={["fab", link.icon] as IconProp}
              aria-hidden={true}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default HeaderLinks;
