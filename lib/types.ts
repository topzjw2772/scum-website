// 共享类型定义

export interface ServerInfo {
  name: string;
  version: string;
  description: string;
  status: 'online' | 'offline';
}

export interface Activity {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
}

export interface News {
  slug: string;
  title: string;
  publishDate: string;
  summary: string;
  content: string;
}

export interface ServerFeature {
  icon: string;
  title: string;
  description: string;
}
