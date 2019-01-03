export function countChar(content: string): number {
  return content.length;
}

export function countWords(content: string): number {
  return content.split(/[\u0080-\uFFFF\w]+/g).length - 1;
}
