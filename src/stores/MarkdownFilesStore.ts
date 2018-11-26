import { observable, action, computed } from "mobx";
import { MarkdownFile } from "../lib/types";
import { findNoteTitle } from "../lib/utils";
import pullAt from "lodash/pullAt";
import findIndex from "lodash/findIndex";
import debounce from "lodash/debounce";
import { getFiles, addFile, deleteFile, updateFile } from "../lib/db";

export class MarkdownFilesStore {
  @observable public files: MarkdownFile[] = [];
  @observable public currentFileIndex: number = 0;

  async init() {
    this.files = await getFiles();
  }

  getFileIndexFromFile({ id }: { id: string }) {
    return findIndex(this.files, file => file.id === id);
  }

  @computed
  get file() {
    return this.files[this.currentFileIndex];
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
    const fileIndex = this.getFileIndexFromFile({ id });
    this.files[fileIndex].content = content;
    this.files[fileIndex].title = findNoteTitle(content);

    await debounce(() => {
      updateFile({
        id,
        content,
        title: findNoteTitle(content)
      });
    }, 1000)();
  }

  @action.bound
  setCurrentFileFromFile(file: MarkdownFile) {
    this.currentFileIndex = this.getFileIndexFromFile(file);
  }
}
