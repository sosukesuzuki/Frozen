import { MarkdownFile } from '../types'
import uuidv1 from 'uuid/v1'

export function generateFile (content: string): MarkdownFile {
  const id = uuidv1()
  // TODO: contentからtitleを生成する関数を作って使う
  const title = content === '' ? 'untitled' : content
  return {
    id,
    title,
    content
  }
}