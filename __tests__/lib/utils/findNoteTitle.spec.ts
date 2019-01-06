import { stripMdAndHtml, findNoteTitle } from "@lib/utils/findNoteTitle";

describe("stripMdAndHtml", () => {
  it("removes markdown", () => {
    // Given
    const content = "# Head\n- list 1\n- list 2";

    // When
    const removed = stripMdAndHtml(content);

    // Then
    expect(removed).toBe("Head\nlist 1\nlist 2");
  });

  it("removes html tags", () => {
    // Given
    const content = "<h1>Head<h1>\n<li>list 1</li>\n<li>list 2</li>";

    // When
    const removed = stripMdAndHtml(content);

    // Then
    expect(removed).toBe("Head\nlist 1\nlist 2");
  });
});

describe("findNoteTitle", () => {
  it("returns title of content", () => {
    // Given
    const contents = ["# hoge\nfuga", "# hoge_hoge_hoge", "# hoge\n```\n# codeblock\n```", "hoge"];

    // When
    const titles = contents.map(content => findNoteTitle(content));

    // Then
    expect(titles).toEqual(["hoge", "hogehogehoge", "hoge", "hoge"]);
  });
});
