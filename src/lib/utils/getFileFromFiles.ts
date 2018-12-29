import { MarkdownFile } from "../types";
import _ from "lodash";

export function getFileFormFiles(id: string, files: MarkdownFile[]): MarkdownFile | undefined {
  return _.find(files, ["id", id]);
}
