import { observable, action, computed } from "mobx";
import { MarkdownFile } from "../lib/types";
import { findNoteTitle, generateFile } from "../lib/utils";
import pullAt from "lodash/pullAt";
import findIndex from "lodash/findIndex";
import debounce from "lodash/debounce";
import { LocalStorageServiceInterface } from "../lib/services/LocalStorageService";
import Types from "../lib/services/Types";
import { lazyInject } from "../lib/container";
import readmeString from "../lib/readmeString";
import { DBServiceInterface } from "../lib/services/DBService";

export class MarkdownFilesStore {
  @observable public files: MarkdownFile[] = [];
  @observable public currentFileIndex: number = 0;
  @lazyInject(Types.LocalStorageService)
  private localStorageService!: LocalStorageServiceInterface;
  @lazyInject(Types.DBService) private db!: DBServiceInterface;

  async init() {
    this.files = await this.db.getFiles();
    if (
      this.files.length === 0 &&
      this.localStorageService.getIsFirstAccess() == null
    ) {
      this.localStorageService.setIsFirstAccess();
      await this.addFile(generateFile(readmeString), {
        setFile: true
      });
    }
    const currentFileIndex = this.localStorageService.getCurrentFileIndex();
    if (currentFileIndex != null) {
      await this.setCurrentFileIndex(currentFileIndex);
    }
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

    await this.db.addFile(file);

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

    await this.db.deleteFile(file.id);
  }

  @action.bound
  async updateFile({ content, id }: { content: string; id: string }) {
    const fileIndex = this.getFileIndexFromFile({ id });
    this.files[fileIndex].content = content;
    this.files[fileIndex].title = findNoteTitle(content);

    await debounce(() => {
      this.db.updateFile({
        id,
        content,
        title: findNoteTitle(content)
      });
    }, 1000)();
  }

  @action.bound
  setCurrentFileIndex(index: number) {
    this.currentFileIndex = index;
  }

  @action.bound
  setCurrentFileFromFile(file: MarkdownFile) {
    this.currentFileIndex = this.getFileIndexFromFile(file);
    this.localStorageService.setCurrentFileIndex(this.currentFileIndex);
  }
}
