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

export interface SectionType {
  showInMenu?: boolean;
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
  showInMenu?: boolean;
  id: string;
  title: string;
  items: SkillsItemType[];
}

export interface SkillsItemType {
    title: string;
    icon: string;
}

export interface BlogType {
  showInMenu?: boolean;
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

export interface ContactType {
  showInMenu?: boolean;
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
  loading: {
    form: string;
    button: string;
  };
  gBranding: string;
}

export interface LinksType {
  showInMenu?: boolean;
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