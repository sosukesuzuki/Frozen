import { MarkdownFilesStore } from "../../src/stores";

describe("MarkdownFilesStore", () => {
  describe("#getFileIndexFromFile", () => {
    it("returns file index when I passed file id", () => {
      // Given
      const store = new MarkdownFilesStore();
      const dummyFile1 = {
        title: "title",
        content: "content",
        id: "12345"
      };
      const dummyFile2 = {
        title: "title",
        content: "content",
        id: "67890"
      };
      store.files = [dummyFile1, dummyFile2];

      // When
      const result = store.getFileIndexFromFile(dummyFile2);

      // Then
      expect(result).toBe(1);
    });
  });

  describe("#file", () => {
    it("returns current file", () => {
      // Given
      const store = new MarkdownFilesStore();
      const dummyFile1 = {
        title: "title",
        content: "content",
        id: "12345"
      };
      const dummyFile2 = {
        title: "title",
        content: "content",
        id: "67890"
      };
      store.files = [dummyFile1, dummyFile2];
      store.currentFileIndex = 1;

      // When
      const result = store.file;

      // Then
      expect(result).toMatchObject({
        title: "title",
        content: "content",
        id: "67890"
      });
    });

    it("returns undefined when the current file index is invalid", () => {
      // Given
      const store = new MarkdownFilesStore();
      store.currentFileIndex = -1;

      // When
      const result = store.file;

      // Then
      expect(result).toBeUndefined();
    });
  });
});
