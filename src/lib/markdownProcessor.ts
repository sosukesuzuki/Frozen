import remark from "remark";
import breaks from "remark-breaks";
import emoji from "remark-emoji";
import math from "remark-math";
import katex from "remark-html-katex";
import html from "remark-html";

export default remark()
  .use(breaks)
  .use(emoji)
  .use(math)
  .use(katex)
  .use(html);
