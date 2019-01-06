import { generateFile, generateWorkspace } from "@lib/utils/ItemGenerator";

describe("ItemGenerator", () => {
  describe("generateFile", () => {
    it("returns new file", () => {
      // When
      const file = generateFile("content");

      // Then
      expect(file).toMatchObject({
        title: "content",
        content: "content",
        id: expect.any(String)
      });
    });
  });

  describe("generateWorkspace", () => {
    it("returns new workspace", () => {
      // When
      const workspace = generateWorkspace("workspace");

      // Then
      expect(workspace).toMatchObject({
        name: "workspace",
        id: expect.any(String),
        color: "#ffffff"
      });
    });

    it("returns new worksapce colos is specified", () => {
      // When
      const workspace = generateWorkspace("workspace", "#fafafa");

      // Then
      expect(workspace).toMatchObject({
        name: "workspace",
        id: expect.any(String),
        color: "#fafafa"
      });
    });

    it("throws an error when color is invalid", () => {
      // Given
      const invalidColor = "invalid";

      try {
        // When
        generateWorkspace("workspace", invalidColor);
      } catch (error) {
        expect(error).toMatchObject({
          message: `Passed color code ${invalidColor} is invalid.`
        });
      }
    });
  });
});
