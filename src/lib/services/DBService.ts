import { injectable } from "inversify";
import Dexie from "dexie";
import { DBFileItem, MarkdownFile, Workspace } from "../types";

class DB extends Dexie {
  files!: Dexie.Table<DBFileItem, string>;
  workspaces!: Dexie.Table<Workspace, string>;

  constructor() {
    super("Database");
    this.version(1).stores({
      files: "id, content, title, workspaceId",
      workspaces: "id, name, color"
    });
  }
}

export interface DBServiceInterface {
  getFiles: () => Promise<MarkdownFile[]>;
  getFilesByWorkspaceId: (workspaceId: string) => Promise<MarkdownFile[]>;
  getWorkspaces: () => Promise<Workspace[]>;
  addFile: (file: MarkdownFile, workspaceId: string) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  updateFile: (file: MarkdownFile, workspaceId: string) => Promise<void>;
  addWorkspace: (workspace: Workspace) => Promise<void>;
  updateWorkspace: (workspace: Workspace) => Promise<void>;
  deleteWorkspace: (id: string) => Promise<void>;
}

@injectable()
export class DBService implements DBService {
  files!: Dexie.Table<DBFileItem, string>;
  workspaces!: Dexie.Table<Workspace, string>;

  constructor() {
    const db = new DB();
    this.files = db.files;
    this.workspaces = db.workspaces;
  }

  getFiles = async (): Promise<MarkdownFile[]> => {
    const items = await this.files.toArray();
    return items.map(({ id, title, content }) => ({
      id,
      title,
      content
    }));
  };

  getWorkspaces = async (): Promise<Workspace[]> => {
    return await this.workspaces.toArray();
  };

  getFilesByWorkspaceId = async (workspaceId: string): Promise<MarkdownFile[]> => {
    const items = await this.files
      .filter((item: DBFileItem) => {
        return item.workspaceId === workspaceId;
      })
      .toArray();
    return items.map(({ id, title, content }) => ({
      id,
      title,
      content
    }));
  };

  addFile = async ({ id, content, title }: MarkdownFile, workspaceId: string): Promise<void> => {
    await this.files.add({
      id,
      content,
      title,
      updatedAt: Date.now(),
      workspaceId
    });
  };

  deleteFile = async (id: string): Promise<void> => {
    await this.files.delete(id);
  };

  updateFile = async ({ id, content, title }: MarkdownFile, workspaceId: string): Promise<void> => {
    await this.files.put({
      id,
      content,
      title,
      updatedAt: Date.now(),
      workspaceId
    });
  };

  addWorkspace = async (workspace: Workspace) => {
    await this.workspaces.add(workspace);
  };

  updateWorkspace = async (workspace: Workspace) => {
    await this.workspaces.put(workspace);
  };

  deleteWorkspace = async (id: string) => {
    await this.workspaces.delete(id);
  };
}

function doNothing(): any {}

@injectable()
export class MockDBService implements DBServiceInterface {
  getFiles = doNothing;
  getFilesByWorkspaceId = doNothing;
  getWorkspaces = doNothing;
  addFile = doNothing;
  deleteFile = doNothing;
  updateFile = doNothing;
  addWorkspace = doNothing;
  updateWorkspace = doNothing;
  deleteWorkspace = doNothing;
}
