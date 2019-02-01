import { MarkdownFile, Workspace } from "../types";
import uuid from "uuid/v1";
import { findNoteTitle } from "./findNoteTitle";

export function generateFile(content: string): MarkdownFile {
  const id = uuid();
  const title = content === "" ? "untitled" : findNoteTitle(content);
  const file: MarkdownFile = {
    id,
    title,
    content
  };
  return file;
}

export function generateWorkspace(
  name: string,
  color: string = "#ffffff"
): Workspace {
  const id = uuid();

  const mathcer = color.match("^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$");

  if (mathcer == null) throw Error(`Passed color code ${color} is invalid.`);

  const workspace: Workspace = {
    name,
    id,
    color
  };
  return workspace;
}
