import { Workspace } from "../types";
import uuid from "uuid/v1";

export function generateWorkspace(
  name: string,
  color: string = "#ffffff"
): Workspace {
  const id = uuid();
  return {
    name,
    id,
    color
  };
}
