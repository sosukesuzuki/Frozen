import removeMd from "remove-markdown";
import striptags from "striptags";

function stripMdAndHtml(value: string): string {
  return striptags(removeMd(value));
}

export function findNoteTitle(value: string): string {
  const splitted = value.split("\n");
  let title = null;
  let isInsideCodeBlock = false;

  if (title === null) {
    splitted.some((line: string, index: number) => {
      const trimmedLine = line.trim();
      const trimmedNextLine = splitted[index + 1] === undefined ? "" : splitted[index + 1].trim();
      if (trimmedLine.match("```")) {
        isInsideCodeBlock = !isInsideCodeBlock;
      }
      if (
        isInsideCodeBlock === false &&
        (trimmedLine.match(/^# +/) || trimmedNextLine.match(/^=+$/))
      ) {
        title = trimmedLine;
        return true;
      } else {
        return false;
      }
    });
  }

  if (title === null) {
    title = "";
    splitted.some((line: string) => {
      if (line.trim().length > 0) {
        title = line.trim();
        return true;
      } else {
        return false;
      }
    });
  }

  return stripMdAndHtml(title);
}
