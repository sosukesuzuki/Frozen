import { CurrentFileStore } from "./CurrentFileStore";
import { MarkdownFilesStore } from "./MarkdownFilesStore";

export * from "./CurrentFileStore";
export * from "./MarkdownFilesStore";

export default interface Stores {
  currentFileStore: CurrentFileStore;
  markdownFilesStore: MarkdownFilesStore;
}
