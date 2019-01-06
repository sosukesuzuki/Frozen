import { countChars, countWords } from "@lib/utils/Counter";

describe("Counter", () => {
  describe("countChars", () => {
    it("counts the length of passed string", () => {
      // Given
      const content = "content";

      // When
      const charCount = countChars(content);

      // Then
      expect(charCount).toBe(7);
    });
  });

  describe("countWords", () => {
    it("counts the number of words for passed string", () => {
      // Given
      const content = "con t ent";

      // When
      const wordsCount = countWords(content);

      // Then
      expect(wordsCount).toBe(3);
    });
  });
});
