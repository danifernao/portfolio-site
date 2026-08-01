export interface DataType {
  header: HeaderType;
  about: SectionType;
  skills: SkillsType;
  projects: SectionType;
  blog?: BlogType;
  education: SectionType;
  contact: ContactType;
  links: LinksType;
  common: Record<string, string>;
}

export interface HeaderType {
  name: string;
  profession: string;
  address: string;
  photo: {
    title: string;
    pathname: string;
    alt: string;
  };
}

export type SectionKey = "about" | "projects" | "education";

export interface SectionType {
  isVisible?: boolean;
  id: string;
  title: string;
  description: string;
  list?: TimelineType;
}

export interface TimelineType {
  items: {
    date: string;
    title: string;
    description: string;
    tags?: string[];
    screenshot?: {
      pathname: string;
      alt: string;
      className?: string;
    };
    links?: {
      type: "demo" | "source";
      url: string;
    }[];
  }[];
}

export interface SkillsType {
  isVisible?: boolean;
  id: string;
  title: string;
  items: SkillsItemType[];
}

export interface SkillsItemType {
  order: number;
  title: string;
  icon: string;
  url: string;
}

export interface BlogType {
  isVisible?: boolean;
  id: string;
  title: string;
  description: string;
  api: {
    blogId: string;
    key: string;
    maxResults: number;
  };
  imgAlt: string;
  more: string;
  loading: string;
  error: string;
}

export interface ContactType {
  isVisible?: boolean;
  id: string;
  title: string;
  description: string;
  button: string;
  placeholders: {
    name: string;
    email: string;
    message: string;
  };
  status: {
    loading: {
      button: string;
      form: string;
    };
    error: {
      response: string;
      network: string;
    };
    success: string;
  };
  gBranding: string;
}

export interface LinksType {
  isVisible?: boolean;
  id: string;
  title: string;
  items: LinksItemType[];
}

export interface LinksItemType {
  text: string;
  url: string;
  title?: string;
  icon?: string;
}
