import { injectable } from "inversify";
import Dexie from "dexie";
import { DBItem, MarkdownFile } from "../types";

class DB extends Dexie {
  files!: Dexie.Table<DBItem, string>;

  constructor() {
    super("FilesDatabase");
    this.version(1).stores({
      files: "id, content"
    });
  }
}

export interface DBServiceInterface {
  getFiles: () => Promise<MarkdownFile[]>;
  addFile: (file: MarkdownFile) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
  updateFile: (file: MarkdownFile) => Promise<void>;
}

@injectable()
export class DBService implements DBService {
  files!: Dexie.Table<DBItem, string>;

  constructor() {
    const db = new DB();
    this.files = db.files;
  }

  async getFiles(): Promise<MarkdownFile[]> {
    const items = await this.files.toArray();
    return items.map(({ id, title, content }) => ({
      id,
      title,
      content
    }));
  }

  async addFile({ id, content, title }: MarkdownFile): Promise<void> {
    await this.files.add({
      id,
      content,
      title,
      updatedAt: Date.now()
    });
  }

  async deleteFile(id: string): Promise<void> {
    await this.files.delete(id);
  }

  async updateFile({ id, content, title }: MarkdownFile): Promise<void> {
    await this.files.put({
      id,
      content,
      title,
      updatedAt: Date.now()
    });
  }
}

function doNothing(): any {}

@injectable()
export class MockDBService implements DBServiceInterface {
  getFiles = doNothing;
  addFile = doNothing;
  deleteFile = doNothing;
  updateFile = doNothing;
}
