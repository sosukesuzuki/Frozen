import remark from "remark";
import breaks from "remark-breaks";
import emoji from "remark-emoji";

export const markdownProcessor = remark()
  .use(breaks)
  .use(emoji);
