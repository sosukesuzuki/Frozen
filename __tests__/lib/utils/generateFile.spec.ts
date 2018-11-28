import { generateFile } from "../../../src/lib/utils";

describe("generateFile", () => {
  it("returns a new File", () => {
    // Given
    const content = "# hoge";

    // When
    const result = generateFile(content);

    // Then
    expect(result).toMatchObject({
      title: "hoge",
      content,
      id: expect.any(String)
    });
  });
});
