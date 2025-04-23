export interface DataType {
  header: HeaderType;
  about: SectionType;
  skills: SkillsType;
  projects: SectionType;
  blog?: BlogType;
  education: SectionType;
  links: LinksType;
  language: string;
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

export interface SectionType {
  id: string;
  title: string;
  description: string;
  list?: TimelineType;
}

export interface TimelineType {
  more: string;
  items: {
    date: string | string[];
    title: string;
    description: string;
    tags?: string[];
    screenshot?: {
      title: string;
      pathname: string;
      alt: string;
    };
    links?: {
      text: string;
      url: string;
    }[];
  }[];
}

export interface SkillsType {
  id: string,
  title: string,
  items: string[]
}

export interface BlogType {
  id: string;
  title: string;
  description: string;
  api: {
    blogId: string;
    key: string;
    maxResults: number;
  };
  more: string;
  loading: string;
  error: string;
}

export interface LinksType {
  id: string;
  title: string;
  items: {
    text: string;
    url: string;
  }[];
}