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

  describe("#addFile", () => {
    it("adds a new file", async () => {
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
      store.files = [dummyFile1];

      // When
      await store.addFile(dummyFile2);

      // Then
      expect(store.files).toMatchObject([dummyFile1, dummyFile2]);
    });

    it("adds a new file and set this file to current file when set setFile option", async () => {
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
      store.files = [dummyFile1];
      store.currentFileIndex = 0;

      // When
      await store.addFile(dummyFile2, { setFile: true });

      // Then
      expect(store.files).toMatchObject([dummyFile1, dummyFile2]);
      expect(store.currentFileIndex).toBe(1);
    });
  });
});
