import { observable, action, computed } from "mobx";
import { MarkdownFile } from "../lib/types";
import { findNoteTitle } from "../lib/utils";
import pullAt from "lodash/pullAt";
import findIndex from "lodash/findIndex";
import { getFiles, addFile, deleteFile, updateFile } from "../lib/storage";

export class MarkdownFilesStore {
  @observable public files: MarkdownFile[] = [];
  @observable public currentFileIndex: number = 0;

  constructor() {}

  async init() {
    this.files = await getFiles();
  }

  @action.bound
  async addFile(file: MarkdownFile, options?: { setFile?: boolean }) {
    this.files = this.files.concat(file);

    await addFile(file);

    if (options == null) return;
    if (options.setFile) this.setCurrentFileFromFile(file);
  }

  @action.bound
  async removeFile(file: MarkdownFile) {
    const fileIndex = this.getFileIndexFromFile(file);
    pullAt(this.files, [fileIndex]);

    if (fileIndex === this.currentFileIndex) {
      this.currentFileIndex = fileIndex - 1;
    }
    if (fileIndex - 1 === -1) {
      this.currentFileIndex = 0;
    }

    await deleteFile(file.id);
  }

  @action.bound
  async updateFile({ content, id }: { content: string; id: string }) {
    const newFiles = this.files.map(file => {
      if (file.id === id) {
        file.content = content;
        file.title = content === "" ? "untitled" : findNoteTitle(content);
      }
      return file;
    });
    const fileIndex = this.getFileIndexFromFile({ id });
    this.currentFileIndex = fileIndex;
    this.files = newFiles;

    await updateFile({
      id,
      content,
      title: findNoteTitle(content)
    });
  }

  @computed
  get file() {
    return this.files[this.currentFileIndex];
  }

  @action.bound
  setCurrentFileFromFile(file: MarkdownFile) {
    this.currentFileIndex = this.getFileIndexFromFile(file);
  }

  getFileIndexFromFile({ id }: { id: string }) {
    return findIndex(this.files, file => file.id === id);
  }
}
