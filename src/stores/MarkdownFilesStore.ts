import { observable, action, computed } from "mobx";
import { MarkdownFile } from "../lib/types";
import { findNoteTitle } from "../lib/utils";

export class MarkdownFilesStore {
  @observable public files: MarkdownFile[] = [];
  @observable public currentFileIndex: number = 0;

  constructor() {}

  @action.bound
  addFile(file: MarkdownFile, options?: { setFile?: boolean }) {
    this.files = this.files.concat(file);
    if (options == null) return;
    if (options.setFile != null) this.setCurrentFileFromFile(file);
  }

  @action.bound
  removeFile(file: MarkdownFile) {
    const fileIndex = this.getFileIndexFromFile(file);
    this.files.splice(fileIndex, 1);
  }

  @action.bound
  updateFile({ content, id }: { content: string; id: string }) {
    const newFiles = this.files.map(file => {
      if (file.id === id) {
        file.content = content;
        file.title = content === "" ? "untitled" : findNoteTitle(content);
      }
      return file;
    });
    const fileIndex = this.files.findIndex(file => file.id === id);
    this.setCurrentFileIndex(fileIndex);
    this.files = newFiles;
  }

  @action.bound
  setCurrentFileIndex(index: number) {
    this.currentFileIndex = index;
  }

  @computed
  get file() {
    return this.files[this.currentFileIndex];
  }

  getFileIndexFromFile({ id }: MarkdownFile) {
    return this.files.findIndex(file => file.id === id);
  }

  @action.bound
  setCurrentFileFromFile(file: MarkdownFile) {
    this.currentFileIndex = this.getFileIndexFromFile(file);
  }
}
