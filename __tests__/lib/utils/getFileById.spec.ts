import { getFileById } from "@lib/utils/getFileById";
import { MarkdownFile } from "@lib/types";
import { generateFile } from "@lib/utils/ItemGenerator";

describe("getFileById", () => {
  it("returns the file has specified id", () => {
    // Given
    const files: MarkdownFile[] = [
      {
        id: "specified",
        content: "content",
        title: "title"
      },
      generateFile("dummy")
    ];

    // When
    const specified = getFileById("specified", files);

    // Then
    expect(specified).toEqual({
      id: "specified",
      content: "content",
      title: "title"
    });
  });

  it("returns undefined if the file has specied id does not exists", () => {
    // Given
    const files: MarkdownFile[] = [generateFile("dummy")];

    // When
    const specified = getFileById("specified", files);

    // Then
    expect(specified).toBeUndefined();
  });
});
