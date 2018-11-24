export interface MarkdownFile {
  title: string;
  content: string;
  id: string;
}

export interface DBItem {
  id: string;
  content: string;
  title: string;
  updatedAt: number;
}
