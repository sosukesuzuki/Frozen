import Dexie from "dexie";
import { DBItem, MarkdownFile } from "./types";

class FilesDatabase extends Dexie {
  files!: Dexie.Table<DBItem, string>;

  constructor() {
    super("FilesDatabase");
    this.version(1).stores({
      files: "id, content"
    });
  }
}

const db = new FilesDatabase();

export async function getFiles(): Promise<MarkdownFile[]> {
  const items = await db.files.toArray();
  return items.map(({ id, title, content }) => ({
    id,
    title,
    content
  }));
}

export async function addFile({ id, content, title }: MarkdownFile) {
  await db.files.add({
    id,
    content,
    title,
    updatedAt: Date.now()
  });
}

export async function deleteFile(id: string) {
  await db.files.delete(id);
}

export async function updateFile({ id, content, title }: MarkdownFile) {
  await db.files.put({
    id,
    content,
    title,
    updatedAt: Date.now()
  });
}
