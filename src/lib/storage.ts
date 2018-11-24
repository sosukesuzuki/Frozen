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

export function getFiles() {
  return db.files.toArray();
}

export async function addFile({ id, content }: MarkdownFile) {
  await db.files.add({
    id,
    content,
    updatedAt: Date.now()
  });
}

export async function deleteFile(id: string) {
  await db.files.delete(id);
}

export async function updateFile({ id, content }: MarkdownFile) {
  await db.files.put({
    id,
    content,
    updatedAt: Date.now()
  });
}
