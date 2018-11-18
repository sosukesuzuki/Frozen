import { observable, action } from 'mobx'
import { MarkdownFile } from './FilesStore'

export class CurrentFileStore {
  @observable public file: MarkdownFile | undefined

  constructor (file: MarkdownFile) {
    this.file = file
  }

  @action setCurrentFile (file: MarkdownFile) {
    this.file = file
  }

  @action setEmpty () {
    this.file = undefined
  }
}
