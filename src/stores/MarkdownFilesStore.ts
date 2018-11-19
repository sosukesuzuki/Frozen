import { observable, action } from 'mobx'
import { MarkdownFile } from '../lib/types'
import { findNoteTitle } from '../lib/utils'

export class MarkdownFilesStore {
  @observable public files: MarkdownFile[] = []

  constructor () {}

  @action addFile = (file: MarkdownFile) => {
    this.files = this.files.concat(file)
  }

  @action removeFile = ({ id }: MarkdownFile) => {
    this.files = this.files.filter(file => file.id !== id)
  }

  @action updateFile = ({ content, id }: { content: string, id: string }) => {
    const newFiles = this.files.map(file => {
      if (file.id === id) {
        file.content = content
        file.title = content === '' ? 'untitled' : findNoteTitle(content)
      }
      return file
    })
    this.files = newFiles
  }
}
