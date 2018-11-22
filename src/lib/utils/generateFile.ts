import { MarkdownFile } from '../types'
import uuidv1 from 'uuid/v1'
import { findNoteTitle } from './findNoteTitle'

export function generateFile (content: string): MarkdownFile {
  const id = uuidv1()
  const title = content === '' ? 'untitled' : findNoteTitle(content)
  return {
    id,
    title,
    content
  }
}
