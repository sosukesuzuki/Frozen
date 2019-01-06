import { MarkdownFile } from "../types";
import find from "lodash/find";

export function getFileById(id: string, files: MarkdownFile[]): MarkdownFile | undefined {
  return find(files, ["id", id]);
}
