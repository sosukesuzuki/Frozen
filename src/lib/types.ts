export interface MarkdownFile {
  title: string;
  content: string;
  id: string;
}

export interface DBFileItem {
  id: string;
  content: string;
  title: string;
  updatedAt: number;
  workspaceId: string;
}

export interface Workspace {
  name: string;
  id: string;
  color: string;
}
