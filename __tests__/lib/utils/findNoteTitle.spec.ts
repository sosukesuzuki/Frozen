import { findNoteTitle } from "../../../src/lib/utils";

describe("findNoteTitle", () => {
  it("returns a correct title", () => {
    // Given
    const contents = ["# hoge\nfuga", "hoge", "boo\n# hoge"];
    const expects = ["hoge", "hoge", "hoge"];

    // When
    const results = contents.map(content => findNoteTitle(content));

    // Then
    for (let i = 0; i < results.length; i++) {
      expect(results[i]).toBe(expects[i]);
    }
  });
});
