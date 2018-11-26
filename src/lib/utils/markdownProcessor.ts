import remark from "remark";
import breaks from "remark-breaks";
import emoji from "remark-emoji";
import html from "remark-html";

export const markdownProcessor = remark()
  .use(breaks)
  .use(emoji)
  .use(html);
